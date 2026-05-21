
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
  ListOrdered
} from 'lucide-react';
import { Language, Document, DocStatus, Variety, Authority, Stakeholder, JourneyNode, JourneyResult } from './types';
import { MOCK_DOCS, MOCK_VARIETIES, MOCK_AUTHORITIES, STAKEHOLDERS, JOURNEY_NODES } from './constants';
import { VARIETY_DATA, VARIETY_CATEGORIES, getCropsForCategory, VarietyRecord } from './varietyData';
import { getDocumentSummary } from './geminiService';

// --- Components ---

// Top announcement / identity strip
const TopBanner: React.FC<{ lang: Language }> = ({ lang }) => {
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
    { id: 'journeys', label: isAr ? 'رحلتي' : 'My Journey', icon: ArrowRight },
    { id: 'library', label: isAr ? 'المكتبة' : 'Library', icon: FileText },
    { id: 'catalogue', label: isAr ? 'الكتالوج' : 'Catalogue', icon: BookOpen },
    { id: 'directory', label: isAr ? 'الدليل' : 'Directory', icon: MapPin },
    { id: 'contact', label: isAr ? 'تواصل' : 'Contact', icon: Mail },
  ];

  return (
    <nav className="text-white sticky top-0 z-50 shadow-lg border-b border-[#1d5c1d]/60" style={{backgroundColor: '#2D6B2D'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <img
                src={`${import.meta.env.BASE_URL}CASC-logo.png`}
                alt={isAr ? 'شعار الإدارة المركزية لتصديق التقاوي' : 'CASC logo'}
                className="h-12 w-auto bg-white rounded-md p-1 shadow-sm ring-1 ring-orange-500/40"
              />
              <div className="hidden md:block ps-2 border-s border-emerald-800/70">
                <div className="font-semibold text-lg leading-tight text-white">
                  {isAr ? 'الإدارة المركزية لتصديق التقاوي' : 'CASC Egypt'}
                </div>
                <div className="text-amber-100 text-[10px] font-medium uppercase leading-tight mt-0.5">
                  {isAr ? 'وزارة الزراعة واستصلاح الأراضي' : 'Ministry of Agriculture & Land Reclamation'}
                </div>
              </div>
            </div>
            <div className="hidden md:flex ml-10 items-baseline space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-2 text-sm font-medium transition-all flex items-center gap-2 border-b-2 ${
                    activeTab === item.id
                              ? 'border-orange-400 text-white'
                      : 'border-transparent text-white hover:text-orange-200 hover:border-orange-400/40'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(isAr ? 'en' : 'ar')}
              className="flex items-center gap-2 bg-emerald-950/40 hover:bg-emerald-800 px-3 py-1.5 rounded-sm border border-emerald-700 hover:border-orange-400/50 transition-all"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-semibold tracking-wide">{isAr ? 'English' : 'العربية'}</span>
            </button>
            <div className="border-l border-emerald-700 h-6 mx-1"></div>
            <button className="flex items-center gap-2 text-white border border-white/70 hover:text-white hover:border-white transition-colors px-3 py-1.5 rounded-sm">
              <User className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium">{isAr ? 'دخول' : 'Login'}</span>
            </button>
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
              ? 'إشعار: آخر موعد لتقديم طلبات استيراد تقاوي البطاطس للموسم الصيفي هو 10 يناير 2026. يرجى التأكد من استيفاء جميع متطلبات الحجر الزراعي.'
              : 'Notice: The deadline for potato seed import applications (summer season) is January 10, 2026. Ensure all phytosanitary requirements are met.'}
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
              onClick={onStartJourney}
              className="bg-[#DF6D2D] hover:bg-[#C84C05] text-white px-8 py-3.5 font-semibold tracking-wide flex items-center gap-3 transition-all shadow-lg"
            >
              {isAr ? 'ابدأ رحلتك كمعني بالقطاع' : 'Start Stakeholder Journey'}
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
  const PAGE_SIZE = 24;

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
          {isAr ? 'العودة إلى الكتالوج' : 'Back to Catalogue'}
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
          <h2 className="text-2xl font-bold mb-1">{isAr ? 'الكتالوج الوطني للأصناف المسجلة' : 'National Registered Variety Catalogue'}</h2>
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

      {/* Results grid */}
      {displayedCards.length === 0 ? (
        <div className="text-center py-16 text-[#3D3D3D]/50">
          <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">{isAr ? 'لا توجد نتائج مطابقة' : 'No matching varieties found'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedCards.map(v => (
            <button
              key={v.id}
              onClick={() => setSelectedVariety(v)}
              className="bg-white p-5 rounded-2xl border border-amber-100 hover:border-emerald-300 hover:shadow-md transition-all text-left group"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                  {isAr ? v.cropAr : v.cropEn}
                </span>
                <ChevronRight className="w-4 h-4 text-[#3D3D3D]/30 group-hover:text-emerald-600 shrink-0" />
              </div>
              <h3 className="text-base font-semibold text-[#2D4A32] leading-snug mb-1">
                {v.nameEn || v.nameAr}
              </h3>
              {v.nameAr && v.nameEn && (
                <p className="text-xs text-[#3D3D3D]/60 mb-3">{v.nameAr}</p>
              )}
              <div className="space-y-1.5 mt-3 pt-3 border-t border-amber-50">
                <div className="flex justify-between text-xs">
                  <span className="text-[#3D3D3D]/50">{isAr ? 'الجهة الطالبة' : 'Applicant'}</span>
                  <span className="text-[#3D3D3D] font-medium truncate max-w-[140px]">{v.applicant || '—'}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#3D3D3D]/50">{isAr ? 'قرار التسجيل' : 'Decree'}</span>
                  <span className="text-[#3D3D3D] font-medium font-mono">{v.decree || '—'}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#3D3D3D]/50">{isAr ? 'انتهاء التسجيل' : 'Expires'}</span>
                  <span className={`font-medium ${v.expiryDate && v.expiryDate < new Date().toISOString().slice(0,10) ? 'text-red-500' : 'text-emerald-600'}`}>
                    {v.expiryDate || '—'}
                  </span>
                </div>
              </div>
            </button>
          ))}
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
          <p className="text-xs text-[#3D3D3D]/70 mt-0.5">
            {isAr
              ? 'راجع إجراءات تسجيل الأصناف الكاملة — بما فيها مخطط التدفق والنماذج المطلوبة — في صفحة خدمات CASC.'
              : 'Full variety registration procedures — including the registration flowchart and required forms — are available in the CASC Services section.'}
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
            { name: { en: 'Application Form', ar: 'نموذج الطلب' }, file: null },
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
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-700 text-xl font-semibold">
                {auth.shortName}
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
                <p className="text-sm text-[#3D3D3D]">{auth.email}</p>
              </div>
              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-[#3D3D3D]/40 shrink-0" />
                <p className="text-sm text-[#3D3D3D]">{auth.phone}</p>
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
const AboutView: React.FC<{ lang: Language, onStartJourney: () => void, onGoContact: () => void }> = ({ lang, onStartJourney, onGoContact }) => {
  const isAr = lang === 'ar';
  const [showFlowchart, setShowFlowchart] = useState(false);
  const [adminModal, setAdminModal] = useState<null | {
    en: string; ar: string;
    bodyEn: string; bodyAr: string;
    pointsEn: string[]; pointsAr: string[];
    note?: { en: string; ar: string };
  }>(null);

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
      note: { en: 'Required documents: valid production licence, application form, invoice for seed examination, original Form 3 from Certification Dept, contractors list, inspection notification, and payment of fees.', ar: 'المستندات المطلوبة: ترخيص إنتاج ساري، طلب باسم الشركة، فاتورة فحص للتقاوي، أصل استمارة 3 من قسم الاعتماد، كشف متعاقدين، إخطار فحص، سداد المصروفات.' },
    },
    {
      en: 'General Administration for Seed Development and Standards',
      ar: 'الإدارة العامة لتطوير التقاوي والمعايير',
      bodyEn: 'This administration is responsible for developing and maintaining the technical standards that govern seed quality across all certification classes in Egypt. It sets the minimum quality thresholds for germination, purity, moisture content, and other key seed attributes in line with international standards.',
      bodyAr: 'تتولى هذه الإدارة وضع المعايير الفنية التي تحكم جودة التقاوي عبر جميع فئات الاعتماد في مصر. وتحدد الحدود الدنيا لمعايير الإنبات والنقاء والرطوبة وغيرها من الخصائص الرئيسية للتقاوي وفقاً للمعايير الدولية.',
      pointsEn: [
        'Setting national seed quality standards',
        'Developing certification class specifications',
        'Alignment with ISTA and OECD international standards',
        'Technical review of seed variety characteristics',
      ],
      pointsAr: [
        'وضع معايير جودة التقاوي الوطنية',
        'تطوير مواصفات فئات الاعتماد',
        'التوافق مع معايير ISTA وOECD الدولية',
        'المراجعة الفنية لخصائص أصناف التقاوي',
      ],
    },
    {
      en: 'General Administration for Seed Testing Affairs',
      ar: 'الإدارة العامة لشؤون فحص التقاوي',
      bodyEn: 'This administration oversees the Central Seed Testing Laboratory — an accredited member of the International Seed Testing Association (ISTA) — and coordinates the network of 12 testing stations distributed across Egypt\'s governorates. It conducts official seed testing for import, export, and certification purposes.',
      bodyAr: 'تشرف هذه الإدارة على المعمل المركزي لفحص التقاوي — العضو المعتمد في المنظمة الدولية لفحص البذور (ISTA) — وتنسق شبكة من 12 محطة فحص موزعة على محافظات مصر. وتجري الفحص الرسمي للتقاوي لأغراض الاستيراد والتصدير والاعتماد.',
      pointsEn: [
        'Central Seed Testing Laboratory (ISTA-accredited)',
        '12 testing stations across governorates',
        'Testing for germination, purity, moisture content, and seed health',
        'Official sampling for import and export procedures',
      ],
      pointsAr: [
        'المعمل المركزي لفحص التقاوي (معتمد من ISTA)',
        '12 محطة فحص موزعة على المحافظات',
        'فحص الإنبات والنقاء والرطوبة وصحة التقاوي',
        'السحب الرسمي للعينات لإجراءات الاستيراد والتصدير',
      ],
    },
    {
      en: 'General Administration for Seed Certification',
      ar: 'الإدارة العامة لاعتماد التقاوي',
      bodyEn: 'This administration manages Egypt\'s seed certification system across four official classes: Breeder, Foundation, Registered, and Certified. It issues seed certification tags and OECD certificates for eligible lots destined for domestic use or international export.',
      bodyAr: 'تدير هذه الإدارة نظام اعتماد التقاوي في مصر عبر أربع فئات رسمية: تقاوي مربٍّ، وتقاوي أساس، وتقاوي مسجل، وتقاوي معتمد. وتصدر بطاقات اعتماد التقاوي وشهادات OECD للدفعات المؤهلة المخصصة للاستخدام المحلي أو التصدير الدولي.',
      pointsEn: [
        'Four certification classes: Breeder, Foundation, Registered, Certified',
        'Issuance of official certification tags (red, white, blue, orange)',
        'OECD certificate issuance for export lots',
        'Coordination with field inspection and laboratory testing',
      ],
      pointsAr: [
        'أربع فئات اعتماد: مربٍّ، أساس، مسجل، معتمد',
        'إصدار بطاقات الاعتماد الرسمية (حمراء، بيضاء، زرقاء، برتقالية)',
        'إصدار شهادات OECD للدفعات المصدَّرة',
        'التنسيق مع التفتيش الحقلي والفحص المختبري',
      ],
    },
    {
      en: 'General Administration for Gins and Oil Mills',
      ar: 'الإدارة العامة للمحالج والمعاصر',
      bodyEn: 'This administration oversees the licensing, inspection, and quality monitoring of cotton gins and oil mills operating within Egypt\'s seed and agricultural processing sector. It ensures that processing facilities meet regulatory standards for seed quality and handling.',
      bodyAr: 'تشرف هذه الإدارة على ترخيص وتفتيش ومراقبة جودة محالج القطن والمعاصر العاملة في قطاع معالجة التقاوي والمحاصيل الزراعية في مصر. وتضمن أن تستوفي منشآت المعالجة المعايير التنظيمية لجودة التقاوي والتعامل معها.',
      pointsEn: [
        'Licensing of cotton gins and oil mills',
        'Regulatory inspection of processing facilities',
        'Seed quality monitoring during processing',
        'Compliance enforcement for licensed operators',
      ],
      pointsAr: [
        'ترخيص محالج القطن والمعاصر',
        'التفتيش التنظيمي على منشآت المعالجة',
        'مراقبة جودة التقاوي أثناء المعالجة',
        'تطبيق معايير الامتثال على المشغلين المرخصين',
      ],
      note: { en: 'Detailed procedures for this administration are pending confirmation from CASC. Contact casc.egypt@hotmail.com for enquiries.', ar: 'الإجراءات التفصيلية لهذه الإدارة في انتظار التأكيد من CASC. للاستفسار: casc.egypt@hotmail.com' },
    },
  ];

  const services = [
    {
      icon: Globe,
      image: 'Import_export_permit.png',
      title: { en: 'Seed Export', ar: 'تصدير التقاوي' },
      desc: {
        en: 'Seed export requires: export form from the Seed Committee (+ 2 copies), Form No. 5 export (+ 2 copies), application to the Committee Chairman specifying quantities, varieties and price, copy of seed trading licence, copy of exporters register, inspection certificate or proof seeds are under inspection, and payment of stated fees. After receiving approval, the application is certified by the Ministry of Agriculture — Seed Committee Secretariat.',
        ar: 'يتطلب تصدير التقاوي: نموذج التصدير من لجنة التقاوي (+2 صورة)، نموذج رقم (5) تصدير (+2 صورة)، طلب باسم رئيس اللجنة مستوفى فيه الكميات والأصناف والسعر، صورة ترخيص الاتجار في التقاوي، صورة سجل المصدرين، شهادة الفحص أو ما يفيد أن التقاوي تحت الفحص، وسداد الرسوم المقررة. بعد استلام الموافقة تُعتمد من وزارة الزراعة — أمانة لجنة التقاوي.'
      }
    },
    {
      icon: BookOpen,
      image: 'Variety_registration.png',
      title: { en: 'Seed Import', ar: 'استيراد التقاوي' },
      desc: {
        en: 'Seed import requires: import form (+ 2 copies), application to the Committee Chairman specifying quantities, types and prices (+ 2 copies), proforma invoice (+ 5 copies), copy of importers register, copy of seed trading licence, copy of registered varieties for each application from the Variety Registration Committee, copy of origin statement for each variety from Agricultural Quarantine, and payment of fees.',
        ar: 'يتطلب استيراد التقاوي: نموذج الاستيراد (+2 صورة)، طلب باسم رئيس اللجنة مستوفى بالكميات والأصناف والسعر (+2 صورة)، فاتورة مبدئية (+5 صور)، صورة سجل المستوردين، صورة ترخيص الاتجار في التقاوي، صورة من الأصناف المسجلة لكل طلب من لجنة تسجيل الأصناف، صورة من بيان المنشأ لكل صنف من الحجر الزراعي، وسداد الرسوم.'
      }
    },
    {
      icon: Shield,
      image: 'Seed_producer_licensing.png',
      title: { en: 'Field Inspection', ar: 'الإدارة العامة للتفتيش الحقلي' },
      desc: {
        en: 'Field inspection is the first step in seed production certification. The administration consists of four management units: (1) Field Crops Field Inspection, (2) Vegetative Propagation Crops, (3) Vegetable Crops, (4) Quality Control Field Inspection. Required documents: copy of valid production licence, application form, invoice for seed examination, original Form 3 from the Certification Department, contractors list, inspection notification, and payment of prescribed fees.',
        ar: 'التفتيش الحقلي هو أول خطوات اعتماد إنتاج التقاوي. تتكون الإدارة من أربع إدارات فرعية: (1) إدارة التفتيش الحقلي على المحاصيل الحقلية، (2) إدارة التفتيش الحقلي لمحاصيل التكاثر الخضري، (3) إدارة التفتيش الحقلي على محاصيل الخضر، (4) إدارة التفتيش الحقلي على مراقبة الجودة. المستندات المطلوبة: صورة من ترخيص الإنتاج ساري المفعول، طلب باسم الشركة، فاتورة فحص للتقاوي المطلوب استخدامها للزراعة، أصل استمارة 3 من قسم الاعتماد، كشف متعاقدين، إخطار فحص، سداد المصروفات المقررة.'
      }
    },
    {
      icon: Award,
      image: 'Seedcertification.png',
      title: { en: 'Variety Registration', ar: 'تسجيل الأصناف' },
      desc: {
        en: 'All procedures for variety registration are completed through an Egyptian agent or a branch of the foreign company. Documents must be submitted in Arabic (except the authorisation letter and DUS report). The applicant submits an application form to the Technical Secretariat of the Seed Registration Committee, along with a valid certified authorisation from the Egyptian Embassy (for imported varieties), the import approval, and the completed Technical Questionnaire.',
        ar: 'تُستكمل جميع إجراءات تسجيل الأصناف من خلال وكيل مصري أو فرع للشركة الأجنبية، وتُملأ المستندات بالعربية باستثناء خطاب التفويض وتقرير DUS. يُقدّم المتقدم طلباً للأمانة الفنية للجنة تسجيل الأصناف مع تفويض رسمي مصدّق من السفارة المصرية (للأصناف المستوردة) وتصريح الاستيراد والاستبيان الفني.'
      }
    },
    {
      icon: FlaskConical,
      image: 'Seedlab.png',
      title: { en: 'ISTA & OECD Certificates', ar: 'شهادات ISTA وOECD' },
      desc: {
        en: 'CASC issues OECD certificates for eligible seed lots. Procedure: submit attached inspection documents (inspection approval and accreditation approval), submit testing request, sampling and testing are carried out, if lots are accepted all necessary certificates are issued, submit a request to the Head of CASC for the OECD certificate, and pay all fees. The Central Seed Testing Laboratory is an accredited ISTA member operating under a comprehensive Quality Assurance System, with 12 testing stations across governorates.',
        ar: 'تُصدر CASC شهادات OECD للدفعات المؤهلة. الإجراءات: تقديم أوراق التفتيش (موافقة التفتيش وموافقة الاعتماد)، تقديم طلب الفحص، إجراء السحب والفحص، في حالة قبول اللوطات تُستخرج جميع الشهادات، تقديم طلب لرئيس الإدارة لإصدار شهادة OECD، ودفع المصروفات. المختبر المركزي عضو معتمد في ISTA ويعمل وفق نظام شامل لضمان الجودة مع 12 محطة فحص بالمحافظات.'
      }
    },
    {
      icon: Target,
      image: 'Regulatory_compliance.png',
      title: { en: 'Trade & Production Licensing', ar: 'ترخيص الاتجار والإنتاج' },
      desc: {
        en: 'CASC issues licences for seed trading and production to companies and individuals wishing to operate in Egypt\'s seed sector. CASC inspects licensed facilities and can revoke non-compliant licences. Licence holders are required to comply with all seed quality standards and submit to regular CASC field and facility inspections.',
        ar: 'تُصدر CASC تراخيص الاتجار والإنتاج للشركات والأفراد الراغبين في العمل في قطاع التقاوي المصري. تفتش CASC المنشآت المرخصة ويمكنها سحب التراخيص عند عدم الامتثال. يُلزَم حاملو التراخيص بالامتثال لمعايير جودة التقاوي والخضوع لفحوصات CASC الدورية.'
      }
    },
    {
      icon: Users,
      image: 'Public_seed_production.png',
      title: { en: 'Seed Testing', ar: 'فحص التقاوي' },
      desc: {
        en: 'In cases of seed import or export, a sample is drawn by an official committee and sent to the Central Seed Testing Laboratory at CASC to be tested, completing procedures for either importation or exportation. Testing covers germination, purity, moisture content, and seed health according to ISTA standards.',
        ar: 'في حالات استيراد أو تصدير التقاوي، تسحب لجنة رسمية عينة وترسلها إلى المختبر المركزي لفحص التقاوي في CASC لإجراء الاختبارات اللازمة لاستكمال إجراءات الاستيراد أو التصدير. يشمل الفحص الإنبات والنقاء والرطوبة وصحة التقاوي وفق معايير ISTA.'
      }
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
              ? 'الإدارة المركزية لفحص واعتماد البذور إحدى الإدارات المركزية الهامة ضمن قطاع الإنتاج في وزارة الزراعة واستصلاح الأراضي. وهي هيئة حكومية رسمية محايدة لا تقوم بتطوير أو تربية أو إنتاج أو تسويق أو بيع أو تخزين التقاوي. وهي الجهة المفوضة من وزارة الزراعة للقيام بجميع المهام التي تتطلب الحياد في هذا المجال، بما في ذلك تسجيل التقاوي وفحصها واختبارها واعتمادها ومراقبتها. لدى الادارة هيكل تنظيمي قوي يضم ادارات عامة تخدم جميع الانشطة المتعلقة بالتقاوي، بالإضافة إلى معمل مركزي لفحص التقاوي معتمد من قِبل المنظمة الدولية لفحص البذور (ISTA)، وتعمل وفقاً لنظام شامل لضمان الجودة، كما تمتلك 12 محطة فحص موزعة على مختلف المحافظات.'
              : 'The Central Administration for Seed Testing and Certification is one of the important central administrations within the Production Sector of the Ministry of Agriculture and Land Reclamation. It is a neutral, official government body that does not develop, breed, produce, market, sell, or store seeds. It is authorized by the Ministry of Agriculture to carry out all tasks requiring neutrality in this field, including seed registration, inspection, testing, certification, and monitoring. CASC has a strong organizational structure as it includes several general administrations serving all seed-related activities. In addition, the Central Seed Testing Laboratory is an accredited member of the International Seed Testing Organization (ISTA) and operates according to a comprehensive Quality Assurance System, in addition to 12 lab testing stations all over the governorates.'}
          </p>
          </div>
        </div>
      </div>

      {/* CASC Goal & Five General Administrations */}
      <div className="py-16" style={{ backgroundColor: '#f0f7f0' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold mb-4">
            <Target className="w-3 h-3" />
            {isAr ? 'هدف الإدارة المركزية' : "CASC's Goal"}
          </div>
          <h2 className="text-3xl font-semibold text-[#2D4A32] mb-3">
            {isAr ? 'ضمان جودة عالية للتقاوي' : 'Assuring High Quality Seeds'}
          </h2>
          <p className="text-[#3D3D3D] text-sm max-w-2xl mx-auto">
            {isAr
              ? 'يتحقق ذلك من خلال خمس إدارات عامة رئيسية:'
              : 'This is achieved through 5 main important administrations:'}
          </p>
        </div>
        {/* Admin Wiki Modal */}
        {adminModal && ReactDOM.createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/70 overflow-y-auto"
            onClick={() => setAdminModal(null)}
          >
            <div className="min-h-full flex items-center justify-center p-4 py-8">
            <div
              className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-emerald-800 text-white px-6 py-5 rounded-t-2xl">
                <button
                  onClick={() => setAdminModal(null)}
                  className="absolute top-4 right-4 text-white/70 hover:text-white text-lg font-bold leading-none"
                >✕</button>
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 mb-1">CASC</p>
                <h3 className="text-lg font-semibold leading-snug pr-6">
                  {isAr ? adminModal.ar : adminModal.en}
                </h3>
                {!isAr && <p className="text-emerald-300 text-xs mt-1">{adminModal.ar}</p>}
              </div>
              {/* Body */}
              <div className="px-6 py-5 space-y-4">
                <p className="text-sm text-[#3D3D3D] leading-relaxed">
                  {isAr ? adminModal.bodyAr : adminModal.bodyEn}
                </p>
                <div>
                  <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
                    {isAr ? 'الأقسام الفرعية والوظائف الرئيسية' : 'Sub-units & Key Functions'}
                  </p>
                  <ul className="space-y-1.5">
                    {(isAr ? adminModal.pointsAr : adminModal.pointsEn).map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#2D4A32]">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                {adminModal.note && (
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-2 items-start">
                    <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 leading-relaxed">
                      {isAr ? adminModal.note.ar : adminModal.note.en}
                    </p>
                  </div>
                )}
                <p className="text-[10px] text-[#3D3D3D]/50 pt-2 border-t border-amber-50">
                  {isAr ? 'للاستفسار: casc.egypt@hotmail.com' : 'For enquiries: casc.egypt@hotmail.com'}
                </p>
              </div>
            </div>
            </div>
          </div>,
          document.body
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {adminWiki.map((adm, i) => (
            <div
              key={i}
              onClick={() => setAdminModal(adm)}
              className="rounded-2xl p-6 flex items-start gap-4 cursor-pointer group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
              style={{ backgroundColor: '#2D6B2D', boxShadow: '0 4px 16px rgba(45,107,45,0.25)' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}>
                {i === 0 && <Shield className="w-6 h-6 text-white" />}
                {i === 1 && <BookOpen className="w-6 h-6 text-white" />}
                {i === 2 && <FlaskConical className="w-6 h-6 text-white" />}
                {i === 3 && <Award className="w-6 h-6 text-white" />}
                {i === 4 && <Layers className="w-6 h-6 text-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-base leading-snug">{isAr ? adm.ar : adm.en}</p>
                {!isAr && <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.70)' }}>{adm.ar}</p>}
                <p className="text-xs font-semibold mt-3 flex items-center gap-1 transition-all duration-200 group-hover:gap-2"
                  style={{ color: 'rgba(255,255,255,0.85)' }}>
                  {isAr ? 'اضغط لمزيد من التفاصيل' : 'Click for details'}
                  <ChevronRight className="w-3.5 h-3.5" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* PVPO Historical Note + Variety Registration Committee Clarification */}
      <div className="max-w-6xl mx-auto px-4 pb-4 space-y-4">
        {/* PVPO Note */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4 items-start">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-900 mb-1">
              {isAr ? 'ملاحظة: مكتب حماية أصناف النباتات (PVPO)' : 'Note: Plant Variety Protection Office (PVPO)'}
            </p>
            <p className="text-xs text-amber-800 leading-relaxed">
              {isAr
                ? 'ضمت الادارة المركزية لفحص واعتماد التقاوي مكتب حماية أصناف النباتات منذ 2003 حتى عام 2025، حيث تم إنشاؤه بموجب قرار رئيس الوزراء رقم (492) لسنة 2003 والقرار الوزاري رقم 2341 لسنة 2003 (استناداً إلى قانون حماية الملكية الفكرية رقم 82 لسنة 2002، الفصل الرابع). وشهدت الادارة انضمام مصر للاتحاد الدولي لحماية الاصناف النباتية الجديدة في ديسمبر 2019. وقد تم نقل المكتب مؤخراً إلى هيئة مستقلة للملكية الفكرية تُسمى الجهاز المصري للملكية الفكرية منذ مارس 2025. أهم ما يربط CASC بالجهاز المصري للملكية الفكرية الآن هو أن CASC تضطلع بإجراء اختبار DUS المطلوب لحماية الأصناف النباتية.'
                : "CASC included the Plant Variety Protection Office (PVPO) from 2003 until 2025, established by Prime Minister Decision No. 492 of 2003 and Ministerial Decree No. 2341 of 2003 (based on the Intellectual Property Protection Law No. 82 of 2002, Chapter Four). CASC witnessed Egypt's accession to the International Union for the Protection of New Varieties of Plants (UPOV) in December 2019. The office was recently transferred to an independent intellectual property authority named the Egyptian Intellectual Property Authority (EGIPA) in March 2025. The most important connection (cooperation) between CASC and EGIPA now is that CASC is carrying the DUS Test that is required for variety protection."}
            </p>
          </div>
        </div>
        {/* Variety Registration Committee Clarification */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex gap-4 items-start">
          <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-emerald-900 mb-1">
              {isAr ? 'ملاحظة: لجنة تسجيل الحاصلات الزراعية' : 'Note: Agricultural Crops Registration Committee'}
            </p>
            <p className="text-xs text-emerald-800 leading-relaxed">
              {isAr
                ? 'لجنة تسجيل الحاصلات الزراعية هي اللجنة الوحيدة بجمهورية مصر العربية المفوضة من وزارة الزراعة بالقيام بتسجيل أصناف الحاصلات الزراعية. ويحق لكل شخص طبيعي أو معنوي التقدم لتسجيل الأصناف النباتية. وتعمل لجنة التسجيل وفقاً لقانون الزراعة رقم 53 لعام 1966 والقرارات الوزارية المنظمة للعمل. تتبع لجنة تسجيل الأصناف وزارة الزراعة واستصلاح الأراضي، ويفوض رئيس اللجنة بتشكيل الأمانة الفنية للجنة والتي تقوم بالفحص الفني والإداري لطلبات التسجيل المقدمة.'
                : 'The Agricultural Crops Registration Committee is the only committee in the Arab Republic of Egypt authorized by the Ministry of Agriculture to register agricultural crop varieties. Any natural or legal person may apply to register plant varieties. The Registration Committee operates in accordance with Agriculture Law No. 53 of 1966 and the ministerial decrees regulating its work. The Variety Registration Committee is directly under the Ministry of Agriculture and Land Reclamation. The Head of the Registration Committee is authorized to form the Committee\'s Technical Secretariat, which conducts the technical and administrative review of submitted registration applications.'}
            </p>
          </div>
        </div>
      </div>

      {/* Legal Mandate */}
      <div className="bg-amber-50 border-t border-b border-amber-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-emerald-600" />
            <h3 className="text-2xl font-semibold text-[#2D4A32]">{isAr ? 'الأساس القانوني' : 'Legal Mandate'}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { ref: 'Law 94 / 1976', title: { en: 'Seed Law', ar: 'قانون التقاوي' }, desc: { en: 'The primary legal framework governing seed production, marketing, and quality control in Egypt. Forms the constitutional basis for all CASC operations.', ar: 'الإطار القانوني الرئيسي الذي يحكم إنتاج وتسويق ومراقبة جودة التقاوي في مصر. يشكّل الأساس الدستوري لجميع عمليات CASC.' } },
              { ref: 'Min. Decree 2168 / 2008', title: { en: 'Executive Regulations', ar: 'اللائحة التنفيذية' }, desc: { en: 'Detailed executive regulations for Law 94/1976 covering certification procedures, laboratory accreditation, and penalty provisions.', ar: 'اللوائح التنفيذية التفصيلية للقانون 94/1976 التي تغطي إجراءات التصديق واعتماد المختبرات وأحكام العقوبات.' } },
              { ref: 'UPOV 1991 / COMESA', title: { en: 'International Commitments', ar: 'الالتزامات الدولية' }, desc: { en: 'Egypt\'s treaty obligations through UPOV 1991 accession (plant variety protection), COMESA seed trade harmonisation, and OECD seed schemes.', ar: 'التزامات مصر بموجب انضمامها لـ UPOV 1991 (حماية الأصناف)، وتنسيق تجارة التقاوي في الكوميسا، ومخططات OECD للتقاوي.' } },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm">
                <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider">{item.ref}</span>
                <h4 className="font-bold text-[#2D4A32] mt-3 mb-2">{item.title[lang]}</h4>
                <p className="text-[#3D3D3D] text-xs leading-relaxed">{item.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What We Do — Services */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold mb-4">
            <Layers className="w-3 h-3" />
            {isAr ? 'خدماتنا' : 'Our Services'}
          </div>
          <h2 className="text-3xl font-semibold text-[#2D4A32]">{isAr ? 'ماذا تفعل CASC؟' : 'What Does CASC Do?'}</h2>
          <p className="text-[#3D3D3D] mt-3 max-w-2xl mx-auto text-sm">
            {isAr
              ? 'تقدم CASC طيفاً شاملاً من الخدمات التنظيمية التي تغطي دورة حياة التقاوي بالكامل من الإنتاج حتى السوق.'
              : 'CASC delivers a comprehensive range of regulatory services covering the full seed lifecycle from production through to market.'}
          </p>
        </div>
        {/* Lightbox for Variety Registration flowchart */}
        {showFlowchart && ReactDOM.createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4"
            onClick={() => setShowFlowchart(false)}
          >
            <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setShowFlowchart(false)}
                className="absolute -top-10 right-0 text-white text-sm font-semibold flex items-center gap-1 hover:text-orange-300 transition-colors"
              >
                ✕ {isAr ? 'إغلاق' : 'Close'}
              </button>
              <div className="bg-white rounded-2xl p-4 shadow-2xl">
                <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-3 text-center">
                  {isAr ? 'مخطط تدفق تسجيل الأصناف في مصر' : 'Variety Registration Flowchart — Egypt'}
                </p>
                <img
                  src={`${import.meta.env.BASE_URL}var_reg.png`}
                  alt={isAr ? 'مخطط تسجيل الأصناف' : 'Variety Registration flowchart'}
                  className="w-full rounded-xl"
                />
              </div>
            </div>
          </div>,
          document.body
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {services.map((s, i) => {
    const isVarReg = s.title.en === 'Variety Registration';
    return (
    <div
      key={i}
      onClick={isVarReg ? () => setShowFlowchart(true) : undefined}
      className={`group relative overflow-hidden rounded-[32px] shadow-2xl min-h-[460px] ${isVarReg ? 'cursor-pointer' : ''}`}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}${s.image})` }}
      />
      {/* Gradient scrim */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/75 to-transparent" />
      {/* Title strip — bottom only */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-5">
        <div className="rounded-xl bg-white/80 backdrop-blur-sm px-4 py-3 shadow-md flex items-center justify-between gap-2">
          <h4 className="text-sm font-semibold text-[#1f3d2f]">{s.title[lang]}</h4>
          {isVarReg && (
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
              {isAr ? 'عرض المخطط' : 'View flowchart'}
            </span>
          )}
        </div>
      </div>
    </div>
    );
  })}
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

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div className={`${stakeholder.bgColor} ${stakeholder.borderColor} border-2 p-8 rounded-3xl`}>
        <div className="flex items-start gap-4">
          <span className="text-4xl">{stakeholder.emoji}</span>
          <div>
            <p className={`text-xs font-semibold uppercase tracking-widest ${stakeholder.textColor} mb-1`}>
              {stakeholder.label[lang]}
            </p>
            <h3 className="text-2xl font-semibold text-[#2D4A32] leading-tight mb-3">{result.title[lang]}</h3>
            <p className="text-[#2D4A32] leading-relaxed">{result.summary[lang]}</p>
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
            <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm">
              <h4 className="font-semibold text-[#2D4A32] text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-emerald-500" />
                {isAr ? 'الإجراءات خطوة بخطوة' : 'Stepwise Procedure'}
              </h4>
              <ol className="space-y-3">
                {result.procedure[lang].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#2D4A32] leading-relaxed">
                    <span className={`w-6 h-6 rounded-full ${stakeholder.bgColor} ${stakeholder.textColor} text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5 border ${stakeholder.borderColor}`}>
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
            <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm">
              <h4 className="font-semibold text-[#2D4A32] text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-700" />
                {isAr ? 'الجهات المعنية' : 'Relevant Authorities'}
              </h4>
              <div className="space-y-3">
                {authorities.map(auth => (
                  <div key={auth.id} className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                    <div className={`w-10 h-10 ${stakeholder.bgColor} rounded-lg flex items-center justify-center ${stakeholder.textColor} text-xs font-semibold shrink-0`}>
                      {auth.shortName}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#2D4A32] truncate">{auth.name[lang]}</p>
                      <p className="text-[10px] text-[#3D3D3D]/70 flex items-center gap-1 mt-0.5">
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
            <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm">
              <h4 className="font-semibold text-[#2D4A32] text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-700" />
                {isAr ? 'المستندات القانونية' : 'Legal Documents'}
              </h4>
              <div className="space-y-2">
                {documents.map(doc => (
                  <button
                    key={doc.id}
                    onClick={() => onNavigateToDoc(doc.id)}
                    className="w-full text-left flex items-center justify-between p-3 bg-amber-50 hover:bg-emerald-50 rounded-xl transition-all group border border-transparent hover:border-emerald-200"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#2D4A32] group-hover:text-emerald-800">{doc.title[lang]}</p>
                      <p className="text-[10px] text-[#3D3D3D]/70 font-mono">{doc.refNumber}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#3D3D3D]/50 group-hover:text-emerald-600 shrink-0" />
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

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-emerald-950 mb-1">
          {isAr ? 'رحلة المعنيين بالقطاع' : 'Stakeholder Journey'}
        </h2>
        <p className="text-[#3D3D3D] text-sm">
          {isAr ? 'حدد هويتك لنرشدك إلى المعلومات التنظيمية المناسبة.' : 'Identify who you are and we\'ll guide you to the right regulatory information.'}
        </p>
        {selectedStakeholder && (
          <div className="flex gap-2 mt-4">
            {Array.from({ length: progressSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  i < totalDepth ? `bg-${selectedStakeholder.accentColor}-500` : 'bg-slate-200'
                }`}
                style={i < totalDepth ? { backgroundColor: '' } : {}}
              />
            ))}
          </div>
        )}
      </div>

      {/* Step 0: Stakeholder Selection */}
      {!selectedStakeholder && (
        <div>
          <p className="text-sm font-bold text-[#3D3D3D]/70 uppercase tracking-widest mb-6">
            {isAr ? 'من أنت؟' : 'Who are you?'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STAKEHOLDERS.map(s => (
              <button
                key={s.id}
                onClick={() => handleSelectStakeholder(s)}
                className={`${s.bgColor} ${s.borderColor} border-2 p-6 rounded-2xl text-left hover:shadow-lg transition-all group hover:scale-[1.02]`}
              >
                <span className="text-4xl block mb-4">{s.emoji}</span>
                <h3 className={`font-semibold text-[#2D4A32] text-lg mb-1 group-hover:${s.textColor}`}>{s.label[lang]}</h3>
                <p className="text-[#3D3D3D] text-xs leading-relaxed">{s.description[lang]}</p>
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
        <div className="bg-white p-8 rounded-[32px] shadow-xl border border-amber-100">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">{selectedStakeholder.emoji}</span>
            <div>
              <p className={`text-xs font-semibold uppercase tracking-widest ${selectedStakeholder.textColor}`}>{selectedStakeholder.label[lang]}</p>
              <h3 className="text-xl font-semibold text-[#2D4A32]">{currentNode.question[lang]}</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {currentNode.options.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`p-5 border-2 border-amber-100 rounded-xl hover:${selectedStakeholder.borderColor} hover:${selectedStakeholder.bgColor} text-left font-bold transition-all flex items-center justify-between group bg-white`}
              >
                <div>
                  <span className="text-[#2D4A32] font-bold group-hover:text-[#2D4A32]">{opt.label[lang]}</span>
                  {opt.sublabel && <p className="text-xs text-[#3D3D3D]/70 mt-0.5 font-normal">{opt.sublabel[lang]}</p>}
                </div>
                <ChevronRight className={`w-5 h-5 text-[#3D3D3D]/50 group-hover:${selectedStakeholder.textColor} shrink-0`} />
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
      <TopBanner lang={lang} />
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
          />
        )}
        {activeTab === 'library' && <LibraryView lang={lang} initialDocId={selectedDocId} />}
        {activeTab === 'journeys' && <JourneyView lang={lang} onNavigateToDoc={navigateToDoc} />}
        {activeTab === 'catalogue' && <CatalogueView lang={lang} />}
        {activeTab === 'directory' && <DirectoryView lang={lang} />}
        {activeTab === 'contact' && <ContactView lang={lang} />}
      </main>

      <footer className="bg-emerald-950 text-emerald-200 mt-0 border-t border-orange-600/30">
        {/* Top arabesque divider — flipped */}
        <div className="arabesque-divider" style={{ transform: 'scaleY(-1)' }}></div>
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
              <li className="text-emerald-200/80 hover:text-orange-500 cursor-pointer transition-colors" onClick={() => setActiveTab('journeys')}>{lang === 'ar' ? 'رحلات المعنيين' : 'Stakeholder Journeys'}</li>
              <li className="text-emerald-200/80 hover:text-orange-500 cursor-pointer transition-colors" onClick={() => setActiveTab('library')}>{lang === 'ar' ? 'مكتبة التشريعات' : 'Legislation Library'}</li>
              <li className="text-emerald-200/80 hover:text-orange-500 cursor-pointer transition-colors" onClick={() => setActiveTab('catalogue')}>{lang === 'ar' ? 'الكتالوج الوطني' : 'National Variety Catalogue'}</li>
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
              <li>{lang === 'ar' ? 'مختبرات الجودة' : 'Quality Laboratories'}</li>
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
