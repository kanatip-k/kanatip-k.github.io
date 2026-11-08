export type Language = 'en' | 'th';
export interface Project {
  dateInfo?: {from:string;to:string;basis:'git-history'|'source-file-dates'|'archive-file-dates'};
  id: string; slug: string; title: string; category: string; technologies: string[];
  description: unknown; overview: unknown; problem: unknown; objectives: unknown;
  features: unknown; development: unknown; challenges: unknown; results: unknown;
  limitations: unknown; future: unknown; contributions: unknown; architecture: unknown;
  tests: unknown; api: unknown; database: unknown; evidence: unknown;
  githubUrl: string; demoUrl?: string; featured: boolean; status?: unknown;
  [key: string]: unknown;
}
export interface ProjectImage { src: string; caption: string; captionTh?: string; demoData: boolean; }
