
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  Search,
  FileText,
  MapPin,
  Globe,
  BookOpen,
  ArrowRight,
  Info,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  User,
  Mail,
  Home,
  Download,
  ExternalLink,
  ChevronLeft,
  Building,
  Phone,
  Clock,
  Shield,
  Award,
  Users,
  Target,
  Layers,
  Star,
  Megaphone,
  FlaskConical,
  ListOrdered,
  Compass
} from 'lucide-react';
import { Language, Document, DocStatus, Variety, Authority, Stakeholder, JourneyNode, JourneyResult } from './types';
import { MOCK_DOCS, MOCK_VARIETIES, MOCK_AUTHORITIES, STAKEHOLDERS, JOURNEY_NODES } from './constants';
import { VARIETY_DATA, VARIETY_CATEGORIES, getCropsForCategory, VarietyRecord } from './varietyData';
import { getDocumentSummary } from './geminiService';

// --- Components ---

// Top announcement / identity strip
const TopBanner: React.FC<{ lang: Language; setActiveTab: (t: string) => void }> = ({ lang, setActiveTab }) => {
  const isAr = lang === 'ar';
  return (
    <div className="bg-amber-100 text-[#2D4A32] text-xs py-2.5 px-4 border-b border-amber-100">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="font-medium text-[#2D4A32] px-2.5 py-0.5 text-[10px] uppercase border border-amber-100/90 ring-1 ring-amber-100/40 ring-offset-1 ring-offset-amber-50">
            {isAr ? 'رسمي' : 'Official'}
          </span>
          <span className="tracking-wide">
            {isAr
              ? 'البوابة الرسمية للإدارة المركزية لتصديق التقاوي — وزارة الزراعة واستصلاح الأراضي، جمهورية مصر العربية'
              : 'Official Portal of CASC — Central Administration for Seed Testing and Certification | Ministry of Agriculture & Land Reclamation, Egypt'}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-[#2D4A32]">
            <Mail className="w-3 h-3 text-[#2D4A32]" />
            casc.egypt@hotmail.com
          </span>
          <span className="w-px h-3.5 bg-[#2D4A32]/30" />
          <button
            onClick={() => setActiveTab('login')}
            className="flex items-center gap-1.5 text-[#2D4A32] hover:text-orange-700 font-semibold uppercase tracking-wide transition-colors"
          >
            <User className="w-3 h-3 shrink-0" />
            {isAr ? 'دخول' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

const Navbar: React.FC<{ 
  lang: Language, 
  setLang: (l: Language) => void,
  activeTab: string,
  setActiveTab: (t: string) => void
}> = ({ lang, setLang, activeTab, setActiveTab }) => {
  const isAr = lang === 'ar';
  
  const navItems = [
    { id: 'home', label: isAr ? 'الرئيسية' : 'Home', icon: Home },
    { id: 'about', label: isAr ? 'عن CASC' : 'About CASC', icon: Info },
    { id: 'services', label: isAr ? 'خدمات CASC' : 'CASC Services', icon: Layers },
    { id: 'library', label: isAr ? 'المكتبة' : 'Library', icon: FileText },
    { id: 'catalogue', label: isAr ? 'القائمة الوطنية للأصناف' : 'National Variety List', icon: BookOpen },
    { id: 'directory', label: isAr ? 'الدليل' : 'Directory', icon: MapPin },
    { id: 'contact', label: isAr ? 'تواصل' : 'Contact', icon: Mail },
  ];

  return (
    <nav className="text-white sticky top-0 z-50 shadow-lg border-b border-[#1d5c1d]/60" style={{backgroundColor: '#2D6B2D'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-[72px] gap-3">
          {/* LEFT: language toggle + logo — always shrink-0 */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setLang(isAr ? 'en' : 'ar')}
              className="flex items-center gap-1.5 bg-emerald-950/40 hover:bg-emerald-800 px-2.5 py-1.5 rounded-sm border border-emerald-700 hover:border-orange-400/50 transition-all"
            >
              <Globe className="w-4 h-4 shrink-0" />
              <span className="text-xs font-semibold tracking-wide font-sans">{isAr ? 'ENGLISH' : 'ARABIC'}</span>
            </button>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <img
                src={`${import.meta.env.BASE_URL}CASC-logo.png`}
                alt={isAr ? 'شعار الإدارة المركزية لتصديق التقاوي' : 'CASC logo'}
                className="h-12 w-auto bg-white rounded-md p-1 shadow-sm ring-1 ring-orange-500/40"
              />
              <div className="hidden lg:block ps-2 border-s border-emerald-800/70">
                <div className="font-semibold text-base leading-tight text-white whitespace-nowrap">
                  {isAr ? 'الإدارة المركزية لتصديق التقاوي' : 'CASC Egypt'}
                </div>
                <div className="text-amber-100 text-[10px] font-medium uppercase leading-tight mt-0.5 whitespace-nowrap">
                  {isAr ? 'وزارة الزراعة واستصلاح الأراضي' : 'Ministry of Agriculture & Land Reclamation'}
                </div>
              </div>
            </div>
          </div>

          {/* CENTRE: nav items — flex-1, allow wrapping/overflow hidden, never pushes right zone */}
          <div className="hidden md:flex flex-1 items-center justify-center overflow-hidden">
            <div className="flex items-baseline gap-0.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-2.5 py-2 text-sm font-medium transition-all flex items-center gap-1.5 border-b-2 whitespace-nowrap ${
                    activeTab === item.id
                      ? 'border-orange-400 text-white'
                      : 'border-transparent text-white hover:text-orange-200 hover:border-orange-400/40'
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5 shrink-0" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>


        </div>
      </div>
    </nav>
  );
};

// --- View: Home ---
const HomeView: React.FC<{ lang: Language, onStartJourney: () => void, onGoAbout: () => void, onGoLibrary: () => void, onGoCatalogue: () => void, onGoDirectory: () => void }> = ({ lang, onStartJourney, onGoAbout, onGoLibrary, onGoCatalogue, onGoDirectory }) => {
  const isAr = lang === 'ar';
  return (
    <div className="animate-fade-in">

      {/* Announcement Strip */}
      <div className="bg-amber-100 border-y border-amber-100/70 py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <Megaphone className="w-4 h-4 text-emerald-700 shrink-0" />
          <p className="text-xs text-emerald-700 font-semibold tracking-wide">
            {isAr
              ? 'إشعار: يُحدَّد موعد تقديم طلبات استيراد تقاوي البطاطس للموسم سنوياً من لجنة تقاوي الحاصلات الزراعية ويُنشر في الجريدة الرسمية. يرجى تأكيد موعد الموسم الحالي مع CAPQ/CASC واستيفاء جميع متطلبات الحجر الزراعي.'
              : 'Notice: The deadline for potato seed import applications is set annually by the Agricultural Crop Seeds Committee and published in the Official Gazette. Confirm the current season\'s date with CAPQ/CASC and ensure all phytosanitary requirements are met.'}
          </p>
        </div>
      </div>

      {/* Hero — image background with overlay */}
      <header className="relative overflow-hidden text-white border-b border-amber-100/50" 
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}egypt-field-workers.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: '620px',
        }}>
        {/* Dark gradient overlay — heavier for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/85 via-emerald-950/80 to-emerald-950/90"></div>
        
        {/* Decorative arabesque corner ornaments */}
        <svg className="absolute top-6 left-6 w-20 h-20 text-amber-100/40 hidden md:block" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M2 2 L26 2 M2 2 L2 26" />
          <path d="M2 14 Q14 14 14 2" />
          <circle cx="22" cy="22" r="2.5" />
        </svg>
        <svg className="absolute top-6 right-6 w-20 h-20 text-amber-100/40 hidden md:block" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M78 2 L54 2 M78 2 L78 26" />
          <path d="M78 14 Q66 14 66 2" />
          <circle cx="58" cy="22" r="2.5" />
        </svg>

        <div className="relative max-w-5xl mx-auto text-center space-y-5 px-4 pt-16 pb-14">
          {/* Dark green legibility box behind text */}
          <div className="bg-emerald-950/60 backdrop-blur-sm rounded-3xl px-8 py-10 mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-amber-100/95 text-[#2D4A32] px-4 py-1.5 rounded-sm text-xs font-medium uppercase border border-amber-100">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
            {isAr ? 'الموقع الرسمي لـ CASC' : 'Official CASC Digital Portal · v1.0 Beta'}
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto mt-5">
            {isAr ? 'الإدارة المركزية لتصديق التقاوي' : 'Central Administration for Seed Testing & Certification'}
          </h1>
          {/* Ornamental flourish under title */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <div className="h-px w-12 bg-amber-100/80"></div>
            <svg className="w-4 h-4 text-orange-500" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0 L10 6 L16 8 L10 10 L8 16 L6 10 L0 8 L6 6 Z"/></svg>
            <div className="h-px w-12 bg-amber-100/80"></div>
          </div>
          <p className="italic font-normal text-amber-100 text-xl">
            {isAr ? 'وزارة الزراعة واستصلاح الأراضي — جمهورية مصر العربية' : 'Ministry of Agriculture & Land Reclamation — Arab Republic of Egypt'}
          </p>
          <p className="text-base text-white/90 max-w-2xl mx-auto leading-relaxed pt-3">
            {isAr
              ? 'توفير وصول شفاف وموثوق إلى التشريعات والقرارات والخدمات الإرشادية لقطاع التقاوي المصري لجميع المعنيين.'
              : 'Providing transparent, reliable access to seed regulatory information, decrees, certification services, and guidance for all sector stakeholders.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <button
              onClick={onGoAbout}
              className="bg-[#DF6D2D] hover:bg-[#C84C05] text-white px-8 py-3.5 font-semibold tracking-wide flex items-center gap-3 transition-all shadow-lg"
            >
              {isAr ? 'تعرّف على CASC' : 'Know About CASC'}
              <ArrowRight className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={onGoLibrary}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-[#638C6D] text-white px-8 py-3.5 font-semibold tracking-wide transition-all"
            >
              {isAr ? 'تصفح المكتبة' : 'Browse Library'}
            </button>
          </div>
          </div>
        </div>
        {/* Bottom arabesque divider */}
        <div className="arabesque-divider"></div>
      </header>

      {/* Stats Strip, Quick-access cards, and About CASC Teaser removed per CASC feedback — May 2026 */}

    </div>
  );
};

// --- View: Library ---
const LibraryView: React.FC<{ lang: Language, initialDocId?: string }> = ({ lang, initialDocId }) => {
  const isAr = lang === 'ar';
  const [search, setSearch] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {
    if (initialDocId) {
      const doc = MOCK_DOCS.find(d => d.id === initialDocId);
      if (doc) setSelectedDoc(doc);
    }
  }, [initialDocId]);

  useEffect(() => {
    if (selectedDoc) {
      setLoadingSummary(true);
      setSummary('');
      getDocumentSummary(selectedDoc.title[lang], lang).then(res => {
        setSummary(res);
        setLoadingSummary(false);
      });
    }
  }, [selectedDoc, lang]);

  const filteredDocs = MOCK_DOCS.filter(doc => 
    doc.title[lang].toLowerCase().includes(search.toLowerCase()) || 
    doc.refNumber.includes(search)
  );

  const handleDownload = () => {
    if (selectedDoc?.downloadUrl) {
      window.open(selectedDoc.downloadUrl, '_blank');
    } else {
      alert(isAr ? 'عذراً، رابط التحميل غير متوفر حالياً.' : 'Sorry, the download link is currently unavailable.');
    }
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-grow space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#3D3D3D]/60 w-5 h-5" />
            <input 
              type="text" 
              placeholder={isAr ? 'ابحث عن قرار، قانون، أو موضوع...' : 'Search for a decree, law, or topic...'}
              className="w-full pl-12 pr-4 py-4 border-2 border-amber-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right">
                <thead className="bg-white text-[#3D3D3D] font-bold border-b border-amber-100">
                  <tr>
                    <th className="px-6 py-4">{isAr ? 'العنوان' : 'Title'}</th>
                    <th className="px-6 py-4">{isAr ? 'رقم المرجع' : 'Ref #'}</th>
                    <th className="px-6 py-4">{isAr ? 'الجهة' : 'Authority'}</th>
                    <th className="px-6 py-4">{isAr ? 'الحالة' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100">
                  {filteredDocs.map((doc) => (
                    <tr 
                      key={doc.id} 
                      className={`hover:bg-emerald-50/50 cursor-pointer transition-colors ${selectedDoc?.id === doc.id ? 'bg-emerald-50' : ''}`}
                      onClick={() => setSelectedDoc(doc)}
                    >
                      <td className="px-6 py-4 font-bold text-emerald-950">{doc.title[lang]}</td>
                      <td className="px-6 py-4 font-mono text-xs">{doc.refNumber}</td>
                      <td className="px-6 py-4">{doc.authority}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                          doc.status === DocStatus.IN_FORCE 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                        }`}>
                          {doc.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <aside className="w-full md:w-96 shrink-0">
          {selectedDoc ? (
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-amber-100 sticky top-24 space-y-6 animate-slide-in">
              <div>
                <h2 className="text-xl font-bold text-[#2D4A32] leading-tight mb-2">{selectedDoc.title[lang]}</h2>
                <span className="text-xs text-[#2D4A32] font-medium uppercase tracking-widest">{selectedDoc.type}</span>
              </div>
              
              {selectedDoc.status === DocStatus.SUPERSEDED && (
                <div className="p-4 bg-amber-50 border-l-4 border-orange-500 rounded-r-lg">
                  <div className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0" />
                    <div className="text-sm">
                      <p className="font-bold text-orange-600">{isAr ? 'ملغى بالإصدار الجديد' : 'Superseded'}</p>
                      <button 
                        onClick={() => setSelectedDoc(MOCK_DOCS.find(d => d.id === selectedDoc.latestVersionId) || null)}
                        className="text-orange-500 underline font-bold mt-1"
                      >
                        {isAr ? 'انتقل للإصدار الحالي' : 'Go to Current Version'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-xs font-semibold text-[#3D3D3D]/70 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  {isAr ? 'ملخص ذكي' : 'AI Analysis'}
                </h3>
                <div className="p-4 bg-amber-50 rounded-xl text-sm text-[#2D4A32] leading-relaxed italic border border-amber-100">
                  {loadingSummary ? (
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                      <span>{isAr ? 'جاري التحليل التلقائي...' : 'Generating summary...'}</span>
                    </div>
                  ) : summary}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-amber-50 rounded-lg">
                  <span className="text-[10px] text-[#2D4A32] block uppercase font-medium mb-1">{isAr ? 'تاريخ الإصدار' : 'Issue Date'}</span>
                  <span className="text-xs font-bold text-[#2D4A32]">{selectedDoc.issueDate}</span>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <span className="text-[10px] text-[#2D4A32] block uppercase font-medium mb-1">{isAr ? 'اللغة' : 'Language'}</span>
                  <span className="text-xs font-semibold text-[#3D3D3D]">{selectedDoc.language}</span>
                </div>
              </div>

              {selectedDoc.notes && (
                <div className="p-4 bg-emerald-50 rounded-xl flex gap-3 items-start border border-emerald-100">
                  <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-emerald-800 leading-relaxed">{selectedDoc.notes[lang]}</p>
                </div>
              )}

              <div className="space-y-2 pt-4">
                <button 
                  onClick={handleDownload}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {isAr ? 'تحميل بصيغة PDF' : 'Download PDF'}
                </button>
                <button className="w-full border-2 border-emerald-700 text-[#2D4A32] hover:bg-emerald-50 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                  <Globe className="w-4 h-4" />
                  {isAr ? 'عرض النص (HTML)' : 'View Text Version'}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 p-10 rounded-2xl border-4 border-dashed border-amber-100 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                <FileText className="w-10 h-10 text-[#3D3D3D]/40" />
              </div>
              <h3 className="text-lg font-semibold text-[#2D4A32] mb-2">{isAr ? 'اختر وثيقة' : 'Select a Document'}</h3>
              <p className="text-[#3D3D3D] text-sm max-w-[200px] mx-auto">
                {isAr ? 'حدد أي قرار من القائمة لعرض التحليل والتحميل.' : 'Select any decree from the list to view its analysis and download options.'}
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

// --- View: Catalogue ---
const CatalogueView: React.FC<{ lang: Language }> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [cropFilter, setCropFilter] = useState('All');
  const [selectedVariety, setSelectedVariety] = useState<VarietyRecord | null>(null);
  const [page, setPage] = useState(1);
  const [checkedVarieties, setCheckedVarieties] = useState<Set<string>>(new Set());
  const PAGE_SIZE = 24;

  const toggleCheck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCheckedVarieties(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const clearChecked = () => setCheckedVarieties(new Set());

  const printMultiple = () => {
    const selected = Array.from(checkedVarieties)
      .map(id => VARIETY_DATA.find(v => v.id === id))
      .filter(Boolean) as VarietyRecord[];
    if (selected.length === 0) return;

    const logoUrl = window.location.origin + import.meta.env.BASE_URL + 'CASC-logo.png';
    const printDate = new Date().toLocaleDateString('en-GB');
    const na = 'N/A';
    const PER_PAGE = 3;

    // Build card HTML for each variety
    const cardHtml = (v: VarietyRecord) => {
      const isExpired = v.expiryDate ? new Date(v.expiryDate) < new Date() : false;
      return `
        <div class="vcard">
          <div class="vcard-header">
            <div class="vcat">${v.category}</div>
            <div class="vname">${v.nameEn || v.nameAr || na}</div>
            ${v.nameAr && v.nameEn ? `<div class="vname-ar">${v.nameAr}</div>` : ''}
          </div>
          <div class="vcard-body">
            <table>
              <tr><td class="lbl">Crop</td><td>${v.cropEn || na}${v.cropAr ? ' — ' + v.cropAr : ''}</td></tr>
              <tr><td class="lbl">Applicant / Registrant</td><td>${v.applicant || na}</td></tr>
              <tr><td class="lbl">Ministerial Decree No. &amp; Date</td><td>${v.decree || na}</td></tr>
              <tr><td class="lbl">Registration Expiry Date</td><td class="${isExpired ? 'expired' : 'valid'}">${v.expiryDate || na}${isExpired ? ' (Expired)' : ''}</td></tr>
              ${v.notes ? `<tr><td class="lbl">Notes</td><td>${v.notes}</td></tr>` : ''}
            </table>
          </div>
        </div>`;
    };

    // Group into pages of PER_PAGE
    const pages: VarietyRecord[][] = [];
    for (let i = 0; i < selected.length; i += PER_PAGE) {
      pages.push(selected.slice(i, i + PER_PAGE));
    }

    const pageHtml = pages.map((group, pi) => `
      <div class="page">
        <div class="hdr">
          <img src="${logoUrl}" alt="CASC" onerror="this.style.display='none'" />
          <div class="hdr-text">
            <div class="hdr-title">Central Administration for Seed Testing and Certification (CASC)</div>
            <div class="hdr-sub">Ministry of Agriculture and Land Reclamation — Arab Republic of Egypt</div>
            <div class="hdr-doc">National Registered Variety List — Selected Records</div>
          </div>
        </div>
        <div class="cards">
          ${group.map(cardHtml).join('')}
        </div>
        <div class="footer">
          <span>Source: Crop Registration Committee, Ministry of Agriculture and Land Reclamation.</span>
          <span>Printed: ${printDate} &nbsp;|&nbsp; Page ${pi + 1} of ${pages.length} &nbsp;|&nbsp; casc.egypt@hotmail.com</span>
        </div>
      </div>`).join('');

    const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/>
<title>CASC — Selected Variety Records</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:Arial,sans-serif;background:#fff;color:#1f3d2f;}
  .page{
    width:210mm;min-height:297mm;padding:18mm 18mm 14mm;
    display:flex;flex-direction:column;
    page-break-after:always;
  }
  /* Header */
  .hdr{display:flex;align-items:center;gap:16px;border-bottom:3px solid #46BA06;padding-bottom:12px;margin-bottom:18px;}
  .hdr img{height:60px;width:auto;}
  .hdr-title{font-size:13px;font-weight:bold;color:#1f3d2f;margin-bottom:3px;}
  .hdr-sub{font-size:10px;color:#5a7a62;margin-bottom:2px;}
  .hdr-doc{font-size:10px;font-weight:bold;color:#46BA06;letter-spacing:0.5px;text-transform:uppercase;}
  /* Cards */
  .cards{flex:1;display:flex;flex-direction:column;gap:12px;}
  .vcard{border:1.5px solid #d4e8c2;border-radius:10px;overflow:hidden;}
  .vcard-header{background:linear-gradient(135deg,#46BA06 0%,#38960a 100%);padding:10px 16px;}
  .vcat{font-size:9px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:rgba(255,255,255,0.8);margin-bottom:4px;}
  .vname{font-size:16px;font-weight:bold;color:#fff;line-height:1.2;}
  .vname-ar{font-size:12px;color:rgba(255,255,255,0.75);margin-top:3px;}
  .vcard-body{background:#fff;padding:10px 16px;}
  table{width:100%;border-collapse:collapse;}
  td{padding:5px 8px;font-size:11px;border-bottom:1px solid #f0f0e8;vertical-align:top;}
  td.lbl{color:#888;font-size:10px;text-transform:uppercase;letter-spacing:0.4px;width:38%;font-weight:600;}
  .expired{color:#c0392b;font-weight:600;}
  .valid{color:#27ae60;font-weight:600;}
  /* Footer */
  .footer{border-top:1px solid #e8e0cc;padding-top:8px;margin-top:12px;font-size:9px;color:#999;display:flex;justify-content:space-between;gap:8px;}
  @media print{
    body{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    .page{page-break-after:always;}
  }
</style>
</head><body>${pageHtml}</body></html>`;

    const w = window.open('', '_blank');
    if (w) { w.document.write(html); w.document.close(); w.focus(); setTimeout(() => w.print(), 400); }
  };

  const crops = getCropsForCategory(categoryFilter);

  const filtered = VARIETY_DATA.filter(v => {
    const matchCat = categoryFilter === 'All' || v.category === categoryFilter;
    const matchCrop = cropFilter === 'All' || v.cropEn === cropFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || 
      v.nameEn.toLowerCase().includes(q) ||
      v.nameAr.includes(search) ||
      v.cropEn.toLowerCase().includes(q) ||
      v.cropAr.includes(search) ||
      v.applicant.includes(search) ||
      v.decree.toLowerCase().includes(q);
    return matchCat && matchCrop && matchSearch;
  });

  const isSearchActive = search !== '' || categoryFilter !== 'All' || cropFilter !== 'All';
  const displayedCards = isSearchActive
    ? filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    : filtered.slice(0, 6);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const handleCategoryChange = (cat: string) => {
    setCategoryFilter(cat);
    setCropFilter('All');
    setPage(1);
  };

  const handleCropChange = (crop: string) => {
    setCropFilter(crop);
    setPage(1);
  };

  const handleSearch = (q: string) => {
    setSearch(q);
    setPage(1);
  };

  const categoryLabels: Record<string, { en: string; ar: string }> = {
    'All': { en: 'All Categories', ar: 'جميع الفئات' },
    'Vegetables': { en: 'Vegetables', ar: 'خضروات' },
    'Field Crops': { en: 'Field Crops', ar: 'محاصيل حقلية' },
    'Fodder Crops': { en: 'Fodder Crops', ar: 'محاصيل علفية' },
    'Fruits & Ornamentals': { en: 'Fruits & Ornamentals', ar: 'فواكه ونباتات زينة' },
    'Herbs & Spices': { en: 'Herbs & Spices', ar: 'أعشاب وتوابل' },
  };

  if (selectedVariety) {
    return (
      <div className="py-8 max-w-3xl mx-auto px-4 animate-fade-in">
        <button
          onClick={() => setSelectedVariety(null)}
          className="flex items-center gap-2 text-[#3D3D3D]/70 hover:text-[#2D4A32] font-bold text-sm mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          {isAr ? 'العودة إلى القائمة الوطنية للأصناف' : 'Back to National Variety List'}
        </button>
        <div className="bg-white rounded-3xl border border-amber-100 shadow-lg overflow-hidden">
          <div className="bg-emerald-700 text-white px-8 py-6">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-200 mb-2 block">{selectedVariety.category}</span>
            <h2 className="text-2xl font-semibold mb-1">
              {selectedVariety.nameEn || selectedVariety.nameAr}
            </h2>
            {selectedVariety.nameAr && selectedVariety.nameEn && (
              <p className="text-emerald-200 text-sm">{selectedVariety.nameAr}</p>
            )}
          </div>
          <div className="p-8 space-y-4">
            {[
              { label: { en: 'Crop', ar: 'المحصول' }, value: `${selectedVariety.cropEn} — ${selectedVariety.cropAr}` },
              { label: { en: 'Variety Name (English)', ar: 'اسم الصنف بالإنجليزية' }, value: selectedVariety.nameEn || '—' },
              { label: { en: 'Variety Name (Arabic)', ar: 'اسم الصنف بالعربية' }, value: selectedVariety.nameAr || '—' },
              { label: { en: 'Applicant / Registrant', ar: 'الجهة الطالبة للتسجيل' }, value: selectedVariety.applicant || '—' },
              { label: { en: 'Ministerial Decree No. & Date', ar: 'رقم وتاريخ القرار الوزاري' }, value: selectedVariety.decree || '—' },
              { label: { en: 'Registration Expiry Date', ar: 'تاريخ انتهاء التسجيل' }, value: selectedVariety.expiryDate || '—' },
              { label: { en: 'Notes', ar: 'ملاحظات' }, value: selectedVariety.notes || '—' },
            ].map((row, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-amber-50 last:border-0 gap-1">
                <span className="text-xs font-semibold text-[#3D3D3D]/60 uppercase tracking-wider">{row.label[lang]}</span>
                <span className="text-sm text-[#2D4A32] font-medium sm:text-right max-w-xs">{row.value}</span>
              </div>
            ))}
          </div>
          <div className="px-8 pb-8 space-y-4">
            {/* PDF Download Button */}
            <button
              onClick={() => {
                const v = selectedVariety;
                const logoUrl = window.location.origin + import.meta.env.BASE_URL + 'CASC-logo.png';
                const na = 'N/A';
                const dash = ' / ';
                const isExpired = v.expiryDate ? new Date(v.expiryDate) < new Date() : false;
                const expiredLabel = isExpired ? ' (Expired)' : '';
                const arabicSub = v.nameAr && v.nameEn
                  ? '<div style="color:#638C6D;font-size:14px;margin-bottom:8px;">' + v.nameAr + '</div>'
                  : '';
                const cropCell = v.cropEn + (v.cropAr ? dash + v.cropAr : '');
                const printDate = new Date().toLocaleDateString('en-GB');
                const parts = [
                  '<!DOCTYPE html><html dir="ltr" lang="en"><head><meta charset="UTF-8"/>',
                  '<title>Variety Record - ' + (v.nameEn || v.nameAr) + '</title>',
                  '<style>',
                  'body{font-family:Arial,sans-serif;margin:0;padding:40px;color:#1f3d2f;}',
                  '.hdr{display:flex;align-items:center;gap:18px;border-bottom:2px solid #638C6D;padding-bottom:16px;margin-bottom:24px;}',
                  '.hdr img{height:64px;}',
                  '.org{display:flex;flex-direction:column;}',
                  '.on{font-size:15px;font-weight:bold;color:#1f3d2f;}',
                  '.os{font-size:11px;color:#5a7a62;margin-top:2px;}',
                  '.oa{font-size:10px;color:#888;margin-top:2px;}',
                  'h2{font-size:20px;margin:0 0 4px 0;}',
                  '.cat{font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#638C6D;margin-bottom:8px;}',
                  'table{width:100%;border-collapse:collapse;margin-top:16px;}',
                  'td{padding:10px 12px;font-size:13px;border-bottom:1px solid #f0ead8;}',
                  'td:first-child{color:#888;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;width:40%;}',
                  'td:last-child{font-weight:500;}',
                  '.exp{color:#c0392b;}',
                  '.disc{margin-top:24px;font-size:10px;color:#888;border-top:1px solid #e8e0cc;padding-top:12px;}',
                  '</style></head><body>',
                  '<div class="hdr">',
                  '<img src="' + logoUrl + '" alt="CASC" onerror="this.style.display=\'none\'"/>',
                  '<div class="org">',
                  '<span class="on">Central Administration for Seed Testing and Certification (CASC)</span>',
                  '<span class="os">Ministry of Agriculture and Land Reclamation - Arab Republic of Egypt</span>',
                  '<span class="oa">8 Gamaa Street, Giza, Egypt | casc.egypt@hotmail.com</span>',
                  '</div></div>',
                  '<div class="cat">' + v.category + '</div>',
                  '<h2>' + (v.nameEn || v.nameAr) + '</h2>',
                  arabicSub,
                  '<table>',
                  '<tr><td>Crop</td><td>' + cropCell + '</td></tr>',
                  '<tr><td>Variety Name (English)</td><td>' + (v.nameEn || na) + '</td></tr>',
                  '<tr><td>Variety Name (Arabic)</td><td>' + (v.nameAr || na) + '</td></tr>',
                  '<tr><td>Applicant / Registrant</td><td>' + (v.applicant || na) + '</td></tr>',
                  '<tr><td>Ministerial Decree No. and Date</td><td>' + (v.decree || na) + '</td></tr>',
                  '<tr><td>Registration Expiry Date</td><td class="' + (isExpired ? 'exp' : '') + '">' + (v.expiryDate || na) + expiredLabel + '</td></tr>',
                  '<tr><td>Notes</td><td>' + (v.notes || na) + '</td></tr>',
                  '</table>',
                  '<div class="disc">Source: Crop Registration Committee, Ministry of Agriculture and Land Reclamation. ',
                  'Extracted from the National Registered Variety List. ',
                  'For enquiries: casc.egypt@hotmail.com. Printed: ' + printDate + '.</div>',
                  '</body></html>',
                ];
                const html = parts.join('');
                const w = window.open('', '_blank');
                if (w) { w.document.write(html); w.document.close(); w.print(); }
              }}
              className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 rounded-xl transition-all shadow-sm"
            >
              <Download className="w-4 h-4" />
              {isAr ? 'تحميل / طباعة بطاقة الصنف (PDF)' : 'Download / Print Variety Card (PDF)'}
            </button>
            {/* Disclaimer */}
            <div className="bg-amber-50 rounded-xl p-4 flex gap-3 items-start">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800">
                {isAr
                  ? 'هذه البيانات مستخرجة من القائمة الوطنية للأصناف المسجلة — لجنة تسجيل المحاصيل، وزارة الزراعة واستصلاح الأراضي. للتحقق أو الاستفسار، تواصل مع الأمانة الفنية للجنة تسجيل الأصناف على casc.egypt@hotmail.com.'
                  : 'This data is extracted from the National Registered Variety List — Crop Registration Committee, Ministry of Agriculture and Land Reclamation. For verification or enquiries, contact the Technical Secretariat of the Seed Registration Committee at casc.egypt@hotmail.com.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 space-y-6 animate-fade-in">

      {/* Header */}
      <div className="bg-emerald-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-1">{isAr ? 'القائمة الوطنية للأصناف المسجلة' : 'National Variety List'}</h2>
          <p className="text-emerald-200 text-sm mb-4">
            {isAr
              ? 'المصدر: لجنة تسجيل المحاصيل — وزارة الزراعة واستصلاح الأراضي'
              : 'Source: Crop Registration Committee — Ministry of Agriculture and Land Reclamation'}
          </p>
          <p className="text-emerald-300 text-xs">
            {isAr
              ? '⚠️ هذه القائمة تخضع للتحديث والمراجعة المستمرة. تاريخ انتهاء التسجيل خاضع للتغيير.'
              : '⚠️ This list is subject to continuous updating and revision. Registration expiry dates are subject to change.'}
          </p>
        </div>
        <BookOpen className="absolute -right-6 -bottom-6 w-40 h-40 text-white/5" />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-amber-100 p-6 shadow-sm space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3D3D3D]/40 w-5 h-5" />
          <input
            type="text"
            placeholder={isAr ? 'ابحث باسم الصنف أو المحصول أو الجهة الطالبة...' : 'Search by variety name, crop, or applicant...'}
            className="w-full pl-12 pr-4 py-3 bg-amber-50 border border-amber-100 rounded-xl focus:border-emerald-500 outline-none text-sm"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Category + Crop filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-[10px] font-bold text-[#3D3D3D]/60 uppercase tracking-widest mb-1.5">{isAr ? 'الفئة' : 'Category'}</label>
            <select
              className="w-full p-3 bg-amber-50 border border-amber-100 rounded-xl outline-none text-sm"
              value={categoryFilter}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              {VARIETY_CATEGORIES.map(c => (
                <option key={c} value={c}>{isAr ? categoryLabels[c]?.ar : categoryLabels[c]?.en || c}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-[10px] font-bold text-[#3D3D3D]/60 uppercase tracking-widest mb-1.5">{isAr ? 'المحصول' : 'Crop'}</label>
            <select
              className="w-full p-3 bg-amber-50 border border-amber-100 rounded-xl outline-none text-sm"
              value={cropFilter}
              onChange={(e) => handleCropChange(e.target.value)}
            >
              <option value="All">{isAr ? 'جميع المحاصيل' : 'All Crops'}</option>
              {crops.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <span className="text-xs text-[#3D3D3D]/60 pb-3">
              {filtered.length.toLocaleString()} {isAr ? 'نتيجة' : 'results'}
            </span>
          </div>
        </div>
      </div>

      {/* Selection bar — sticky just below nav, visible in viewport while browsing */}
      {checkedVarieties.size > 0 && (
        <div className="sticky top-[72px] z-40 flex items-center gap-3 bg-[#1f3d2f] text-white px-5 py-3 rounded-2xl shadow-xl border border-[#46BA06]/50 animate-fade-in">
          <div className="flex items-center gap-2 flex-1">
            <div className="w-6 h-6 rounded-full bg-[#46BA06] flex items-center justify-center text-xs font-bold shrink-0">
              {checkedVarieties.size}
            </div>
            <span className="text-sm font-medium">
              {isAr
                ? `${checkedVarieties.size} صنف محدد — اضغط عرض وطباعة لإنشاء PDF`
                : `${checkedVarieties.size} ${checkedVarieties.size === 1 ? 'variety' : 'varieties'} selected — click View & Print to generate PDF`}
            </span>
          </div>
          <button
            onClick={printMultiple}
            className="flex items-center gap-2 bg-[#46BA06] hover:bg-[#38960a] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shrink-0"
          >
            <Download className="w-4 h-4" />
            {isAr ? 'عرض وطباعة' : 'View & Print'}
          </button>
          <button
            onClick={clearChecked}
            className="text-white/60 hover:text-white text-xs transition-colors px-1 shrink-0"
          >
            {isAr ? 'مسح' : 'Clear'}
          </button>
        </div>
      )}

      {/* Results grid */}
      {displayedCards.length === 0 ? (
        <div className="text-center py-16 text-[#3D3D3D]/50">
          <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">{isAr ? 'لا توجد نتائج مطابقة' : 'No matching varieties found'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedCards.map((v, idx) => {
            const isChecked = checkedVarieties.has(v.id);
            const isDark = idx % 2 === 1;
            return (
              <div key={v.id} className="relative group">
                {/* Checkbox — top-right corner */}
                <div
                  onClick={(e) => toggleCheck(v.id, e)}
                  className={`absolute top-3 right-3 z-10 w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all
                    ${isChecked
                      ? 'bg-[#46BA06] border-[#46BA06]'
                      : isDark
                        ? 'bg-[#1B3A2D] border-white/30 opacity-0 group-hover:opacity-100'
                        : 'bg-white border-[#3D3D3D]/20 opacity-0 group-hover:opacity-100'}`}
                >
                  {isChecked && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <button
                  onClick={() => setSelectedVariety(v)}
                  className={`w-full p-5 rounded-2xl border transition-all text-left
                    ${isChecked
                      ? isDark
                        ? 'bg-[#1B3A2D] border-[#46BA06] shadow-md ring-1 ring-[#46BA06]/30'
                        : 'bg-white border-[#46BA06] shadow-md ring-1 ring-[#46BA06]/30'
                      : isDark
                        ? 'bg-[#1B3A2D] border-[#2D5E3A] hover:border-[#638C6D] hover:shadow-md'
                        : 'bg-white border-amber-100 hover:border-emerald-300 hover:shadow-md'}`}
                >
                  <div className="flex justify-between items-start mb-3 pr-6">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${isDark ? 'bg-[#E7FBB4]/15 text-[#E7FBB4]' : 'bg-emerald-50 text-emerald-700'}`}>
                      {isAr ? v.cropAr : v.cropEn}
                    </span>
                    <ChevronRight className={`w-4 h-4 shrink-0 ${isDark ? 'text-white/30 group-hover:text-[#E7FBB4]' : 'text-[#3D3D3D]/30 group-hover:text-emerald-600'}`} />
                  </div>
                  <h3 className={`text-base font-semibold leading-snug mb-1 ${isDark ? 'text-white' : 'text-[#2D4A32]'}`}>
                    {v.nameEn || v.nameAr}
                  </h3>
                  {v.nameAr && v.nameEn && (
                    <p className={`text-xs mb-3 ${isDark ? 'text-white/50' : 'text-[#3D3D3D]/60'}`}>{v.nameAr}</p>
                  )}
                  <div className={`space-y-1.5 mt-3 pt-3 border-t ${isDark ? 'border-white/10' : 'border-amber-50'}`}>
                    <div className="flex justify-between text-xs">
                      <span className={isDark ? 'text-white/50' : 'text-[#3D3D3D]/50'}>{isAr ? 'الجهة الطالبة' : 'Applicant'}</span>
                      <span className={`font-medium truncate max-w-[140px] ${isDark ? 'text-white/90' : 'text-[#3D3D3D]'}`}>{v.applicant || '—'}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className={isDark ? 'text-white/50' : 'text-[#3D3D3D]/50'}>{isAr ? 'قرار التسجيل' : 'Decree'}</span>
                      <span className={`font-medium font-mono ${isDark ? 'text-white/90' : 'text-[#3D3D3D]'}`}>{v.decree || '—'}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className={isDark ? 'text-white/50' : 'text-[#3D3D3D]/50'}>{isAr ? 'انتهاء التسجيل' : 'Expires'}</span>
                      <span className={`font-medium ${v.expiryDate && v.expiryDate < new Date().toISOString().slice(0,10) ? 'text-red-400' : isDark ? 'text-[#E7FBB4]' : 'text-emerald-600'}`}>
                        {v.expiryDate || '—'}
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {isSearchActive && totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 pt-4">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-xl bg-white border border-amber-100 text-sm font-semibold disabled:opacity-40 hover:border-emerald-400 transition-all"
          >
            {isAr ? 'السابق' : 'Prev'}
          </button>
          <span className="text-sm text-[#3D3D3D]/70">
            {isAr ? `صفحة ${page} من ${totalPages}` : `Page ${page} of ${totalPages}`}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-xl bg-white border border-amber-100 text-sm font-semibold disabled:opacity-40 hover:border-emerald-400 transition-all"
          >
            {isAr ? 'التالي' : 'Next'}
          </button>
        </div>
      )}

      {/* Variety Registration Procedures Link */}
      <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex items-center gap-4">
        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
          <ExternalLink className="w-5 h-5 text-emerald-700" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#2D4A32]">
            {isAr ? 'كيفية تسجيل صنف في مصر' : 'How to Register a Variety in Egypt'}
          </p>
        </div>
      </div>

      {/* Downloadable Registration Forms */}
      <div className="bg-white rounded-3xl border border-amber-100 shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
            <Download className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <h3 className="font-semibold text-[#2D4A32] text-lg">
              {isAr ? 'نماذج التسجيل القابلة للطباعة' : 'Printable Registration Forms'}
            </h3>
            <p className="text-xs text-[#3D3D3D]/60 mt-0.5">
              {isAr ? 'النماذج الرسمية المطلوبة للتقديم — تُملأ وتُقدَّم بالعربية' : 'Official forms required for submission — to be completed and submitted in Arabic'}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: { en: 'Application Form', ar: 'نموذج الطلب' }, file: 'reg_appl.pdf' },
            { name: { en: 'Technical Questionnaire for Local Varieties', ar: 'الاستبيان الفني للأصناف المحلية' }, file: 'local_var_QA.pdf' },
            { name: { en: 'Technical Questionnaire for Imported Varieties', ar: 'الاستبيان الفني للأصناف المستوردة' }, file: 'imported_var_QA.pdf' },
            { name: { en: 'Form for Extending Registration of a Plant Variety', ar: 'نموذج تمديد تسجيل الصنف النباتي' }, file: null },
            { name: { en: 'Form for Requesting a Certificate of a Registered Plant Variety', ar: 'نموذج طلب شهادة صنف نباتي مسجل' }, file: null },
          ].map((form, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-100">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-sm font-medium text-[#2D4A32]">{form.name[lang]}</span>
              </div>
              {form.file ? (
                <a
                  href={`${import.meta.env.BASE_URL}${form.file}`}
                  download
                  className="ml-3 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1 shrink-0"
                >
                  <Download className="w-3 h-3" />
                  {isAr ? 'تحميل' : 'Download'}
                </a>
              ) : (
                <span className="ml-3 px-3 py-1.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-lg shrink-0">
                  {isAr ? 'قريباً' : 'Coming soon'}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-emerald-50 rounded-xl flex gap-3 items-start">
          <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-800">
            {isAr
              ? 'جميع المستندات تُقدَّم باليد وباللغة العربية، باستثناء خطاب التفويض وتقرير DUS. النماذج أدناه باللغة العربية فقط — لا تتوفر نسخ إنجليزية لأن تعبئتها وتقديمها يتمان بالعربية حصراً، وعادةً من خلال وكيل مصري. الإضافات والحذف والتعديلات مسموح بها فقط من قِبل لجنة التسجيل. للاستفسار: casc.egypt@hotmail.com'
              : 'All documents are submitted by hand and in Arabic language, except the authorisation letter and the DUS report. The forms below are in Arabic only — no English versions are provided, as they must be completed and submitted in Arabic, typically through an Egyptian agent. Additions, deletions, and modifications are permitted only by the Registration Committee. For enquiries: casc.egypt@hotmail.com'}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- View: Directory ---
const DirectoryView: React.FC<{ lang: Language }> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [selectedTask, setSelectedTask] = useState('All');

  const allTasks = Array.from(new Set(MOCK_AUTHORITIES.flatMap(a => a.tasks)));
  const filtered = selectedTask === 'All' 
    ? MOCK_AUTHORITIES 
    : MOCK_AUTHORITIES.filter(a => a.tasks.includes(selectedTask));

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 space-y-8 animate-fade-in">
      <div className="bg-emerald-900 p-10 rounded-3xl text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">{isAr ? 'دليل الهيئات والجهات الرقابية' : 'Regulatory Authority Directory'}</h2>
          <p className="text-emerald-100 mb-6">
            {isAr ? 'ابحث عن الجهة المسؤولة عن مهمتك وكيفية التواصل معها.' : 'Find the authority responsible for your task and how to reach them.'}
          </p>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setSelectedTask('All')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${selectedTask === 'All' ? 'bg-orange-500 text-white' : 'bg-emerald-800 hover:bg-emerald-700'}`}
            >
              {isAr ? 'الكل' : 'All Tasks'}
            </button>
            {allTasks.map(t => (
              <button 
                key={t}
                onClick={() => setSelectedTask(t)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${selectedTask === t ? 'bg-orange-500 text-white' : 'bg-emerald-800 hover:bg-emerald-700'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <Building className="absolute -right-10 -bottom-10 w-64 h-64 text-white/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map(auth => (
          <div key={auth.id} className="bg-white p-8 rounded-3xl shadow-sm border border-amber-100 hover:shadow-xl transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-700 text-xl font-semibold overflow-hidden">
                {auth.logo ? (
                  <img
                    src={`${import.meta.env.BASE_URL}${auth.logo}`}
                    alt={auth.shortName}
                    className="w-full h-full object-contain p-1"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; (e.currentTarget.parentElement as HTMLElement).textContent = auth.shortName; }}
                  />
                ) : (
                  auth.shortName
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#2D4A32]">{auth.name[lang]}</h3>
                <span className="text-xs text-emerald-600 font-bold">{auth.id.toUpperCase()}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-[#3D3D3D]/40 shrink-0" />
                <p className="text-sm text-[#3D3D3D]">{auth.address[lang]}</p>
              </div>
              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-[#3D3D3D]/40 shrink-0" />
                <div className="text-sm text-[#3D3D3D]">
                  <p>{auth.email}</p>
                  {auth.email2 && <p>{auth.email2}</p>}
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-[#3D3D3D]/40 shrink-0" />
                <div className="text-sm text-[#3D3D3D]" dir="ltr">
                  <p>{auth.phone}</p>
                  {auth.phone2 && <p>{auth.phone2}</p>}
                  {(auth as any).fax && (
                    <p className="text-[#3D3D3D]/70">
                      {isAr ? 'فاكس: ' : 'Fax: '}{(auth as any).fax}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-50">
              <h4 className="text-xs font-semibold text-[#3D3D3D]/70 uppercase tracking-widest mb-4">{isAr ? 'المهام والمسؤوليات' : 'Tasks & Responsibilities'}</h4>
              <div className="flex flex-wrap gap-2">
                {auth.tasks.map(t => (
                  <span key={t} className="px-3 py-1.5 bg-amber-50 text-[#2D4A32] rounded-lg text-xs font-semibold">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button className="flex-grow bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all">
                {isAr ? 'تواصل الآن' : 'Contact Now'}
              </button>
              {auth.website && (
                <a 
                  href={auth.website} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="px-4 bg-amber-50 hover:bg-amber-100 text-[#2D4A32] rounded-xl flex items-center justify-center transition-all"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- View: Contact Form ---
const ContactView: React.FC<{ lang: Language }> = ({ lang }) => {
  const isAr = lang === 'ar';
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold text-emerald-950 mb-4">{isAr ? 'اسأل خبيراً' : 'Ask an Expert'}</h2>
        <p className="text-[#2D4A32]">
          {isAr ? 'سيتم توجيه سؤالك تلقائياً إلى الجهة المختصة بناءً على سياق بحثك.' : 'Your inquiry will be automatically routed to the responsible authority based on your context.'}
        </p>
      </div>

      <div className="bg-white p-10 rounded-3xl shadow-2xl border border-amber-100">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#2D4A32]">{isAr ? 'الاسم الكامل' : 'Full Name'}</label>
              <input type="text" className="w-full p-4 bg-white rounded-xl border border-amber-100 outline-none focus:ring-2 focus:ring-emerald-500" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#2D4A32]">{isAr ? 'البريد الإلكتروني' : 'Email Address'}</label>
              <input type="email" className="w-full p-4 bg-white rounded-xl border border-amber-100 outline-none focus:ring-2 focus:ring-emerald-500" required />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#2D4A32]">{isAr ? 'الموضوع' : 'Subject'}</label>
            <input type="text" className="w-full p-4 bg-white rounded-xl border border-amber-100 outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#2D4A32]">{isAr ? 'الرسالة' : 'Message'}</label>
            <textarea rows={5} className="w-full p-4 bg-white rounded-xl border border-amber-100 outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
          </div>

          <div className="p-4 bg-amber-100 rounded-xl flex gap-3 items-start">
            <Info className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <p className="text-xs text-[#2D4A32] leading-relaxed">
              {isAr 
                ? 'سيتم إرفاق بيانات جلستك الحالية (المستندات التي تصفحتها) لمساعدة الخبراء في الرد بشكل أدق.' 
                : 'Your session metadata (browsed documents) will be attached to help our experts provide an accurate response.'}
            </p>
          </div>

          <button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-4 rounded-2xl shadow-lg transition-all transform hover:scale-[1.02]">
            {isAr ? 'إرسال الاستفسار' : 'Send Inquiry'}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- View: About CASC ---
const AboutView: React.FC<{ lang: Language, onStartJourney: () => void, onGoContact: () => void, onGoServices: () => void }> = ({ lang, onStartJourney, onGoContact, onGoServices }) => {
  const isAr = lang === 'ar';
  // activeService and adminModal states removed — content is now inline (no popups)

  const adminWiki = [
    {
      en: 'General Administration for Field Inspection',
      ar: 'الإدارة العامة للتفتيش الحقلي',
      bodyEn: 'Field inspection is the first step in seed production certification. The administration ensures the stability of variety characteristics during the propagation period and verifies the source of seeds through official field visits to registered production areas.',
      bodyAr: 'التفتيش الحقلي هو أول خطوات اعتماد إنتاج التقاوي. تضمن الإدارة ثبات صفات الصنف خلال فترة التكاثر والتحقق من مصدر التقاوي من خلال زيارات رسمية للحقول الإنتاجية المسجلة.',
      pointsEn: [
        'Field Crops Field Inspection Management',
        'Vegetative Propagation Crops Management',
        'Vegetable Crops Management',
        'Field Inspection Directorate for Quality Control',
      ],
      pointsAr: [
        'إدارة التفتيش الحقلي على المحاصيل الحقلية',
        'إدارة التفتيش الحقلي لمحاصيل التكاثر الخضري',
        'إدارة التفتيش الحقلي على محاصيل الخضر',
        'إدارة التفتيش الحقلي على مراقبة الجودة',
      ],
    },
    {
      en: 'General Administration for Seed Development and Standards',
      ar: 'الإدارة العامة لتطوير التقاوي والمعايير',
      bodyEn: 'It is one of the departments responsible for developing plans, monitoring, and following up on the implementation of seed-related legislation at all stages, proposing necessary amendments, and preparing draft decisions required to enforce the provisions of the Seed Law or complementary regulations. It also reviews the implementation of approved legislation. Furthermore, through one of its sub-departments — the Variety Testing Department — it conducts plant variety evaluation tests, namely Distinctness, Uniformity, and Stability (DUS) tests, in preparation for registering these varieties in the registration list and for obtaining variety protection.',
      bodyAr: 'هى احد الإدارات المسئولة عن وضع خطط ومراقبة ومتابعة تنفيذ التشريعات الخاصة بالتقاوى فى جميع المراحل واقتراح التعديلات اللازمة وإعداد مشروعات القرارات اللازمة لتنفيذ أحكام قانون التقاوى أو المكملة للقانون ومراجعة تنفيذ التشريعات التى تم إقرارها. كما تقوم من خلال احد إدارتها الفرعية وهى إدارة اختبارات الأصناف بإجراء اختبارات تقييم الصنف النباتى وهى اختبارات التميز والتجانس والثبات (DUS) تمهيداً لتسجيل هذه الأصناف في قائمة التسجيل وكذلك للحصول على حماية الصنف.',
      pointsEn: [
        'Studies and Researches Management',
        'Licensing Management',
        'Variety Testing Management',
        'Guidance and Training Management',
        'Projects Management',
      ],
      pointsAr: [
        'إدارة الدراسات والبحوث',
        'إدارة التراخيص',
        'إدارة اختبارات الأصناف',
        'إدارة الإرشاد والتدريب',
        'إدارة المشروعات',
      ],
    },
    {
      en: 'General Administration for Seed Testing Affairs',
      ar: 'الإدارة العامة لشؤون فحص التقاوي',
      bodyEn: 'It is the second stage of monitoring seed quality through 13 inspection stations distributed across different governorates. Its service role is to test seed samples received from various seed production entities — whether governmental bodies, seed production companies, imported seeds, or exported seeds — and to report the examination results to them.',
      bodyAr: 'هي ثانى حلقات الرقابة على جودة التقاوى من خلال 13 محطة فحص موزعه على المحافظات المختلفة ودورها الخدمى هو فحص عينات التقاوى الواردة من جهات إنتاج التقاوى المختلفة سواء الحكومية أو شركات إنتاج التقاوى أو التقاوى المستوردة والتقاوى المصدرة وتبليغ نتائج الفحص لهم.',
      pointsEn: [
        'The Central Laboratory',
        'Cashney and Auditing Department',
        'Seed Health Management',
        'Seed Testing and Certification in Governorates',
      ],
      pointsAr: [
        'إدارة المعمل المركزى للتقاوى',
        'إدارة الجاشنى والمراجعة',
        'إدارة فحص أمراض التقاوى',
        'إدارة فحص واعتماد التقاوى بالمحافظات',
      ],
    },
    {
      en: 'General Administration for Seed Certification',
      ar: 'الإدارة العامة لاعتماد التقاوي',
      bodyEn: 'The cycle of monitoring seed production and circulation is completed through the work of the General Administration for Seed Certification. Its service role is to supervise the monitoring of seed circulation in trading locations in accordance with the relevant legislation, collect samples of seeds prepared for sale, imported or exported abroad, implement the decisions of the Agricultural Crops Seed Committee, and follow up on the implementation of licensing procedures for seed production and trading sites.',
      bodyAr: 'تكتمل حلقات الرقابة على إنتاج وتداول التقاوى بعمل الإدارة العامة لاعتماد التقاوى ودورها الخدمي هو الإشراف على عملية مراقبة التداول فى أماكن التداول طبقاً للتشريعات الخاصة بذلك وسحب عينات من التقاوى المعدة للبيع والمستوردة أو المصدرة للخارج وتنفيذ قرارات لجنة تقاوى الحاصلات الزراعية ومتابعة تنفيذ إجراءات ترخيص أماكن إنتاج واتجار التقاوى.',
      pointsEn: [
        'Department of Trade and Circulation Control',
        'Department of Certification of Exported and Imported Seeds',
        'Department of Certification of Agricultural Crop Seeds',
        'Department of Certification of Vegetatively Propagated Crop Seeds',
      ],
      pointsAr: [
        'إدارة مراقبة الاتجار والتداول',
        'إدارة اعتماد التقاوى المصدرة والمستوردة',
        'إدارة اعتماد تقاوى الحاصلات الزراعية',
        'إدارة اعتماد تقاوى الحاصلات التى تتكاثر خضرياً',
      ],
    },
    {
      en: 'General Administration for Gins and Oil Mills',
      ar: 'الإدارة العامة للمحالج ومعاصر الزيوت',
      bodyEn: 'Is responsible for issuing the necessary licences to operate ginneries and oil mills, renewing them annually, and supervising their activities in accordance with the provisions of Law No. 53 of 1966 and the ministerial decisions implementing it.',
      bodyAr: 'تتولى إصدار التراخيص اللازمة لتشغيل المحالج ومعاصر الزيوت، وتجديدها سنوياً، والإشراف على أنشطتها وفقاً لأحكام القانون رقم 53 لسنة 1966 والقرارات الوزارية المنفذة له.',
      pointsEn: [
        'Directorate of Supervision of Ginneries',
        'Directorate of Supervision of Oil Presses',
        'Directorate of Therapeutic Devices Testing',
        'Directorate of Data Preparation',
      ],
      pointsAr: [
        'ادارة الإشراف على المحالج',
        'ادارة الإشراف على المعاصر',
        'ادارة اختبار الأجهزة العلاجية',
        'ادارة إعداد البيانات',
      ],
    },
  ];

  // Committees & Offices — rendered separately below the 5 administrations
  const committeeWiki = [
    {
      en: 'Agricultural Crop Varieties Registration Committee',
      ar: 'لجنة تسجيل أصناف الحاصلات الزراعية',
      bodyEn: 'The Agricultural Crops Registration Committee is the only committee in the Arab Republic of Egypt authorized by the Ministry of Agriculture to register agricultural crop varieties. Any natural or legal person may apply to register plant varieties. The Registration Committee operates in accordance with Agriculture Law No. 53 of 1966 and the ministerial decrees regulating its work. The Variety Registration Committee is directly followed to the Ministry of Agriculture and Land Reclamation. The Technical secretary office of the Agricultural Seed Registration Committee conducts the technical and administrative review of the submitted registration applications.',
      bodyAr: 'لجنة تسجيل الحاصلات الزراعية هي اللجنة الوحيدة بجمهورية مصر العربية المفوضة من وزارة الزراعة بالقيام بتسجيل أصناف الحاصلات الزراعية. ويحق لكل شخص طبيعي أو معنوي التقدم لتسجيل الأصناف النباتية. وتعمل لجنة التسجيل وفقاً لقانون الزراعة رقم 53 لعام 1966 والقرارات الوزارية المنظمة للعمل. تتبع لجنة تسجيل الأصناف وزارة الزراعة واستصلاح الأراضي مباشرةً، وتضطلع الأمانة الفنية للجنة بالفحص الفني والإداري لطلبات التسجيل المقدمة.',
      pointsEn: [],
      pointsAr: [],
    },
    {
      en: 'Agricultural Crop Seed Committee',
      ar: 'لجنة تقاوى الحاصلات الزراعية',
      bodyEn: 'The Secretariat Office of the Agricultural Crop Seeds Committee is located at the Central Administration for Seed Testing and Certification and directly follows the Ministry of Agriculture. Applications for the export or import of agricultural crop seeds are submitted according to the conditions set by the Committee and issued through ministerial decrees in this regard. This Committee was established in implementation of Article 17 of the Agriculture Law No. 53 of 1966. The Committee meets regularly (weekly) to review applications for seed import and export. Regarding the importation of potato seed, the Agricultural Crop Seeds Committee annually determines the official date for submitting applications for potato seed importation. This date is formally announced and published in the Official Gazette.',
      bodyAr: 'يوجد مكتب أمانة لجنة تقاوى الحاصلات الزراعية بالإدارة المركزية لتصديق التقاوي حيث يتم التقدم بطلبات تصدير أو استيراد تقاوى الحاصلات الزراعية من خلال الشروط التى تحددها اللجنة والصادر بها القرارات الوزارية فى هذا الشأن. وهى اللجنة المشكلة تنفيذاً للمادة 17 من قانون الزراعة الصادر بالقانون رقم 53 لسنة 1966 وتجتمع بصفة دورية (أسبوعياً) لبحث طلبات استيراد وتصدير التقاوى. وبالنسبة لاستيراد تقاوي البطاطس، تقوم لجنة تقاوي الحاصلات الزراعية كل عام بتحديد ميعاد تقديم طلبات استيراد تقاوي البطاطس ويتم نشره في الجرائد الرسمية.',
      pointsEn: [],
      pointsAr: [],
    },
    {
      en: 'Plant Variety Protection Office (PVPO)',
      ar: 'مكتب حماية أصناف النباتات',
      bodyEn: 'The Plant Variety Protection Office (PVPO) operated within CASC from 2003 until March 2025, when it was transferred to an independent authority — the Egyptian Intellectual Property Authority (EGIPA). CASC continues to conduct the DUS (Distinctness, Uniformity, and Stability) tests required for variety protection applications submitted to EGIPA.',
      bodyAr: 'عمل مكتب حماية أصناف النباتات (PVPO) ضمن CASC منذ عام 2003 حتى مارس 2025، حيث انتقل إلى جهة مستقلة هي الجهاز المصري للملكية الفكرية (EGIPA). لا تزال CASC تُجري اختبارات DUS (التميز والتجانس والثبات) المطلوبة لطلبات حماية الأصناف المقدمة إلى EGIPA.',
      pointsEn: [],
      pointsAr: [],
      pvpo: true,
    },
  ];


  const contactPoints = [
    { label: { en: 'Head Office', ar: 'المقر الرئيسي' }, value: { en: '8 Gamaa Street, Giza, Arab Republic of Egypt', ar: '8 شارع الجامعة، الجيزة، جمهورية مصر العربية' }, icon: MapPin },
    { label: { en: 'Email', ar: 'البريد الإلكتروني' }, value: { en: 'casc.egypt@hotmail.com', ar: 'casc.egypt@hotmail.com' }, icon: Mail },
    { label: { en: 'Working Hours', ar: 'ساعات العمل' }, value: { en: 'Sun – Thu: 8:30 AM – 3:00 PM (public services counter)', ar: 'الأحد – الخميس: 8:30 صباحاً – 3:00 مساءً (نافذة خدمة الجمهور)' }, icon: Clock },
  ];

  return (
    <div className="animate-fade-in">

      {/* Hero */}
      <div className="relative bg-emerald-950 text-white py-20 px-4 border-b border-orange-400/30 overflow-hidden">
  {/* Seed store background image */}
  <div
    className="absolute inset-0 bg-cover bg-center scale-105"
    style={{ backgroundImage: `url(${import.meta.env.BASE_URL}Seed_store.png)` }}
  />
  {/* Darker tint — 90% opacity for better legibility */}
  <div className="absolute inset-0 bg-emerald-950/90" />
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(218,216,135,0.06),transparent_70%)] pointer-events-none"></div>
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <img
            src={`${import.meta.env.BASE_URL}CASC-logo.png`}
            alt={isAr ? 'شعار الإدارة المركزية لتصديق التقاوي' : 'CASC logo'}
            className="h-24 w-auto mx-auto bg-white rounded-md p-2 shadow-2xl ring-1 ring-orange-400/40"
          />
          {/* Dark legibility box behind text */}
          <div className="bg-emerald-950/70 backdrop-blur-sm rounded-2xl px-8 py-8 mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            {isAr ? 'الإدارة المركزية لتصديق التقاوي' : 'Central Administration for Seed Testing and Certification'}
          </h1>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-10 bg-orange-400/60"></div>
            <svg className="w-3 h-3 text-orange-400" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0 L10 6 L16 8 L10 10 L8 16 L6 10 L0 8 L6 6 Z"/></svg>
            <div className="h-px w-10 bg-orange-400/60"></div>
          </div>
          <p className="italic text-amber-200/90 text-lg mt-4">
            {isAr ? 'وزارة الزراعة واستصلاح الأراضي — جمهورية مصر العربية' : 'Ministry of Agriculture & Land Reclamation — Arab Republic of Egypt'}
          </p>
          <p className="text-emerald-100/90 max-w-2xl mx-auto leading-relaxed text-sm mt-4">
            {isAr
              ? 'الإدارة المركزية لتصديق التقاوي إحدى الإدارات المركزية الهامة ضمن قطاع الإنتاج في وزارة الزراعة واستصلاح الأراضي. وهي هيئة حكومية رسمية محايدة لا تقوم بتطوير أو تربية أو إنتاج أو تسويق أو بيع أو تخزين التقاوي. وهي الجهة المفوضة من وزارة الزراعة للقيام بجميع المهام التي تتطلب الحياد في هذا المجال، بما في ذلك تسجيل التقاوي وفحصها واختبارها واعتمادها ومراقبتها. لدى الادارة هيكل تنظيمي قوي يضم ادارات عامة تخدم جميع الانشطة المتعلقة بالتقاوي، بالإضافة إلى معمل مركزي لفحص التقاوي معتمد من قِبل المنظمة الدولية لفحص البذور (ISTA)، وتعمل وفقاً لنظام شامل لضمان الجودة، كما تمتلك 12 محطة فحص موزعة على مختلف المحافظات.'
              : 'The Central Administration for Seed Testing and Certification is one of the important central administrations within the Production Sector of the Ministry of Agriculture and Land Reclamation. It is a neutral, official government body that does not develop, breed, produce, market, sell, or store seeds. It is authorized by the Ministry of Agriculture to carry out all tasks requiring neutrality in this field, including seed registration, inspection, testing, certification, and monitoring. CASC has a strong organizational structure as it includes several general administrations serving all seed-related activities. In addition, the Central Seed Testing Laboratory is an accredited member of the International Seed Testing Organization (ISTA) and operates according to a comprehensive Quality Assurance System, in addition to 12 lab testing stations all over the governorates.'}
          </p>
          </div>
        </div>
      </div>

      {/* CASC Goal & Five General Administrations */}
      <div className="py-16" style={{ backgroundColor: '#f0f7f0' }}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#1B3A2D]/8 text-[#1B3A2D] px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4 border border-[#1B3A2D]/15">
            <Target className="w-3 h-3" />
            {isAr ? 'هدف الإدارة المركزية' : "CASC's Goal"}
          </div>
          <h2 className="text-4xl font-bold text-[#1B3A2D] mb-3 tracking-tight">
            {isAr ? 'ضمان جودة عالية للتقاوي' : 'Assuring High Quality Seeds'}
          </h2>
          <p className="text-[#4A5E54] text-sm max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? 'تعمل CASC من خلال خمس إدارات عامة رئيسية، فضلاً عن استضافة أمانة اللجان الوطنية للتقاوي:'
              : 'This is achieved through 5 main General Administrations, alongside hosting the secretariat of national seed committees:'}
          </p>
        </div>

        {/* Administration strips — refined ministerial style */}
        <div className="space-y-3">
          {adminWiki.map((adm, i) => {
            const icons = [Shield, BookOpen, FlaskConical, Award, Layers];
            const Icon = icons[i] || Shield;
            return (
              <div key={i} className="rounded-xl overflow-hidden border border-[#D6E4DC] shadow-sm bg-white">
                {/* Narrow dark header band */}
                <div className="flex items-center gap-4 px-6 py-4" style={{ backgroundColor: '#1B3A2D' }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
                    <Icon className="w-4.5 h-4.5 text-white" style={{ width: '18px', height: '18px' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-lg leading-tight tracking-tight">{isAr ? adm.ar : adm.en}</p>
                    {!isAr && <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{adm.ar}</p>}
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
                    {isAr ? 'إدارة عامة' : 'General Administration'}
                  </span>
                </div>
                {/* Content panel — off-white, left accent border */}
                <div className="flex">
                  <div className="w-1 shrink-0" style={{ backgroundColor: '#638C6D' }} />
                  <div className="flex-1 px-6 py-5 space-y-4">
                    <p className="text-sm leading-relaxed text-[#2C3E35]">
                      {isAr ? adm.bodyAr : adm.bodyEn}
                    </p>
                    {(isAr ? adm.pointsAr : adm.pointsEn).length > 0 && (
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-widest mb-3" style={{ color: '#638C6D' }}>
                          {isAr ? 'الأقسام الفرعية' : 'Sub-units'}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {(isAr ? adm.pointsAr : adm.pointsEn).map((pt, j) => (
                            <span
                              key={j}
                              className="text-xs px-3 py-1.5 rounded-md font-medium"
                              style={{ backgroundColor: '#EEF4F0', color: '#1B3A2D', border: '1px solid #D0E2D6' }}
                            >
                              {pt}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Committees & Offices */}
        <div className="mt-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1" style={{ backgroundColor: '#D6E4DC' }} />
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#638C6D' }}>
              {isAr ? 'اللجان والمكاتب المرتبطة' : 'Associated Committees & Offices'}
            </p>
            <div className="h-px flex-1" style={{ backgroundColor: '#D6E4DC' }} />
          </div>
          <div className="space-y-3">
            {committeeWiki.map((item, i) => {
              const accentColor = item.pvpo ? '#92680A' : '#2D5E3A';
              const tagBg = item.pvpo ? '#FEF3C7' : '#EEF4F0';
              const tagText = item.pvpo ? '#92680A' : '#2D5E3A';
              const tagBorder = item.pvpo ? '#F0D080' : '#C8DED0';
              return (
                <div key={i} className="rounded-xl overflow-hidden border shadow-sm bg-white" style={{ borderColor: '#D6E4DC' }}>
                  <div className="flex">
                    <div className="w-1 shrink-0" style={{ backgroundColor: accentColor }} />
                    <div className="flex-1 px-6 py-5">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <p className="font-bold text-base leading-snug" style={{ color: '#1B3A2D' }}>{isAr ? item.ar : item.en}</p>
                          {!isAr && <p className="text-xs mt-0.5" style={{ color: '#7A9A84' }}>{item.ar}</p>}
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded shrink-0 whitespace-nowrap border" style={{ backgroundColor: tagBg, color: tagText, borderColor: tagBorder }}>
                          {item.pvpo
                            ? (isAr ? 'تحول مؤسسي 2025' : 'Institutional change 2025')
                            : (isAr ? 'لجنة' : 'Committee')}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: '#2C3E35' }}>
                        {isAr ? item.bodyAr : item.bodyEn}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>

      {/* Legal Mandate */}
      <div className="py-14 px-4" style={{ backgroundColor: '#F4F7F5' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#1B3A2D' }}>
              <FileText className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-xl font-bold tracking-tight" style={{ color: '#1B3A2D' }}>{isAr ? 'الأساس القانوني' : 'Legal Mandate'}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { ref: 'Law 53 / 1966', title: { en: 'Agriculture Law', ar: 'قانون الزراعة' }, desc: { en: 'The comprehensive legal framework governing agriculture in Egypt, including seed production, marketing, and quality control. Forms the legal basis for all CASC operations.', ar: 'الإطار القانوني الشامل الذي ينظم القطاع الزراعي في مصر، بما في ذلك إنتاج التقاوي وتسويقها ومراقبة جودتها. يشكّل الأساس القانوني لجميع عمليات CASC.' } },
              { ref: 'UPOV 1991 / COMESA', title: { en: 'International Commitments', ar: 'الالتزامات الدولية' }, desc: { en: 'Egypt\'s treaty obligations through UPOV 1991 accession (plant variety protection), COMESA seed trade harmonisation, OECD seed schemes, and ISTA seed testing standards.', ar: 'التزامات مصر بموجب انضمامها لـ UPOV 1991 (حماية الأصناف)، وتنسيق تجارة التقاوي في الكوميسا، ومخططات OECD للتقاوي، ومعايير ISTA لفحص التقاوي.' } },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border shadow-sm" style={{ borderColor: '#D6E4DC' }}>
                <span className="text-[9px] font-bold text-white px-2 py-1 rounded uppercase tracking-wider" style={{ backgroundColor: '#2D5E3A' }}>{item.ref}</span>
                <h4 className="font-bold mt-3 mb-2 text-sm" style={{ color: '#1B3A2D' }}>{item.title[lang]}</h4>
                <p className="text-xs leading-relaxed" style={{ color: '#4A5E54' }}>{item.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CASC Services CTA — links to the dedicated Services page */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-[#2D6B2D] rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row items-center gap-8 px-10 py-12">
          <div className="flex-1 text-white space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/15 text-white px-3 py-1 rounded-full text-xs font-bold">
              <Layers className="w-3 h-3" />
              {isAr ? 'خدمات CASC' : 'CASC Services'}
            </div>
            <h2 className="text-3xl font-semibold leading-tight">
              {isAr ? 'ماذا تفعل CASC؟' : 'What Does CASC Do?'}
            </h2>
            <p className="text-emerald-100 text-sm leading-relaxed max-w-lg">
              {isAr
                ? 'تقدم CASC طيفاً شاملاً من الخدمات التنظيمية التي تغطي دورة حياة التقاوي بالكامل من الإنتاج حتى السوق.'
                : 'CASC delivers a comprehensive range of regulatory services covering the full seed lifecycle from production through to market — including seed import and export, testing, certification, variety registration, and trade and production licensing.'}
            </p>
          </div>
          <div className="shrink-0">
            <button
              onClick={onGoServices}
              className="bg-[#DF6D2D] hover:bg-[#C84C05] text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg inline-flex items-center gap-3 text-base"
            >
              {isAr ? 'استعرض خدمات CASC' : 'View All CASC Services'}
              <ArrowRight className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
      {/* Stakeholder Journey CTA */}
      <div className="bg-emerald-900 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <Users className="w-10 h-10 text-orange-400 mx-auto" />
          <h3 className="text-2xl font-semibold">
            {isAr ? 'هل أنت مزارع، مستورد، أو منتج تقاوي؟' : 'Are you a Farmer, Importer, or Seed Producer?'}
          </h3>
          <p className="text-emerald-200 text-sm leading-relaxed">
            {isAr
              ? 'استخدم رحلة المعنيين المخصصة للوصول إلى المعلومات التنظيمية ذات الصلة بوضعك بالتحديد.'
              : 'Use our tailored Stakeholder Journey to access the regulatory information most relevant to your specific situation.'}
          </p>
          <button
            onClick={onStartJourney}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg inline-flex items-center gap-2"
          >
            {isAr ? 'ابدأ رحلتك الآن' : 'Start Your Journey Now'}
            <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Contact */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-[#2D4A32]">{isAr ? 'تواصل مع CASC' : 'Contact CASC'}</h2>
          <p className="text-[#3D3D3D] mt-2 text-sm">
            {isAr ? 'مكاتبنا مفتوحة للجمهور خلال أيام الأسبوع.' : 'Our offices are open to the public on working days.'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="bg-white p-8 rounded-3xl border border-amber-100 shadow-sm space-y-6">
            {contactPoints.map((cp, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                  <cp.icon className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-[#3D3D3D]/70 uppercase tracking-widest mb-0.5">{cp.label[lang]}</p>
                  <p className="text-sm text-[#3D3D3D] font-semibold leading-relaxed">{cp.value[lang]}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 space-y-6">
            <h4 className="font-semibold text-emerald-900 text-lg">{isAr ? 'الأقسام الرئيسية في CASC / CASP' : 'Main CASC / CASP Departments'}</h4>
            {[
              { dept: { en: 'Seed Registration Committee — Technical Secretariat', ar: 'لجنة تسجيل الأصناف — الأمانة الفنية' }, contact: 'casc.egypt@hotmail.com' },
              { dept: { en: 'Import / Export Permits (Seed Committee)', ar: 'تصاريح الاستيراد والتصدير — لجنة التقاوي' }, contact: 'casc.egypt@hotmail.com' },
              { dept: { en: 'Central Seed Testing Laboratory (ISTA)', ar: 'المختبر المركزي لفحص التقاوي (ISTA)' }, contact: 'casc.egypt@hotmail.com' },
              { dept: { en: 'Field Inspection & Certification', ar: 'التفتيش الحقلي والاعتماد' }, contact: 'casc.egypt@hotmail.com' },
              { dept: { en: 'PVPO / EGIPA (Plant Variety Protection)', ar: 'الجهاز المصري للملكية الفكرية (EGIPA) — حماية أصناف النباتات' }, contact: 'http://www.egypo.gov.eg' },
            ].map((d, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-emerald-100 last:border-0">
                <span className="text-sm font-bold text-emerald-900">{d.dept[lang]}</span>
                <span className="text-xs text-emerald-600 font-mono">{d.contact}</span>
              </div>
            ))}
            <button
              onClick={onGoContact}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl transition-all mt-2 flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              {isAr ? 'إرسال استفسار رسمي' : 'Send Official Enquiry'}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

// --- View: CASC Services ---

const CASCServicesView: React.FC<{ lang: Language, onNavigateToDoc: (id: string) => void }> = ({ lang, onNavigateToDoc }) => {
  const isAr = lang === 'ar';
  const [activeService, setActiveService] = useState<number | null>(null);

  const services = [
{
      icon: Award,
      image: 'varietyregistration.png',
      title: { en: 'Variety Registration', ar: 'تسجيل الأصناف' },
      points: {
        en: [
          'All procedures must be completed through an Egyptian agent or a branch of the foreign company',
          'All documents must be submitted in Arabic (except the authorisation letter and DUS report)',
          'Submit application form to the Technical Secretariat of the Seed Registration Committee',
          'Submit valid certified authorisation from the Egyptian Embassy (for imported varieties)',
          'Submit the import approval',
          'Complete and submit the Technical Questionnaire',
        ],
        ar: [
          'تُستكمل جميع الإجراءات من خلال وكيل مصري أو فرع للشركة الأجنبية',
          'تُملأ جميع المستندات باللغة العربية باستثناء خطاب التفويض وتقرير DUS',
          'تقديم طلب إلى الأمانة الفنية للجنة تسجيل الأصناف',
          'تقديم تفويض رسمي مصدّق من السفارة المصرية (للأصناف المستوردة)',
          'تقديم تصريح الاستيراد',
          'ملء وتقديم الاستبيان الفني',
        ],
      },
    },
{
      icon: Shield,
      image: 'field.png',
      title: { en: 'Field inspections for vegetable and field crops', ar: 'التفتيش الحقلي (الخضر والمحاصيل الحقلية)' },
      points: {
        en: [
          'Field inspection is the first step in seed production certification',
          'The administration comprises four units: Field Crops, Vegetative Propagation Crops, Vegetable Crops, and Quality Control Field Inspection',
          'Copy of valid production licence',
          'Application form (company name)',
          'Invoice for examination of seeds to be used for planting',
          'Original Form 3 from the Certification Department',
          'Contractors list',
          'Inspection notification',
          'Payment of prescribed fees',
        ],
        ar: [
          'التفتيش الحقلي هو أول خطوات اعتماد إنتاج التقاوي',
          'تتكون الإدارة من أربع وحدات: المحاصيل الحقلية، التكاثر الخضري، محاصيل الخضر، ومراقبة الجودة',
          'صورة من ترخيص الإنتاج ساري المفعول',
          'طلب باسم الشركة',
          'فاتورة فحص للتقاوي المطلوب استخدامها للزراعة',
          'أصل استمارة 3 من قسم الاعتماد',
          'كشف متعاقدين',
          'إخطار فحص',
          'سداد المصروفات المقررة',
        ],
      },
    },
    {
      icon: Shield,
      image: 'potato.png',
      title: { en: 'Field Inspection (Vegetatively Propagated Crops, Potatoes and Tissue Culture)', ar: 'التفتيش الحقلي (محاصيل التكاثر الخضري والبطاطس وزراعة الأنسجة)' },
      points: {
        en: [
          'Copy of the Production Permit',
          'Import Approval',
          'Electronic Invoice',
          'IF Test Result',
        ],
        ar: [
          'صورة من تصريح الإنتاج',
          'الموافقة الاستيرادية',
          'الفاتورة الإلكترونية',
          'نتيجة الـ IF',
        ],
      },
    },
{
      icon: Globe,
      image: 'seedexport.png',
      title: { en: 'Seed Export', ar: 'تصدير التقاوي' },
      points: {
        en: [
          'Export form from the Seed Committee (+ 2 copies)',
          'Form No. 5 export (+ 2 copies)',
          'Application to the Committee Chairman specifying quantities, varieties and price (+ 2 copies)',
          'Copy of seed trading licence',
          'Copy of exporters register',
          'Inspection certificate, or proof that seeds are under inspection',
          'Payment of stated fees',
          'After receiving approval: application is certified by the Ministry of Agriculture — Seed Committee Secretariat',
        ],
        ar: [
          'نموذج التصدير من لجنة التقاوي (+2 صورة)',
          'نموذج رقم (5) تصدير (+2 صورة)',
          'طلب باسم رئيس اللجنة مستوفى فيه الكميات والأصناف والسعر (+2 صورة)',
          'صورة ترخيص الاتجار في التقاوي',
          'صورة سجل المصدرين',
          'شهادة الفحص أو ما يفيد أن التقاوي تحت الفحص',
          'سداد الرسوم المقررة',
          'بعد استلام الموافقة: تُعتمد من وزارة الزراعة — أمانة لجنة التقاوي',
        ],
      },
    },
{
      icon: BookOpen,
      image: 'seedimport.png',
      title: { en: 'Seed Import', ar: 'استيراد التقاوي' },
      points: {
        en: [
          'Import form from the Seed Committee (+ 2 copies)',
          'Application to the Committee Chairman specifying quantities, types and prices (+ 2 copies)',
          'Proforma invoice (+ 5 copies)',
          'Copy of importers register',
          'Copy of seed trading licence',
          'Copy of registered varieties for each application from the Variety Registration Committee',
          'Copy of origin statement for each variety from Agricultural Quarantine',
          'Payment of fees',
          'After receiving approval: application is certified by the Ministry of Agriculture — Seed Committee Secretariat',
        ],
        ar: [
          'نموذج الاستيراد من لجنة التقاوي (+2 صورة)',
          'طلب باسم رئيس اللجنة مستوفى بالكميات والأصناف والسعر (+2 صورة)',
          'فاتورة مبدئية (+5 صور)',
          'صورة سجل المستوردين',
          'صورة ترخيص الاتجار في التقاوي',
          'صورة من الأصناف المسجلة لكل طلب من لجنة تسجيل الأصناف',
          'صورة من بيان المنشأ لكل صنف من الحجر الزراعي',
          'سداد الرسوم',
          'بعد استلام الموافقة: تُعتمد من وزارة الزراعة — أمانة لجنة التقاوي',
        ],
      },
    },
{
      icon: Users,
      image: 'Seedtesting.png',
      title: { en: 'Seed Testing', ar: 'فحص التقاوي' },
      points: {
        en: [
          'Required for all seed import and export procedures',
          'A sample is drawn by an official committee and sent to the Central Seed Testing Laboratory at CASC',
          'Testing covers germination, purity, moisture content, and seed health',
          'Testing is conducted in accordance with ISTA standards',
          'Results determine whether import or export procedures may be completed',
        ],
        ar: [
          'مطلوب لجميع إجراءات استيراد وتصدير التقاوي',
          'تسحب لجنة رسمية عينة وترسلها إلى المختبر المركزي لفحص التقاوي في CASC',
          'يشمل الفحص الإنبات والنقاء والرطوبة وصحة التقاوي',
          'يُجرى الفحص وفق معايير ISTA',
          'تحدد النتائج ما إذا كان يمكن استكمال إجراءات الاستيراد أو التصدير',
        ],
      },
    },
{
      icon: FlaskConical,
      image: 'istaoecd.png',
      title: { en: 'ISTA & OECD Certificates', ar: 'شهادات ISTA وOECD' },
      points: {
        en: [
          'The Central Seed Testing Laboratory is an accredited ISTA member with 12 testing stations across governorates',
          'Submit inspection documents (inspection approval and accreditation approval)',
          'Submit testing request',
          'Sampling and testing are carried out on the seed lots',
          'If lots are accepted, all necessary certificates are issued',
          'Submit a request to the Head of CASC for the OECD certificate',
          'Payment of all fees',
        ],
        ar: [
          'المختبر المركزي عضو معتمد في ISTA مع 12 محطة فحص بالمحافظات',
          'تقديم أوراق التفتيش (موافقة التفتيش وموافقة الاعتماد)',
          'تقديم طلب الفحص',
          'إجراء السحب والفحص على دفعات التقاوي',
          'في حالة قبول اللوطات تُستخرج جميع الشهادات اللازمة',
          'تقديم طلب لرئيس الإدارة لإصدار شهادة OECD',
          'دفع جميع المصروفات',
        ],
      },
    },
{
      icon: Target,
      image: 'tradeandproducer_licensing.png',
      title: { en: 'Trade & Production Licensing', ar: 'ترخيص الاتجار والإنتاج' },
      points: { en: [], ar: [] },
      licensingPdf: true,
      licensingIntro: {
        en: 'This document sets out the conditions and required documents for issuing or renewing seven CASC licence categories:',
        ar: 'يحدد هذا المستند الشروط والمستندات المطلوبة لاستخراج أو تجديد سبع فئات من تراخيص الإدارة المركزية لتصديق التقاوي:',
      },
      licensingPoints: {
        en: [
          'Trade in agricultural crop seeds (Form 9, Decree 829/2011)',
          'Production of agricultural crop seeds (Form 2, Decree 829/2011)',
          'Cold storage of seeds in refrigerators (Form 13)',
          'Seed preparation, screening and sorting station (Form 15)',
          'Certified fruit-seedling nursery (Annex 5, Decree 830/2011)',
          'Seed warehouse for green re-export',
          'Tissue-culture seedling-production laboratory (Form 2, Decree 904/2008)',
        ],
        ar: [
          'الاتجار في تقاوي الحاصلات الزراعية (النموذج 9، القرار 829/2011)',
          'إنتاج تقاوي الحاصلات الزراعية (النموذج 2، القرار 829/2011)',
          'تخزين التقاوي بالثلاجات (النموذج 13)',
          'محطة إعداد وغربلة وفرز التقاوي (النموذج 15)',
          'مشتل شتلات فاكهة معتمدة (الملحق 5، القرار 830/2011)',
          'مخزن تقاوي للتصدير الأخضر',
          'معمل تشغيل زراعة أنسجة لإنتاج الشتلات (النموذج 2، القرار 904/2008)',
        ],
      },
    },
{
      icon: Layers,
      image: 'ginsandoils.png',
      title: { en: 'Cotton Ginning & Oil Pressing Licences', ar: 'تراخيص المحالج ومعاصر الزيوت' },
      points: { en: [], ar: [] },
      ginsPdf: true,
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="relative bg-emerald-950 text-white py-14 px-4 border-b border-orange-400/30 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(218,216,135,0.07),transparent_60%)] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-xs font-bold border border-orange-500/30">
            <Layers className="w-3 h-3" />
            {isAr ? 'خدمات CASC' : 'CASC Services'}
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            {isAr ? 'ماذا تفعل CASC؟' : 'What Does CASC Do?'}
          </h1>
          <p className="text-emerald-200/80 text-sm max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? 'تقدم CASC طيفاً شاملاً من الخدمات التنظيمية التي تغطي دورة حياة التقاوي بالكامل من الإنتاج حتى السوق.'
              : 'CASC delivers a comprehensive range of regulatory services covering the full seed lifecycle — from production through to market. Select a service to view procedure details.'}
          </p>
        </div>
      </div>

      {/* Service cards grid — square cards */}
      <div className="max-w-6xl mx-auto px-4 py-14">
        {/* Service Procedure Modal */}
        {activeService !== null && ReactDOM.createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4"
            onClick={() => setActiveService(null)}
          >
            <div
              className="relative max-w-2xl w-full max-h-[85vh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveService(null)}
                className="absolute -top-10 right-0 text-white text-sm font-semibold flex items-center gap-1 hover:text-orange-300 transition-colors"
              >
                ✕ {isAr ? 'إغلاق' : 'Close'}
              </button>
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                <div className="bg-[#2D4A32] px-6 py-4 shrink-0">
                  <p className="text-xs font-bold text-[#E7FBB4] uppercase tracking-widest mb-1">
                    {isAr ? 'إجراءات الخدمة' : 'Service Procedure'}
                  </p>
                  <h3 className="text-lg font-semibold text-white">
                    {services[activeService].title[lang]}
                  </h3>
                </div>
                <div
                  className="px-6 py-5 overflow-y-auto text-sm text-[#3D3D3D] leading-relaxed"
                  dir={isAr ? 'rtl' : 'ltr'}
                >
                  {services[activeService].stillNoData ? (
                    <p className="text-[#3D3D3D]/60 italic text-center py-6">{isAr ? 'لا توجد بيانات حتى الآن' : 'Still no data'}</p>
                  ) : services[activeService].licensingPdf ? (
                    <div className="space-y-5">
                      <p className="text-sm text-[#3D3D3D] leading-relaxed">
                        {services[activeService].licensingIntro[lang]}
                      </p>
                      <ul className="space-y-2">
                        {services[activeService].licensingPoints[lang].map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#638C6D] shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-2">
                        <a
                          href={`${import.meta.env.BASE_URL}${isAr ? 'licensing_CASC.pdf' : 'licensing_CASC_EN.docx'}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#DF6D2D] hover:bg-[#C84C05] text-white text-sm font-semibold px-5 py-3 rounded-lg transition-all"
                        >
                          <Download className="w-4 h-4 shrink-0" />
                          {isAr ? 'تنزيل المستند الكامل (PDF)' : 'Download Full Document (English)'}
                        </a>
                      </div>
                    </div>
                  ) : services[activeService].ginsPdf ? (
                    <div className="space-y-6">
                      <p className="text-sm text-[#3D3D3D] leading-relaxed">
                        {isAr
                          ? 'يمكنك تنزيل الإجراءات الكاملة لكل من المحالج ومعاصر الزيوت من الروابط أدناه.'
                          : 'Download the full licensing procedure documents for cotton gins and oil mills below.'}
                      </p>
                      {/* Gins */}
                      <div className="bg-emerald-50 rounded-xl p-4 space-y-3">
                        <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">
                          {isAr ? 'المحالج (حلج القطن)' : 'Cotton Gins (Ginneries)'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <a
                            href={`${import.meta.env.BASE_URL}GINS_EN.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-[#46BA06] hover:bg-[#38960a] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-all"
                          >
                            <FileText className="w-4 h-4 shrink-0" />
                            {isAr ? 'تنزيل — إنجليزي' : 'Download — English'}
                          </a>
                          <a
                            href={`${import.meta.env.BASE_URL}GINS_AR.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-[#46BA06] hover:bg-[#38960a] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-all"
                          >
                            <FileText className="w-4 h-4 shrink-0" />
                            {isAr ? 'تنزيل — عربي' : 'Download — Arabic'}
                          </a>
                        </div>
                      </div>
                      {/* Mills */}
                      <div className="bg-orange-50 rounded-xl p-4 space-y-3">
                        <p className="text-xs font-bold uppercase tracking-widest text-orange-800">
                          {isAr ? 'معاصر الزيوت' : 'Oil Mills'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <a
                            href={`${import.meta.env.BASE_URL}MILLS_EN.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-[#DF6D2D] hover:bg-[#C84C05] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-all"
                          >
                            <FileText className="w-4 h-4 shrink-0" />
                            {isAr ? 'تنزيل — إنجليزي' : 'Download — English'}
                          </a>
                          <a
                            href={`${import.meta.env.BASE_URL}MILLS_AR.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-[#DF6D2D] hover:bg-[#C84C05] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-all"
                          >
                            <FileText className="w-4 h-4 shrink-0" />
                            {isAr ? 'تنزيل — عربي' : 'Download — Arabic'}
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {services[activeService].points[lang].map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#638C6D] shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="px-6 py-3 bg-amber-50 border-t border-amber-100 shrink-0">
                  <p className="text-[11px] text-amber-700">
                    {isAr
                      ? 'تعكس هذه المعلومات الإجراءات الرسمية المنشورة من قِبل CASC. للاستفسار: casc.egypt@hotmail.com'
                      : 'This information reflects official procedures published by CASC. For enquiries: casc.egypt@hotmail.com'}
                  </p>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div
              key={i}
              onClick={() => setActiveService(i)}
              className="group relative overflow-hidden cursor-pointer rounded-2xl shadow-lg"
              style={{ aspectRatio: '1 / 1' }}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${import.meta.env.BASE_URL}${s.image})` }}
              />
              {/* Gradient scrim — bottom third */}
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 to-transparent" />
              {/* Title strip — bottom */}
              <div className="absolute inset-x-0 bottom-0 z-10 px-3 pb-3">
                <div className="bg-white/75 backdrop-blur-md rounded-xl px-4 py-3 flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-[#1f3d2f] leading-snug">{s.title[lang]}</h4>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50/90 px-2 py-1 rounded-full shrink-0 whitespace-nowrap">
                    {isAr ? 'تفاصيل' : 'Details'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-amber-50 border border-amber-100 rounded-2xl p-5 flex gap-3 items-start">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            {isAr
              ? 'تعكس المعلومات الواردة في هذه الصفحة الإجراءات الرسمية المنشورة من قِبل CASC. لا تُعدّ هذه البوابة بديلاً عن النصوص القانونية الرسمية. للاستفسار: casc.egypt@hotmail.com'
              : 'The information on this page reflects official procedures published by CASC. This portal does not replace official legal texts or regulatory authority. For enquiries: casc.egypt@hotmail.com'}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- View: Stakeholder Journey ---

const ResultView: React.FC<{
  result: JourneyResult;
  lang: Language;
  stakeholder: Stakeholder;
  onNavigateToDoc: (id: string) => void;
  onRestart: () => void;
}> = ({ result, lang, stakeholder, onNavigateToDoc, onRestart }) => {
  const isAr = lang === 'ar';
  const authorities = MOCK_AUTHORITIES.filter(a => result.authorityIds.includes(a.id));
  const documents = MOCK_DOCS.filter(d => result.documentIds.includes(d.id));

  const resultImageMap: Record<string, string> = {
    farmer: 'farmer.png',
    importer: 'importer.png',
    producer: 'company.png',
    breeder: 'researcher.png',
    exporter: 'exporter.png',
    investor: 'f_investor.png',
  };

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div className="bg-[#1B3A2D] p-8 rounded-3xl shadow-lg">
        <div className="flex items-start gap-4">
          <img
            src={`${import.meta.env.BASE_URL}${resultImageMap[stakeholder.id]}`}
            alt={stakeholder.label['en']}
            className="w-14 h-14 rounded-xl object-cover shrink-0 ring-2 ring-white/20"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#E7FBB4] mb-1">
              {stakeholder.label[lang]}
            </p>
            <h3 className="text-2xl font-semibold text-white leading-tight mb-3">{result.title[lang]}</h3>
            <p className="text-emerald-100/90 leading-relaxed">{result.summary[lang]}</p>
          </div>
        </div>
      </div>

      {/* Warning / Deadline */}
      {result.warning && (
        <div className="p-4 bg-amber-50 border-l-4 border-orange-500 rounded-r-xl flex gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
          <p className="text-sm text-orange-900 font-semibold">{result.warning[lang]}</p>
        </div>
      )}
      {result.deadline && (
        <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-xl flex gap-3">
          <Clock className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-red-700 uppercase tracking-wider mb-1">{isAr ? 'موعد نهائي مهم' : 'Important Deadline'}</p>
            <p className="text-sm text-red-900 font-semibold">{result.deadline[lang]}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stepwise Procedure + Key Points (compact text box) */}
        <div className="space-y-4">
          {/* Stepwise Procedure */}
          {result.procedure && result.procedure[lang] && result.procedure[lang].length > 0 && (
            <div className="bg-white rounded-2xl border border-[#1B3A2D]/15 shadow-sm overflow-hidden">
              <h4 className="font-semibold text-[#E7FBB4] text-xs uppercase tracking-widest px-6 py-3 bg-[#1B3A2D] flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-[#E7FBB4]" />
                {isAr ? 'الإجراءات خطوة بخطوة' : 'Stepwise Procedure'}
              </h4>
              <ol className="space-y-3 p-6">
                {result.procedure[lang].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#2D4A32] leading-relaxed">
                    <span className="w-6 h-6 rounded-full bg-[#1B3A2D] text-[#E7FBB4] text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Key Points — compact text box (shortened) */}
          <div className="bg-amber-50 p-5 rounded-2xl border border-dashed border-amber-100">
            <h4 className="font-semibold text-[#2D4A32] text-[11px] uppercase tracking-widest mb-3 flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              {isAr ? 'النقاط الرئيسية' : 'Key Points'}
            </h4>
            <ul className="space-y-1.5">
              {result.keyPoints[lang].map((pt, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px] text-[#2D4A32] leading-snug">
                  <span className="text-emerald-600 font-semibold mt-0.5">·</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          {/* Authorities */}
          {authorities.length > 0 && (
            <div className="bg-[#1B3A2D] p-6 rounded-2xl shadow-md">
              <h4 className="font-semibold text-[#E7FBB4] text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <Building className="w-4 h-4 text-[#E7FBB4]" />
                {isAr ? 'الجهات المعنية' : 'Relevant Authorities'}
              </h4>
              <div className="space-y-3">
                {authorities.map(auth => (
                  <div key={auth.id} className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#1B3A2D] text-xs font-semibold shrink-0 overflow-hidden">
                      {auth.logo ? (
                        <img
                          src={`${import.meta.env.BASE_URL}${auth.logo}`}
                          alt={auth.shortName}
                          className="w-full h-full object-contain p-0.5"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; (e.currentTarget.parentElement as HTMLElement).textContent = auth.shortName; }}
                        />
                      ) : (
                        auth.shortName
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">{auth.name[lang]}</p>
                      <p className="text-[10px] text-emerald-200/80 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3" /> {auth.phone}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents */}
          {documents.length > 0 && (
            <div className="bg-[#1B3A2D] p-6 rounded-2xl shadow-md">
              <h4 className="font-semibold text-[#E7FBB4] text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#E7FBB4]" />
                {isAr ? 'المستندات القانونية' : 'Legal Documents'}
              </h4>
              <div className="space-y-2">
                {documents.map(doc => (
                  <button
                    key={doc.id}
                    onClick={() => onNavigateToDoc(doc.id)}
                    className="w-full text-left flex items-center justify-between p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all group"
                  >
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-[#E7FBB4]">{doc.title[lang]}</p>
                      <p className="text-[10px] text-emerald-200/70 font-mono">{doc.refNumber}</p>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-emerald-200/60 group-hover:text-[#E7FBB4] shrink-0 ${isAr ? 'rotate-180' : ''}`} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Restart */}
      <button
        onClick={onRestart}
        className="flex items-center gap-2 text-[#3D3D3D] hover:text-emerald-700 font-bold text-sm transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        {isAr ? 'بدء رحلة جديدة' : 'Start a new journey'}
      </button>
    </div>
  );
};

const JourneyView: React.FC<{ lang: Language, onNavigateToDoc: (id: string) => void }> = ({ lang, onNavigateToDoc }) => {
  const isAr = lang === 'ar';
  const [selectedStakeholder, setSelectedStakeholder] = useState<Stakeholder | null>(null);
  const [nodeHistory, setNodeHistory] = useState<JourneyNode[]>([]);
  const [currentResult, setCurrentResult] = useState<JourneyResult | null>(null);

  const currentNode = nodeHistory[nodeHistory.length - 1] ?? null;

  const handleSelectStakeholder = (s: Stakeholder) => {
    const rootNode = JOURNEY_NODES[s.rootNodeId];
    setSelectedStakeholder(s);
    setNodeHistory([rootNode]);
    setCurrentResult(null);
  };

  const handleSelectOption = (optionId: string) => {
    if (!currentNode) return;
    const option = currentNode.options.find(o => o.id === optionId);
    if (!option) return;
    if (option.result) {
      setCurrentResult(option.result);
    } else if (option.nextNodeId) {
      const nextNode = JOURNEY_NODES[option.nextNodeId];
      if (nextNode) setNodeHistory(prev => [...prev, nextNode]);
    }
  };

  const handleBack = () => {
    if (currentResult) {
      setCurrentResult(null);
    } else if (nodeHistory.length > 1) {
      setNodeHistory(prev => prev.slice(0, -1));
    } else {
      setSelectedStakeholder(null);
      setNodeHistory([]);
    }
  };

  const handleRestart = () => {
    setSelectedStakeholder(null);
    setNodeHistory([]);
    setCurrentResult(null);
  };

  // Progress: stakeholder selected = 1 step, each node = 1 step, result = final
  const totalDepth = nodeHistory.length + (currentResult ? 1 : 0);
  const progressSteps = selectedStakeholder ? Math.max(totalDepth + 1, 2) : 0;

  const stakeholderImageMap: Record<string, string> = {
    farmer: 'farmer.png',
    importer: 'importer.png',
    producer: 'company.png',
    breeder: 'researcher.png',
    exporter: 'exporter.png',
    investor: 'f_investor.png',
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <img
            src={`${import.meta.env.BASE_URL}CASC-logo.png`}
            alt="CASC"
            className="h-11 w-auto bg-white rounded-md p-1 shadow-sm ring-1 ring-[#1B3A2D]/15 shrink-0"
          />
          <h2 className="text-3xl font-semibold text-emerald-950">
            {isAr ? 'رحلة المعنيين بالقطاع' : 'Stakeholder Journey'}
          </h2>
        </div>
        <p className="text-[#3D3D3D] text-sm">
          {isAr ? 'حدد هويتك لنرشدك إلى المعلومات التنظيمية المناسبة.' : 'Identify who you are and we\'ll guide you to the right regulatory information.'}
        </p>
        {selectedStakeholder && (
          <div className="flex gap-2 mt-4">
            {Array.from({ length: progressSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  i < totalDepth ? 'bg-[#DF6D2D]' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Step 0: Stakeholder Selection */}
      {!selectedStakeholder && (
        <div>
          <p className="text-sm font-bold text-[#1B3A2D]/60 uppercase tracking-widest mb-6">
            {isAr ? 'من أنت؟' : 'Who are you?'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STAKEHOLDERS.map(s => (
              <button
                key={s.id}
                onClick={() => handleSelectStakeholder(s)}
                className="bg-white rounded-2xl text-left hover:shadow-xl transition-all group hover:scale-[1.02] ring-1 ring-[#1B3A2D]/15 hover:ring-[#1B3A2D]/40 overflow-hidden flex flex-col"
              >
                <div className="w-full h-44 bg-[#F5F0E8] overflow-hidden flex items-center justify-center">
                  <img
                    src={`${import.meta.env.BASE_URL}${stakeholderImageMap[s.id]}`}
                    alt={s.label['en']}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex-1 border-t border-[#1B3A2D]/10">
                  <h3 className="font-semibold text-[#1B3A2D] text-base mb-1 group-hover:text-[#DF6D2D] transition-colors">{s.label[lang]}</h3>
                  <p className="text-[#3D3D3D]/65 text-xs leading-relaxed">{s.description[lang]}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Breadcrumb back button */}
      {selectedStakeholder && !currentResult && (
        <button onClick={handleBack} className="flex items-center gap-2 text-[#3D3D3D]/70 hover:text-[#2D4A32] font-bold text-sm mb-6 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          {nodeHistory.length > 1 ? (isAr ? 'رجوع' : 'Back') : (isAr ? 'تغيير الهوية' : 'Change stakeholder')}
        </button>
      )}

      {/* Stakeholder Question Node */}
      {selectedStakeholder && currentNode && !currentResult && (
        <div className="bg-white rounded-[32px] shadow-xl border border-[#1B3A2D]/15 overflow-hidden">
          <div className="flex items-center gap-3 px-8 py-6 bg-[#1B3A2D]">
            <img
              src={`${import.meta.env.BASE_URL}${stakeholderImageMap[selectedStakeholder.id]}`}
              alt={selectedStakeholder.label['en']}
              className="w-12 h-12 rounded-xl object-cover shrink-0 ring-2 ring-white/20"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#E7FBB4]">{selectedStakeholder.label[lang]}</p>
              <h3 className="text-xl font-semibold text-white">{currentNode.question[lang]}</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 p-8">
            {currentNode.options.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className="p-5 border-2 border-[#1B3A2D]/15 rounded-xl hover:border-[#1B3A2D] hover:bg-[#1B3A2D] text-left font-bold transition-all flex items-center justify-between group bg-white"
              >
                <div>
                  <span className="text-[#2D4A32] font-bold group-hover:text-white transition-colors">{opt.label[lang]}</span>
                  {opt.sublabel && <p className="text-xs text-[#3D3D3D]/70 mt-0.5 font-normal group-hover:text-emerald-100/80">{opt.sublabel[lang]}</p>}
                </div>
                <ChevronRight className={`w-5 h-5 text-[#3D3D3D]/50 group-hover:text-[#E7FBB4] shrink-0 ${isAr ? 'rotate-180' : ''}`} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Result */}
      {selectedStakeholder && currentResult && (
        <ResultView
          result={currentResult}
          lang={lang}
          stakeholder={selectedStakeholder}
          onNavigateToDoc={onNavigateToDoc}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDocId, setSelectedDocId] = useState<string | undefined>(undefined);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  const navigateToDoc = (docId: string) => {
    setSelectedDocId(docId);
    setActiveTab('library');
  };

  return (
    <div className={`min-h-screen bg-parchment-50 bg-papyrus flex flex-col ${lang === 'ar' ? 'font-cairo' : 'font-sans'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Egyptian flag stripe — Red / White / Black, with gold hairline */}
      <div className="flex h-1">
        <div className="flex-1 bg-[#CE1126]"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-[#0a0a0a]"></div>
      </div>
      <div className="h-px bg-orange-400/70"></div>
      <TopBanner lang={lang} setActiveTab={setActiveTab} />
      <Navbar lang={lang} setLang={setLang} activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow">
        {activeTab === 'home' && (
          <HomeView
            lang={lang}
            onStartJourney={() => setActiveTab('journeys')}
            onGoAbout={() => setActiveTab('about')}
            onGoLibrary={() => setActiveTab('library')}
            onGoCatalogue={() => setActiveTab('catalogue')}
            onGoDirectory={() => setActiveTab('directory')}
          />
        )}
        {activeTab === 'about' && (
          <AboutView
            lang={lang}
            onStartJourney={() => setActiveTab('journeys')}
            onGoContact={() => setActiveTab('contact')}
            onGoServices={() => setActiveTab('services')}
          />
        )}
        {activeTab === 'library' && <LibraryView lang={lang} initialDocId={selectedDocId} />}
        {activeTab === 'journeys' && (
          <div className="bg-[#F7F3ED] min-h-screen">
            <JourneyView lang={lang} onNavigateToDoc={navigateToDoc} />
          </div>
        )}
        {activeTab === 'services' && <CASCServicesView lang={lang} onNavigateToDoc={navigateToDoc} />}
        {activeTab === 'catalogue' && <CatalogueView lang={lang} />}
        {activeTab === 'directory' && <DirectoryView lang={lang} />}
        {activeTab === 'contact' && <ContactView lang={lang} />}
      </main>

      <footer className="bg-emerald-950 text-emerald-200 mt-0 border-t border-orange-600/30">
        {/* Top arabesque divider — flipped */}
        <div className="arabesque-divider" style={{ transform: 'scaleY(-1)' }}></div>
        {/* Persistent Stakeholder Journey call-to-action */}
        <div className="max-w-7xl mx-auto px-4 pt-10">
          <button
            onClick={() => setActiveTab('journeys')}
            className="w-full group flex items-center justify-center gap-3 bg-[#DF6D2D] hover:bg-[#C84C05] text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg"
          >
            <Compass className="w-5 h-5 shrink-0" />
            <span className="text-sm md:text-base">
              {lang === 'ar' ? 'ابدأ رحلة المستفيد — دليل تفاعلي خطوة بخطوة' : 'Start the Stakeholder Journey — an interactive step-by-step guide'}
            </span>
            <ChevronRight className={`w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1 ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
          </button>
        </div>
        <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src={`${import.meta.env.BASE_URL}CASC-logo.png`}
                alt={lang === 'ar' ? 'شعار الإدارة المركزية لتصديق التقاوي' : 'CASC logo'}
                className="h-14 w-auto bg-white rounded-md p-1.5 shadow-sm ring-1 ring-orange-400/40"
              />
              <div className="ps-3 border-s border-emerald-800">
                <div className="text-white font-semibold text-base leading-tight">
                  {lang === 'ar' ? 'الإدارة المركزية لتصديق التقاوي' : 'Central Administration for Seed Testing & Certification'}
                </div>
                <div className="text-orange-400/80 text-[10px] uppercase tracking-widest font-semibold mt-1">
                  {lang === 'ar' ? 'وزارة الزراعة واستصلاح الأراضي' : 'Ministry of Agriculture & Land Reclamation — Egypt'}
                </div>
              </div>
            </div>
            <p className="text-sm max-w-sm leading-relaxed text-emerald-100/70">
              {lang === 'ar'
                ? 'الجهة الوطنية المسؤولة عن تصديق التقاوي وتسجيل الأصناف وترخيص المنتجين والرقابة على جودة التقاوي في جمهورية مصر العربية منذ عام 1976.'
                : 'The national authority responsible for seed certification, variety registration, producer licensing, and seed quality oversight in Egypt since 1976.'}
            </p>
            <div className="space-y-2 text-xs text-emerald-300/85">
              <p className="flex items-center gap-2"><MapPin className="w-3 h-3 text-orange-400 shrink-0" /> {lang === 'ar' ? '8 شارع الجامعة، الجيزة، جمهورية مصر العربية' : '8 Gamaa Street, Giza, Egypt'}</p>
              <p className="flex items-center gap-2"><Mail className="w-3 h-3 text-orange-400 shrink-0" /> casc.egypt@hotmail.com</p>
            </div>
          </div>
          <div>
            <h4 className="text-orange-400 mb-6 uppercase tracking-widest text-[11px] font-semibold">{lang === 'ar' ? 'أقسام البوابة' : 'Portal Sections'}</h4>
            <ul className="text-sm space-y-3.5">
              <li className="text-emerald-200/80 hover:text-orange-500 cursor-pointer transition-colors" onClick={() => setActiveTab('about')}>{lang === 'ar' ? 'عن CASC' : 'About CASC'}</li>
              <li className="text-emerald-200/80 hover:text-orange-500 cursor-pointer transition-colors" onClick={() => setActiveTab('services')}>{lang === 'ar' ? 'خدمات CASC' : 'CASC Services'}</li>
              <li className="text-emerald-200/80 hover:text-orange-500 cursor-pointer transition-colors" onClick={() => setActiveTab('library')}>{lang === 'ar' ? 'مكتبة التشريعات' : 'Legislation Library'}</li>
              <li className="text-emerald-200/80 hover:text-orange-500 cursor-pointer transition-colors" onClick={() => setActiveTab('catalogue')}>{lang === 'ar' ? 'القائمة الوطنية للأصناف' : 'National Variety List'}</li>
              <li className="text-emerald-200/80 hover:text-orange-500 cursor-pointer transition-colors" onClick={() => setActiveTab('directory')}>{lang === 'ar' ? 'دليل الجهات' : 'Authority Directory'}</li>
              <li className="text-emerald-200/80 hover:text-orange-500 cursor-pointer transition-colors" onClick={() => setActiveTab('contact')}>{lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-orange-400 mb-6 uppercase tracking-widest text-[11px] font-semibold">{lang === 'ar' ? 'خدمات CASC' : 'CASC Services'}</h4>
            <ul className="text-sm space-y-3.5 text-emerald-300/75">
              <li>{lang === 'ar' ? 'تصديق التقاوي' : 'Seed Certification'}</li>
              <li>{lang === 'ar' ? 'تسجيل الأصناف' : 'Variety Registration'}</li>
              <li>{lang === 'ar' ? 'ترخيص المنتجين' : 'Producer Licensing'}</li>
              <li>{lang === 'ar' ? 'تصاريح الاستيراد والتصدير' : 'Import / Export Permits'}</li>
              <li>{lang === 'ar' ? 'فحص التقاوي' : 'Seed Testing Laboratories'}</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-emerald-900 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest font-semibold text-emerald-600/80">
          <span>© {new Date().getFullYear()} CASC — Central Administration for Seed Testing and Certification, MALR Egypt. All Rights Reserved.</span>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="cursor-pointer hover:text-orange-500">Terms of Use</span>
            <span className="cursor-pointer hover:text-orange-500">Privacy Policy</span>
            <span className="cursor-pointer hover:text-orange-500">Accessibility</span>
          </div>
        </div>
        </div>
      </footer>
    </div>
  );
}
