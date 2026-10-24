// Browser counterpart of scripts/assess.py; exhaustive parity cases are checked in CI.
export function questionsFor(data, goal) {
  const path = data.paths.find(p => p.id === goal);
  if (!path) throw new Error('Unknown learning path.');
  return data.questions.filter(q => path.domains.includes(q.domain));
}

export function scoreAnswers(data, goal, answers, requireComplete = true) {
  const path = data.paths.find(p => p.id === goal);
  if (!path) throw new Error('Unknown learning path.');
  const scores = Object.fromEntries(path.domains.map(d => [d, 0]));
  for (const q of questionsFor(data, goal)) {
    if (requireComplete && !Object.hasOwn(answers, q.id)) throw new Error('Please answer every question, or choose “Not sure”.');
    const answer = answers[q.id];
    if (answer != null && (!Number.isInteger(answer) || answer < 0 || answer >= q.options.length)) throw new Error('Invalid answer.');
    if (answer === q.correct) scores[q.domain]++;
  }
  return scores;
}

export function recommend(data, goal, scores, evidence = false) {
  const path = data.paths.find(p => p.id === goal);
  if (!path || Object.keys(scores).length !== path.domains.length || path.domains.some(d => !Number.isInteger(scores[d]) || scores[d] < 0 || scores[d] > 2)) throw new Error('Invalid topic scores.');
  const blocks = [];
  if (!['P0', 'P1', 'W1', 'W2', 'W3', 'T1'].includes(goal)) {
    if (scores.python < 2) blocks.push({id:'P1', hours:24, reason:'Python prerequisite gap: complete the selected foundations and their practice check.'});
    else if (['W4', 'D3'].includes(goal) && scores.engineering < 2) blocks.push({id:'C04', hours:4, reason:'Engineering gap: practise Git/diffs and reproducible verification first.'});
    if (['D1', 'D2'].includes(goal) && scores.data < 2) blocks.push({id:'C06', hours:4, reason:'ML gap: practise baselines and train/test separation before deployment.'});
    if (scores.python === 2 && !evidence) blocks.push({id:'practice', hours:2, reason:'Confirm quiz results by writing and explaining a small tested utility; knowledge alone is insufficient.'});
  }
  blocks.push({id:goal, hours:path.hours, reason:'Your chosen destination; focus introductory work on the gaps below.'});
  return blocks;
}

export function makePlan(data, settings, answers) {
  const {goal, hours, weeks, evidence, live, language} = settings;
  if (!Number.isFinite(hours) || hours < 0.5 || hours > 40 || !Number.isInteger(weeks) || weeks < 1 || weeks > 52) throw new Error('Use 0.5–40 hours per week and 1–52 whole weeks.');
  if (typeof evidence !== 'boolean' || typeof live !== 'boolean' || !['English','German'].includes(language)) throw new Error('Please complete your study preferences.');
  const scores = scoreAnswers(data, goal, answers);
  const blocks = recommend(data, goal, scores, evidence);
  const total = blocks.reduce((sum, b) => sum + b.hours, 0);
  return {settings:{goal,hours,weeks,evidence,live,language}, scores, blocks, total, capacity:hours * weeks, estimatedWeeks:Math.ceil(total / hours), feedback:questionsFor(data, goal).filter(q => answers[q.id] !== q.correct).map(q => ({id:q.id, prompt:q.prompt, explanation:q.explanation}))};
}
