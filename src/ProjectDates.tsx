import { CalendarDays } from 'lucide-react';
import type { Language, Project } from './types';
export default function ProjectDates({project,lang,detail=false}:{project:Project;lang:Language;detail?:boolean}) {
 const dates=project.dateInfo;if(!dates)return null;
 const formatter=new Intl.DateTimeFormat(lang==='th'?'th-TH':'en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'});
 const format=(date:string)=>formatter.format(new Date(date+'T00:00:00Z'));
 const label=dates.basis==='git-history'?(lang==='th'?'วันที่ในประวัติโค้ด':'Code history dates'):(lang==='th'?'วันที่ในไฟล์ต้นฉบับ':'Original file dates');
 return <div className={detail?'project-date-detail':'project-date'}><div className="project-date-line"><CalendarDays size={16} aria-hidden="true"/><span>{label}: <time dateTime={dates.from}>{format(dates.from)}</time>{dates.to!==dates.from&&<> – <time dateTime={dates.to}>{format(dates.to)}</time></>}</span></div>{detail&&<p>{dates.basis==='git-history'?(lang==='th'?'อ้างอิงวันที่บันทึกใน Git ของโปรเจกต์ต้นฉบับ ซึ่งอาจรวมประวัติจากงานต้นทาง':'Based on commits in the original project Git history, which may include upstream work.'):(lang==='th'?'อ้างอิงวันที่แก้ไขไฟล์โค้ดในชุดต้นฉบับที่เก็บไว้ในเครื่อง':'Based on source-code modification dates in the original local files.')}{' '}{lang==='th'?'เป็นช่วงวันที่ที่พบในข้อมูล ไม่ใช่วันเริ่มและวันเสร็จของงานที่ยืนยันแล้ว':'These are observed dates, rather than confirmed project start and completion dates.'}</p>}</div>;
}
