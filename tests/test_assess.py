import contextlib
import io
import subprocess
import sys
import unittest
from pathlib import Path
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
import assess


def scores_for(goal, value):
    return {domain: value for domain in assess.PATHS[goal].domains}


class AssessmentTests(unittest.TestCase):
    def test_question_groups_have_two_distinct_checks(self):
        self.assertEqual(len({q.id for q in assess.QUESTIONS}), len(assess.QUESTIONS))
        for goal, path in assess.PATHS.items():
            with self.subTest(goal=goal):
                questions = assess.questions_for(goal)
                for domain in path.domains:
                    self.assertEqual(sum(q.domain == domain for q in questions), 2)
                self.assertTrue(all(0 <= q.correct < len(q.options) for q in questions))

    def test_all_correct_and_unknown_answers(self):
        for goal in assess.PATHS:
            with self.subTest(goal=goal):
                correct = {q.id: q.correct for q in assess.questions_for(goal)}
                self.assertEqual(assess.score_answers(goal, correct), scores_for(goal, 2))
                self.assertEqual(assess.score_answers(goal, {}), scores_for(goal, 0))

    def test_wrong_answers_do_not_gain_points(self):
        wrong = {q.id: (q.correct + 1) % len(q.options) for q in assess.questions_for("D3")}
        self.assertEqual(assess.score_answers("D3", wrong), scores_for("D3", 0))

    def test_invalid_answer_rejected(self):
        for value in (-1, 3, True, "1"):
            with self.subTest(value=value), self.assertRaises(ValueError):
                assess.score_answers("P0", {"use1": value})

    def test_workplace_users_are_not_assigned_programming(self):
        for goal in ("P0", "W1", "W2", "W3", "T1"):
            with self.subTest(goal=goal):
                blocks = assess.recommend(goal, scores_for(goal, 0))
                self.assertEqual([b[0] for b in blocks], [goal])
                self.assertNotIn("python", assess.PATHS[goal].domains)

    def test_foundations_do_not_repeat(self):
        self.assertEqual([b[0] for b in assess.recommend("P1", scores_for("P1", 0))], ["P1"])

    def test_developer_python_gap_precedes_destination(self):
        for goal in ("W4", "D1", "D2", "D3", "D4"):
            with self.subTest(goal=goal):
                blocks = assess.recommend(goal, scores_for(goal, 0), evidence=True)
                self.assertEqual(blocks[0][0], "P1")
                self.assertEqual(blocks[-1][0], goal)

    def test_deployment_paths_include_data_prerequisite(self):
        for goal in ("D1", "D2"):
            with self.subTest(goal=goal):
                self.assertEqual([b[0] for b in assess.recommend(goal, scores_for(goal, 0))], ["P1", "C06", goal])

    def test_engineering_gap_and_no_evidence(self):
        scores = scores_for("D3", 2)
        scores["engineering"] = 1
        blocks = assess.recommend("D3", scores)
        self.assertEqual([b[0] for b in blocks], ["C04", "practice", "D3"])

    def test_practice_gate_for_quiz_only_knowledge(self):
        for goal in ("W4", "D1", "D2", "D3", "D4"):
            with self.subTest(goal=goal):
                self.assertEqual(assess.recommend(goal, scores_for(goal, 2))[0][0], "practice")

    def test_experienced_learner_keeps_destination_project(self):
        for goal in assess.PATHS:
            with self.subTest(goal=goal):
                self.assertEqual([b[0] for b in assess.recommend(goal, scores_for(goal, 2), True)], [goal])

    def test_invalid_scores_rejected(self):
        for scores in ({}, {"use": 3}, {"use": True}, {"use": 2, "python": 2}):
            with self.subTest(scores=scores), self.assertRaises(ValueError):
                assess.recommend("P0", scores)

    def test_capacity_does_not_remove_prerequisites(self):
        text = assess.render_plan("D1", scores_for("D1", 0), False, 0.5, 1)
        self.assertIn("52 h including", text)
        self.assertIn("does not fit", text)
        self.assertIn("First study session: 0.5 h on P1", text)
        self.assertIn("NOT MEASURED", text)

    def test_exact_capacity_and_german_option(self):
        text = assess.render_plan("W1", scores_for("W1", 2), True, 3, 2, True, "German")
        self.assertNotIn("does not fit", text)
        self.assertIn("German edition", text)
        self.assertIn("Candidate skips", text)
        self.assertIn("live tools/hardware", text)

    def test_no_evidence_means_no_automatic_skip(self):
        text = assess.render_plan("W2", scores_for("W2", 2), False, 2, 4)
        self.assertIn("No skips based on the quiz alone", text)
        self.assertIn("Domain gate", text)

    def test_invalid_capacity_rejected(self):
        for hours, weeks in ((float("nan"), 1), (float("inf"), 1), (0, 1), (41, 1), (2, 0), (2, 1.5)):
            with self.subTest(hours=hours, weeks=weeks), self.assertRaises(ValueError):
                assess.render_plan("P0", scores_for("P0", 0), False, hours, weeks)

    def test_number_validation_reprompts(self):
        with patch("builtins.input", side_effect=["nan", "inf", "-1", "abc", "0.5"]), contextlib.redirect_stdout(io.StringIO()):
            self.assertEqual(assess.ask_number("Hours", 0.5, 40), 0.5)

    def test_integer_validation_reprompts(self):
        with patch("builtins.input", side_effect=["2.5", "3"]), contextlib.redirect_stdout(io.StringIO()):
            self.assertEqual(assess.ask_number("Weeks", 1, 52, integer=True), 3)

    def test_choice_validation_reprompts(self):
        with patch("builtins.input", side_effect=["", "0", "4", "x", "2"]), contextlib.redirect_stdout(io.StringIO()):
            self.assertEqual(assess.ask_choice("Pick", ("A", "B")), 1)

    def test_demo_runs_from_another_directory(self):
        result = subprocess.run([sys.executable, str(ROOT / "scripts/assess.py"), "--demo"], cwd=ROOT.parent, capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("D3", result.stdout)
        self.assertIn("No answers were saved or sent", result.stdout)

    def test_complete_noncoding_interview(self):
        # W2, 2 h/week, four weeks, recent evidence, simulated, German, all unknown.
        answers = ["4", "2", "4", "1", "1", "2"] + ["4"] * len(assess.questions_for("W2"))
        result = subprocess.run([sys.executable, str(ROOT / "scripts/assess.py")], input="\n".join(answers) + "\n", capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("Your destination: W2", result.stdout)
        self.assertIn("8 h including listed prerequisite", result.stdout)
        self.assertIn("Feedback on gaps", result.stdout)

    def test_eof_does_not_produce_a_recommendation(self):
        result = subprocess.run([sys.executable, str(ROOT / "scripts/assess.py")], input="", capture_output=True, text=True)
        self.assertEqual(result.returncode, 2)
        self.assertNotIn("Your destination:", result.stdout)
        self.assertIn("Interview stopped", result.stdout)


if __name__ == "__main__":
    unittest.main()
