
import React, { useState, useEffect } from 'react';
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
            <Phone className="w-3 h-3 text-[#2D4A32]" />
            02-35731313
          </span>
          <span className="flex items-center gap-1 text-[#2D4A32]">
            <Mail className="w-3 h-3 text-[#2D4A32]" />
            casc@agr.gov.eg
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
    <nav className="bg-emerald-700 text-white sticky top-0 z-50 shadow-lg border-b border-emerald-800/60">
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
const HomeView: React.FC<{ lang: Language, onStartJourney: () => void, onGoAbout: () => void, onGoLibrary: () => void }> = ({ lang, onStartJourney, onGoAbout, onGoLibrary }) => {
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
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/75 via-emerald-900/70 to-emerald-950/80"></div>
        
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
          <div className="inline-flex items-center gap-2 bg-amber-100/95 text-[#2D4A32] px-4 py-1.5 rounded-sm text-xs font-medium uppercase border border-amber-100">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
            {isAr ? 'الموقع الرسمي لـ CASC' : 'Official CASC Digital Portal · v1.0 Beta'}
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
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
        {/* Bottom arabesque divider */}
        <div className="arabesque-divider"></div>
      </header>

      {/* Stats Strip — inscribed band */}
      <div className="bg-emerald-800 text-white py-10 border-y border-amber-100/30">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: '500+', label: isAr ? 'صنف مسجل' : 'Registered Varieties', icon: BookOpen },
            { num: '12', label: isAr ? 'مختبر معتمد' : 'Certified Laboratories', icon: FlaskConical },
            { num: '4', label: isAr ? 'فئات التصديق' : 'Seed Certification Classes', icon: Award },
            { num: '30+', label: isAr ? 'سنة من الخدمة' : 'Years of Service', icon: Star },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-2 px-4 md:border-s md:border-white/15 md:first:border-s-0">
              <s.icon className="w-5 h-5 text-white/80" />
              <span className="text-4xl font-semibold text-white">{s.num}</span>
              <span className="text-white/70 text-[11px] font-light uppercase">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Quick-access cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-16 px-4 max-w-6xl mx-auto">
          {[
            { onClick: onGoLibrary, accent: 'emerald', icon: BookOpen,
              title: isAr ? 'مكتبة التشريعات' : 'Legislation Library',
              desc:  isAr ? 'الوصول المباشر إلى القوانين والقرارات الوزارية واللوائح المنظمة للقطاع.' : 'Direct access to laws, ministerial decrees, and governing regulations.',
              cta:   isAr ? 'تصفح الآن' : 'Explore Now' },
            { onClick: () => {}, accent: 'amber', icon: BookOpen,
              title: isAr ? 'الكتالوج الوطني للأصناف' : 'National Variety Catalogue',
              desc:  isAr ? 'قاعدة بيانات شاملة للأصناف المسجلة والمعتمدة ومربيها.' : 'Comprehensive database of registered and certified varieties and their breeders.',
              cta:   isAr ? 'عرض الأصناف' : 'View Varieties' },
            { onClick: () => {}, accent: 'blue', icon: MapPin,
              title: isAr ? 'دليل الجهات الرقابية' : 'Regulatory Authority Directory',
              desc:  isAr ? 'دليلك للجهات المسؤولة عن كل مهمة وأماكن التقديم.' : 'Your guide to the authorities responsible for each task and submission points.',
              cta:   isAr ? 'البحث في الدليل' : 'Search Directory' },
          ].map((card, i) => {
            const accentMap: Record<string, { iconBg: string; iconText: string; cta: string; corner: string }> = {
              emerald: { iconBg: 'bg-[#E7FBB4]', iconText: 'text-[#638C6D]', cta: 'text-[#DF6D2D]', corner: 'bg-[#638C6D]' },
            amber:   { iconBg: 'bg-[#E7FBB4]',  iconText: 'text-[#638C6D]', cta: 'text-[#DF6D2D]', corner: 'bg-[#DF6D2D]' },
            blue:    { iconBg: 'bg-[#E7FBB4]',  iconText: 'text-[#638C6D]', cta: 'text-[#DF6D2D]', corner: 'bg-[#638C6D]' },
          };
          const a = accentMap[card.accent];
          return (
            <div
              key={i}
              onClick={card.onClick}
              className="relative bg-white p-8 rounded-2xl shadow-md hover:shadow-xl border border-[#638C6D]/15 hover:border-[#638C6D]/30 transition-all duration-200 cursor-pointer group hover:-translate-y-1"
            >
              {/* Top corner crest */}
              <div className={`absolute top-0 left-0 w-12 h-1 ${a.corner}`}></div>
              <div className={`absolute top-0 left-0 h-12 w-1 ${a.corner}`}></div>

              <div className={`w-12 h-12 ${a.iconBg} ${a.iconText} flex items-center justify-center mb-6 ring-1 ring-current/10`}>
                <card.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-[#2D4A32] mb-3 leading-snug">{card.title}</h3>
              <p className="text-[#3D3D3D] text-sm leading-relaxed mb-5">{card.desc}</p>
              <span className={`${a.cta} font-semibold text-sm flex items-center gap-1 gold-underline inline-block`}>
                {card.cta} <ChevronRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
              </span>
            </div>
          );
        })}
      </div>

      {/* About CASC Teaser */}
      <div className="bg-parchment-50 border-y border-parchment-200 py-20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-[#2D4A32] px-0 py-1 text-[11px] font-medium uppercase">
              <Shield className="w-3 h-3 text-emerald-700" />
              {isAr ? 'من نحن' : 'Who We Are'}
            </div>
            <h2 className="text-4xl font-bold text-[#2D4A32] leading-tight">
              {isAr
                ? 'الجهة الوطنية المسؤولة عن تصديق وتنظيم قطاع التقاوي في مصر'
                : "Egypt's National Authority for Seed Certification & Regulation"}
            </h2>
            <div className="h-px w-16 bg-orange-500/70"></div>
            <p className="text-[#3D3D3D] leading-relaxed text-[15px]">
              {isAr
                ? 'تأسست الإدارة المركزية لتصديق التقاوي (CASC) تحت مظلة وزارة الزراعة واستصلاح الأراضي لتكون المرجع الرسمي لتصديق التقاوي وتسجيل الأصناف وإصدار تراخيص الإنتاج والاستيراد والتصدير، بهدف ضمان سلامة القطاع وجودته.'
                : 'The Central Administration for Seed Testing and Certification (CASC) operates under the Ministry of Agriculture & Land Reclamation as the official national authority for seed certification, variety registration, and issuing production, import, and export licences to ensure sector quality and compliance.'}
            </p>
            <button
              onClick={onGoAbout}
              className="bg-emerald-800 hover:bg-emerald-900 text-white px-6 py-3 font-semibold tracking-wide flex items-center gap-2 transition-all shadow-minted"
            >
              {isAr ? 'اعرف المزيد عن CASC' : 'Learn More About CASC'}
              <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Award, title: isAr ? 'تصديق التقاوي' : 'Seed Certification', desc: isAr ? '4 فئات: مربي، أساس، مسجل، معتمد' : '4 classes: Breeder, Foundation, Registered, Certified' },
              { icon: BookOpen, title: isAr ? 'تسجيل الأصناف' : 'Variety Registration', desc: isAr ? 'الكتالوج الوطني للأصناف المعتمدة' : 'National catalogue of approved varieties' },
              { icon: Shield, title: isAr ? 'تراخيص الإنتاج' : 'Production Licences', desc: isAr ? 'ترخيص منتجي ومعالجي التقاوي' : 'Licensing seed producers and processors' },
              { icon: Globe, title: isAr ? 'تصاريح الاستيراد والتصدير' : 'Import / Export Permits', desc: isAr ? 'الموافقة الفنية لحركة التقاوي الدولية' : 'Technical approval for international seed movement' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-amber-100">
                <item.icon className="w-6 h-6 text-emerald-700 mb-3" />
                <h4 className="font-bold text-[#2D4A32] text-sm mb-1">{item.title}</h4>
                <p className="text-[#3D3D3D] text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
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
  const [cropFilter, setCropFilter] = useState('All');

  const filtered = MOCK_VARIETIES.filter(v => 
    (cropFilter === 'All' || v.crop.en === cropFilter) &&
    (v.name[lang].toLowerCase().includes(search.toLowerCase()) || v.crop[lang].includes(search))
  );

  const crops = Array.from(new Set(MOCK_VARIETIES.map(v => v.crop.en)));

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-grow">
          <label className="block text-xs font-bold text-[#3D3D3D]/70 uppercase tracking-widest mb-2">{isAr ? 'البحث في الكتالوج' : 'Search Catalogue'}</label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3D3D3D]/50 w-5 h-5" />
            <input 
              type="text"
              placeholder={isAr ? 'ابحث عن صنف أو محصول...' : 'Search variety or crop...'}
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-amber-100 rounded-xl focus:border-emerald-500 outline-none shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full md:w-48">
          <label className="block text-xs font-bold text-[#3D3D3D]/70 uppercase tracking-widest mb-2">{isAr ? 'المحصول' : 'Crop'}</label>
          <select 
            className="w-full p-3 bg-white border-2 border-amber-100 rounded-xl outline-none shadow-sm"
            onChange={(e) => setCropFilter(e.target.value)}
          >
            <option value="All">{isAr ? 'الكل' : 'All Crops'}</option>
            {crops.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(v => (
          <div key={v.id} className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase mb-1 inline-block">
                  {v.crop[lang]}
                </span>
                <h3 className="text-xl font-semibold text-[#2D4A32]">{v.name[lang]}</h3>
              </div>
              <span className={`px-2 py-1 rounded text-[10px] font-medium uppercase ${v.status === 'Active' ? 'text-emerald-600 bg-emerald-50' : 'text-[#3D3D3D]/70 bg-amber-50'}`}>
                {v.status}
              </span>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-xs">
                <span className="text-[#3D3D3D]/70">{isAr ? 'المربي/المسجل' : 'Maintainer'}</span>
                <span className="text-[#3D3D3D] font-medium">{v.maintainer[lang]}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#3D3D3D]/70">{isAr ? 'تاريخ التسجيل' : 'Registered On'}</span>
                <span className="text-[#3D3D3D] font-medium">{v.registrationDate}</span>
              </div>
            </div>
            <button className="w-full bg-amber-50 hover:bg-emerald-50 text-emerald-700 text-xs font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              {isAr ? 'عرض قرار التسجيل' : 'View Registration Decree'}
            </button>
          </div>
        ))}
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

  const services = [
    {
      icon: Award,
      image: 'Seedcertification.png',
      title: { en: 'Seed Certification', ar: 'تصديق التقاوي' },
      desc: { en: 'CASC certifies seed lots across four official classes — Breeder, Foundation, Registered, and Certified — through rigorous field and laboratory inspection to ensure genetic purity and physical quality standards.', ar: 'تصدّق CASC دفعات التقاوي عبر أربع فئات رسمية — مربي، أساس، مسجل، ومعتمد — من خلال فحص حقلي ومختبري صارم لضمان النقاء الوراثي وجودة التقاوي.' }
    },
    {
      icon: BookOpen,
      image: 'Variety_registration.png',
      title: { en: 'Variety Registration & National Catalogue', ar: 'تسجيل الأصناف والكتالوج الوطني' },
      desc: { en: 'New crop varieties must pass DUS (Distinctness, Uniformity, Stability) and VCU (Value for Cultivation and Use) testing before entering the National Catalogue. CASC manages this process and maintains the registry.', ar: 'يجب أن تجتاز الأصناف الجديدة اختبارات DUS (التمايز والتجانس والثبات) و VCU (القيمة للزراعة والاستخدام) قبل إدراجها في الكتالوج الوطني. تتولى CASC إدارة هذه العملية.' }
    },
    {
      icon: Shield,
      image: 'Seed_producer_licensing.png',
      title: { en: 'Seed Producer Licensing', ar: 'ترخيص منتجي التقاوي' },
      desc: { en: 'Companies and individuals wishing to produce or process seeds in Egypt must obtain an annual production licence from CASC. CASC inspects licensed facilities and can revoke non-compliant licences.', ar: 'يجب على الشركات والأفراد الراغبين في إنتاج أو معالجة التقاوي في مصر الحصول على ترخيص إنتاج سنوي من CASC، التي تفتش المنشآت المرخصة.' }
    },
    {
      icon: Users,
      image: 'Public_seed_production.png',
      title: { en: 'Public Seed Production', ar: 'إنتاج التقاوي العامة' },
      desc: { en: 'CASP supplies certified wheat, rice and strategic crop seed through state multiplication farms and licensed cooperatives, turning ARC foundation seed into blue-tagged farmer-ready lots.', ar: 'CASP تزود التقاوي المعتمدة للقمح والأرز والمحاصيل الاستراتيجية من خلال مزارع التكاثر الحكومية والجمعيات التعاونية المرخصة، محولة تقاوي ARC الأساسية إلى دفعات جاهزة للمزارعين بعلامة زرقاء.' }
    },
    {
      icon: Globe,
      image: 'Import_export_permit.png',
      title: { en: 'Import & Export Permits', ar: 'تصاريح الاستيراد والتصدير' },
      desc: { en: 'All seed imports require a prior import permit from CASC, coordinated with CAPQ for phytosanitary inspection. Exported seed lots receive an official CASC certificate of conformity for international recognition.', ar: 'يتطلب استيراد التقاوي الحصول على تصريح استيراد مسبق من CASC، منسقاً مع CAPQ للفحص الصحي النباتي. تحصل دفعات التقاوي المُصدَّرة على شهادة مطابقة رسمية من CASC.' }
    },
    {
      icon: FlaskConical,
      image: 'Seedlab.png',
      title: { en: 'Seed Quality Testing Laboratories', ar: 'مختبرات اختبار جودة التقاوي' },
      desc: { en: 'CASC operates a network of 12+ accredited seed testing laboratories across Egypt applying ISTA (International Seed Testing Association) methods for germination, purity, moisture, and health testing.', ar: 'تدير CASC شبكة من أكثر من 12 مختبراً معتمداً لاختبار التقاوي في جميع أنحاء مصر، تطبّق طرق ISTA لاختبار الإنبات والنقاء والرطوبة والصحة.' }
    },
    {
      icon: Target,
      image: 'Regulatory_compliance.png',
      title: { en: 'Regulatory Compliance & Enforcement', ar: 'الامتثال التنظيمي والإنفاذ' },
      desc: { en: 'CASC enforces Egypt\'s seed laws (Law 94/1976 and its executive regulations), investigates quality complaints, withdraws substandard lots from the market, and coordinates with CAPQ on quarantine violations.', ar: 'تنفّذ CASC قوانين التقاوي المصرية (القانون 94/1976 ولائحته التنفيذية)، وتحقق في شكاوى الجودة، وتسحب الدفعات دون المستوى من السوق.' }
    },
  ];

  const contactPoints = [
    { label: { en: 'Head Office', ar: 'المقر الرئيسي' }, value: { en: 'Central Administration for Seed Testing and Certification, Ministry of Agriculture Building, Nadi El-Seid St., Dokki, Giza, Egypt', ar: 'الإدارة المركزية لتصديق التقاوي، مبنى وزارة الزراعة، شارع نادي الصيد، الدقي، الجيزة، جمهورية مصر العربية' }, icon: MapPin },
    { label: { en: 'Main Phone', ar: 'الهاتف الرئيسي' }, value: { en: '+20 2 3573-1313', ar: '02-35731313' }, icon: Phone },
    { label: { en: 'Email', ar: 'البريد الإلكتروني' }, value: { en: 'casc@agr.gov.eg', ar: 'casc@agr.gov.eg' }, icon: Mail },
    { label: { en: 'Working Hours', ar: 'ساعات العمل' }, value: { en: 'Sun – Thu: 8:30 AM – 3:00 PM (public services counter)', ar: 'الأحد – الخميس: 8:30 صباحاً – 3:00 مساءً (نافذة خدمة الجمهور)' }, icon: Clock },
  ];

  return (
    <div className="animate-fade-in">

      {/* Hero */}
      <div className="relative bg-emerald-950 text-white py-20 px-4 border-b border-orange-400/30 overflow-hidden">
  {/* Seed store background image — zoomed to fill, lightly visible over dark green */}
  <div
    className="absolute inset-0 bg-cover bg-center scale-105"
    style={{ backgroundImage: `url(${import.meta.env.BASE_URL}Seed_store.png)` }}
  />
  {/* Dark green tint — 82% opacity keeps brand colour dominant, image visible subtly */}
  <div className="absolute inset-0 bg-emerald-950/82" />
  {/* Radial highlight retained, sits on top */}
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(218,216,135,0.06),transparent_70%)] pointer-events-none"></div>
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <img
            src={`${import.meta.env.BASE_URL}CASC-logo.png`}
            alt={isAr ? 'شعار الإدارة المركزية لتصديق التقاوي' : 'CASC logo'}
            className="h-24 w-auto mx-auto bg-white rounded-md p-2 shadow-2xl ring-1 ring-orange-400/40"
          />
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            {isAr ? 'الإدارة المركزية لتصديق التقاوي' : 'Central Administration for Seed Testing and Certification'}
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-orange-400/60"></div>
            <svg className="w-3 h-3 text-orange-400" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0 L10 6 L16 8 L10 10 L8 16 L6 10 L0 8 L6 6 Z"/></svg>
            <div className="h-px w-10 bg-orange-400/60"></div>
          </div>
          <p className="italic text-amber-200/90 text-lg">
            {isAr ? 'وزارة الزراعة واستصلاح الأراضي — جمهورية مصر العربية' : 'Ministry of Agriculture & Land Reclamation — Arab Republic of Egypt'}
          </p>
          <p className="text-emerald-100/80 max-w-2xl mx-auto leading-relaxed text-sm">
            {isAr
              ? 'الجهة الرسمية المنوط بها تنظيم قطاع التقاوي في مصر: التصديق، التسجيل، الترخيص، والرقابة على الجودة منذ عام 1976.'
              : "The official national body mandated to regulate Egypt's seed sector: certification, variety registration, producer licensing, and quality control since 1976."}
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#2D4A32]">{isAr ? 'مهمتنا' : 'Our Mission'}</h3>
          </div>
          <p className="text-emerald-800 leading-relaxed">
            {isAr
              ? 'ضمان توافر تقاوي عالية الجودة لجميع المزارعين المصريين من خلال نظام تصديق صارم وشفاف، يحمي القطاع الزراعي ويعزز الإنتاجية الوطنية، مع تيسير التجارة الدولية في التقاوي وفقاً للمعايير الدولية المعتمدة.'
              : 'To ensure high-quality seeds are available to all Egyptian farmers through a rigorous, transparent certification system that protects the agricultural sector and enhances national productivity, while facilitating international seed trade in accordance with globally recognised standards.'}
          </p>
        </div>
        <div className="bg-amber-50 border border-amber-100 p-8 rounded-3xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#2D4A32]">{isAr ? 'رؤيتنا' : 'Our Vision'}</h3>
          </div>
          <p className="text-amber-800 leading-relaxed">
            {isAr
              ? 'أن تكون مصر مركزاً إقليمياً رائداً في إنتاج التقاوي وتجارتها بحلول عام 2030، من خلال نظام تنظيمي رقمي متكامل يضع CASC في مقدمة مؤسسات تصديق التقاوي الأفريقية والشرق أوسطية.'
              : 'For Egypt to become a leading regional hub for seed production and trade by 2030, through an integrated digital regulatory system that positions CASC at the forefront of African and Middle Eastern seed certification institutions.'}
          </p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {services.map((s, i) => (
    <div key={i} className="group relative overflow-hidden rounded-[32px] shadow-2xl min-h-[460px]">
      {/* Background image — fills entire card */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}${s.image})` }}
      />
      {/* Gradient scrim at bottom for readability */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      {/* Text box pinned to bottom */}
      <div className="absolute inset-x-5 bottom-5 z-10">
        <div className="rounded-2xl bg-white/75 backdrop-blur-md p-5 shadow-lg">
          <h4 className="text-base font-semibold text-[#1f3d2f] mb-1.5">{s.title[lang]}</h4>
          <p className="text-sm text-slate-800 leading-relaxed">{s.desc[lang]}</p>
        </div>
      </div>
    </div>
  ))}
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
              { dept: { en: 'Seed Certification Dept.', ar: 'قسم تصديق التقاوي' }, contact: 'casc-cert@agr.gov.eg' },
              { dept: { en: 'Variety Registration Dept.', ar: 'قسم تسجيل الأصناف' }, contact: 'casc-variety@agr.gov.eg' },
              { dept: { en: 'Import/Export Permits', ar: 'قسم تصاريح الاستيراد والتصدير' }, contact: 'casc-trade@agr.gov.eg' },
              { dept: { en: 'Seed Quality Labs', ar: 'مختبرات جودة التقاوي' }, contact: 'casc-labs@agr.gov.eg' },
              { dept: { en: 'Seed Production Dept.', ar: 'قسم إنتاج التقاوي' }, contact: '+20 2 35694060 / +20 2 35725986' },
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

  const navigateToDoc = (docId: string) => {
    setSelectedDocId(docId);
    setActiveTab('library');
  };

  return (
    <div className="min-h-screen bg-parchment-50 bg-papyrus flex flex-col font-sans">
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
              <p className="flex items-center gap-2"><MapPin className="w-3 h-3 text-orange-400 shrink-0" /> {lang === 'ar' ? 'نادي الصيد، الدقي، الجيزة، جمهورية مصر العربية' : 'Nadi El-Seid St., Dokki, Giza, Egypt'}</p>
              <p className="flex items-center gap-2"><Phone className="w-3 h-3 text-orange-400 shrink-0" /> +20 2 3573-1313</p>
              <p className="flex items-center gap-2"><Mail className="w-3 h-3 text-orange-400 shrink-0" /> casc@agr.gov.eg</p>
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
