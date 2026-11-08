import { CalendarDays } from 'lucide-react';
import type { Language, Project } from './types';
export default function ProjectDates({project,lang,detail=false}:{project:Project;lang:Language;detail?:boolean}) {
 const dates=project.dateInfo;if(!dates)return null;
 const formatter=new Intl.DateTimeFormat(lang==='th'?'th-TH':'en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'});
 const format=(date:string)=>formatter.format(new Date(date+'T00:00:00Z'));
 const label=lang==='th'?'วันที่':'Date';
 return <div className={detail?'project-date-detail':'project-date'}><div className="project-date-line"><CalendarDays size={16} aria-hidden="true"/><span>{label}: <time dateTime={dates.from}>{format(dates.from)}</time>{dates.to!==dates.from&&<> – <time dateTime={dates.to}>{format(dates.to)}</time></>}</span></div>{detail&&<p>{dates.basis==='git-history'?(lang==='th'?'วันที่อ้างอิงจากประวัติ Git ของงาน':'Dates from the project’s Git history.'):(lang==='th'?'วันที่อ้างอิงจากไฟล์งานที่เก็บไว้':'Dates from the saved project files.')}</p>}</div>;
}
