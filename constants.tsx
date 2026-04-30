
import { Document, DocStatus, Variety, Authority, Stakeholder, JourneyNode } from './types';

// ─── Stakeholder Definitions ─────────────────────────────────────────────────

export const STAKEHOLDERS: Stakeholder[] = [
  {
    id: 'farmer',
    label: { en: 'Farmer', ar: 'مزارع' },
    description: { en: 'Access certified seed, understand your rights, and report quality issues.', ar: 'الوصول للتقاوي المعتمدة وفهم حقوقك والإبلاغ عن مشاكل الجودة.' },
    emoji: '🌾',
    accentColor: 'emerald',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    rootNodeId: 'farmer_q1',
  },
  {
    id: 'importer',
    label: { en: 'Seed Importer', ar: 'مستورد تقاوي' },
    description: { en: 'Navigate import permits, quarantine procedures, and documentation requirements.', ar: 'التنقل عبر تصاريح الاستيراد وإجراءات الحجر الزراعي ومتطلبات التوثيق.' },
    emoji: '🚢',
    accentColor: 'blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    rootNodeId: 'importer_q1',
  },
  {
    id: 'producer',
    label: { en: 'Seed Producer / Company', ar: 'منتج تقاوي / شركة' },
    description: { en: 'Get licensed, certify your seed, and register new varieties with CASC.', ar: 'الحصول على الترخيص واعتماد التقاوي وتسجيل الأصناف الجديدة مع CASC.' },
    emoji: '🏭',
    accentColor: 'amber',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    rootNodeId: 'producer_q1',
  },
  {
    id: 'breeder',
    label: { en: 'Plant Breeder / Researcher', ar: 'مربي نباتات / باحث' },
    description: { en: 'Apply for plant variety protection, access germplasm, and run field trials.', ar: 'التقدم لحماية أصناف النباتات والوصول للبادرات وإجراء التجارب الحقلية.' },
    emoji: '🔬',
    accentColor: 'purple',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-700',
    rootNodeId: 'breeder_q1',
  },
  {
    id: 'exporter',
    label: { en: 'Seed Exporter', ar: 'مصدّر تقاوي' },
    description: { en: 'Understand export certification, target market requirements, and COMESA access.', ar: 'فهم شهادات التصدير ومتطلبات السوق المستهدف والوصول إلى الكوميسا.' },
    emoji: '📦',
    accentColor: 'sky',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200',
    textColor: 'text-sky-700',
    rootNodeId: 'exporter_q1',
  },
  {
    id: 'investor',
    label: { en: 'Foreign Investor', ar: 'مستثمر أجنبي' },
    description: { en: 'Set up a seed business, understand land rules, and access investment incentives.', ar: 'إنشاء شركة تقاوي وفهم قواعد الأراضي والاستفادة من حوافز الاستثمار.' },
    emoji: '💼',
    accentColor: 'rose',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-700',
    rootNodeId: 'investor_q1',
  },
];

// ─── Journey Nodes ────────────────────────────────────────────────────────────

