
import { Document, DocStatus, Variety, Authority } from './types';

export const MOCK_DOCS: Document[] = [
  {
    id: 'law-53-1966',
    title: { ar: 'قانون الزراعة رقم 53 لسنة 1966', en: 'Agriculture Law No. 53 of 1966' },
    type: 'Law',
    authority: 'MALR',
    hierarchy: 'Primary Legislation',
    refNumber: '53/1966',
    issueDate: '1966-01-01',
    effectiveDate: '1966-01-01',
    language: 'Arabic',
    version: 'Amended',
    status: DocStatus.IN_FORCE,
    tags: ['Basic Law', 'Seed Control', 'Trade'],
    downloadUrl: 'https://faolex.fao.org/docs/pdf/egy159678E.pdf', // Example placeholder from FAOLEX
    content: "The foundation of today’s framework is the comprehensive Agriculture Law No. 53 of 1966 (as amended). This law consolidates seed sector regulation under the Ministry of Agriculture and Land Reclamation (MALR)."
  },
  {
    id: 'law-82-2002',
    title: { ar: 'قانون حماية حقوق الملكية الفكرية رقم 82 لسنة 2002', en: 'Intellectual Property Rights Protection Law No. 82 of 2002' },
    type: 'Law',
    authority: 'MALR / PVPO',
    hierarchy: 'Primary Legislation',
    refNumber: '82/2002',
    issueDate: '2002-06-03',
    effectiveDate: '2002-06-03',
    language: 'Arabic',
    version: '1.0',
    status: DocStatus.IN_FORCE,
    tags: ['PVP', 'Breeders Rights', 'IPR'],
    downloadUrl: 'https://www.wipo.int/wipolex/en/legislation/details/7783'
  },
  {
    id: 'res-562-2019',
    title: { ar: 'قرار وزاري رقم 562 لسنة 2019 بشأن الحجر الزراعي', en: 'Ministerial Resolution No. 562 of 2019 (Plant Quarantine)' },
    type: 'Resolution',
    authority: 'CAPQ',
    hierarchy: 'Ministerial',
    refNumber: '562/2019',
    issueDate: '2019-11-01',
    effectiveDate: '2019-11-01',
    language: 'Arabic',
    version: 'Current',
    status: DocStatus.IN_FORCE,
    tags: ['Quarantine', 'Import', 'Phytosanitary'],
    downloadUrl: 'https://www.scribd.com/document/493765071/eg3-2019-562pqreg-en',
    supersedesId: 'dec-3007-2001'
  },
  {
    id: 'dec-1485-2015',
    title: { ar: 'قرار وزاري رقم 1485 لسنة 2015 بشأن استيراد تقاوي البطاطس', en: 'Ministerial Decree No. 1485 of 2015 (Potato Seed Import)' },
    type: 'Decree',
    authority: 'MALR',
    hierarchy: 'Ministerial',
    refNumber: '1485/2015',
    issueDate: '2015-09-20',
    effectiveDate: '2015-09-20',
    language: 'Arabic',
    version: 'Seasonal',
    status: DocStatus.IN_FORCE,
    tags: ['Potato', 'Import Timings', 'Standards'],
    downloadUrl: 'https://faolex.fao.org/docs/pdf/egy159678E.pdf',
    content: "Regulations on seed potato import timings and conditions are periodically updated, such as Decree 1485/2015, mandating specific grades (Elite or EU EEC2) and arrival windows."
  },
  {
    id: 'dec-808-2005',
    title: { ar: 'قرار وزاري رقم 808 لسنة 2005 بشأن إعادة هيكلة مكتب الحماية', en: 'Ministerial Decree No. 808 of 2005 (PVPO Restructuring)' },
    type: 'Decree',
    authority: 'MALR',
    hierarchy: 'Ministerial',
    refNumber: '808/2005',
    issueDate: '2005-01-01',
    effectiveDate: '2005-01-01',
    language: 'Arabic',
    version: '1.0',
    status: DocStatus.IN_FORCE,
    tags: ['PVP', 'PVPO', 'Organization'],
    downloadUrl: 'https://faolex.fao.org/docs/pdf/egy123464.pdf'
  },
  {
    id: 'dec-3007-2001',
    title: { ar: 'قرار وزاري رقم 3007 لسنة 2001', en: 'Ministerial Decree No. 3007 of 2001' },
    type: 'Decree',
    authority: 'CAPQ',
    hierarchy: 'Ministerial',
    refNumber: '3007/2001',
    issueDate: '2001-05-10',
    effectiveDate: '2001-05-10',
    language: 'Arabic',
    version: '1.0',
    status: DocStatus.SUPERSEDED,
    latestVersionId: 'res-562-2019',
    tags: ['Quarantine'],
    downloadUrl: 'https://faolex.fao.org/docs/pdf/egy035471E.pdf'
  }
];

