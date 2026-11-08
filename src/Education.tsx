import type { Language } from './types';
import { BookOpen, GraduationCap, ArrowUpRight } from 'lucide-react';
const terms=[['1/2567','3.67','3.67'],['2/2567','3.47','3.56'],['1/2568','4.00','3.71'],['2/2568','3.78','3.73'],['1/2569','3.75','3.73'],['2/2569',null,null]];
const courses=[
 ['Computer Programming I','การเขียนโปรแกรมคอมพิวเตอร์','A'],
 ['Applied Data Structure','โครงสร้างข้อมูลประยุกต์','A'],
 ['Database System','ระบบฐานข้อมูล','A'],
 ['Object Oriented Programming','การเขียนโปรแกรมเชิงวัตถุ','A'],
 ['System Analysis and Design','การวิเคราะห์และออกแบบระบบ','A'],
 ['Data Preprocessing','การเตรียมข้อมูลก่อนวิเคราะห์','A'],
 ['Business Data Analytics','การวิเคราะห์ข้อมูลทางธุรกิจ','A'],
 ['Mobile Application Development','การพัฒนาแอปพลิเคชันมือถือ','A'],
 ['Backend Software Architecture Development','การพัฒนาสถาปัตยกรรมซอฟต์แวร์ฝั่งเซิร์ฟเวอร์','A'],
 ['Automated Software Testing','การทดสอบซอฟต์แวร์อัตโนมัติ','A'],
 ['Internet of Things','อินเทอร์เน็ตของสรรพสิ่ง','A'],
 ['Business Data Engineering','วิศวกรรมข้อมูลทางธุรกิจ','A'],
];
export default function Education({lang}:{lang:Language}){
 const th=lang==='th';
 return <section id="education" className="section container education-section">
  <div className="section-heading"><span className="eyebrow accent">{th?'การศึกษา':'EDUCATION'}</span><h2>{th?'ประวัติการศึกษาและผลการเรียน':'Education and academic results'}</h2><p>{th?'กำลังศึกษาระดับปริญญาตรี สาขาเทคโนโลยีสารสนเทศอัจฉริยะ เริ่มเข้าศึกษาในปีการศึกษา 2567 โดยนำสิ่งที่เรียนมาฝึกใช้ผ่านงานเขียนโปรแกรม ฐานข้อมูล การวิเคราะห์ข้อมูล และระบบ IoT':'I am studying for a bachelor’s degree in Intelligent Information Technology, having enrolled in academic year 2024. My projects put coursework in programming, databases, data analysis and IoT into practice.'}</p></div>
  <div className="education-grid"><div className="degree-card"><GraduationCap size={30}/><span className="eyebrow">{th?'2567 – ปัจจุบัน':'2024 – PRESENT'}</span><h3>{th?'มหาวิทยาลัยวลัยลักษณ์':'Walailak University'}</h3><p className="degree-title">{th?'วิทยาศาสตรบัณฑิต สาขาเทคโนโลยีสารสนเทศอัจฉริยะ':'Bachelor of Science in Intelligent Information Technology'}</p><p>{th?'สำนักวิชาสารสนเทศศาสตร์ · กำลังศึกษา':'School of Informatics · Currently enrolled'}</p><a href="https://informatics.wu.ac.th/bachelors-degree/intelligent-information-technology/" target="_blank" rel="noreferrer">{th?'รายละเอียดหลักสูตร':'Program information'}<ArrowUpRight size={15}/></a></div>
  <div className="academic-performance"><div className="grade-summary"><div><span>{th?'เกรดเฉลี่ยสะสม':'Cumulative GPAX'}</span><strong>3.73<small> / 4.00</small></strong></div><div><span>{th?'ภาคล่าสุดที่มีผล':'Latest graded term'}</span><strong>3.75</strong><small>{th?'ภาค 1/2569':'Term 1/2026'}</small></div><div><span>{th?'GPA สูงสุดรายภาค':'Best term GPA'}</span><strong>4.00</strong><small>{th?'ภาค 1/2568':'Term 1/2025'}</small></div></div>
  <div className="grade-table-wrap"><table><caption>{th?'ผลการเรียนรายภาค':'Term results'}</caption><thead><tr><th scope="col">{th?'ภาคการศึกษา':'Academic term'}</th><th scope="col">GPA</th><th scope="col">GPAX</th></tr></thead><tbody>{terms.map(([term,gpa,gpax])=><tr key={term}><th scope="row">{th?term:`${term!.split('/')[0]}/${Number(term!.split('/')[1])-543}`}</th><td>{gpa|| (th?'รอผล':'Pending')}</td><td>{gpax||'—'}</td></tr>)}</tbody></table></div><p className="education-note">{th?'ภาค 2/2569 ยังรอผลการเรียน':'Term 2/2026 results are pending.'}</p></div></div>
  <div className="coursework-heading"><BookOpen size={21}/><h3>{th?'รายวิชาที่เกี่ยวข้องกับผลงาน':'Relevant completed coursework'}</h3></div><div className="coursework-grid">{courses.map(([en,thai,grade])=><div className="course-item" key={en}><div><strong>{th?thai:en}</strong>{th&&<span>{en}</span>}</div><span className="course-grade" aria-label={`${en}: grade ${grade}`}>{grade}</span></div>)}</div>
 </section>
}