export const JOURNEY_NODES: Record<string, JourneyNode> = {

  // ── FARMER ──────────────────────────────────────────────────────────────────
  farmer_q1: {
    id: 'farmer_q1',
    question: { en: 'What are you looking for?', ar: 'ماذا تبحث عن؟' },
    options: [
      { id: 'seed', label: { en: 'Find certified seed for my crop', ar: 'إيجاد تقاوي معتمدة لمحصولي' }, nextNodeId: 'farmer_q2_seed' },
      { id: 'rights', label: { en: 'Understand my rights as a farmer', ar: 'فهم حقوقي كمزارع' },
        result: {
          title: { en: "Farmer's Privilege & Seed Saving Rights", ar: 'حق المزارع في الاحتفاظ بالبذور' },
          summary: { en: "Under Article 195 of Law No. 82 of 2002 (as amended), Egyptian farmers have a 'farmers' privilege' allowing limited use of harvested seed from protected varieties for replanting on their own holdings.", ar: 'بموجب المادة 195 من القانون رقم 82 لعام 2002، يحق للمزارعين المصريين الاحتفاظ بكميات معقولة من البذور من الأصناف المحمية لإعادة الزرع في أراضيهم.' },
          keyPoints: { en: ['Own-farm replanting permitted "within reasonable limits"', 'Sale or trade of saved protected-variety seed is prohibited', 'UPOV 1991 applies; public varieties (e.g., Giza 168) are unrestricted'], ar: ['يُسمح بإعادة الزراعة ضمن "حدود معقولة" للمزرعة الخاصة', 'بيع أو تداول البذور المحتفظ بها من الأصناف المحمية محظور', 'تطبق اتفاقية UPOV 1991؛ الأصناف العامة (مثل جيزة 168) غير مقيدة'] },
          procedure: { en: ['Identify the variety and verify its protection status on the PVPO register (protected vs. public).', 'If the variety is public/unprotected (e.g., Giza 168, Sakha 95), no further action is required — saving and replanting are free.', 'If protected under Law 82/2002, limit saved seed to own-farm, non-commercial replanting only.', 'Never offer saved seed of protected varieties for sale, exchange, or onward distribution.', 'For conditions beyond "reasonable limits", contact the breeder or PVPO for a written authorisation.', 'Retain purchase invoices and tags as evidence of lawful origin in case of dispute.'], ar: ['حدد الصنف وتحقق من حالة حمايته في سجل مكتب PVPO (محمي أم عام).', 'إذا كان الصنف عاماً/غير محمي (كجيزة 168 أو سخا 95)، فلا حاجة لأي إجراء إضافي.', 'إذا كان محمياً بموجب القانون 82/2002، اقتصر استخدام البذور المحتفظ بها على إعادة الزراعة الخاصة وغير التجارية.', 'لا تعرض بذور الأصناف المحمية للبيع أو التبادل أو التوزيع.', 'في حالات تتجاوز "الحدود المعقولة"، تواصل مع المربي أو PVPO للحصول على إذن خطي.', 'احتفظ بفواتير الشراء والعلامات كدليل على المصدر القانوني عند أي نزاع.'] },
          authorityIds: ['pvpo'],
          documentIds: ['law-82-2002'],
        }
      },
      { id: 'quality', label: { en: 'Report a seed quality problem', ar: 'الإبلاغ عن مشكلة في جودة التقاوي' },
        result: {
          title: { en: 'Reporting Seed Quality Issues to CASC', ar: 'الإبلاغ عن مشكلات جودة التقاوي لـ CASC' },
          summary: { en: 'The Central Administration for Seed Testing and Certification (CASC) is the primary body responsible for seed quality enforcement. They inspect seed markets and retail outlets and can investigate complaints.', ar: 'تعد الإدارة المركزية لفحص التقاوي واعتمادها (CASC) الجهة الرئيسية المسؤولة عن إنفاذ جودة التقاوي.' },
          keyPoints: { en: ['Certified seed must meet ≥99% purity and minimum germination', 'Retain packaging, tag and lot number as evidence', 'CASC inspectors can test the reported batch and take enforcement action'], ar: ['يجب أن تحقق التقاوي المعتمدة ≥99% نقاء وحداً أدنى من الإنبات', 'احتفظ بالتغليف والعلامة ورقم الدفعة كدليل', 'يمكن لمفتشي CASC اختبار الدفعة واتخاذ إجراءات إنفاذ'] },
          procedure: { en: ['Preserve the original packaging, official tag, and any remaining seed — do not open additional bags.', 'Record the variety, lot number, purchase date, retailer name, and batch size.', 'Photograph the tag, packaging defects, and affected crop area (if already sown).', 'File a written complaint with the nearest CASC governorate directorate (or head office in Giza).', 'Hand over the retained sample for CASC laboratory re-testing (purity, germination, moisture, seed health).', 'CASC issues an inspection report; MALR can then suspend the trader\'s licence, seize the batch, and compensate the farmer.'], ar: ['احتفظ بالتغليف الأصلي والعلامة الرسمية وأي بذور متبقية، ولا تفتح أكياساً إضافية.', 'سجّل الصنف ورقم الدفعة وتاريخ الشراء واسم التاجر وحجم الدفعة.', 'التقط صوراً للعلامة وعيوب التغليف والمساحة المتضررة (إذا كانت قد زُرعت).', 'قدّم شكوى خطية إلى أقرب مديرية CASC بالمحافظة (أو المكتب الرئيسي بالجيزة).', 'سلّم العينة المحتفظ بها لإعادة الاختبار في مختبر CASC (نقاء، إنبات، رطوبة، صحة البذور).', 'يصدر CASC تقرير الفحص، وتتخذ MALR الإجراءات بتعليق ترخيص التاجر ومصادرة الدفعة وتعويض المزارع.'] },
          authorityIds: ['casc'],
          documentIds: ['law-53-1966'],
        }
      },
    ],
  },

  farmer_q2_seed: {
    id: 'farmer_q2_seed',
    question: { en: 'Which crop are you looking for?', ar: 'أي محصول تبحث عنه؟' },
    options: [
      { id: 'wheat_rice', label: { en: 'Wheat or Rice', ar: 'قمح أو أرز' },
        result: {
          title: { en: 'Certified Wheat & Rice Seed in Egypt', ar: 'تقاوي القمح والأرز المعتمدة في مصر' },
          summary: { en: 'The Central Administration for Seed Production (CASP) dominates public variety supply. Wheat and rice certified seed (blue-tagged) is produced from foundation seed developed by ARC research institutes.', ar: 'تهيمن الإدارة المركزية لإنتاج التقاوي (CASP) على توريد الأصناف العامة. التقاوي المعتمدة (ذات العلامة الزرقاء) تُنتج من تقاوي أساسية طورتها معاهد بحوث ARC.' },
          keyPoints: { en: ['CASP controls ~65–67% of certified wheat and rice supply', 'Look for the blue "Certified Seed" label — the farmer grade', 'Famous public varieties: Giza 168/171 (wheat); Sakha 101/104/105 (rice)'], ar: ['تسيطر CASP على ~65-67% من إمدادات القمح والأرز المعتمدة', 'ابحث عن العلامة الزرقاء "تقاوي معتمدة" — درجة المزارع', 'الأصناف العامة الشهيرة: جيزة 168/171 (قمح)؛ سخا 101/104/105 (أرز)'] },
          procedure: { en: ['Confirm the target variety on the CASC / CASP variety list for your governorate.', 'Locate a CASC-licensed outlet — either an agricultural cooperative or one of the 11,675 registered retailers.', 'Request Certified Seed (blue tag); reject any bags without the official CASC seal or Arabic label.', 'Verify the tag details: variety name, lot number, purity %, germination %, and production date.', 'Pay and retain the invoice together with the tag for the full cropping season.', 'Store in a cool, dry place and sow within the recommended window for your agro-ecological zone.'], ar: ['تحقق من الصنف المستهدف في قائمة أصناف CASC/CASP في محافظتك.', 'حدد منفذاً مرخصاً من CASC — إما جمعية تعاونية زراعية أو أحد التجار المسجلين (11,675 منفذاً).', 'اطلب التقاوي المعتمدة (علامة زرقاء)؛ ارفض أي أكياس بدون ختم CASC الرسمي أو الملصق العربي.', 'تحقق من تفاصيل العلامة: اسم الصنف، رقم الدفعة، نسبة النقاء، الإنبات، تاريخ الإنتاج.', 'ادفع واحتفظ بالفاتورة مع العلامة طوال الموسم الزراعي.', 'خزّن في مكان بارد وجاف وازرع ضمن النافذة الموصى بها لمنطقتك البيئية.'] },
          authorityIds: ['casc'],
          documentIds: ['law-53-1966'],
        }
      },
      { id: 'potato', label: { en: 'Potato', ar: 'بطاطس' },
        result: {
          title: { en: 'Certified Potato Seed in Egypt', ar: 'تقاوي البطاطس المعتمدة في مصر' },
          summary: { en: 'Potato seed tubers in Egypt are strictly regulated. Only registered varieties can be purchased. Given Egypt\'s significant potato exports, quality is tightly controlled by CASC.', ar: 'تدرنات بذور البطاطس في مصر منظمة بصرامة. لا يمكن شراء إلا الأصناف المسجلة فقط.' },
          keyPoints: { en: ['Only CASC-registered potato varieties are legal for commercial planting', 'Grades: Elite or EU EEC2 — no lower class allowed', 'Imports obey strict seasonal windows (e.g., summer by 10 Jan)'], ar: ['أصناف البطاطس المسجلة في CASC فقط قانونية للزراعة التجارية', 'الدرجات: Elite أو EU EEC2 — لا يُسمح بدرجة أدنى', 'يخضع الاستيراد لنوافذ موسمية صارمة (مثلاً الصيف قبل 10 يناير)'] },
          procedure: { en: ['Check the annual CASC list of registered potato varieties (e.g., Spunta) before ordering.', 'Buy only from a CASC-licensed potato seed dealer or via a licensed importer.', 'Confirm the grade marked on the tag is Elite or EU EEC2 — reject anything lower.', 'Verify the CAPQ-approved country of origin and the brown-rot-free certificate for imported lots.', 'Inspect tubers for size, firmness, and absence of visible disease symptoms before accepting delivery.', 'Retain the tag, certificate and invoice; report any suspected mis-labelling to CASC immediately.'], ar: ['راجع قائمة CASC السنوية لأصناف البطاطس المسجلة (مثل سبونتا) قبل الطلب.', 'اشترِ فقط من تاجر بطاطس مرخص من CASC أو عبر مستورد مرخص.', 'تأكد أن الدرجة المدونة على العلامة Elite أو EU EEC2 — ارفض أي درجة أدنى.', 'تحقق من بلد المنشأ المعتمد من CAPQ وشهادة الخلو من العفن البني للشحنات المستوردة.', 'افحص التدرنات للتأكد من الحجم والصلابة وعدم ظهور أعراض أمراض قبل الاستلام.', 'احتفظ بالعلامة والشهادة والفاتورة؛ أبلغ CASC فوراً عن أي اشتباه في ملصقات مضللة.'] },
          authorityIds: ['casc'],
          documentIds: ['dec-1485-2015'],
          warning: { en: 'Only purchase potato seed from CASC-licensed traders. Unregistered varieties may be seized.', ar: 'اشترِ تقاوي البطاطس من تجار مرخصين من CASC فقط. قد يتم مصادرة الأصناف غير المسجلة.' },
        }
      },
      { id: 'veg', label: { en: 'Vegetables', ar: 'خضروات' },
        result: {
          title: { en: 'Vegetable Seed Sourcing in Egypt', ar: 'توفير بذور الخضروات في مصر' },
          summary: { en: 'Vegetable seed in Egypt is largely supplied by private companies, both domestic and international. The private sector plays a dominant role compared to field crops.', ar: 'يُزوَّد سوق بذور الخضروات في مصر بشكل رئيسي من شركات خاصة محلية وأجنبية.' },
          keyPoints: { en: ['Private sector dominates vegetable seed supply', 'Vegetable varieties are VCU-exempt — faster to register', 'Labels must be in Arabic with purity, germination, and origin'], ar: ['يهيمن القطاع الخاص على إمدادات بذور الخضروات', 'أصناف الخضروات معفاة من اختبار VCU — تسجيل أسرع', 'يجب أن تكون الملصقات بالعربية مع نسبة النقاء والإنبات والأصل'] },
          procedure: { en: ['Decide the target crop and desired variety (hybrid or open-pollinated).', 'Consult the CASC licensed vegetable seed retailers directory for your governorate.', 'At the retailer, ask for CASC-certified sachets — reject untagged or damaged packaging.', 'Check the Arabic label: variety name, purity %, germination %, lot number, origin, production/expiry date.', 'Compare prices across at least two dealers and confirm the batch is within its shelf life.', 'Keep the sachet, label and invoice as evidence for any future quality complaint to CASC.'], ar: ['حدد المحصول المستهدف والصنف المرغوب (هجين أو مفتوح التلقيح).', 'اطّلع على دليل CASC لتجار بذور الخضروات المرخصين في محافظتك.', 'عند التاجر، اطلب أكياساً معتمدة من CASC — ارفض أي تغليف بدون علامة أو تالف.', 'تحقق من الملصق العربي: اسم الصنف، النقاء، الإنبات، رقم الدفعة، الأصل، تاريخ الإنتاج/الانتهاء.', 'قارن الأسعار بين تاجرين على الأقل وتأكد من أن الدفعة ضمن صلاحيتها.', 'احتفظ بالكيس والملصق والفاتورة كدليل لأي شكوى جودة مستقبلية لدى CASC.'] },
          authorityIds: ['casc'],
          documentIds: ['law-53-1966'],
        }
      },
    ],
  },

  // ── IMPORTER ────────────────────────────────────────────────────────────────
  importer_q1: {
    id: 'importer_q1',
    question: { en: 'What type of seed are you importing?', ar: 'ما نوع التقاوي التي تستوردها؟' },
    options: [
      { id: 'potato_imp', label: { en: 'Potato seed tubers', ar: 'تدرنات بذور البطاطس' }, nextNodeId: 'importer_q2_potato' },
      { id: 'field_imp', label: { en: 'Field crops (wheat, maize, etc.)', ar: 'محاصيل حقلية (قمح، ذرة، إلخ)' },
        result: {
          title: { en: 'Field Crop Seed Import Procedure', ar: 'إجراءات استيراد تقاوي المحاصيل الحقلية' },
          summary: { en: 'Importing field crop seed into Egypt requires pre-approval from CASC and an import license from CAPQ, plus coordination through the Nafeza single-window system for customs.', ar: 'يستلزم استيراد تقاوي المحاصيل الحقلية الحصول على موافقة مسبقة من CASC وترخيص استيراد من CAPQ، إضافة إلى التنسيق عبر نظام نافذة نافيزا للجمارك.' },
          keyPoints: { en: ['Dual clearance required: CASC pre-approval + CAPQ import licence', 'ISTA seed-testing certificate and phytosanitary certificate mandatory', 'All paperwork routed through the Nafeza single window (ACI 48 h prior)'], ar: ['تصريح مزدوج مطلوب: موافقة CASC المسبقة + ترخيص CAPQ', 'شهادة اختبار معتمدة من ISTA وشهادة صحة نباتية إلزامية', 'تُقدَّم كل المستندات عبر نافذة نافيزا (ACI قبل 48 ساعة)'] },
          procedure: { en: ['Step 1 — Obtain pre-shipment approval from CASC for the specific variety and quantity.', 'Step 2 — Apply to CAPQ for the Seed Import Licence (EGP 500; valid 3 months).', 'Step 3 — Secure an ISTA-accredited seed testing certificate from the exporting country (purity, germination, seed health).', 'Step 4 — Gather documents: Phytosanitary Certificate, Certificate of Origin, Commercial Invoice, Bill of Lading, Packing List; obtain ACI/ACID on Nafeza 48 hours before arrival.', 'Step 5 — On arrival, CAPQ inspectors conduct zigzag sampling and quarantine-pest testing at the port of entry.', 'Step 6 — On clearance, customs releases the consignment and CAPQ endorses the Phytosanitary Certificate for traceability.'], ar: ['الخطوة 1 — الحصول على موافقة مسبقة للشحن من CASC للصنف والكمية المحددَين.', 'الخطوة 2 — التقدم لـCAPQ للحصول على ترخيص استيراد التقاوي (500 جنيه؛ صالح 3 أشهر).', 'الخطوة 3 — استصدار شهادة اختبار بذور معتمدة من ISTA من بلد التصدير (نقاء، إنبات، صحة).', 'الخطوة 4 — تجهيز الوثائق: شهادة صحة نباتية، شهادة منشأ، فاتورة تجارية، بوليصة شحن، قائمة التعبئة؛ واستخراج ACI/ACID عبر نافيزا قبل 48 ساعة من الوصول.', 'الخطوة 5 — عند الوصول، يقوم مفتشو CAPQ بأخذ عينات وفحصها للكشف عن الآفات الحجرية في الميناء.', 'الخطوة 6 — عند الإفراج، يفرج الجمرك عن الشحنة ويعتمد CAPQ شهادة الصحة النباتية للتتبع.'] },
          authorityIds: ['capq', 'casc'],
          documentIds: ['res-562-2019', 'law-53-1966'],
        }
      },
      { id: 'veg_imp', label: { en: 'Vegetable seed', ar: 'بذور خضروات' },
        result: {
          title: { en: 'Vegetable Seed Import Procedure', ar: 'إجراءات استيراد بذور الخضروات' },
          summary: { en: 'Vegetable seed imports follow the standard 6-step import process. Vegetable varieties are exempt from VCU testing, making market entry faster. Customs clearance requires the Nafeza platform.', ar: 'يتبع استيراد بذور الخضروات الإجراء القياسي من 6 خطوات. أصناف الخضروات معفاة من اختبار VCU مما يجعل دخول السوق أسرع.' },
          keyPoints: { en: ['Same 6-step import process as field crops', 'VCU testing not required for vegetables — only DUS applies', 'Arabic labels with variety, purity, germination, origin and lot are mandatory'], ar: ['تنطبق نفس خطوات الاستيراد الست كالمحاصيل الحقلية', 'لا يُشترط اختبار VCU للخضروات — فقط DUS', 'الملصقات العربية بالصنف والنقاء والإنبات والأصل والدفعة إلزامية'] },
          procedure: { en: ['Step 1 — Obtain CASC pre-shipment approval for the target vegetable variety.', 'Step 2 — Apply to CAPQ for the Seed Import Licence (valid 3 months; EGP 500 fee).', 'Step 3 — Obtain ISTA-accredited seed testing certificate from origin (purity, germination, health).', 'Step 4 — Submit full document set via Nafeza (Phytosanitary, Origin, Invoice, BL, Packing List) and obtain ACI/ACID 48 h before arrival.', 'Step 5 — CAPQ physical inspection and sampling at port; vegetable lots may face extra quality-assurance checks.', 'Step 6 — Customs release; Arabic relabelling must be completed before domestic distribution.'], ar: ['الخطوة 1 — الحصول على موافقة CASC المسبقة لصنف الخضار المستهدف.', 'الخطوة 2 — التقدم لـCAPQ لترخيص الاستيراد (صالح 3 أشهر؛ رسم 500 جنيه).', 'الخطوة 3 — استصدار شهادة اختبار معتمدة من ISTA من بلد المنشأ (نقاء، إنبات، صحة).', 'الخطوة 4 — تقديم الوثائق كاملة عبر نافيزا (صحة نباتية، منشأ، فاتورة، بوليصة، قائمة تعبئة) واستخراج ACI/ACID قبل 48 ساعة.', 'الخطوة 5 — الفحص وأخذ العينات من قِبل CAPQ في الميناء؛ قد تخضع الخضروات لفحوصات جودة إضافية.', 'الخطوة 6 — الإفراج الجمركي؛ يجب إعادة الوسم باللغة العربية قبل التوزيع المحلي.'] },
          authorityIds: ['capq', 'casc'],
          documentIds: ['res-562-2019'],
        }
      },
      { id: 'gmo_imp', label: { en: 'GM / Biotech seeds', ar: 'تقاوي معدلة وراثياً' },
        result: {
          title: { en: 'GM Seed Import Status in Egypt', ar: 'وضع استيراد التقاوي المعدلة وراثياً في مصر' },
          summary: { en: 'Since 2012, Egypt has a de facto suspension on commercial cultivation of ALL GM crops. Importing GM seeds for planting is effectively halted pending a formal Biosafety Law.', ar: 'منذ عام 2012، تفرض مصر تعليقاً فعلياً على الزراعة التجارية لجميع المحاصيل المعدلة وراثياً. استيراد التقاوي المعدلة وراثياً للزراعة متوقف فعلياً.' },
          keyPoints: { en: ['Commercial GM cultivation has been suspended since 2012', 'Import of GM commodities for animal feed remains permitted', 'Biosafety Law is in draft; field trials require multi-ministry approval'], ar: ['زراعة المحاصيل المعدلة وراثياً تجارياً متوقفة منذ 2012', 'استيراد السلع المعدلة وراثياً لأعلاف الحيوان لا يزال مسموحاً به', 'قانون السلامة الأحيائية مسودة؛ التجارب الحقلية تحتاج موافقات وزارية متعددة'] },
          procedure: { en: ['Confirm intent of use: (a) commercial planting — currently not feasible; (b) animal feed — permitted under food-safety rules; (c) research — requires multi-ministry authorisation.', 'For research trials, prepare a dossier including GM event data, risk assessment, and biosafety containment plan.', 'Submit the dossier to MALR and in parallel to the Ministry of Environment (Egyptian Environmental Affairs Agency).', 'Obtain a Pest Risk Analysis (PRA) decision from CAPQ referencing the Cartagena Protocol obligations.', 'If approved for confined trials only, import limited trial quantities through Nafeza with dedicated GMO testing at the port.', 'Maintain monitoring reports throughout the trial and await enactment of the draft National Biosafety Law for any commercialisation step.'], ar: ['حدد الغرض: (أ) زراعة تجارية — غير متاحة حالياً؛ (ب) أعلاف حيوانية — مسموح وفق قواعد سلامة الغذاء؛ (ج) بحث — يتطلب موافقات متعددة.', 'لإجراء التجارب البحثية، جهّز ملفاً يتضمن بيانات الحدث المعدل وراثياً، تقييم المخاطر، وخطة الاحتواء.', 'قدّم الملف إلى MALR وبالتوازي إلى وزارة البيئة (جهاز شؤون البيئة).', 'احصل على قرار تحليل مخاطر الآفات من CAPQ بالإشارة إلى التزامات بروتوكول قرطاجنة.', 'عند الموافقة على التجارب المحصورة فقط، استورد كميات تجريبية محدودة عبر نافيزا مع فحص GMO مخصص في الميناء.', 'احتفظ بتقارير متابعة طوال التجربة وانتظر إصدار قانون السلامة الأحيائية قبل أي خطوة تسويقية.'] },
          authorityIds: ['capq'],
          documentIds: ['law-53-1966'],
          warning: { en: 'Attempting to import GM seeds for planting without multi-ministry approval may result in seizure at the border.', ar: 'محاولة استيراد تقاوي معدلة وراثياً للزراعة دون موافقة متعددة الوزارات قد تؤدي إلى مصادرتها عند الحدود.' },
        }
      },
    ],
  },

  importer_q2_potato: {
    id: 'importer_q2_potato',
    question: { en: 'Which potato planting season?', ar: 'أي موسم زراعة بطاطس؟' },
    options: [
      { id: 'summer_potato', label: { en: 'Summer season', ar: 'الموسم الصيفي' },
        result: {
          title: { en: 'Summer Potato Seed Import Rules', ar: 'قواعد استيراد تقاوي البطاطس الصيفية' },
          summary: { en: 'Summer potato seed imports are subject to the strictest controls in Egypt\'s seed sector. Only Elite or EU EEC2 grade tubers from CAPQ-approved countries are permitted.', ar: 'تخضع واردات تقاوي البطاطس الصيفية لأشد الضوابط في قطاع التقاوي المصري.' },
          keyPoints: { en: ['Shipments must arrive by 10 January; later arrivals are refused', 'Grade: Elite or EU EEC2 only; zero tolerance for brown rot', 'Variety must be CASC-registered or under a ≤10-ton trial permit'], ar: ['يجب أن تصل الشحنات قبل 10 يناير؛ الشحنات المتأخرة مرفوضة', 'الدرجة: Elite أو EU EEC2 فقط؛ تسامح صفري مع العفن البني', 'يجب أن يكون الصنف مسجلاً في CASC أو ضمن تصريح تجريبي ≤10 أطنان'] },
          procedure: { en: ['Step 1 — Confirm the variety is on the current CASC potato register (or apply for a trial-quantity permit of up to 10 tons for a new variety).', 'Step 2 — Verify that the country of origin is on the CAPQ-approved list (brown-rot-free) for the current season.', 'Step 3 — Obtain the CAPQ Import Permit before the shipment departs origin.', 'Step 4 — Secure the exporting NPPO Phytosanitary Certificate certifying freedom from Ralstonia solanacearum.', 'Step 5 — Submit ACI/ACID and all documents via Nafeza at least 48 hours before port arrival, ensuring the vessel lands no later than 10 January.', 'Step 6 — On arrival, CAPQ performs tuber sampling and brown-rot laboratory testing at the port.', 'Step 7 — On clearance, customs releases the consignment under CAPQ traceability for movement to the grading station.'], ar: ['الخطوة 1 — تأكد من تسجيل الصنف في سجل البطاطس الحالي لـCASC (أو تقدّم بطلب تصريح تجريبي بحد أقصى 10 أطنان للصنف الجديد).', 'الخطوة 2 — تحقق من أن بلد المنشأ ضمن قائمة CAPQ المعتمدة (خالٍ من العفن البني) للموسم الحالي.', 'الخطوة 3 — احصل على تصريح الاستيراد من CAPQ قبل مغادرة الشحنة من المنشأ.', 'الخطوة 4 — استصدر شهادة صحة نباتية من NPPO بلد التصدير تؤكد الخلو من Ralstonia solanacearum.', 'الخطوة 5 — قدّم ACI/ACID وكافة المستندات عبر نافيزا قبل 48 ساعة من الوصول على الأقل، مع ضمان وصول السفينة قبل 10 يناير.', 'الخطوة 6 — عند الوصول يقوم CAPQ بأخذ عينات من التدرنات وإجراء اختبار العفن البني في المختبر.', 'الخطوة 7 — عند الإفراج يفرج الجمرك عن الشحنة تحت تتبع CAPQ لنقلها إلى محطة الفرز.'] },
          authorityIds: ['capq', 'casc'],
          documentIds: ['dec-1485-2015', 'res-562-2019'],
          deadline: { en: 'All summer season potato shipments must arrive by January 10.', ar: 'يجب أن تصل جميع شحنات البطاطس للموسم الصيفي قبل 10 يناير.' },
        }
      },
      { id: 'winter_potato', label: { en: 'Winter / Autumn season', ar: 'الموسم الشتوي / الخريفي' },
        result: {
          title: { en: 'Winter / Autumn Potato Seed Import Rules', ar: 'قواعد استيراد تقاوي البطاطس الشتوية / الخريفية' },
          summary: { en: 'Winter/autumn potato imports follow the same strict quality rules. Annual ministerial decrees define specific windows — check the latest decree for exact arrival deadlines.', ar: 'تخضع واردات البطاطس الشتوية/الخريفية لنفس قواعد الجودة الصارمة.' },
          keyPoints: { en: ['Import windows are set annually by ministerial decree — confirm with CAPQ', 'Only Elite / EU EEC2 tubers from CAPQ-approved origins accepted', 'Missed deadlines trigger re-export or destruction at importer\'s cost'], ar: ['تُحدَّد نوافذ الاستيراد سنوياً بقرار وزاري — أكّد مع CAPQ', 'تُقبل فقط تدرنات Elite / EU EEC2 من منشأ معتمد من CAPQ', 'تجاوز المواعيد يؤدي إلى إعادة التصدير أو الإتلاف على نفقة المستورد'] },
          procedure: { en: ['Step 1 — Consult CAPQ for the current winter/autumn ministerial decree and confirm the exact arrival window.', 'Step 2 — Verify the variety is on the CASC potato register and the origin is CAPQ-approved for the season.', 'Step 3 — Secure the CAPQ Import Permit before shipment departs origin.', 'Step 4 — Obtain the exporting-country Phytosanitary Certificate and ISTA/quality certificates.', 'Step 5 — Submit ACI/ACID and full document set on Nafeza 48 hours before arrival; schedule port arrival inside the declared window.', 'Step 6 — CAPQ port inspection verifies size, labelling, and absence of quarantine pests.', 'Step 7 — On clearance, customs releases the consignment and records the movement for CAPQ traceability.'], ar: ['الخطوة 1 — راجع CAPQ للحصول على القرار الوزاري الحالي للموسم الشتوي/الخريفي وتأكيد نافذة الوصول.', 'الخطوة 2 — تحقق من تسجيل الصنف في سجل البطاطس بـCASC واعتماد المنشأ من CAPQ للموسم.', 'الخطوة 3 — استصدر تصريح CAPQ قبل مغادرة الشحنة من المنشأ.', 'الخطوة 4 — احصل على شهادة الصحة النباتية من بلد التصدير وشهادات ISTA/الجودة.', 'الخطوة 5 — قدّم ACI/ACID وكامل الوثائق عبر نافيزا قبل 48 ساعة من الوصول وخطّط للوصول داخل النافذة المعلنة.', 'الخطوة 6 — يتحقق فحص CAPQ في الميناء من الحجم والوسم وخلو الشحنة من الآفات.', 'الخطوة 7 — عند الإفراج يفرج الجمرك عن الشحنة ويسجل الحركة لتتبع CAPQ.'] },
          authorityIds: ['capq'],
          documentIds: ['dec-1485-2015', 'res-562-2019'],
          warning: { en: 'Always confirm the exact seasonal deadline with CAPQ before dispatching the shipment.', ar: 'تأكد دائماً من الموعد النهائي الموسمي الدقيق مع CAPQ قبل إرسال الشحنة.' },
        }
      },
    ],
  },

  // ── PRODUCER ────────────────────────────────────────────────────────────────
  producer_q1: {
    id: 'producer_q1',
    question: { en: 'What do you need to do?', ar: 'ماذا تحتاج أن تفعل؟' },
    options: [
      { id: 'license', label: { en: 'Get a license to produce or sell seed', ar: 'الحصول على ترخيص لإنتاج أو بيع التقاوي' },
        result: {
          title: { en: 'Seed Business Licensing in Egypt', ar: 'ترخيص أعمال التقاوي في مصر' },
          summary: { en: 'To legally produce or trade seed in Egypt, you need two layers of registration: (1) General company registration via GAFI, and (2) A sector-specific license from MALR/CASC.', ar: 'للعمل بشكل قانوني في إنتاج أو تداول التقاوي في مصر، تحتاج إلى طبقتين من التسجيل: (1) تسجيل شركة عام عبر GAFI، و(2) ترخيص قطاعي من MALR/CASC.' },
          keyPoints: { en: ['Two licences required: GAFI company registration + MALR/CASC sector licence', 'CASC inspection of fields is a continuing obligation, not a one-off step', 'ESAS membership provides regulatory updates and industry voice'], ar: ['ترخيصان مطلوبان: تسجيل GAFI + ترخيص قطاعي من MALR/CASC', 'فحص CASC للحقول التزام مستمر وليس إجراءً لمرة واحدة', 'عضوية ESAS توفر التحديثات التنظيمية وصوت الصناعة'] },
          procedure: { en: ['Step 1 — Register the company at GAFI as LLC (min. EGP 50,000) or JSC (min. EGP 250,000); typical timeline 2–4 weeks.', 'Step 2 — Obtain Commercial Registry entry, tax card, and VAT certificate.', 'Step 3 — Prepare the sector-specific dossier: business plan, technical capacity, staff qualifications, processing facility layout.', 'Step 4 — Apply to MALR / CASC for the seed production or seed trading licence.', 'Step 5 — Host the CASC technical inspection of processing facilities and storage; rectify any findings.', 'Step 6 — On licence grant, enrol in the CASC registered-producer list and submit the annual field declaration.', 'Step 7 — Join the Egyptian Seed Association (ESAS) for advocacy and to receive regulatory updates.'], ar: ['الخطوة 1 — سجّل الشركة عبر GAFI كـLLC (50,000 جنيه) أو JSC (250,000 جنيه)؛ الجدول الزمني 2-4 أسابيع.', 'الخطوة 2 — استخرج قيد السجل التجاري وبطاقة الضريبة وشهادة القيمة المضافة.', 'الخطوة 3 — جهّز الملف القطاعي: خطة عمل، القدرة الفنية، مؤهلات الكوادر، مخطط وحدة المعالجة.', 'الخطوة 4 — تقدّم لـMALR/CASC للحصول على ترخيص إنتاج أو تداول التقاوي.', 'الخطوة 5 — استقبل فحص CASC الفني للمرافق والتخزين وعالج أي ملاحظات.', 'الخطوة 6 — عند منح الترخيص، سجّل في قائمة CASC للمنتجين وقدّم التصريح الحقلي السنوي.', 'الخطوة 7 — انضم إلى الجمعية المصرية لمنتجي البذور (ESAS) للاستفادة من التحديثات التنظيمية.'] },
          authorityIds: ['casc'],
          documentIds: ['law-53-1966'],
        }
      },
      { id: 'certify', label: { en: 'Certify my seed production', ar: 'اعتماد إنتاجي من التقاوي' },
        result: {
          title: { en: 'Seed Certification Process in Egypt', ar: 'عملية اعتماد التقاوي في مصر' },
          summary: { en: 'Egypt follows an AOSCA-type 4-class certification system. Each class carries a distinct color-coded label. CASC manages the full process from field inspection to laboratory testing.', ar: 'تتبع مصر نظام اعتماد من 4 درجات على غرار AOSCA. كل درجة تحمل علامة ملونة مميزة.' },
          keyPoints: { en: ['Four classes: Breeder, Foundation (white), Registered (purple), Certified (blue)', 'Both CASC field inspection and ISTA laboratory testing must pass', 'Certified Seed requires ≥99% genetic purity and the crop-specific germination rate'], ar: ['أربع درجات: مربي، أساس (أبيض)، مسجل (بنفسجي)، معتمد (أزرق)', 'يجب اجتياز كلٍّ من الفحص الحقلي لـCASC والاختبار المخبري بـISTA', 'التقاوي المعتمدة تتطلب ≥99% نقاء جيني ومعدل إنبات محدد لكل محصول'] },
          procedure: { en: ['Step 1 — Register the production field with CASC before planting, declaring the variety, class, and parent seed source.', 'Step 2 — Plant using the correct upstream class (Breeder → Foundation → Registered → Certified) and apply mandatory isolation distances.', 'Step 3 — CASC field inspectors visit during the growing season to verify isolation, rogueing, off-types, and crop purity.', 'Step 4 — On passing the field inspection, harvest, process, and bag the seed under CASC oversight.', 'Step 5 — Submit sealed samples to an ISTA-accredited CASC lab for purity, germination (4 × 100 seeds), moisture, and seed-health analysis.', 'Step 6 — If both field and lab results pass, CASC issues the official colour-coded tag (white/purple/blue) and the lot is cleared for sale.', 'Step 7 — Maintain the seed lot records and keep post-control samples for the statutory retention period.'], ar: ['الخطوة 1 — سجّل الحقل الإنتاجي في CASC قبل الزراعة مع بيان الصنف والدرجة ومصدر بذور الآباء.', 'الخطوة 2 — ازرع بالدرجة الأعلى الصحيحة (مربي → أساس → مسجل → معتمد) مع تطبيق مسافات العزل الإلزامية.', 'الخطوة 3 — يزور مفتشو CASC الحقل خلال موسم النمو للتحقق من العزل والتنقية وخلط الأصناف ونقاء المحصول.', 'الخطوة 4 — عند اجتياز الفحص الحقلي، احصد وعالج وعبّئ البذور تحت إشراف CASC.', 'الخطوة 5 — قدّم عينات مختومة لمختبر معتمد من ISTA لاختبارات النقاء والإنبات (4×100 بذرة) والرطوبة وصحة البذور.', 'الخطوة 6 — عند اجتياز الفحصين الحقلي والمخبري، يصدر CASC العلامة الرسمية الملونة (أبيض/بنفسجي/أزرق) وتفرج الدفعة للبيع.', 'الخطوة 7 — احتفظ بسجلات الدفعة وعينات الرقابة البعدية خلال الفترة القانونية.'] },
          authorityIds: ['casc'],
          documentIds: ['law-53-1966'],
        }
      },
      { id: 'register', label: { en: 'Register a new variety', ar: 'تسجيل صنف جديد' }, nextNodeId: 'producer_q2_variety' },
    ],
  },

  producer_q2_variety: {
    id: 'producer_q2_variety',
    question: { en: 'What type of crop is the new variety?', ar: 'ما نوع المحصول للصنف الجديد؟' },
    options: [
      { id: 'vegetables_var', label: { en: 'Vegetables', ar: 'خضروات' },
        result: {
          title: { en: 'Registering a Vegetable Variety', ar: 'تسجيل صنف خضروات جديد' },
          summary: { en: 'Vegetable varieties enjoy an expedited registration path: they are exempt from VCU (Value for Cultivation & Use) testing. Only DUS (Distinctness, Uniformity, Stability) testing is required.', ar: 'تتمتع أصناف الخضروات بمسار تسجيل سريع: فهي معفاة من اختبار VCU. يُطلب فقط اختبار DUS.' },
          keyPoints: { en: ['Vegetables are exempt from VCU — only DUS testing required', 'Onion is the exception and still needs VCU (3 years)', '60-day opposition period after gazette publication precedes the grant'], ar: ['الخضروات معفاة من اختبار VCU — فقط اختبار DUS مطلوب', 'البصل استثناء ولا يزال يحتاج VCU (3 سنوات)', 'فترة اعتراض 60 يوماً بعد النشر في الجريدة قبل المنح'] },
          procedure: { en: ['Step 1 — File the prescribed application form at PVPO/CASC with the relevant fee (Group A: EGP 100; Group B: EGP 25).', 'Step 2 — Submit documentation: technical statement, NGB deposit certificate, foreign-application copies with Arabic translation (supplementary docs may follow within 4 months).', 'Step 3 — Application processing: PVPO assigns a serial number and records the variety in the Register of Plant Varieties.', 'Step 4 — DUS examination against UPOV Test Guidelines (Distinctness, Uniformity, Stability); no VCU testing required for vegetables — except onion.', 'Step 5 — Acceptance is published in the monthly PVPO gazette; a 60-day opposition window opens for third-party challenges.', 'Step 6 — Final grant by ministerial decision and publication in the "Egyptian Gazette of Protected Plant Varieties".', 'Step 7 — Pay the certificate delivery fee (A: EGP 750; B: EGP 100) and begin annual maintenance-fee payments.'], ar: ['الخطوة 1 — قدّم نموذج الطلب المعتمد لـPVPO/CASC مع الرسم المقرر (المجموعة أ: 100 جنيه؛ ب: 25 جنيه).', 'الخطوة 2 — أرفق الوثائق: بيان تقني، شهادة إيداع من البنك القومي للجينات، نسخ من الطلبات الأجنبية بترجمة عربية (يجوز استكمالها خلال 4 أشهر).', 'الخطوة 3 — معالجة الطلب: يمنح PVPO رقماً مسلسلاً ويقيد الصنف في سجل الأصناف النباتية.', 'الخطوة 4 — فحص DUS وفق إرشادات UPOV (التميز، التجانس، الاستقرار)؛ لا يُشترط VCU للخضروات — باستثناء البصل.', 'الخطوة 5 — يُنشر القبول في جريدة PVPO الشهرية وتبدأ فترة اعتراض 60 يوماً.', 'الخطوة 6 — المنح النهائي بقرار وزاري ونشر في "الجريدة المصرية للأصناف النباتية المحمية".', 'الخطوة 7 — ادفع رسم تسليم الشهادة (أ: 750 جنيه؛ ب: 100 جنيه) وابدأ سداد رسوم الصيانة السنوية.'] },
          authorityIds: ['pvpo', 'casc'],
          documentIds: ['law-82-2002'],
        }
      },
      { id: 'maize_var', label: { en: 'Maize', ar: 'ذرة' },
        result: {
          title: { en: 'Registering a Maize Variety', ar: 'تسجيل صنف ذرة جديد' },
          summary: { en: 'Maize has an expedited VCU testing timeline of 2 years (vs. 3 years for most other field crops). Testing occurs across multiple agro-ecological zones in Egypt.', ar: 'الذرة لديها جدول زمني معجل لاختبار VCU مدته سنتان (مقابل 3 سنوات لمعظم المحاصيل الحقلية الأخرى).' },
          keyPoints: { en: ['VCU for maize is expedited to 2 years (vs. 3 for other field crops)', 'DUS is required alongside VCU across agro-ecological zones', 'COMESA regional registration is available after the national grant'], ar: ['VCU للذرة مختصر إلى سنتين (مقابل 3 سنوات لباقي المحاصيل الحقلية)', 'DUS مطلوب مع VCU عبر المناطق البيئية-الزراعية', 'التسجيل الإقليمي في COMESA متاح بعد المنح الوطني'] },
          procedure: { en: ['Step 1 — File the application at PVPO/CASC with the technical statement and fee.', 'Step 2 — Submit documentation: NGB deposit certificate, authenticated foreign-application copies, and genetic-resource records.', 'Step 3 — PVPO logs the application in the Register of Plant Varieties and assigns a serial number.', 'Step 4 — DUS examination against UPOV Test Guidelines by CASC (or designated third party).', 'Step 5 — VCU testing — 2 years across multiple agro-ecological zones, compared to commercial check varieties (yield, disease resistance, quality).', 'Step 6 — Gazette publication of acceptance and 60-day opposition window.', 'Step 7 — Final grant by ministerial decision; optional regional registration on the COMESA Variety Catalogue.'], ar: ['الخطوة 1 — قدّم الطلب لدى PVPO/CASC مع البيان التقني والرسم.', 'الخطوة 2 — أرفق الوثائق: شهادة إيداع NGB، نسخ مصدقة من الطلبات الأجنبية، وسجلات الموارد الوراثية.', 'الخطوة 3 — يسجّل PVPO الطلب في سجل الأصناف النباتية ويمنحه رقماً مسلسلاً.', 'الخطوة 4 — فحص DUS وفق إرشادات UPOV من CASC (أو جهة ثالثة معتمدة).', 'الخطوة 5 — اختبار VCU — سنتان عبر مناطق بيئية-زراعية متعددة ومقارنة مع الأصناف المرجعية (المحصول، مقاومة الأمراض، الجودة).', 'الخطوة 6 — النشر في الجريدة وفترة اعتراض 60 يوماً.', 'الخطوة 7 — المنح النهائي بقرار وزاري؛ مع إمكانية التسجيل الإقليمي في كتالوج أصناف COMESA.'] },
          authorityIds: ['pvpo', 'casc'],
          documentIds: ['law-82-2002', 'law-53-1966'],
        }
      },
      { id: 'field_var', label: { en: 'Other field crops (wheat, cotton, rice, etc.)', ar: 'محاصيل حقلية أخرى (قمح، قطن، أرز، إلخ)' },
        result: {
          title: { en: 'Registering a Field Crop Variety', ar: 'تسجيل صنف محصول حقلي جديد' },
          summary: { en: 'Field crop variety registration requires 3 years of VCU testing across multiple agro-ecological zones, plus DUS testing. The full 7-step process typically takes 4-5 years from first application.', ar: 'يستلزم تسجيل أصناف المحاصيل الحقلية 3 سنوات من اختبار VCU عبر مناطق زراعية بيئية متعددة، بالإضافة إلى اختبار DUS.' },
          keyPoints: { en: ['Full cycle is 4–5 years: 3 years VCU plus DUS in parallel', 'VRC evaluates; PVPO administers the Register', 'Protection lasts 20 years (25 years for trees and vines)'], ar: ['الدورة الكاملة 4-5 سنوات: 3 سنوات VCU مع DUS بالتوازي', 'لجنة تسجيل الأصناف (VRC) تقيّم ومكتب PVPO يدير السجل', 'الحماية لمدة 20 سنة (25 سنة للأشجار والكروم)'] },
          procedure: { en: ['Step 1 — File the application and pay the fee at PVPO/CASC.', 'Step 2 — Submit the technical statement, NGB deposit certificate, and foreign-application copies in Arabic (within 4 months if deferred).', 'Step 3 — PVPO enters the application in the Register and assigns a serial number.', 'Step 4 — DUS examination against UPOV Test Guidelines (Distinctness, Uniformity, Stability for two cycles).', 'Step 5 — VCU trials — 3 years, multi-location, compared with commercial check varieties for yield, disease resistance, and quality.', 'Step 6 — Variety Registration Committee (VRC) reviews the results and recommends grant.', 'Step 7 — Publication in gazette, 60-day opposition window, then ministerial grant; protection runs 20 years (25 for trees/vines).'], ar: ['الخطوة 1 — تقديم الطلب ودفع الرسم لدى PVPO/CASC.', 'الخطوة 2 — إرفاق البيان التقني، شهادة إيداع NGB، ونسخ الطلبات الأجنبية بالعربية (خلال 4 أشهر إذا أُجِّلت).', 'الخطوة 3 — يسجل PVPO الطلب ويمنحه رقماً مسلسلاً.', 'الخطوة 4 — فحص DUS وفق إرشادات UPOV (التميز، التجانس، الاستقرار لدورتين).', 'الخطوة 5 — تجارب VCU — 3 سنوات متعددة المواقع ومقارنة مع الأصناف المرجعية (المحصول، المقاومة، الجودة).', 'الخطوة 6 — مراجعة لجنة تسجيل الأصناف (VRC) للنتائج والتوصية بالمنح.', 'الخطوة 7 — النشر في الجريدة، فترة اعتراض 60 يوماً، ثم المنح الوزاري؛ مدة الحماية 20 سنة (25 للأشجار/الكروم).'] },
          authorityIds: ['pvpo', 'casc'],
          documentIds: ['law-82-2002', 'law-53-1966'],
        }
      },
    ],
  },

  // ── BREEDER ─────────────────────────────────────────────────────────────────
  breeder_q1: {
    id: 'breeder_q1',
    question: { en: 'What do you need?', ar: 'ماذا تحتاج؟' },
    options: [
      { id: 'pvp', label: { en: "Apply for Plant Variety Protection (PVP)", ar: 'التقدم لحماية الأصناف النباتية (PVP)' }, nextNodeId: 'breeder_q2_pvp' },
      { id: 'germplasm', label: { en: 'Access germplasm from the National Gene Bank', ar: 'الوصول إلى الجرمبلازم من البنك القومي للجينات' }, nextNodeId: 'breeder_q2_germplasm' },
      { id: 'trials', label: { en: 'Conduct field trials for a new variety', ar: 'إجراء تجارب حقلية لصنف جديد' },
        result: {
          title: { en: 'Field Trial Procedures for New Varieties', ar: 'إجراءات التجارب الحقلية للأصناف الجديدة' },
          summary: { en: 'Field trials for new variety registration are coordinated with ARC research institutes and CASC. Multi-location testing is required across Egypt\'s diverse agro-ecological zones.', ar: 'تنسق التجارب الحقلية لتسجيل الأصناف الجديدة مع معاهد بحوث ARC وCACS.' },
          keyPoints: { en: ['Trials co-supervised by ARC institutes and CASC field inspectors', 'VCU: 3 yr (field crops), 2 yr (maize), exempt (vegetables except onion)', 'DUS requires two consecutive cycles to establish Stability'], ar: ['يشرف على التجارب معاهد ARC ومفتشو CASC الحقليون', 'VCU: 3 سنوات (محاصيل حقلية)، سنتان (ذرة)، معفاة (خضروات باستثناء البصل)', 'تتطلب تجارب DUS دورتين متتاليتين لإثبات الاستقرار'] },
          procedure: { en: ['Step 1 — Identify the appropriate ARC institute (Field Crops Research Institute, Horticulture Research Institute, etc.) and agree on trial scope.', 'Step 2 — Submit trial plan to CASC: crop, variety, proposed sites across agro-ecological zones, and experimental design.', 'Step 3 — Establish plots under CASC supervision, respecting UPOV isolation standards and using approved check varieties.', 'Step 4 — Run DUS trials for two consecutive cycles to demonstrate Distinctness, Uniformity, and Stability.', 'Step 5 — Run parallel VCU trials at the prescribed duration — 3 years (field), 2 years (maize), none (most vegetables).', 'Step 6 — Record yield, disease/pest response, quality, and adaptation; compile an ARC/CASC evaluation report.', 'Step 7 — Submit the report to PVPO/VRC as evidence for variety registration.'], ar: ['الخطوة 1 — حدّد معهد ARC المناسب (محاصيل حقلية، بستنة...) واتفق على نطاق التجربة.', 'الخطوة 2 — قدّم خطة التجربة لـCASC: المحصول، الصنف، المواقع المقترحة عبر المناطق البيئية-الزراعية، التصميم التجريبي.', 'الخطوة 3 — أنشئ القطع التجريبية تحت إشراف CASC مع احترام معايير UPOV للعزل واستخدام أصناف مرجعية معتمدة.', 'الخطوة 4 — أجرِ تجارب DUS لدورتين متتاليتين لإثبات التميز والتجانس والاستقرار.', 'الخطوة 5 — أجرِ تجارب VCU بالمدة المقررة: 3 سنوات (حقلية)، سنتان (ذرة)، لا شيء (معظم الخضروات).', 'الخطوة 6 — سجّل المحصول والاستجابة للأمراض والآفات والجودة والتكيف، واجمع تقرير تقييم ARC/CASC.', 'الخطوة 7 — قدّم التقرير لـPVPO/VRC كدليل لتسجيل الصنف.'] },
          authorityIds: ['casc', 'pvpo'],
          documentIds: ['law-82-2002'],
        }
      },
    ],
  },

  breeder_q2_pvp: {
    id: 'breeder_q2_pvp',
    question: { en: 'What type of applicant are you?', ar: 'ما نوع مقدم الطلب؟' },
    options: [
      { id: 'company_pvp', label: { en: 'Company (capital > EGP 50,000)', ar: 'شركة (رأس مال > 50,000 جنيه)' },
        result: {
          title: { en: 'PVP Application — Group A (Companies)', ar: 'طلب PVP — المجموعة أ (الشركات)' },
          summary: { en: 'Group A applicants (companies with capital exceeding EGP 50,000) pay higher fees but gain full 20-25 year breeder\'s rights protection under Law No. 82 of 2002.', ar: 'تدفع شركات المجموعة أ (رأس مال يتجاوز 50,000 جنيه) رسوماً أعلى لكنها تحصل على حماية كاملة لحقوق المربي لمدة 20-25 سنة.' },
          keyPoints: { en: ['Group A fees: EGP 100 filing / EGP 750 certificate / EGP 150 opposition', 'Annual maintenance up to EGP 2,000 (7% surcharge on late payment)', 'Protection period: 20 years (25 years for trees and vines)'], ar: ['رسوم المجموعة أ: 100 جنيه تقديم / 750 جنيه شهادة / 150 جنيه اعتراض', 'الصيانة السنوية حتى 2,000 جنيه (7% غرامة عند التأخر)', 'مدة الحماية: 20 سنة (25 سنة للأشجار والكروم)'] },
          procedure: { en: ['Step 1 — File Application: submit the prescribed form at PVPO/CASC with EGP 100 filing fee.', 'Step 2 — Submit Documentation: technical statement, NGB deposit certificate, and authenticated copies of foreign applications with Arabic translation (items 3–5 may follow within 4 months).', 'Step 3 — Application Processing: PVPO assigns a serial number and records the variety in the Register of Plant Varieties.', 'Step 4 — DUS Examination per Article 192 and UPOV Test Guidelines.', 'Step 5 — Publication of acceptance in the monthly gazette; 60-day opposition window.', 'Step 6 — Ministerial grant published in the "Egyptian Gazette of Protected Plant Varieties"; pay certificate fee (EGP 750).', 'Step 7 — Pay annual maintenance (up to EGP 2,000/year) to keep rights in force for 20 or 25 years.'], ar: ['الخطوة 1 — تقديم الطلب: قدّم النموذج المعتمد لـPVPO/CASC مع رسم 100 جنيه.', 'الخطوة 2 — تقديم الوثائق: بيان تقني، شهادة إيداع NGB، ونسخ مصدّقة من الطلبات الأجنبية بترجمة عربية (يجوز استكمالها خلال 4 أشهر).', 'الخطوة 3 — معالجة الطلب: يمنح PVPO رقماً مسلسلاً ويقيد الصنف في سجل الأصناف النباتية.', 'الخطوة 4 — فحص DUS وفق المادة 192 وإرشادات UPOV.', 'الخطوة 5 — نشر القبول في الجريدة الشهرية وفترة اعتراض 60 يوماً.', 'الخطوة 6 — المنح الوزاري ونشره في "الجريدة المصرية للأصناف النباتية المحمية"؛ ودفع رسم الشهادة (750 جنيه).', 'الخطوة 7 — ادفع رسوم الصيانة السنوية (حتى 2,000 جنيه/سنة) للحفاظ على الحماية 20 أو 25 سنة.'] },
          authorityIds: ['pvpo'],
          documentIds: ['law-82-2002'],
        }
      },
      { id: 'individual_pvp', label: { en: 'Individual, institution, or small entity', ar: 'فرد أو مؤسسة أو كيان صغير' },
        result: {
          title: { en: 'PVP Application — Group B (Individuals & Institutions)', ar: 'طلب PVP — المجموعة ب (الأفراد والمؤسسات)' },
          summary: { en: 'Group B applicants (individuals, small entities, public institutions) pay significantly reduced fees. The same 7-step registration process applies with the same protection period.', ar: 'تدفع المجموعة ب (الأفراد، الكيانات الصغيرة، المؤسسات العامة) رسوماً مخفضة بشكل كبير.' },
          keyPoints: { en: ['Group B fees: EGP 25 filing / EGP 100 certificate / EGP 50 opposition', 'Same 7-step registration path as Group A', 'Same 20/25-year protection from the grant date'], ar: ['رسوم المجموعة ب: 25 جنيه تقديم / 100 جنيه شهادة / 50 جنيه اعتراض', 'نفس مسار التسجيل من 7 خطوات كالمجموعة أ', 'نفس مدة الحماية 20/25 سنة من تاريخ المنح'] },
          procedure: { en: ['Step 1 — File Application at PVPO/CASC with EGP 25 filing fee; include proof of applicant status (individual, institution, or small entity).', 'Step 2 — Submit Documentation: technical statement, NGB deposit certificate, and Arabic-translated foreign-application copies (items 3–5 deferrable by 4 months).', 'Step 3 — Processing: PVPO records the variety in the Register and issues a serial number.', 'Step 4 — DUS examination against UPOV Test Guidelines (testing may be conducted by CASC or commissioned).', 'Step 5 — Publication in the gazette triggers a 60-day opposition period.', 'Step 6 — Ministerial grant; pay EGP 100 certificate delivery fee.', 'Step 7 — Maintain the right by paying annual fees (up to EGP 2,000) throughout the 20- or 25-year protection window.'], ar: ['الخطوة 1 — تقديم الطلب لـPVPO/CASC برسم 25 جنيه؛ وإرفاق إثبات صفة المتقدم (فرد أو مؤسسة أو كيان صغير).', 'الخطوة 2 — إرفاق الوثائق: بيان تقني، شهادة إيداع NGB، ونسخ الطلبات الأجنبية مترجمة (يجوز التأجيل 4 أشهر).', 'الخطوة 3 — المعالجة: يسجل PVPO الصنف ويمنح رقماً مسلسلاً.', 'الخطوة 4 — فحص DUS وفق إرشادات UPOV (قد يُنفَّذ من CASC أو جهة ثالثة).', 'الخطوة 5 — النشر في الجريدة يفتح فترة اعتراض 60 يوماً.', 'الخطوة 6 — المنح الوزاري؛ ودفع رسم تسليم الشهادة 100 جنيه.', 'الخطوة 7 — الحفاظ على الحق بسداد الرسوم السنوية (حتى 2,000 جنيه) طوال نافذة الحماية 20 أو 25 سنة.'] },
          authorityIds: ['pvpo'],
          documentIds: ['law-82-2002'],
        }
      },
    ],
  },

  breeder_q2_germplasm: {
    id: 'breeder_q2_germplasm',
    question: { en: 'What is the intended use of the germplasm?', ar: 'ما الاستخدام المقصود للجرمبلازم؟' },
    options: [
      { id: 'food_agri', label: { en: 'Food & agriculture research (breeding, research)', ar: 'بحوث الغذاء والزراعة (تهجين، بحث)' },
        result: {
          title: { en: 'Germplasm Access for Food & Agriculture (Annex I Crops)', ar: 'الوصول إلى الجرمبلازم للغذاء والزراعة (محاصيل الملحق الأول)' },
          summary: { en: 'For the 35 crops and 29 forages listed in Annex I of the IT-PGRFA (which Egypt ratified in 2004), the National Gene Bank provides material FREE of charge under a Standard Material Transfer Agreement (SMTA).', ar: 'للمحاصيل الـ35 والأعلاف الـ29 المدرجة في الملحق الأول لمعاهدة ITPGRFA، يوفر البنك القومي للجينات المواد مجاناً بموجب اتفاقية SMTA.' },
          keyPoints: { en: ['Annex I crops (35 crops + 29 forages) are provided free under SMTA', 'No individual negotiation needed — SMTA is standardised', 'Utilization reports back to NGB are required'], ar: ['محاصيل الملحق الأول (35 + 29 علفاً) تُقدَّم مجاناً بموجب SMTA', 'لا حاجة لمفاوضات فردية — SMTA قياسي', 'يجب تقديم تقارير الاستخدام إلى NGB'] },
          procedure: { en: ['Step 1 — Confirm the target crop falls within Annex I of IT-PGRFA (35 crops and 29 forages).', 'Step 2 — Submit a written request to the National Gene Bank (NGB) at ARC Giza stating accession numbers, quantities, and intended research use.', 'Step 3 — NGB verifies availability, prepares accession passport data, and issues a Standard Material Transfer Agreement (SMTA).', 'Step 4 — Both provider (NGB) and recipient sign the SMTA; material is released free of charge.', 'Step 5 — Collect the germplasm and handle per the specified storage regime (+5 °C / -5 °C / -20 °C as applicable).', 'Step 6 — Submit periodic utilization reports to NGB and comply with benefit-sharing obligations if any commercialisation follows.'], ar: ['الخطوة 1 — تأكد من أن المحصول المستهدف ضمن الملحق الأول من IT-PGRFA (35 محصولاً و29 علفاً).', 'الخطوة 2 — قدّم طلباً خطياً إلى البنك القومي للجينات (NGB) بـARC الجيزة مع أرقام التجميعات والكميات والغرض البحثي.', 'الخطوة 3 — يتحقق NGB من التوفر، يُعِد بيانات جواز التجميع، ويُصدر اتفاقية SMTA القياسية.', 'الخطوة 4 — يوقع كل من المزوّد (NGB) والمتلقي على SMTA، ويتم تسليم المادة مجاناً.', 'الخطوة 5 — استلم الجرمبلازم وتعامل معها وفق نظام التخزين المحدد (+5°م / -5°م / -20°م).', 'الخطوة 6 — قدّم تقارير الاستخدام دورياً إلى NGB والتزم بتقاسم الفوائد عند أي تسويق لاحق.'] },
          authorityIds: ['ngb'],
          documentIds: ['law-53-1966'],
        }
      },
      { id: 'commercial', label: { en: 'Commercial, non-food, or medicinal use', ar: 'استخدام تجاري أو غير غذائي أو طبي' },
        result: {
          title: { en: 'Germplasm Access for Non-Food / Commercial Purposes', ar: 'الوصول إلى الجرمبلازم لأغراض غير غذائية / تجارية' },
          summary: { en: 'For non-Annex I crops, commercial use, or medicinal purposes, separate bilateral agreements apply under the Nagoya Protocol. This may involve payment or technology transfer.', ar: 'للمحاصيل من غير الملحق الأول، الاستخدام التجاري، أو الأغراض الطبية، تطبق اتفاقيات ثنائية منفصلة بموجب بروتوكول ناغويا.' },
          keyPoints: { en: ['Bilateral agreements with NGB/MALR are needed — not the SMTA', 'Subject to Nagoya Protocol ABS obligations', 'Draft ABS law pending; interim ad-hoc permits apply'], ar: ['مطلوب اتفاقيات ثنائية مع NGB/MALR — وليس SMTA', 'يخضع لالتزامات ABS في بروتوكول ناغويا', 'مشروع قانون ABS معلق؛ تعمل حالياً تصاريح مؤقتة'] },
          procedure: { en: ['Step 1 — Obtain authorisation in principle from MALR for the intended agricultural genetic resource use.', 'Step 2 — Coordinate with the Egyptian Environmental Affairs Agency (EEAA, Ministry of Environment) for Nagoya-Protocol compliance.', 'Step 3 — Engage a local Egyptian research partner — mandatory for most non-Annex I or commercial accesses.', 'Step 4 — Obtain Prior Informed Consent (PIC) and negotiate a Mutually Agreed Benefit-Sharing Agreement with NGB/MALR.', 'Step 5 — Document any associated traditional knowledge and record the access in Egypt\'s ABS Clearing-House profile.', 'Step 6 — Sign the bilateral material transfer agreement, receive the germplasm, and submit periodic utilization and benefit-sharing reports.'], ar: ['الخطوة 1 — احصل على موافقة مبدئية من MALR للاستخدام المقترح للموارد الوراثية الزراعية.', 'الخطوة 2 — نسّق مع جهاز شؤون البيئة (EEAA) للامتثال لبروتوكول ناغويا.', 'الخطوة 3 — ارتبط بشريك بحثي مصري محلي — إلزامي لمعظم حالات الوصول خارج الملحق الأول أو التجارية.', 'الخطوة 4 — احصل على موافقة مسبقة عن علم (PIC) وتفاوض على اتفاقية تقاسم فوائد مع NGB/MALR.', 'الخطوة 5 — وثّق أي معارف تقليدية مرتبطة وسجّل الوصول في ملف مصر بمقاصة ABS.', 'الخطوة 6 — وقّع الاتفاق الثنائي، استلم الجرمبلازم، وقدّم تقارير الاستخدام وتقاسم الفوائد دورياً.'] },
          authorityIds: ['ngb'],
          documentIds: ['law-53-1966'],
          warning: { en: 'A draft law on ABS genetic resources awaits parliamentary approval. Current procedures are interim and may change.', ar: 'قانون ABS المسودة ينتظر موافقة البرلمان. الإجراءات الحالية مؤقتة وقد تتغير.' },
        }
      },
    ],
  },

  // ── EXPORTER ────────────────────────────────────────────────────────────────
  exporter_q1: {
    id: 'exporter_q1',
    question: { en: 'What is your target export market?', ar: 'ما السوق المستهدف للتصدير؟' },
    options: [
      { id: 'comesa_exp', label: { en: 'COMESA region (Kenya, Uganda, Zambia, etc.)', ar: 'منطقة الكوميسا (كينيا، أوغندا، زامبيا، إلخ)' },
        result: {
          title: { en: 'Exporting to COMESA Region', ar: 'التصدير إلى منطقة الكوميسا' },
          summary: { en: 'Egypt became the 8th COMESA member to domesticate regional seed harmonization regulations in November 2019. Egyptian varieties registered on the COMESA Variety Catalogue can be traded freely across 8 member states.', ar: 'أصبحت مصر الدولة الثامنة في الكوميسا التي تستوعب لوائح تنسيق التقاوي الإقليمية في نوفمبر 2019.' },
          keyPoints: { en: ['Register on the COMESA Variety Catalogue to waive 2–3 yr pre-commercialisation', 'Regional certificate of origin gives full customs-duty exemption', 'COMSHIP covers 13 staple crops across 8 member states'], ar: ['سجّل في كتالوج أصناف COMESA لإلغاء فترة 2-3 سنوات قبل التسويق', 'شهادة المنشأ الإقليمية تمنح إعفاءً كاملاً من الرسوم الجمركية', 'يغطي COMSHIP 13 محصولاً رئيسياً عبر 8 دول أعضاء'] },
          procedure: { en: ['Step 1 — Register the variety on the COMESA Variety Catalogue through CASC (requires prior national registration and DUS data).', 'Step 2 — CAPQ conducts field inspection of the production area during the growth cycle for the destination country\'s phytosanitary requirements.', 'Step 3 — Post-harvest sampling and ISTA-standard laboratory testing (germination, purity, pathogens).', 'Step 4 — CAPQ issues the Phytosanitary Certificate referencing the COMESA destination.', 'Step 5 — CASC issues the COMESA certification tags/certificate for the lot.', 'Step 6 — Apply for the COMESA Certificate of Origin to access the duty-free regime.', 'Step 7 — Ship with the full document set: invoice, packing list, BL, phytosanitary, COMESA certificate.'], ar: ['الخطوة 1 — سجّل الصنف في كتالوج أصناف COMESA عبر CASC (يتطلب تسجيلاً وطنياً وبيانات DUS).', 'الخطوة 2 — يجري CAPQ فحصاً حقلياً للإنتاج خلال دورة النمو وفق متطلبات الصحة النباتية للوجهة.', 'الخطوة 3 — أخذ عينات بعد الحصاد وإجراء اختبارات مخبرية وفق معايير ISTA (إنبات، نقاء، مسببات مرض).', 'الخطوة 4 — يُصدر CAPQ شهادة الصحة النباتية تشير إلى الوجهة داخل COMESA.', 'الخطوة 5 — تُصدر CASC علامات/شهادة اعتماد COMESA للدفعة.', 'الخطوة 6 — تقدّم بطلب شهادة منشأ COMESA للاستفادة من الإعفاء الجمركي.', 'الخطوة 7 — شحن الدفعة مع الوثائق: فاتورة، قائمة تعبئة، بوليصة، شهادة صحة، شهادة COMESA.'] },
          authorityIds: ['casc', 'capq'],
          documentIds: ['law-53-1966'],
        }
      },
      { id: 'eu_exp', label: { en: 'European Union', ar: 'الاتحاد الأوروبي' },
        result: {
          title: { en: 'Exporting Seed to the European Union', ar: 'تصدير التقاوي إلى الاتحاد الأوروبي' },
          summary: { en: 'The EU-Egypt Association Agreement (in force since 2004) has liberalized 90%+ of agricultural goods since 2010. However, EU phytosanitary standards and pesticide residue rules are strict.', ar: 'أتاح اتفاق الشراكة بين مصر والاتحاد الأوروبي (سري المفعول منذ 2004) تحرير أكثر من 90% من السلع الزراعية منذ 2010.' },
          keyPoints: { en: ['EU-Egypt Association Agreement liberalises 90%+ agricultural goods', 'CAPQ field inspection and phytosanitary certification required', 'Pesticide residue compliance is the main risk factor'], ar: ['اتفاق الشراكة مع الاتحاد الأوروبي يحرّر >90% من السلع الزراعية', 'فحص CAPQ الحقلي وشهادة الصحة النباتية مطلوبة', 'الالتزام ببقايا المبيدات هو عامل الخطر الرئيسي'] },
          procedure: { en: ['Step 1 — CAPQ conducts in-season field inspection verifying freedom from EU-quarantine pests.', 'Step 2 — Plan and execute pesticide-residue monitoring against EU Maximum Residue Limits (MRLs).', 'Step 3 — Post-harvest sampling and ISTA laboratory testing for purity, germination, and pathogen load.', 'Step 4 — CASC issues OECD certification tags for eligible crops (grasses, cereals, maize, vegetables, etc.).', 'Step 5 — CAPQ issues the Phytosanitary Certificate referencing the EU destination; consider ePhyto for faster clearance.', 'Step 6 — Apply for the EU-Egypt Association Agreement certificate of origin (EUR.1) to access preferential tariffs.', 'Step 7 — Ship with complete dossier; retain records for at least the EU traceability retention period.'], ar: ['الخطوة 1 — يجري CAPQ فحصاً حقلياً داخل الموسم للتأكد من خلو الإنتاج من آفات الحجر الأوروبية.', 'الخطوة 2 — خطط ونفّذ مراقبة بقايا المبيدات مقابل حدود الاتحاد الأوروبي القصوى (MRLs).', 'الخطوة 3 — أخذ عينات بعد الحصاد وإجراء اختبارات ISTA (نقاء، إنبات، مسببات مرض).', 'الخطوة 4 — تُصدر CASC علامات اعتماد OECD للمحاصيل المؤهلة (أعشاب، حبوب، ذرة، خضروات).', 'الخطوة 5 — يُصدر CAPQ شهادة الصحة النباتية للوجهة الأوروبية؛ استخدم ePhyto لتسريع الإفراج.', 'الخطوة 6 — تقدّم بطلب شهادة المنشأ (EUR.1) وفق اتفاقية الشراكة للاستفادة من التعريفات التفضيلية.', 'الخطوة 7 — شحن الدفعة بالوثائق كاملة والاحتفاظ بالسجلات لفترة التتبع الأوروبية.'] },
          authorityIds: ['capq', 'casc'],
          documentIds: ['res-562-2019'],
          warning: { en: 'Pesticide residue compliance is critical. Egypt has faced market bans for non-compliance. Engage CAPQ early for field-level inspections.', ar: 'الامتثال لبقايا المبيدات أمر بالغ الأهمية. واجهت مصر حظراً في السوق لعدم الامتثال. تواصل مع CAPQ مبكراً للفحوصات الحقلية.' },
        }
      },
      { id: 'arab_exp', label: { en: 'Arab countries (GAFTA / Agadir)', ar: 'الدول العربية (GAFTA / أغادير)' },
        result: {
          title: { en: 'Exporting Seed to Arab Countries', ar: 'تصدير التقاوي إلى الدول العربية' },
          summary: { en: 'Egypt enjoys zero tariffs with 18 Arab countries under GAFTA (Pan Arab Free Trade Area) since 2005. The Agadir Agreement also provides diagonal cumulation benefits with the EU.', ar: 'تتمتع مصر بتعريفات صفرية مع 18 دولة عربية بموجب GAFTA منذ 2005.' },
          keyPoints: { en: ['GAFTA gives zero tariffs across 18 Arab states since 2005', 'Agadir adds diagonal cumulation with EU inputs', 'GAFTA origin rule: ≥40% local value added'], ar: ['GAFTA تمنح تعريفات صفرية بين 18 دولة عربية منذ 2005', 'أغادير تضيف التراكم القطري مع مدخلات أوروبية', 'قاعدة منشأ GAFTA: قيمة مضافة محلية ≥40%'] },
          procedure: { en: ['Step 1 — CAPQ field inspection during growth cycle to confirm freedom from quarantine pests of the target Arab country.', 'Step 2 — Post-harvest sampling and ISTA laboratory testing (purity, germination, health).', 'Step 3 — CAPQ issues the Phytosanitary Certificate referencing the Arab destination.', 'Step 4 — CASC issues certification tags (OECD where applicable) for the lot.', 'Step 5 — Compile origin evidence showing ≥40% local value added and apply for the GAFTA or Agadir Certificate of Origin.', 'Step 6 — Lodge documents with the Egyptian customs authority and the destination border agency; ship under the preferential regime.'], ar: ['الخطوة 1 — فحص CAPQ الحقلي خلال دورة النمو لتأكيد خلو الإنتاج من آفات الحجر في الدولة العربية المستهدفة.', 'الخطوة 2 — أخذ عينات بعد الحصاد وإجراء اختبارات ISTA (نقاء، إنبات، صحة).', 'الخطوة 3 — يُصدر CAPQ شهادة الصحة النباتية للوجهة العربية.', 'الخطوة 4 — تُصدر CASC علامات الاعتماد (OECD حسب الاقتضاء) للدفعة.', 'الخطوة 5 — جمّع أدلة المنشأ بقيمة مضافة محلية ≥40% وتقدّم بطلب شهادة منشأ GAFTA أو أغادير.', 'الخطوة 6 — تقديم الوثائق للجمارك المصرية وجهة الحدود في الوجهة والشحن ضمن النظام التفضيلي.'] },
          authorityIds: ['capq', 'casc'],
          documentIds: ['res-562-2019'],
        }
      },
      { id: 'other_exp', label: { en: 'Other international markets', ar: 'أسواق دولية أخرى' },
        result: {
          title: { en: 'General Seed Export Process', ar: 'عملية تصدير التقاوي العامة' },
          summary: { en: 'Egyptian seed exports follow a 4-step process coordinated between CAPQ and CASC. OECD certification labels significantly enhance export credibility in international markets.', ar: 'تتبع صادرات التقاوي المصرية عملية من 4 خطوات منسقة بين CAPQ وCACS.' },
          keyPoints: { en: ['Four-step export process coordinated between CAPQ and CASC', 'OECD certification materially strengthens international credibility', 'TFTA (in force July 2024) opens a 29-state Africa-wide corridor'], ar: ['عملية تصدير من 4 خطوات بالتنسيق بين CAPQ وCASC', 'اعتماد OECD يعزز المصداقية الدولية بشكل جوهري', 'اتفاقية التجارة الثلاثية TFTA (يوليو 2024) تفتح ممراً لـ29 دولة أفريقية'] },
          procedure: { en: ['Step 1 — CAPQ conducts field inspection during the growth cycle to verify freedom from quarantine pests of the importing country.', 'Step 2 — Post-harvest sampling and laboratory testing per importing country standards (germination, purity, pathogens).', 'Step 3 — CAPQ issues the Phytosanitary Certificate — mandatory for customs clearance at destination.', 'Step 4 — CASC issues OECD certification tags/certificates where the crop is covered by an OECD scheme.', 'Step 5 — Compile origin, contract, invoicing, and transport documents; lodge with Egyptian customs.', 'Step 6 — Ship the consignment, keep traceability records, and address any importing-country feedback promptly.'], ar: ['الخطوة 1 — يجري CAPQ فحصاً حقلياً خلال دورة النمو للتأكد من خلو الإنتاج من آفات الحجر في بلد الاستيراد.', 'الخطوة 2 — أخذ عينات بعد الحصاد وإجراء اختبارات مخبرية وفق متطلبات بلد الاستيراد (إنبات، نقاء، مسببات مرض).', 'الخطوة 3 — يُصدر CAPQ شهادة الصحة النباتية — إلزامية للتخليص الجمركي في الوجهة.', 'الخطوة 4 — تُصدر CASC علامات/شهادات اعتماد OECD عندما يكون المحصول ضمن مخطط OECD.', 'الخطوة 5 — جمّع وثائق المنشأ والعقد والفواتير والنقل، وقدّمها إلى الجمارك المصرية.', 'الخطوة 6 — شحن الدفعة، الاحتفاظ بسجلات التتبع، والاستجابة السريعة لأي ملاحظات من بلد الاستيراد.'] },
          authorityIds: ['capq', 'casc'],
          documentIds: ['res-562-2019'],
        }
      },
    ],
  },

  // ── INVESTOR ────────────────────────────────────────────────────────────────
  investor_q1: {
    id: 'investor_q1',
    question: { en: 'What is your investment interest?', ar: 'ما اهتمامك الاستثماري؟' },
    options: [
      { id: 'register_co', label: { en: 'Register a seed company in Egypt', ar: 'تسجيل شركة تقاوي في مصر' },
        result: {
          title: { en: 'Company Registration for Foreign Seed Investors', ar: 'تسجيل الشركات للمستثمرين الأجانب في التقاوي' },
          summary: { en: 'GAFI serves as Egypt\'s one-stop shop for company registration under Companies Law No. 159 of 1981 and Investment Law No. 72 of 2017. 100% foreign ownership is permitted for LLCs.', ar: 'تعمل GAFI كنافذة واحدة لتسجيل الشركات. يُسمح بالملكية الأجنبية 100% للشركات ذات المسؤولية المحدودة.' },
          keyPoints: { en: ['LLC needs EGP 50,000 paid-in capital; JSC EGP 250,000', '100% foreign ownership allowed; at least one Egyptian manager in an LLC', 'GAFI registration is followed by a separate MALR/CASC seed licence'], ar: ['LLC تحتاج 50,000 جنيه رأس مال؛ JSC تحتاج 250,000 جنيه', 'مسموح بملكية أجنبية 100%؛ مع مدير مصري واحد على الأقل في LLC', 'يلي تسجيل GAFI ترخيص منفصل من MALR/CASC'] },
          procedure: { en: ['Days 1–2 — Reserve the company name at GAFI (submit 5 proposed names) and prepare the Articles of Association.', 'Days 3–7 — Notarize documents at a notary public and obtain any foreign clearances (security screening for some nationals may take up to 7 months — start early).', 'Days 7–14 — Open the corporate bank account, deposit the minimum capital (EGP 50,000 LLC / EGP 250,000 JSC), and complete the GAFI online submission.', 'Days 14–20 — GAFI reviews the file and issues the incorporation certificate.', 'Days 21–25 — Register with the Commercial Registry and obtain the tax card and VAT certificate.', 'Days 21–30 — Register with the National Social Security Fund for employees.', 'Final step — Apply for the MALR/CASC sector-specific seed licence before commencing seed production or trading.'], ar: ['الأيام 1-2 — احجز اسم الشركة عبر GAFI (قدّم 5 أسماء مقترحة) وجهّز عقد التأسيس.', 'الأيام 3-7 — وثّق المستندات لدى الشهر العقاري واحصل على التصاريح الأجنبية (قد يستغرق الفحص الأمني لبعض الرعايا الأجانب حتى 7 أشهر — ابدأ مبكراً).', 'الأيام 7-14 — افتح الحساب البنكي للشركة وأودع الحد الأدنى لرأس المال (50,000 LLC / 250,000 JSC) وأكمل التقديم عبر بوابة GAFI.', 'الأيام 14-20 — يراجع GAFI الملف ويصدر شهادة التأسيس.', 'الأيام 21-25 — سجّل في السجل التجاري واستخرج البطاقة الضريبية وشهادة القيمة المضافة.', 'الأيام 21-30 — سجّل الشركة لدى الصندوق الوطني للتأمين الاجتماعي للعاملين.', 'الخطوة الختامية — تقدّم بطلب ترخيص التقاوي القطاعي من MALR/CASC قبل بدء الإنتاج أو التداول.'] },
          authorityIds: ['casc'],
          documentIds: ['law-53-1966'],
        }
      },
      { id: 'land', label: { en: 'Produce seed on Egyptian agricultural land', ar: 'إنتاج التقاوي على الأراضي الزراعية المصرية' },
        result: {
          title: { en: 'Agricultural Land Rules for Foreign Investors', ar: 'قواعد الأراضي الزراعية للمستثمرين الأجانب' },
          summary: { en: 'Law No. 15 of 1963 prohibits foreign ownership of agricultural land in the Nile Valley, Delta, and Oases. This is the single most significant barrier for foreign seed companies, but 4 viable alternatives exist.', ar: 'يحظر القانون رقم 15 لعام 1963 الملكية الأجنبية للأراضي الزراعية في وادي النيل والدلتا والواحات. ولكن توجد 4 بدائل قابلة للتطبيق.' },
          keyPoints: { en: ['Foreign ownership of Nile Valley/Delta/Oases agricultural land is prohibited', 'Four alternatives: long lease, SEZ, Free Zone, or Egyptian-majority JV', 'Free Zone status requires exporting >50% of total production'], ar: ['ملكية الأجانب للأراضي الزراعية في وادي النيل والدلتا والواحات محظورة', 'أربعة بدائل: إيجار طويل، SEZ، منطقة حرة، أو مشروع مشترك بأغلبية مصرية', 'يتطلب نظام المناطق الحرة تصدير أكثر من 50% من الإنتاج'] },
          procedure: { en: ['Step 1 — Confirm the prohibition under Law 15/1963 and rule out direct ownership and nominee structures (which void contracts).', 'Step 2 — Evaluate the four legal alternatives against your business model: long-term lease, SEZ, Public Free Zone, or joint venture.', 'Step 3a — Lease route: negotiate a lease of up to 50 years on desert or newly reclaimed land with the Egyptian landowner or state body.', 'Step 3b — SEZ route: apply to the Suez SEZONE (10% income tax, 0% customs on exported output) with a site-selection request.', 'Step 3c — Free Zone route: apply through GAFI to one of 9 Public Free Zones (Alexandria, Port Said, Suez, etc.); commit to exporting >50% of output.', 'Step 3d — Joint venture: partner with an Egyptian majority shareholder holding land title; capture the structure in a shareholder agreement.', 'Step 4 — Register the chosen land/arrangement with the Commercial Registry and obtain the matching CASC/MALR production licence.'], ar: ['الخطوة 1 — تأكّد من الحظر بموجب القانون 15/1963 واستبعد الملكية المباشرة والهياكل بالوكالة (التي تُبطل العقود).', 'الخطوة 2 — قيّم البدائل الأربعة وفق نموذج عملك: إيجار طويل، SEZ، منطقة حرة عامة، أو مشروع مشترك.', 'الخطوة 3أ — مسار الإيجار: تفاوض على إيجار حتى 50 سنة لأرض صحراوية/مستصلحة مع المالك المصري أو الجهة الحكومية.', 'الخطوة 3ب — مسار SEZ: تقدّم لـSEZONE السويس (ضريبة دخل 10%، جمارك 0% للصادرات) مع طلب اختيار موقع.', 'الخطوة 3ج — مسار المنطقة الحرة: تقدّم عبر GAFI لإحدى المناطق التسع (الإسكندرية، بورسعيد، السويس...) مع التزام بتصدير >50%.', 'الخطوة 3د — المشروع المشترك: شريك مصري بأغلبية يمتلك سند الأرض، مع توثيق الهيكل في اتفاق المساهمين.', 'الخطوة 4 — سجّل الترتيب المختار في السجل التجاري واحصل على ترخيص CASC/MALR الإنتاجي المطابق.'] },
          authorityIds: ['casc'],
          documentIds: ['law-53-1966'],
          warning: { en: 'Circumventing the land prohibition through nominees or shell entities can result in contract nullification. Always use legitimate alternative structures.', ar: 'التحايل على حظر الأراضي عبر وسطاء أو كيانات وهمية يمكن أن يؤدي إلى إبطال العقود.' },
        }
      },
      { id: 'incentives', label: { en: 'Access investment incentives and tax benefits', ar: 'الاستفادة من حوافز الاستثمار والمزايا الضريبية' },
        result: {
          title: { en: 'Investment Incentives for the Seed Sector', ar: 'حوافز الاستثمار لقطاع التقاوي' },
          summary: { en: 'Investment Law No. 72 of 2017 provides substantial incentives for agricultural projects including seed production. The seed sector qualifies for Sector B special incentives.', ar: 'يوفر قانون الاستثمار رقم 72 لعام 2017 حوافز كبيرة للمشاريع الزراعية بما فيها إنتاج التقاوي.' },
          keyPoints: { en: ['Sector B: 30% investment-cost deduction for up to 7 years', 'SEZONE: 10% unified income tax and 0% customs on exported output', '50% land-price refund if production starts within 2 years'], ar: ['القطاع (ب): خصم 30% من تكاليف الاستثمار لمدة 7 سنوات', 'SEZONE: ضريبة دخل موحدة 10% وجمارك 0% على المنتج المصدَّر', 'استرداد 50% من سعر الأرض عند بدء الإنتاج خلال سنتين'] },
          procedure: { en: ['Step 1 — Register the company via GAFI and obtain the Investor Status under Law 72/2017.', 'Step 2 — Prepare the investment file and map the project activities to Sector B eligibility (seed production, processing, ag-waste recycling).', 'Step 3 — Apply to GAFI\'s Investor Services Centre for general incentives (5-year stamp duty exemption, unified 2% customs on machinery).', 'Step 4 — Apply for the Sector B 30% investment-cost deduction to be reflected in the corporate tax filing for up to 7 years.', 'Step 5 — Where relevant, relocate or site the project in SEZONE or a Public Free Zone and obtain the zone licence.', 'Step 6 — Request Cabinet-level special incentives (free land allocation, 50% land-price refund, utility cost-sharing) via GAFI if project qualifies.', 'Step 7 — Maintain compliance reporting (start of production within 2 years, export thresholds where applicable) to keep the benefits.'], ar: ['الخطوة 1 — سجّل الشركة عبر GAFI واحصل على صفة المستثمر وفق القانون 72/2017.', 'الخطوة 2 — جهّز ملف الاستثمار واربط الأنشطة بمعايير القطاع (ب) (إنتاج ومعالجة التقاوي، تدوير مخلفات زراعية).', 'الخطوة 3 — تقدّم لمركز خدمة المستثمرين في GAFI للحصول على الحوافز العامة (إعفاء رسم الدمغة 5 سنوات، جمارك 2% موحدة على الآلات).', 'الخطوة 4 — اطلب تطبيق خصم القطاع (ب) بنسبة 30% في الإقرار الضريبي السنوي لمدة 7 سنوات.', 'الخطوة 5 — عند الحاجة، اختر موقع المشروع في SEZONE أو منطقة حرة عامة واستخرج ترخيص المنطقة.', 'الخطوة 6 — اطلب حوافز مجلس الوزراء الخاصة (تخصيص أرض مجاناً، استرداد 50% من سعر الأرض، مشاركة تكاليف المرافق) عبر GAFI عند التأهل.', 'الخطوة 7 — التزم بالتقارير الدورية (بدء الإنتاج خلال سنتين، عتبات التصدير) للإبقاء على الحوافز.'] },
          authorityIds: ['casc'],
          documentIds: ['law-53-1966'],
        }
      },
    ],
  },
};

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
    name: { ar: 'الإدارة المركزية لفحص واعتماد التقاوي (CASC)', en: 'Central Administration for Seed Testing and Certification (CASC)' },
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
