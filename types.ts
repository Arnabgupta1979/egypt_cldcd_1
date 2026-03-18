
export type Language = 'ar' | 'en';

export enum DocStatus {
  IN_FORCE = 'In Force',
  DRAFT = 'Draft',
  SUPERSEDED = 'Superseded',
  REPEALED = 'Repealed'
}

export interface Document {
  id: string;
  title: { ar: string; en: string };
  type: string;
  authority: string;
  hierarchy: string;
  refNumber: string;
  issueDate: string;
  effectiveDate: string;
  language: 'Arabic' | 'English' | 'Bilingual';
  version: string;
  status: DocStatus;
  supersedesId?: string;
  latestVersionId?: string;
  tags: string[];
  summary?: string;
  content?: string; // OCR/Extracted text content
  downloadUrl?: string; // Link to actual PDF/Official source
}

export interface Variety {
  id: string;
  crop: { ar: string; en: string };
  name: { ar: string; en: string };
  status: 'Active' | 'Withdrawn' | 'Trial';
  maintainer: { ar: string; en: string };
  registrationDate: string;
  decreeLink: string;
}

export interface Authority {
  id: string;
  name: { ar: string; en: string };
  shortName: string;
  tasks: string[];
  address: { ar: string; en: string };
  email: string;
  phone: string;
  channels: string[];
  website?: string;
}
