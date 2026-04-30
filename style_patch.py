from pathlib import Path

path = Path('App.tsx')
text = path.read_text(encoding='utf-8')
replacements = [
    ('bg-slate-50', 'bg-white'),
    ('bg-slate-100', 'bg-amber-50'),
    ('border-slate-100', 'border-amber-100'),
    ('border-slate-200', 'border-amber-100'),
    ('text-slate-700', 'text-[#2D4A32]'),
    ('text-slate-600', 'text-[#2D4A32]'),
    ('text-slate-500', 'text-[#3D3D3D]'),
    ('text-slate-400', 'text-[#3D3D3D]/70'),
    ('text-slate-300', 'text-[#3D3D3D]/50'),
    ('text-slate-800', 'text-[#2D4A32]'),
    ('hover:text-slate-700', 'hover:text-[#2D4A32]'),
    ('hover:text-slate-900', 'hover:text-[#2D4A32]'),
    ('text-slate-300', 'text-[#3D3D3D]/50'),
    ('border-slate-300', 'border-amber-50'),
    ('bg-blue-50', 'bg-amber-50'),
    ('text-blue-900', 'text-[#2D4A32]'),
    ('text-blue-700', 'text-[#2D4A32]'),
    ('text-purple-500', 'text-[#2D4A32]'),
    ('bg-purple-50', 'bg-amber-50'),
    ('bg-sky-50', 'bg-amber-50'),
    ('text-rose-600', 'text-orange-600'),
    ('border-slate-50', 'border-amber-50'),
    ('bg-slate-200', 'bg-amber-50'),
]
for old, new in replacements:
    text = text.replace(old, new)
path.write_text(text, encoding='utf-8')
print('Replaced patterns in App.tsx')
