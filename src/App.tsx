import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ArrowRight, ArrowLeft, Github, Sun, Moon, Menu, X, Search, Layers3, Radio, Braces, Database, Check, ExternalLink, Fingerprint, Workflow, FlaskConical, FileText, Network, BookOpen, ChevronRight } from 'lucide-react';
import rawProjects from './projects.json';
import screenshotData from './screenshots.json';
import { copy } from './i18n';
import type { Language, Project, ProjectImage } from './types';

const projects = rawProjects as unknown as Project[];
const images = screenshotData as Record<string, { images: ProjectImage[] }>;
const iconMap = [Layers3, Radio, Braces, Database];
const github = 'https://github.com/kanatip-k';
const categoryNames: Record<string, {en:string;th:string}> = {
  'BIM & MCP': {en:'BIM & MCP',th:'BIM และ MCP'},
  'IoT & Embedded Systems':{en:'IoT & Embedded',th:'IoT และระบบฝังตัว'},
  'Web & Mobile Applications':{en:'Web & Mobile',th:'เว็บและโมบาย'},
  'Learning & Upstream-based Projects':{en:'Learning & upstream',th:'งานเรียนและงานต่อยอด'},
};
function lines(value: unknown, lang: Language): string[] {
  if (value == null) return [];
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(x=>lines(x,lang));
  if (typeof value === 'object') {
    const v=value as Record<string,unknown>;
    if (lang in v) return lines(v[lang],lang);
    if ('detail' in v) return [`${v.name || ''}${v.status ? ` / ${v.status}` : ''}`, ...lines(v.detail,lang)];
    return Object.entries(v).filter(([k])=>!['url','kind','from','to'].includes(k)).flatMap(([k,x])=>typeof x==='string'?[`${k}: ${x}`]:lines(x,lang));
  }
  return [];
}
const first=(v:unknown,l:Language)=>lines(v,l)[0]||'';
const nameCategory=(c:string,l:Language)=>categoryNames[c]?.[l]||c;
function Architecture({project,compact=false}:{project:Project;compact?:boolean}) {
  const a=project.architecture as {nodes?:string[]}|undefined;
  const nodes=a?.nodes?.length?a.nodes:project.technologies.slice(0,4);
  return <div className={`architecture ${compact?'compact':''}`} aria-label={`Source-derived workflow: ${nodes.join(' → ')}`}>
    {nodes.slice(0,compact?4:8).map((n,i)=><div className="flow-unit" key={n}><div className="flow-node"><span>{String(i+1).padStart(2,'0')}</span>{n}</div>{i<Math.min(nodes.length,compact?4:8)-1&&<ArrowRight size={16} aria-hidden="true"/>}</div>)}
  </div>;
}
function Reveal({children,className=''}:{children:React.ReactNode;className?:string}) {
  return <motion.div className={className} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.08}} transition={{duration:.5}}>{children}</motion.div>;
}
function ProjectCard({project,lang,index=0,featured=false}:{project:Project;lang:Language;index?:number;featured?:boolean}) {
  const c=copy[lang];const image=images[project.id]?.images?.[0];
  return <article className={`project-card ${featured?'featured-card':''}`}>
    <a href={`#/projects/${project.slug}`} className={`project-visual visual-${index%4}`} aria-label={`${c.details}: ${project.title}`}>
      {image?<img src={image.src} alt={lang==='th'&&image.captionTh?image.captionTh:image.caption} loading="lazy" width="1200" height="750"/>:<Architecture project={project} compact/>}
      <span className="visual-label">{image?(image.demoData?c.demo:c.screenshot):c.architecture}</span><span className="visual-open"><ArrowUpRight size={19}/></span>
    </a>
    <div className="project-body"><div className="project-top"><span className="eyebrow">{nameCategory(project.category,lang)}</span><span className="project-number">{String(index+1).padStart(2,'0')}</span></div>
      <h3><a href={`#/projects/${project.slug}`}>{project.title}</a></h3><p>{first(project.description,lang)}</p>
      <div className="tags">{project.technologies.slice(0,5).map(t=><span key={t}>{t}</span>)}</div>
      <div className="project-bottom"><span className="status-dot">{project.isFork?'Fork / learning':project.id==='dorm'||project.id==='bim-project'?'Draft PR':lang==='th'?'ต้นแบบ / งานเรียน':'Prototype / learning'}</span><a href={`#/projects/${project.slug}`}>{c.details}<ArrowUpRight size={15}/></a></div>
    </div>
  </article>;
}
export default function App(){
  const [lang,setLang]=useState<Language>(()=>localStorage.getItem('portfolio-language')==='en'?'en':'th');
  const [theme,setTheme]=useState(()=>localStorage.getItem('portfolio-theme')||'dark');
  const [hash,setHash]=useState(location.hash);
  const [menu,setMenu]=useState(false);const [active,setActive]=useState('home');
  const [query,setQuery]=useState('');const [category,setCategory]=useState('all');const [tech,setTech]=useState('all');
  const [live,setLive]=useState(false);const [lightbox,setLightbox]=useState<ProjectImage|null>(null);const dialog=useRef<HTMLDialogElement>(null);
  const c=copy[lang];const route=hash.startsWith('#/projects/')?decodeURIComponent(hash.slice(11)):null;
  const project=route?projects.find(p=>p.slug===route):undefined;
  const unknown=(hash.startsWith('#/')&&!project&&hash!=='#/')||(location.pathname!=='/'&&location.pathname!=='/index.html');
  useEffect(()=>{const fn=()=>{setHash(location.hash);setMenu(false);if(location.hash.startsWith('#/'))window.scrollTo({top:0,behavior:'instant'});else if(location.hash)requestAnimationFrame(()=>requestAnimationFrame(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView({behavior:'smooth'})));};addEventListener('hashchange',fn);return()=>removeEventListener('hashchange',fn)},[]);
  useEffect(()=>{const close=(e:KeyboardEvent)=>{if(e.key==='Escape')setMenu(false)};addEventListener('keydown',close);return()=>removeEventListener('keydown',close)},[]);
  useEffect(()=>{document.documentElement.lang=lang;localStorage.setItem('portfolio-language',lang)},[lang]);
  useEffect(()=>{document.documentElement.dataset.theme=theme;localStorage.setItem('portfolio-theme',theme);document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='dark'?'#101411':'#f7f8f2')},[theme]);
  useEffect(()=>{document.title=project?`${project.title} — Kanatip Kanjanakarn`:'Kanatip Kanjanakarn — Software Portfolio';const desc=project?first(project.description,lang):'Kanatip Kanjanakarn — source-backed software projects in BIM, MCP, IoT, web and mobile development.';document.querySelector('meta[name="description"]')?.setAttribute('content',desc)},[project,lang]);
  useEffect(()=>{if(project||unknown)return;const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)setActive(entry.target.id)},{rootMargin:'-20% 0px -65% 0px'});document.querySelectorAll('section[id]').forEach(x=>observer.observe(x));return()=>observer.disconnect()},[project,unknown]);
  useEffect(()=>{const recent=Number(localStorage.getItem('portfolio-github-checked')||0);if(Date.now()-recent<600000){setLive(true);return;}const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),8000);fetch('https://api.github.com/users/kanatip-k/repos?per_page=100',{signal:controller.signal}).then(r=>r.ok?r.json():Promise.reject()).then(data=>{if(Array.isArray(data)){setLive(true);localStorage.setItem('portfolio-github-checked',String(Date.now()))}}).catch(()=>{}).finally(()=>clearTimeout(timeout));return()=>{controller.abort();clearTimeout(timeout)}},[]);
  useEffect(()=>{if(lightbox)dialog.current?.showModal();else dialog.current?.close()},[lightbox]);
  const nav=[['work',c.work],['about',c.about],['skills',c.skills],['approach',c.approach],['contact',c.contact]];
  const gallery=project?images[project.id]?.images||[]:[];
  const featured=projects.filter(p=>p.featured).sort((a,b)=>Number(a.featuredOrder||99)-Number(b.featuredOrder||99)).slice(0,6);
  const categories=[...new Set(projects.map(p=>p.category))];const technologies=[...new Set(projects.flatMap(p=>p.technologies))].sort();
  const filtered=projects.filter(p=>(category==='all'||p.category===category)&&(tech==='all'||p.technologies.includes(tech))&&`${p.title} ${first(p.description,lang)} ${p.technologies.join(' ')}`.toLowerCase().includes(query.toLowerCase()));
  const section=(kicker:string,title:string,intro?:string)=><div className="section-heading"><span className="eyebrow accent">{kicker}</span><h2>{title}</h2>{intro&&<p>{intro}</p>}</div>;
  const content=(key:string,title:string,icon:React.ReactNode,value?:unknown)=><section className="case-block" id={key}><h2>{icon}{title}</h2>{lines(value??project?.[key],lang).length?lines(value??project?.[key],lang).map((text,i)=><p key={i}>{text}</p>):<p>{c.notVerified}</p>}</section>;
  return <><a className="skip-link" href="#main" onClick={e=>{e.preventDefault();document.getElementById('main')?.focus()}}>{c.skip}</a><header className="site-header"><div className="header-inner"><a className="brand" href="#home" aria-label="Kanatip — home"><span className="brand-mark">k<span>.</span></span><span>kanatip<span className="brand-suffix"> / portfolio</span></span></a>
    <nav id="main-navigation" aria-label={lang==='th'?'เมนูหลัก':'Main navigation'} className={menu?'navigation open':'navigation'}>{nav.map(([id,label])=><a className={active===id&&!project?'active':''} key={id} href={`#${id}`} onClick={()=>setMenu(false)}>{label}</a>)}</nav>
    <div className="header-actions"><button className="language-toggle" aria-label={lang==='th'?'Switch to English':'เปลี่ยนเป็นภาษาไทย'} onClick={()=>setLang(lang==='th'?'en':'th')}><span className={lang==='th'?'chosen':''}>TH</span><span className="divider">/</span><span className={lang==='en'?'chosen':''}>EN</span></button><button className="icon-button" aria-label={c.theme} onClick={()=>setTheme(theme==='dark'?'light':'dark')}>{theme==='dark'?<Sun size={18}/>:<Moon size={18}/>}</button><button className="icon-button mobile-menu" aria-label={menu?c.hideMenu:c.menu} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X size={21}/>:<Menu size={21}/>}</button></div></div></header>
    <main id="main" tabIndex={-1}>{unknown?<section className="not-found container"><span className="eyebrow">404 / NOT FOUND</span><h1>{c.notFound}</h1><a className="button primary" href="#home">{c.home}<ArrowRight size={18}/></a></section>:project?<>
      <div className="case-hero container"><a href="#work" className="back-link"><ArrowLeft size={16}/>{c.back}</a><div className="case-heading"><div><span className="eyebrow accent">{c.caseStudy} / {nameCategory(project.category,lang)}</span><h1>{project.title}</h1><p>{first(project.overview,lang)||first(project.description,lang)}</p><div className="tags">{project.technologies.map(t=><span key={t}>{t}</span>)}</div></div><a className="button secondary" href={project.githubUrl} target="_blank" rel="noreferrer">{c.source}<Github size={18}/></a></div></div>
      <div className="case-layout container"><aside className="case-nav"><span className="eyebrow">IN THIS CASE STUDY</span>{[['overview',c.overview],['workflow',c.workflow],['features',c.features],['gallery',c.gallery],['implementation',c.implementation],['tests',c.testing],['limitations',c.limitations],['evidence',c.evidence]].map(([id,label])=><a key={id} href={`#${id}`} onClick={e=>{e.preventDefault();document.getElementById(id)?.scrollIntoView({behavior:'smooth'})}}>{label}<ChevronRight size={13}/></a>)}</aside><article className="case-content">
      {content('overview',c.overview,<BookOpen size={21}/>)}{content('problem',c.problem,<Fingerprint size={21}/>)}{content('objectives',c.objectives,<ArrowUpRight size={21}/>)}
      <section className="case-block" id="workflow"><h2><Workflow size={21}/>{c.workflow}</h2><Architecture project={project}/><p className="caption">{first((project.architecture as {label?:unknown})?.label,lang)||c.architecture}</p></section>
      {content('features',c.features,<Layers3 size={21}/>)}{content('development',c.development,<Braces size={21}/>)}
      <section className="case-block" id="gallery"><h2><Layers3 size={21}/>{c.gallery}</h2>{gallery.length?<div className="screenshot-gallery">{gallery.map((im,i)=><figure key={im.src}><button onClick={()=>setLightbox(im)} aria-label={`${c.screenshot} ${i+1}`}><img src={im.src} alt={lang==='th'&&im.captionTh?im.captionTh:im.caption} loading="lazy"/></button><figcaption>{im.demoData&&<span className="demo-label">{c.demo}</span>}{lang==='th'&&im.captionTh?im.captionTh:im.caption}</figcaption></figure>)}</div>:<div className="no-capture"><FileText size={25}/><p>{c.missingImage}</p><a href={project.githubUrl} target="_blank" rel="noreferrer">{c.source}<ArrowUpRight size={15}/></a></div>}</section>
      {content('implementation',c.implementation,<Braces size={21}/>)}{lines(project.api,lang).length>0&&<div className="api-list">{lines(project.api,lang).map((x,i)=><code key={i}>{x}</code>)}</div>}{content('database',lang==='th'?'ข้อมูลและฐานข้อมูล':'Data & storage',<Database size={21}/>)}
      {content('tests',c.testing,<FlaskConical size={21}/>)}{content('challenges',c.challenges,<Network size={21}/>)}{content('results',c.results,<Check size={21}/>)}{content('limitations',c.limitations,<Fingerprint size={21}/>)}{content('future',c.future,<ArrowUpRight size={21}/>)}{content('contributions',c.contributions,<Github size={21}/>)}
      <section className="case-block" id="evidence"><h2><FileText size={21}/>{c.evidence}</h2><ul className="evidence-list">{(Array.isArray(project.evidence)?project.evidence:[]).map((e:{path?:string;url?:string},i:number)=><li key={i}><a href={e.url||project.githubUrl} target="_blank" rel="noreferrer">{e.path||'Repository'}<ExternalLink size={14}/></a></li>)}</ul><a className="button primary" href={project.githubUrl} target="_blank" rel="noreferrer">{c.source}<Github size={17}/></a></section></article></div>
    </>:<>
      <section id="home" className="hero container"><div className="hero-copy"><div className="hero-eyebrow"><span className="live-dot"/><span>{c.eyebrow}</span></div><p className="hero-name">Kanatip Kanjanakarn</p><h1>{c.hero1}<br/><span>{c.hero2}</span></h1><p className="hero-intro">{c.intro}</p><div className="hero-buttons"><a className="button primary" href="#work">{c.projects}<ArrowDownIcon/></a><a className="button secondary" href={github} target="_blank" rel="noreferrer"><Github size={17}/>{c.github}<ArrowUpRight size={16}/></a></div><p className="hero-note"><Check size={14}/>{c.heroNote}</p></div>
      <div className="hero-system"><div className="system-top"><span><span className="live-dot"/>SYSTEM EXPLORER</span><span>01—03</span></div><div className="system-orbit" aria-hidden="true"><div className="orbit one"/><div className="orbit two"/><div className="orbit-core"><Network size={43}/><span>connect</span></div><div className="orbit-point point-one"><Layers3 size={19}/><span>BIM DATA</span></div><div className="orbit-point point-two"><Radio size={19}/><span>DEVICES</span></div><div className="orbit-point point-three"><Braces size={19}/><span>SOFTWARE</span></div></div><div className="system-focus"><span className="eyebrow">{c.focus}</span><div>{[c.focus1,c.focus2,c.focus3].map((f,i)=><span key={f}><small>0{i+1}</small>{f}<ArrowUpRight size={14}/></span>)}</div></div><span className="system-caption">SOURCE → LOGIC → INTERFACE</span></div>
      <div className="hero-foot"><span>PYTHON / TYPESCRIPT / C# / REACT</span><a href="#work">SCROLL TO EXPLORE <ArrowDownIcon/></a></div></section>
      <section id="work" className="section container"><Reveal>{section(c.selectedKicker,c.selectedTitle,c.selectedIntro)}</Reveal><div className="featured-grid">{featured.map((p,i)=><Reveal key={p.id}><ProjectCard project={p} index={i} lang={lang} featured/></Reveal>)}</div></section>
      <section id="projects" className="section directory-section"><div className="container"><Reveal>{section(c.directoryKicker,c.directoryTitle,c.directoryIntro)}</Reveal><div className="filter-bar"><label className="search-field"><Search size={18}/><span className="sr-only">{c.search}</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={c.search}/></label><label className="technology-filter"><span className="sr-only">{c.allTech}</span><select value={tech} onChange={e=>setTech(e.target.value)}><option value="all">{c.allTech}</option>{technologies.map(t=><option key={t}>{t}</option>)}</select></label></div><div className="category-bar"><div><button className={category==='all'?'selected':''} onClick={()=>setCategory('all')}>{c.all}</button>{categories.map(cat=><button key={cat} className={category===cat?'selected':''} onClick={()=>setCategory(cat)}>{nameCategory(cat,lang)}</button>)}</div><span aria-live="polite">{filtered.length} {c.matches}</span></div>
      <div className="directory-grid">{filtered.map((p,i)=><ProjectCard key={p.id} project={p} index={i} lang={lang}/>)}</div>{!filtered.length&&<div className="empty-state"><Search size={26}/><p>{c.noResults}</p><button className="button secondary" onClick={()=>{setQuery('');setCategory('all');setTech('all')}}>{c.reset}</button></div>}<p className="catalog-note"><span className="live-dot"/>{c.updated} · {live?c.refreshed:c.cached} · <a href={github+'?tab=repositories'} target="_blank" rel="noreferrer">GitHub<ArrowUpRight size={12}/></a></p></div></section>
      <section id="about" className="section container about-section"><Reveal><div className="portrait-panel"><img src="https://avatars.githubusercontent.com/u/188536489?v=4" alt="Kanatip Kanjanakarn — GitHub avatar" width="340" height="340" loading="lazy"/><div><span className="eyebrow accent">BEHIND THE PROJECTS</span><h3>Kanatip<br/>Kanjanakarn<span>.</span></h3><a href={github} target="_blank" rel="noreferrer">@kanatip-k<ArrowUpRight size={15}/></a></div></div></Reveal><Reveal><div>{section(c.aboutKicker,c.aboutTitle)}<p className="large-copy">{c.aboutText}</p><p>{c.aboutSecond}</p><div className="proof-list">{[c.proof1,c.proof2,c.proof3].map(t=><span key={t}><Check size={16}/>{t}</span>)}</div><div className="academic-note"><BookOpen size={22}/><div><h3>{c.academic}</h3><p>{c.academicText}</p><a href="#projects">{c.work}<ArrowUpRight size={14}/></a></div></div></div></Reveal></section>
      <section id="skills" className="section container"><Reveal>{section(c.skillsKicker,c.skillsTitle,c.skillsIntro)}</Reveal><div className="skill-grid">{[
        {name:lang==='th'?'BIM และเครื่องมือ AI':'BIM & AI tooling',tags:['Python','C# / .NET','MCP','Navisworks','Qdrant','RAG'],project:'foundation-ontology-mcp',label:'Foundation Ontology MCP'},
        {name:lang==='th'?'IoT และข้อมูล':'IoT & data pipelines',tags:['ESP32 / ESP8266','Arduino','MQTT','MongoDB','Docker'],project:'landslide-iot-monitor',label:'Landslide IoT Monitor'},
        {name:lang==='th'?'เว็บและโมบาย':'Web & mobile',tags:['React','TypeScript','Vite','Express','FastAPI','React Native','Expo'],project:'emoji-tarot',label:'Emoji Tarot'},
        {name:lang==='th'?'การตรวจสอบและเครื่องมือ':'Validation & workflow',tags:['pytest','TypeScript checks','API smoke tests','Git','Compose'],project:'python-docker-dashboard',label:'Python Docker Dashboard'},
      ].map((s,i)=>{const Icon=iconMap[i];return <Reveal key={s.name} className="skill-card"><div className="skill-icon"><Icon size={22}/></div><span className="eyebrow">0{i+1}</span><h3>{s.name}</h3><div className="tags">{s.tags.map(t=><span key={t}>{t}</span>)}</div><a href={`#/projects/${s.project}`}>{s.label}<ArrowUpRight size={14}/></a></Reveal>})}</div></section>
      <section id="approach" className="section approach-section"><div className="container"><Reveal>{section(c.approachKicker,c.approachTitle)}</Reveal><div className="approach-grid">{c.approachSteps.map((s,i)=><Reveal key={s} className="approach-step"><span className="step-number">0{i+1}</span><h3>{s}</h3><p>{c.approachDescriptions[i]}</p></Reveal>)}</div></div></section>
      <section id="resume" className="resume-section container"><div className="resume-icon"><FileText size={31}/></div><div><span className="eyebrow accent">{c.resume}</span><h2>{c.resumeTitle}</h2><p>{c.resumeText}</p></div><a className="button secondary" href="#projects">{c.resumeLink}<ArrowUpRight size={17}/></a></section>
      <section id="contact" className="section container contact-section"><span className="eyebrow accent">{c.contactKicker}</span><h2>{c.contactTitle}</h2><p>{c.contactText}</p><a className="button primary" href={github} target="_blank" rel="noreferrer">{c.contactButton}<ArrowUpRight size={20}/></a><a className="contact-handle" href={github}>github.com/kanatip-k</a></section>
    </>}</main><footer className="site-footer container"><a className="brand" href="#home"><span className="brand-mark">k<span>.</span></span><span>Kanatip Kanjanakarn</span></a><p>{c.footer}</p><span>© {new Date().getFullYear()}</span></footer>
    <dialog ref={dialog} className="image-dialog" onCancel={()=>setLightbox(null)} onClick={e=>{if(e.target===dialog.current)setLightbox(null)}}><button className="dialog-close icon-button" aria-label={c.close} onClick={()=>setLightbox(null)}><X size={22}/></button>{lightbox&&<figure><img src={lightbox.src} alt={lang==='th'&&lightbox.captionTh?lightbox.captionTh:lightbox.caption}/><figcaption>{lightbox.demoData&&`${c.demo} · `}{lang==='th'&&lightbox.captionTh?lightbox.captionTh:lightbox.caption}</figcaption></figure>}</dialog>
  </>;
}
function ArrowDownIcon(){return <ArrowRight className="down-arrow" size={17}/>}