export const MOCK_VARIETIES: Variety[] = [
  { 
    id: 'v1', 
    crop: { ar: 'قمح', en: 'Wheat' }, 
    name: { ar: 'مصر 3', en: 'Misr 3' }, 
    status: 'Active', 
    maintainer: { ar: 'مركز البحوث الزراعية', en: 'ARC' },
    registrationDate: '2020-01-01',
    decreeLink: 'law-53-1966' 
  },
  { 
    id: 'v2', 
    crop: { ar: 'قمح', en: 'Wheat' }, 
    name: { ar: 'سخا 95', en: 'Sakha 95' }, 
    status: 'Active', 
    maintainer: { ar: 'معهد بحوث المحاصيل الحقلية', en: 'Field Crops Research Institute' },
    registrationDate: '2021-05-15',
    decreeLink: 'law-53-1966' 
  },
  { 
    id: 'v3', 
    crop: { ar: 'ذرة', en: 'Corn' }, 
    name: { ar: 'هجين 178', en: 'Hybrid 178' }, 
    status: 'Active', 
    maintainer: { ar: 'قطاع الإنتاج', en: 'Production Sector' },
    registrationDate: '2019-03-20',
    decreeLink: 'law-53-1966' 
  },
  { 
    id: 'v4', 
    crop: { ar: 'بطاطس', en: 'Potato' }, 
    name: { ar: 'سبونتا', en: 'Spunta' }, 
    status: 'Active', 
    maintainer: { ar: 'أصناف مسجلة - استيراد', en: 'Registered Variety - Imported' },
    registrationDate: '2015-10-10',
    decreeLink: 'dec-1485-2015' 
  }
];

export const MOCK_AUTHORITIES: Authority[] = [
  {
    id: 'casc',
    name: { ar: 'الإدارة المركزية لفحص واعتماد التقاوي (CASC)', en: 'Central Administration for Seed Certification (CASC)' },
    shortName: 'CASC',
    tasks: ['Variety Registration', 'Seed Certification', 'Licensing Seed Dealers'],
    address: { ar: 'مبنى وزارة الزراعة، الجيزة، مصر', en: 'Ministry of Agriculture Bldg, Giza, Egypt' },
    email: 'info@casc.gov.eg',
    phone: '+20 2 35720831',
    channels: ['Physical Submission', 'Official Portal']
  },
  {
    id: 'capq',
    name: { ar: 'الإدارة المركزية للحجر الزراعي (CAPQ)', en: 'Central Administration of Plant Quarantine (CAPQ)' },
    shortName: 'CAPQ',
    tasks: ['Phytosanitary Certificates', 'Import Permits', 'Quarantine Inspection'],
    address: { ar: '1 شارع نادي الصيد، الدقي، الجيزة', en: '1 Nadi El Seid St, Dokki, Giza' },
    email: 'contact@capq.gov.eg',
    phone: '+20 2 33351625',
    channels: ['ePhyto Portal', 'Physical Submission'],
    website: 'https://www.capq.gov.eg'
  },
  {
    id: 'pvpo',
    name: { ar: 'مكتب حماية الأصناف النباتية (PVPO)', en: 'Plant Variety Protection Office (PVPO)' },
    shortName: 'PVPO',
    tasks: ['PVP Applications', 'Breeder Rights Registration'],
    address: { ar: 'داخل مقر CASC، الجيزة', en: 'Within CASC HQ, Giza' },
    email: 'pvp.office@casc.gov.eg',
    phone: '+20 2 35720831',
    channels: ['Physical Submission']
  },
  {
    id: 'ngb',
    name: { ar: 'البنك القومي للجينات (NGB)', en: 'National Gene Bank (NGB)' },
    shortName: 'NGB',
    tasks: ['PGR Conservation', 'Germplasm Exchange'],
    address: { ar: 'مركز البحوث الزراعية، الجيزة', en: 'Agricultural Research Center, Giza' },
    email: 'ngb.egypt@arc.sci.eg',
    phone: '+20 2 35720831',
    channels: ['Material Transfer Agreements']
  }
];
