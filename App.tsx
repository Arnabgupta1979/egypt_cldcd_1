
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
  Clock
} from 'lucide-react';
import { Language, Document, DocStatus, Variety, Authority } from './types';
import { MOCK_DOCS, MOCK_VARIETIES, MOCK_AUTHORITIES } from './constants';
import { getDocumentSummary } from './geminiService';

// --- Components ---

const Navbar: React.FC<{ 
  lang: Language, 
  setLang: (l: Language) => void,
  activeTab: string,
  setActiveTab: (t: string) => void
}> = ({ lang, setLang, activeTab, setActiveTab }) => {
  const isAr = lang === 'ar';
  
  const navItems = [
    { id: 'home', label: isAr ? 'الرئيسية' : 'Home', icon: Home },
    { id: 'journeys', label: isAr ? 'المهام' : 'Journeys', icon: ArrowRight },
    { id: 'library', label: isAr ? 'المكتبة' : 'Library', icon: FileText },
    { id: 'catalogue', label: isAr ? 'الكتالوج' : 'Catalogue', icon: BookOpen },
    { id: 'directory', label: isAr ? 'الدليل' : 'Directory', icon: MapPin },
    { id: 'contact', label: isAr ? 'تواصل' : 'Contact', icon: Mail },
  ];

  return (
    <nav className="bg-emerald-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-emerald-900 font-bold">E</div>
              <span className="font-bold text-lg hidden md:block">
                {isAr ? 'بوابة التقاوي المصرية' : 'Egypt Seed Portal'}
              </span>
            </div>
            <div className="hidden md:flex ml-10 items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                    activeTab === item.id ? 'bg-emerald-700 text-white' : 'text-emerald-100 hover:bg-emerald-800'
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
              className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 px-3 py-1.5 rounded-full border border-emerald-600 transition-all"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-semibold">{isAr ? 'English' : 'العربية'}</span>
            </button>
            <div className="border-l border-emerald-700 h-6 mx-2"></div>
            <button className="flex items-center gap-2 text-emerald-100 hover:text-white transition-colors">
              <User className="w-5 h-5" />
              <span className="hidden sm:inline text-sm">{isAr ? 'دخول' : 'Login'}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// --- View: Home ---
const HomeView: React.FC<{ lang: Language, onStartJourney: () => void }> = ({ lang, onStartJourney }) => {
  const isAr = lang === 'ar';
  return (
    <div className="space-y-12 py-8 animate-fade-in">
      <header className="text-center space-y-4 px-4 pt-8">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1 rounded-full text-sm font-bold border border-emerald-100 mb-4">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          {isAr ? 'نسخة v1.0 التجريبية' : 'v1.0 Beta Version'}
        </div>
        <h1 className="text-5xl font-extrabold text-emerald-900 tracking-tight leading-tight">
          {isAr ? 'بوابتك الرقمية لتنظيم التقاوي في مصر' : 'The Official Egypt Seed Regulatory Portal'}
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          {isAr 
            ? 'توفير وصول شفاف وموثوق إلى التشريعات والقرارات والخدمات الإرشادية لقطاع التقاوي.' 
            : 'Providing transparent, reliable, and user-friendly access to seed regulatory information, decrees, and guidance.'}
        </p>
        <div className="flex justify-center gap-4 pt-6">
          <button 
            onClick={onStartJourney}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold shadow-xl flex items-center gap-3 transition-all transform hover:-translate-y-1"
          >
            {isAr ? 'ابدأ رحلة المهام (الويزارد)' : 'Start Task-Based Journey'}
            <ArrowRight className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
          </button>
          <button 
            className="bg-white border-2 border-emerald-100 hover:border-emerald-200 text-emerald-800 px-8 py-4 rounded-xl font-bold transition-all"
          >
            {isAr ? 'تصفح المكتبة' : 'Browse Library'}
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all border-b-4 border-b-emerald-600">
           <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
             <FileText className="w-6 h-6" />
           </div>
           <h3 className="text-xl font-bold text-slate-800 mb-3">{isAr ? 'مكتبة التشريعات' : 'Legislation Library'}</h3>
           <p className="text-slate-600 text-sm leading-relaxed mb-4">
             {isAr ? 'الوصول المباشر إلى القوانين والقرارات الوزارية واللوائح المنظمة للقطاع.' : 'Direct access to laws, ministerial decrees, and governing regulations.'}
           </p>
           <button className="text-emerald-700 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
             {isAr ? 'تصفح الآن' : 'Explore Now'} <ChevronRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
           </button>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all border-b-4 border-b-amber-500">
           <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6">
             <BookOpen className="w-6 h-6" />
           </div>
           <h3 className="text-xl font-bold text-slate-800 mb-3">{isAr ? 'كتالوج الأصناف' : 'Variety Catalogue'}</h3>
           <p className="text-slate-600 text-sm leading-relaxed mb-4">
             {isAr ? 'قاعدة بيانات شاملة للأصناف المسجلة والمعتمدة ومربيها.' : 'Comprehensive database of registered and certified varieties and their breeders.'}
           </p>
           <button className="text-amber-700 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
             {isAr ? 'عرض الأصناف' : 'View Varieties'} <ChevronRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
           </button>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all border-b-4 border-b-sky-500">
           <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center mb-6">
             <MapPin className="w-6 h-6" />
           </div>
           <h3 className="text-xl font-bold text-slate-800 mb-3">{isAr ? 'دليل الجهات' : 'Authority Directory'}</h3>
           <p className="text-slate-600 text-sm leading-relaxed mb-4">
             {isAr ? 'دليلك للجهات المسؤولة عن كل مهمة وأماكن التقديم.' : 'Your guide to the authorities responsible for each task and submission points.'}
           </p>
           <button className="text-sky-700 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
             {isAr ? 'البحث في الدليل' : 'Search Directory'} <ChevronRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
           </button>
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
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder={isAr ? 'ابحث عن قرار، قانون، أو موضوع...' : 'Search for a decree, law, or topic...'}
              className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4">{isAr ? 'العنوان' : 'Title'}</th>
                    <th className="px-6 py-4">{isAr ? 'رقم المرجع' : 'Ref #'}</th>
                    <th className="px-6 py-4">{isAr ? 'الجهة' : 'Authority'}</th>
                    <th className="px-6 py-4">{isAr ? 'الحالة' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
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
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
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
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200 sticky top-24 space-y-6 animate-slide-in">
              <div>
                <h2 className="text-xl font-extrabold text-emerald-900 leading-tight mb-2">{selectedDoc.title[lang]}</h2>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">{selectedDoc.type}</span>
              </div>
              
              {selectedDoc.status === DocStatus.SUPERSEDED && (
                <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                  <div className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                    <div className="text-sm">
                      <p className="font-bold text-amber-900">{isAr ? 'ملغى بالإصدار الجديد' : 'Superseded'}</p>
                      <button 
                        onClick={() => setSelectedDoc(MOCK_DOCS.find(d => d.id === selectedDoc.latestVersionId) || null)}
                        className="text-amber-700 underline font-bold mt-1"
                      >
                        {isAr ? 'انتقل للإصدار الحالي' : 'Go to Current Version'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  {isAr ? 'ملخص ذكي' : 'AI Analysis'}
                </h3>
                <div className="p-4 bg-slate-50 rounded-xl text-sm text-slate-700 leading-relaxed italic border border-slate-100">
                  {loadingSummary ? (
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                      <span>{isAr ? 'جاري التحليل التلقائي...' : 'Generating summary...'}</span>
                    </div>
                  ) : summary}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold mb-1">{isAr ? 'تاريخ الإصدار' : 'Issue Date'}</span>
                  <span className="text-xs font-bold text-slate-700">{selectedDoc.issueDate}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold mb-1">{isAr ? 'اللغة' : 'Language'}</span>
                  <span className="text-xs font-bold text-slate-700">{selectedDoc.language}</span>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <button 
                  onClick={handleDownload}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {isAr ? 'تحميل بصيغة PDF' : 'Download PDF'}
                </button>
                <button className="w-full border-2 border-emerald-700 text-emerald-800 hover:bg-emerald-50 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                  <Globe className="w-4 h-4" />
                  {isAr ? 'عرض النص (HTML)' : 'View Text Version'}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 p-10 rounded-2xl border-4 border-dashed border-slate-200 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                <FileText className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{isAr ? 'اختر وثيقة' : 'Select a Document'}</h3>
              <p className="text-slate-500 text-sm max-w-[200px] mx-auto">
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
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{isAr ? 'البحث في الكتالوج' : 'Search Catalogue'}</label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text"
              placeholder={isAr ? 'ابحث عن صنف أو محصول...' : 'Search variety or crop...'}
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-100 rounded-xl focus:border-emerald-500 outline-none shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full md:w-48">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{isAr ? 'المحصول' : 'Crop'}</label>
          <select 
            className="w-full p-3 bg-white border-2 border-slate-100 rounded-xl outline-none shadow-sm"
            onChange={(e) => setCropFilter(e.target.value)}
          >
            <option value="All">{isAr ? 'الكل' : 'All Crops'}</option>
            {crops.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(v => (
          <div key={v.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase mb-1 inline-block">
                  {v.crop[lang]}
                </span>
                <h3 className="text-xl font-extrabold text-slate-800">{v.name[lang]}</h3>
              </div>
              <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${v.status === 'Active' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 bg-slate-50'}`}>
                {v.status}
              </span>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">{isAr ? 'المربي/المسجل' : 'Maintainer'}</span>
                <span className="text-slate-700 font-bold">{v.maintainer[lang]}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">{isAr ? 'تاريخ التسجيل' : 'Registered On'}</span>
                <span className="text-slate-700 font-bold">{v.registrationDate}</span>
              </div>
            </div>
            <button className="w-full bg-slate-50 hover:bg-emerald-50 text-emerald-700 text-xs font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-2">
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
          <h2 className="text-3xl font-black mb-4">{isAr ? 'دليل الهيئات والجهات الرقابية' : 'Regulatory Authority Directory'}</h2>
          <p className="text-emerald-100 mb-6">
            {isAr ? 'ابحث عن الجهة المسؤولة عن مهمتك وكيفية التواصل معها.' : 'Find the authority responsible for your task and how to reach them.'}
          </p>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setSelectedTask('All')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${selectedTask === 'All' ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-800 hover:bg-emerald-700'}`}
            >
              {isAr ? 'الكل' : 'All Tasks'}
            </button>
            {allTasks.map(t => (
              <button 
                key={t}
                onClick={() => setSelectedTask(t)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${selectedTask === t ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-800 hover:bg-emerald-700'}`}
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
          <div key={auth.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-700 text-xl font-black">
                {auth.shortName}
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800">{auth.name[lang]}</h3>
                <span className="text-xs text-emerald-600 font-bold">{auth.id.toUpperCase()}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-slate-300 shrink-0" />
                <p className="text-sm text-slate-600">{auth.address[lang]}</p>
              </div>
              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-slate-300 shrink-0" />
                <p className="text-sm text-slate-600">{auth.email}</p>
              </div>
              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-slate-300 shrink-0" />
                <p className="text-sm text-slate-600">{auth.phone}</p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-50">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">{isAr ? 'المهام والمسؤوليات' : 'Tasks & Responsibilities'}</h4>
              <div className="flex flex-wrap gap-2">
                {auth.tasks.map(t => (
                  <span key={t} className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold">
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
                  className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl flex items-center justify-center transition-all"
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
        <h2 className="text-4xl font-black text-emerald-950 mb-4">{isAr ? 'اسأل خبيراً' : 'Ask an Expert'}</h2>
        <p className="text-slate-600">
          {isAr ? 'سيتم توجيه سؤالك تلقائياً إلى الجهة المختصة بناءً على سياق بحثك.' : 'Your inquiry will be automatically routed to the responsible authority based on your context.'}
        </p>
      </div>

      <div className="bg-white p-10 rounded-3xl shadow-2xl border border-slate-100">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">{isAr ? 'الاسم الكامل' : 'Full Name'}</label>
              <input type="text" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">{isAr ? 'البريد الإلكتروني' : 'Email Address'}</label>
              <input type="email" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500" required />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">{isAr ? 'الموضوع' : 'Subject'}</label>
            <input type="text" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">{isAr ? 'الرسالة' : 'Message'}</label>
            <textarea rows={5} className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
          </div>

          <div className="p-4 bg-sky-50 rounded-xl flex gap-3 items-start">
            <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <p className="text-xs text-sky-800 leading-relaxed">
              {isAr 
                ? 'سيتم إرفاق بيانات جلستك الحالية (المستندات التي تصفحتها) لمساعدة الخبراء في الرد بشكل أدق.' 
                : 'Your session metadata (browsed documents) will be attached to help our experts provide an accurate response.'}
            </p>
          </div>

          <button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black py-4 rounded-2xl shadow-lg transition-all transform hover:scale-[1.02]">
            {isAr ? 'إرسال الاستفسار' : 'Send Inquiry'}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- View: Journey Wizard ---
const JourneyView: React.FC<{ lang: Language, onNavigateToDoc: (id: string) => void }> = ({ lang, onNavigateToDoc }) => {
  const isAr = lang === 'ar';
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<any>({});

  // Defined steps based on PDF branching for "Import"
  const steps = [
    { 
      id: 'crop',
      title: isAr ? 'ما هو نوع المحصول؟' : 'What is the crop type?', 
      options: [
        { id: 'potato', label: isAr ? 'بطاطس (تقاوي)' : 'Potato (Seed Tubers)' },
        { id: 'field', label: isAr ? 'محاصيل حقلية (قمح، ذرة)' : 'Field Crops (Wheat, Corn)' },
        { id: 'veg', label: isAr ? 'خضروات' : 'Vegetables' }
      ] 
    },
    { 
      id: 'purpose',
      title: isAr ? 'ما هو الغرض من الاستيراد؟' : 'Import Purpose?', 
      options: [
        { id: 'commercial', label: isAr ? 'تجاري' : 'Commercial' },
        { id: 'trial', label: isAr ? 'تجريبي / بحثي' : 'Research / Trial' }
      ] 
    },
    { 
      id: 'origin',
      title: isAr ? 'بلد المنشأ' : 'Country of Origin', 
      options: [
        { id: 'eu', label: isAr ? 'الاتحاد الأوروبي' : 'European Union' },
        { id: 'usa', label: isAr ? 'الولايات المتحدة' : 'USA' },
        { id: 'other', label: isAr ? 'دول أخرى' : 'Other Countries' }
      ] 
    },
  ];

  const handleSelect = (valId: string) => {
    setFormData({ ...formData, [steps[step].id]: valId });
    setStep(step + 1);
  };

  const handleDownloadPackage = () => {
    // Collect package content
    const date = new Date().toLocaleDateString();
    const cropText = steps[0].options.find(o => o.id === formData.crop)?.label;
    const purposeText = steps[1].options.find(o => o.id === formData.purpose)?.label;
    const originText = steps[2].options.find(o => o.id === formData.origin)?.label;

    const content = `
${isAr ? 'بوابة التقاوي المصرية' : 'Egypt Seed Portal'} - ${isAr ? 'حزمة إجراءات الاستيراد' : 'Import Action Package'}
------------------------------------------------------------
${isAr ? 'تاريخ الإنشاء:' : 'Generated Date:'} ${date}

${isAr ? 'المعايير المختارة:' : 'Selected Criteria:'}
- ${isAr ? 'المحصول:' : 'Crop:'} ${cropText}
- ${isAr ? 'الغرض:' : 'Purpose:'} ${purposeText}
- ${isAr ? 'المنشأ:' : 'Origin:'} ${originText}

${isAr ? 'المستندات المطلوبة واللوائح المرتبطة:' : 'Required Documents & Associated Regulations:'}
1. ${isAr ? 'تصريح استيراد من CAPQ' : 'Import Permit from CAPQ'} (Ref: 562/2019)
2. ${isAr ? 'شهادة صحة نباتية' : 'Phytosanitary Certificate'} (IPPC Standards)
3. ${isAr ? 'شهادة جودة ISTA' : 'ISTA Quality Certificate'} (Law 53/1966)
${formData.crop === 'potato' ? `4. ${isAr ? 'قرار معايير استيراد البطاطس' : 'Potato Import Standards'} (Ref: 1485/2015)` : ''}

${isAr ? 'ملاحظات هامة:' : 'Important Notes:'}
${formData.crop === 'potato' ? (isAr ? '- الموعد النهائي لوصول شحنات البطاطس الصيفية هو 10 يناير.' : '- Deadline for summer potato shipments is Jan 10.') : ''}
${isAr ? '- يرجى مراجعة الدليل لمعرفة قنوات التقديم الرسمية.' : '- Please check the directory for official submission channels.'}
------------------------------------------------------------
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Seed_Import_Package_${formData.crop || 'Generic'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-fade-in">
      <div className="mb-12">
        <h2 className="text-3xl font-black text-emerald-950 mb-2">{isAr ? 'دليل استيراد التقاوي' : 'Seed Import Navigator'}</h2>
        <div className="flex gap-3 mb-6">
          {steps.map((_, i) => (
            <div key={i} className={`h-2 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-amber-400' : 'bg-slate-200'}`} />
          ))}
        </div>
      </div>

      {step < steps.length ? (
        <div className="bg-white p-12 rounded-[40px] shadow-2xl border border-slate-100">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-black text-slate-800">{steps[step].title}</h3>
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="text-slate-400 hover:text-emerald-700 flex items-center gap-1 font-bold">
                <ChevronLeft className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} /> {isAr ? 'رجوع' : 'Back'}
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {steps[step].options.map((opt) => (
              <button 
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className="p-6 border-2 border-slate-50 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50 text-left font-bold transition-all flex items-center justify-between group bg-white shadow-sm"
              >
                <span className="text-slate-700 text-lg group-hover:text-emerald-900">{opt.label}</span>
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-emerald-100 transition-all">
                   <ChevronRight className={`w-5 h-5 text-slate-300 group-hover:text-emerald-600 ${isAr ? 'rotate-180' : ''}`} />
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-slide-in">
          <div className="bg-emerald-900 p-12 rounded-[40px] text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="w-20 h-20 bg-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-700">
              <CheckCircle className="w-10 h-10 text-amber-400" />
            </div>
            <h3 className="text-3xl font-black">{isAr ? 'تم إنشاء خطة الاستيراد' : 'Import Plan Generated'}</h3>
            <p className="text-emerald-100 max-w-lg mx-auto leading-relaxed">
              {isAr 
                ? 'بناءً على المعايير المحددة (خاصة لتقاوي البطاطس)، يرجى الالتزام بالمواعيد النهائية للتقديم (10 يناير).' 
                : 'Based on your selection (specifically for Potato Tubers), please adhere to the submission deadlines (Jan 10).'}
            </p>
            <button 
              onClick={handleDownloadPackage}
              className="bg-amber-400 text-emerald-950 px-10 py-4 rounded-2xl font-black shadow-lg hover:scale-105 transition-all flex items-center gap-2 mx-auto"
            >
              <Download className="w-5 h-5" />
              {isAr ? 'تحميل حزمة المستندات (TXT)' : 'Download Action Package (TXT)'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h4 className="font-black text-slate-800 mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                {isAr ? 'المستندات المطلوبة (حسب القانون)' : 'Required Documents (By Law)'}
              </h4>
              <ul className="space-y-4">
                {[
                  { label: isAr ? 'تصريح استيراد من الحجر الزراعي' : 'Import Permit from CAPQ', doc: 'res-562-2019' },
                  { label: isAr ? 'شهادة صحة نباتية رسمية (IPPC)' : 'Official Phytosanitary Certificate', doc: 'res-562-2019' },
                  { label: isAr ? 'شهادة ISTA البرتقالية / جودة' : 'ISTA Orange / Quality Certificate', doc: 'law-53-1966' },
                  ...(formData.crop === 'potato' ? [{ label: isAr ? 'قرار معايير استيراد البطاطس' : 'Potato Import Standards Decree', doc: 'dec-1485-2015' }] : [])
                ].map((item, i) => (
                  <li key={i} className="flex items-center justify-between group">
                    <span className="text-sm text-slate-600">{item.label}</span>
                    <button 
                      onClick={() => onNavigateToDoc(item.doc)}
                      className="text-[10px] bg-slate-100 px-3 py-1 rounded-lg text-slate-500 border border-slate-200 hover:bg-emerald-100 hover:text-emerald-700 hover:border-emerald-300 font-bold transition-all"
                    >
                      {isAr ? 'عرض القرار' : 'View Law'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h4 className="font-black text-slate-800 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                {isAr ? 'المواعيد النهائية والقيود' : 'Deadlines & Restrictions'}
              </h4>
              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                  <p>{isAr ? 'يجب وصول شحنات البطاطس الصيفية قبل 10 يناير.' : 'Summer potato shipments must arrive before Jan 10.'}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                  <p>{isAr ? 'يشترط رتبة Elite أو ما يعادلها (EU EEC2).' : 'Elite grade or equivalent (EU EEC2) required.'}</p>
                </div>
                <button onClick={() => setStep(0)} className="text-emerald-700 font-bold text-xs mt-4 hover:underline">
                  {isAr ? 'بدء رحلة جديدة' : 'Start New Journey'}
                </button>
              </div>
            </div>
          </div>
        </div>
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
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar lang={lang} setLang={setLang} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow">
        {activeTab === 'home' && <HomeView lang={lang} onStartJourney={() => setActiveTab('journeys')} />}
        {activeTab === 'library' && <LibraryView lang={lang} initialDocId={selectedDocId} />}
        {activeTab === 'journeys' && <JourneyView lang={lang} onNavigateToDoc={navigateToDoc} />}
        {activeTab === 'catalogue' && <CatalogueView lang={lang} />}
        {activeTab === 'directory' && <DirectoryView lang={lang} />}
        {activeTab === 'contact' && <ContactView lang={lang} />}
      </main>

      <footer className="bg-emerald-950 text-emerald-400 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-emerald-950 font-black">E</div>
              <span className="text-white font-black text-xl">{lang === 'ar' ? 'بوابة التقاوي المصرية' : 'Egypt Seed Portal'}</span>
            </div>
            <p className="text-sm max-w-sm leading-relaxed text-emerald-100 opacity-70">
              {lang === 'ar' 
                ? 'مشروع وطني تقني يهدف إلى رقمنة وتسهيل الوصول للمعلومات التنظيمية لقطاع التقاوي، بما يدعم الاستثمار والإنتاجية الزراعية في جمهورية مصر العربية.' 
                : 'A national technical project aimed at digitizing and facilitating access to regulatory information, supporting investment and agricultural productivity in Egypt.'}
            </p>
          </div>
          <div>
            <h4 className="text-white font-black mb-6 uppercase tracking-widest text-xs">{lang === 'ar' ? 'أقسام البوابة' : 'Portal Sections'}</h4>
            <ul className="text-sm space-y-4">
              <li className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => setActiveTab('library')}>{lang === 'ar' ? 'مكتبة القرارات' : 'Library of Decrees'}</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => setActiveTab('catalogue')}>{lang === 'ar' ? 'الكتالوج القومي' : 'National Catalogue'}</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => setActiveTab('directory')}>{lang === 'ar' ? 'دليل الهيئات' : 'Authority Directory'}</li>
              <li className="hover:text-amber-400 cursor-pointer transition-colors" onClick={() => setActiveTab('journeys')}>{lang === 'ar' ? 'رحلات المستخدم' : 'User Journeys'}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black mb-6 uppercase tracking-widest text-xs">{lang === 'ar' ? 'معلومات التواصل' : 'Contact Details'}</h4>
            <div className="space-y-4 text-sm text-emerald-100 opacity-70">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-400" /> Ministry of Agriculture, Giza</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-amber-400" /> contact@egyptseed.gov.eg</p>
              <div className="pt-4 flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-900 flex items-center justify-center hover:bg-emerald-800 cursor-pointer transition-all">
                  <Globe className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-emerald-900 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase font-bold tracking-widest text-emerald-600">
          <span>© {new Date().getFullYear()} CASC - MALR. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="cursor-pointer hover:text-emerald-400">Terms of Use</span>
            <span className="cursor-pointer hover:text-emerald-400">Privacy Policy</span>
            <span className="cursor-pointer hover:text-emerald-400">Accessibility</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
