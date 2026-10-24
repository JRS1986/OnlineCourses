import {stepKey, pathSignature} from './progress.js';

export const pathComplete = (path,state) => path.steps.length>0 && path.steps.every(step=>state.completedSteps[stepKey(path,step)]) && state.completedPaths?.[path.id]===pathSignature(path);
export function earnedBadges(data,state){
  const badges=[];
  const completed=data.courses.filter(c=>state.completedCourses[c.id]);
  for(const [count,id,title] of [[1,'first-finish','First finish'],[5,'momentum','Building momentum'],[10,'ten-finishes','Ten down']]){
    if(completed.length>=count)badges.push({id:`milestone:${id}`,type:'milestone',title,detail:`${count} ${count===1?'resource':'resources'} completed`,glyph:'✦',href:'#progress'});
  }
  for(const c of completed)badges.push({id:`course:${c.id}`,type:'course',title:c.title,detail:`${c.id} · ${c.type==='Reading'?'Reading':'Resource'} complete`,glyph:'✓',href:`#courses/${c.id}`});
  for(const path of data.paths)if(pathComplete(path,state))badges.push({id:`path:${path.id}`,type:'path',title:path.title,detail:`${path.id} · Path finished`,glyph:'◆',href:`#paths/${path.id}?step=exit`});
  return badges;
}
