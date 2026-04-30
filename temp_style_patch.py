from pathlib import Path

app_path = Path('App.tsx')
text = app_path.read_text(encoding='utf-8')
replacements = [
    # Navigation and headings
    ('className={`px-3 py-2 text-sm font-semibold transition-all flex items-center gap-2 border-b-2 ${',
     'className={`px-3 py-2 text-sm font-medium transition-all flex items-center gap-2 border-b-2 ${'),
    ('<h1 className="text-5xl md:text-6xl font-semibold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">',
     '<h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">'),
    ('<h2 className="text-4xl font-semibold text-[#2D4A32] leading-tight">',
     '<h2 className="text-4xl font-bold text-[#2D4A32] leading-tight">'),
    ('<h2 className="text-3xl font-semibold mb-4">',
     '<h2 className="text-3xl font-bold mb-4">'),
    ('<div key={i} className="bg-slate-50 p-5 rounded-2xl border border-slate-100">',
     '<div key={i} className="bg-white p-5 rounded-2xl border border-amber-100">'),
    ('<h4 className="font-bold text-slate-800 text-sm mb-1">',
     '<h4 className="font-bold text-[#2D4A32] text-sm mb-1">'),
    ('<p className="text-slate-500 text-xs leading-relaxed">',
     '<p className="text-[#3D3D3D] text-xs leading-relaxed">'),
    ('bg-blue-50', 'bg-emerald-50'),
    ('text-blue-700', 'text-emerald-700'),
    ('text-blue-900', 'text-[#2D4A32]'),
    ('bg-blue-700', 'bg-emerald-700'),
    ('bg-purple-50', 'bg-emerald-50'),
    ('text-purple-500', 'text-emerald-700'),
    ('bg-sky-50', 'bg-emerald-50'),
    ('text-sky-700', 'text-emerald-700'),
    ('bg-rose-50', 'bg-amber-100'),
    ('text-rose-700', 'text-orange-700'),
    ('text-slate-400', 'text-[#3D3D3D]/70'),
    ('text-slate-500', 'text-[#3D3D3D]'),
    ('text-slate-600', 'text-[#3D3D3D]'),
    ('text-slate-700', 'text-[#2D4A32]'),
    ('text-slate-800', 'text-[#2D4A32]'),
    ('text-slate-300', 'text-[#3D3D3D]/60'),
    ('bg-slate-50', 'bg-white'),
    ('border-slate-100', 'border-amber-100'),
    ('border-slate-200', 'border-amber-100'),
    # Contact form tones
    ('className="text-sm font-bold text-slate-700"', 'className="text-sm font-bold text-[#2D4A32]"'),
    ('className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"',
     'className="w-full p-4 bg-white rounded-xl border border-amber-100 outline-none focus:ring-2 focus:ring-emerald-500"'),
    ('className="p-4 bg-blue-50 rounded-xl flex gap-3 items-start"', 'className="p-4 bg-amber-100 rounded-xl flex gap-3 items-start"'),
    ('<Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />', '<Info className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />'),
    ('<p className="text-xs text-blue-900 leading-relaxed">', '<p className="text-xs text-[#2D4A32] leading-relaxed">'),
    ('className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6"',
     'className="bg-white p-8 rounded-3xl border border-amber-100 shadow-sm space-y-6"'),
    ('className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-0.5"',
     'className="text-[10px] font-semibold text-[#3D3D3D]/70 uppercase tracking-widest mb-0.5"'),
    ('className="text-sm text-slate-700 font-semibold leading-relaxed"',
     'className="text-sm text-[#3D3D3D] font-semibold leading-relaxed"'),
]
for old, new in replacements:
    text = text.replace(old, new)
app_path.write_text(text, encoding='utf-8')
print('applied', len(replacements), 'replacements')
# Report remaining patterns
patterns = ['text-slate-400','text-slate-500','text-slate-600','text-slate-700','text-slate-800','text-slate-300','bg-blue-50','text-blue-700','text-blue-900','bg-purple-50','text-purple-500','bg-sky-50','text-sky-700','bg-rose-50','text-rose-700','bg-slate-50','border-slate-100','border-slate-200']
for p in patterns:
    print(p, text.count(p))
"}