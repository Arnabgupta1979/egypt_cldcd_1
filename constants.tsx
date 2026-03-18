
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
          keyPoints: { en: ['Farmers may save seed for own-farm replanting ("within reasonable limits")', 'Acts done privately for non-commercial purposes are exempt from breeder rights', 'Selling or trading saved seed of protected varieties is NOT permitted', 'Egypt follows UPOV 1991 Act (acceded Dec 2019) — stricter than 1978 Act', 'For non-protected/public varieties (e.g., Giza 168, Sakha 95), no restrictions apply'], ar: ['يجوز الاحتفاظ بالبذور للزراعة الخاصة ضمن "حدود معقولة"', 'الأعمال الخاصة غير التجارية مُعفاة من حقوق المربي', 'بيع أو تداول البذور المحتفظ بها من الأصناف المحمية غير مسموح', 'مصر عضو في اتفاقية UPOV 1991 (منذ ديسمبر 2019) - أكثر صرامة من 1978', 'الأصناف العامة (كجيزة 168، سخا 95) لا تخضع لأي قيود'] },
          authorityIds: ['pvpo'],
          documentIds: ['law-82-2002'],
        }
      },
      { id: 'quality', label: { en: 'Report a seed quality problem', ar: 'الإبلاغ عن مشكلة في جودة التقاوي' },
        result: {
          title: { en: 'Reporting Seed Quality Issues to CASC', ar: 'الإبلاغ عن مشكلات جودة التقاوي لـ CASC' },
          summary: { en: 'The Central Administration for Seed Certification (CASC) is the primary body responsible for seed quality enforcement. They inspect seed markets and retail outlets and can investigate complaints.', ar: 'تعد الإدارة المركزية لفحص التقاوي واعتمادها (CASC) الجهة الرئيسية المسؤولة عن إنفاذ جودة التقاوي.' },
          keyPoints: { en: ['Contact CASC directly with the seed lot number and label details', 'Retain the original seed packaging and tag as evidence', 'CASC inspectors can test and investigate the reported batch', 'Certified seed must meet: ≥99% genetic purity, minimum germination rates, and moisture limits', 'Counterfeit seed is a recognized problem — MALR takes enforcement action'], ar: ['تواصل مع CASC مع رقم دفعة البذور وتفاصيل الملصق', 'احتفظ بالتغليف الأصلي والعلامة كدليل', 'يمكن لمفتشي CASC اختبار الدفعة والتحقيق فيها', 'يجب أن تستوفي التقاوي المعتمدة: ≥99% نقاء جيني، معدلات إنبات دنيا', 'التقاوي المزيفة مشكلة معترف بها وتتخذ MALR إجراءات إنفاذ'] },
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
          keyPoints: { en: ['CASP controls ~65-67% of certified wheat and rice seed supply', 'Look for Blue label (Certified Seed) — the final commercial grade for farmers', 'Famous public varieties: Giza 168, Giza 171 (wheat), Sakha 101, 104, 105 (rice)', 'Distributed through agricultural cooperatives and licensed retailers', 'All licensed seed traders must be registered with CASC (11,675 outlets nationwide)'], ar: ['تتحكم CASP في ~65-67% من إمدادات تقاوي القمح والأرز المعتمدة', 'ابحث عن العلامة الزرقاء (التقاوي المعتمدة) — الدرجة التجارية النهائية', 'الأصناف العامة الشهيرة: جيزة 168، 171 (قمح)، سخا 101، 104، 105 (أرز)', 'توزَّع عبر التعاونيات الزراعية والتجار المرخصين', 'جميع تجار التقاوي المرخصين مسجلون في CASC (11,675 منفذاً على المستوى الوطني)'] },
          authorityIds: ['casc'],
          documentIds: ['law-53-1966'],
        }
      },
      { id: 'potato', label: { en: 'Potato', ar: 'بطاطس' },
        result: {
          title: { en: 'Certified Potato Seed in Egypt', ar: 'تقاوي البطاطس المعتمدة في مصر' },
          summary: { en: 'Potato seed tubers in Egypt are strictly regulated. Only registered varieties can be purchased. Given Egypt\'s significant potato exports, quality is tightly controlled by CASC.', ar: 'تدرنات بذور البطاطس في مصر منظمة بصرامة. لا يمكن شراء إلا الأصناف المسجلة فقط.' },
          keyPoints: { en: ['Only CASC-registered potato varieties are legal to buy/plant commercially', 'Available grades: Elite or EU EEC2 (highest quality for seed)', 'Variety "Spunta" is among the registered imported varieties', 'Check the CASC variety list for approved potato varieties', 'Seed potato imports are tightly controlled with specific seasonal windows'], ar: ['أصناف البطاطس المسجلة في CASC فقط قانونية للشراء/الزراعة التجارية', 'الدرجات المتاحة: Elite أو EU EEC2 (أعلى جودة للبذور)', 'صنف "سبونتا" من بين الأصناف المستوردة المسجلة', 'تحقق من قائمة أصناف CASC للأصناف المعتمدة', 'استيراد تقاوي البطاطس يخضع لرقابة مشددة مع نوافذ موسمية محددة'] },
          authorityIds: ['casc'],
          documentIds: ['dec-1485-2015'],
          warning: { en: 'Only purchase potato seed from CASC-licensed traders. Unregistered varieties may be seized.', ar: 'اشترِ تقاوي البطاطس من تجار مرخصين من CASC فقط. قد يتم مصادرة الأصناف غير المسجلة.' },
        }
      },
      { id: 'veg', label: { en: 'Vegetables', ar: 'خضروات' },
        result: {
          title: { en: 'Vegetable Seed Sourcing in Egypt', ar: 'توفير بذور الخضروات في مصر' },
          summary: { en: 'Vegetable seed in Egypt is largely supplied by private companies, both domestic and international. The private sector plays a dominant role compared to field crops.', ar: 'يُزوَّد سوق بذور الخضروات في مصر بشكل رئيسي من شركات خاصة محلية وأجنبية.' },
          keyPoints: { en: ['Private sector dominates vegetable seed supply (unlike cereals)', 'All seed must be certified by CASC and carry official tags', 'Vegetable varieties are EXEMPT from VCU testing — easier/faster to register', 'Labels must be in Arabic and include: variety name, purity %, germination %, origin', 'Check CASC directory for licensed vegetable seed retailers in your governorate'], ar: ['القطاع الخاص يهيمن على إمدادات بذور الخضروات (على عكس الحبوب)', 'يجب اعتماد جميع البذور من CASC وحملها علامات رسمية', 'أصناف الخضروات معفاة من اختبار VCU — تسجيل أسهل وأسرع', 'يجب أن تكون الملصقات بالعربية وتتضمن: اسم الصنف، نسبة النقاء، الإنبات، الأصل', 'تحقق من دليل CASC للتجار المرخصين في محافظتك'] },
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
          keyPoints: { en: ['Step 1: Get pre-shipment approval from CASC', 'Step 2: CAPQ issues the import license', 'Step 3: Obtain ISTA-accredited seed testing certificate (purity, germination)', 'Step 4: Submit all docs via Nafeza system (ACI/ACID number 48 hrs before arrival)', 'Step 5: CAPQ physical inspection and sampling at port of entry', 'Step 6: Customs release — seed delivered to importer'], ar: ['الخطوة 1: الحصول على موافقة مسبقة للشحن من CASC', 'الخطوة 2: يصدر CAPQ ترخيص الاستيراد', 'الخطوة 3: الحصول على شهادة اختبار بذور معتمدة من ISTA (نقاء، إنبات)', 'الخطوة 4: تقديم جميع المستندات عبر نظام نافيزا (رقم ACI/ACID قبل 48 ساعة)', 'الخطوة 5: فحص CAPQ الجسدي وأخذ عينات عند الميناء', 'الخطوة 6: الإفراج الجمركي — تسليم التقاوي للمستورد'] },
          authorityIds: ['capq', 'casc'],
          documentIds: ['res-562-2019', 'law-53-1966'],
        }
      },
      { id: 'veg_imp', label: { en: 'Vegetable seed', ar: 'بذور خضروات' },
        result: {
          title: { en: 'Vegetable Seed Import Procedure', ar: 'إجراءات استيراد بذور الخضروات' },
          summary: { en: 'Vegetable seed imports follow the standard 6-step import process. Vegetable varieties are exempt from VCU testing, making market entry faster. Customs clearance requires the Nafeza platform.', ar: 'يتبع استيراد بذور الخضروات الإجراء القياسي من 6 خطوات. أصناف الخضروات معفاة من اختبار VCU مما يجعل دخول السوق أسرع.' },
          keyPoints: { en: ['Standard 6-step import applies (same as field crops)', 'Varieties only need DUS testing — no VCU (Value for Cultivation & Use)', 'Labels must be in Arabic: variety, purity %, germination %, origin, lot number', 'Human resource gaps in CASC for vegetable quality assurance — allow extra time', 'Major challenge: customs delays are identified as a key stakeholder concern'], ar: ['ينطبق الإجراء القياسي المكون من 6 خطوات (كما في المحاصيل الحقلية)', 'تحتاج الأصناف فقط لاختبار DUS — لا VCU', 'يجب أن تكون الملصقات بالعربية: الصنف، نسبة النقاء، الإنبات، المنشأ، رقم الدفعة', 'ثغرات في الموارد البشرية في CASC لضمان جودة الخضروات — خصص وقتاً إضافياً', 'التحدي الرئيسي: تأخيرات الجمارك هي مصدر قلق رئيسي للمعنيين'] },
          authorityIds: ['capq', 'casc'],
          documentIds: ['res-562-2019'],
        }
      },
      { id: 'gmo_imp', label: { en: 'GM / Biotech seeds', ar: 'تقاوي معدلة وراثياً' },
        result: {
          title: { en: 'GM Seed Import Status in Egypt', ar: 'وضع استيراد التقاوي المعدلة وراثياً في مصر' },
          summary: { en: 'Since 2012, Egypt has a de facto suspension on commercial cultivation of ALL GM crops. Importing GM seeds for planting is effectively halted pending a formal Biosafety Law.', ar: 'منذ عام 2012، تفرض مصر تعليقاً فعلياً على الزراعة التجارية لجميع المحاصيل المعدلة وراثياً. استيراد التقاوي المعدلة وراثياً للزراعة متوقف فعلياً.' },
          keyPoints: { en: ['Commercial cultivation of GM crops: SUSPENDED since 2012', 'Import of GM commodities (soy, maize) for animal FEED: PERMITTED under food safety rules', 'A draft National Biosafety Law (prepared 2004) has not been enacted as of 2025', 'Experimental field trials possible with multi-ministry approval (MALR + Environment)', 'Egypt signed Cartagena Protocol on Biosafety — ratified 2003, in force 2004'], ar: ['الزراعة التجارية للمحاصيل المعدلة وراثياً: موقوفة منذ 2012', 'استيراد سلع معدلة وراثياً (صويا، ذرة) للأعلاف: مسموح بموجب قواعد سلامة الغذاء', 'مشروع قانون السلامة الأحيائية الوطني (إعداد 2004) لم يُصدر بعد حتى 2025', 'التجارب الحقلية ممكنة بموافقة متعددة الوزارات (MALR + البيئة)', 'مصر وقّعت على بروتوكول قرطاجنة للسلامة الأحيائية — تصديق 2003، سريان 2004'] },
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
          keyPoints: { en: ['ALL summer season shipments must arrive by January 10 (annual deadline)', 'Required grade: Elite or EU EEC2 standard minimum', 'Only CAPQ-approved countries of origin permitted (must be free of brown rot)', 'Zero tolerance for Ralstonia solanacearum (brown rot/bacterial wilt)', 'Only registered potato varieties or trial quantities (max 10 tons) for new varieties', 'Submit ACI/ACID number via Nafeza 48 hours before port arrival'], ar: ['جميع شحنات الموسم الصيفي يجب أن تصل قبل 10 يناير (الموعد النهائي السنوي)', 'الدرجة المطلوبة: Elite أو معيار EU EEC2 كحد أدنى', 'دول المنشأ المعتمدة من CAPQ فقط (يجب أن تكون خالية من العفن البني)', 'تسامح صفري مع Ralstonia solanacearum (العفن البني/ذبول بكتيري)', 'أصناف البطاطس المسجلة فقط أو كميات تجريبية (حد أقصى 10 أطنان) للأصناف الجديدة', 'تقديم رقم ACI/ACID عبر نافيزا قبل 48 ساعة من وصول الميناء'] },
          authorityIds: ['capq', 'casc'],
          documentIds: ['dec-1485-2015', 'res-562-2019'],
          deadline: { en: 'All summer season potato shipments must arrive by January 10.', ar: 'يجب أن تصل جميع شحنات البطاطس للموسم الصيفي قبل 10 يناير.' },
        }
      },
      { id: 'winter_potato', label: { en: 'Winter / Autumn season', ar: 'الموسم الشتوي / الخريفي' },
        result: {
          title: { en: 'Winter / Autumn Potato Seed Import Rules', ar: 'قواعد استيراد تقاوي البطاطس الشتوية / الخريفية' },
          summary: { en: 'Winter/autumn potato imports follow the same strict quality rules. Annual ministerial decrees define specific windows — check the latest decree for exact arrival deadlines.', ar: 'تخضع واردات البطاطس الشتوية/الخريفية لنفس قواعد الجودة الصارمة.' },
          keyPoints: { en: ['Annual ministerial decrees define import windows — consult CAPQ for current season', 'Same grade requirement: Elite or EU EEC2 minimum', 'Import permit from CAPQ mandatory BEFORE shipment departs origin', 'Phytosanitary Certificate from exporting country NPPO required', 'Size specifications and labeling standards enforced at inspection', 'Failure to meet deadlines = shipment turned back or destroyed'], ar: ['القرارات الوزارية السنوية تحدد نوافذ الاستيراد — استشر CAPQ للموسم الحالي', 'نفس اشتراط الدرجة: Elite أو EU EEC2 كحد أدنى', 'تصريح استيراد من CAPQ إلزامي قبل مغادرة الشحنة من بلد المنشأ', 'شهادة صحة نباتية من NPPO بلد التصدير مطلوبة', 'مواصفات الحجم ومعايير الوسم تُطبَّق عند الفحص', 'عدم الالتزام بالمواعيد = رد الشحنة أو إتلافها'] },
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
          keyPoints: { en: ['Step 1: Register company via GAFI (2-4 weeks, LLC or JSC structure)', 'Step 2: Apply for MALR/CASC sector-specific seed license', 'As of 2006: 178 licensed seed production companies, 11,675 licensed seed trading outlets', 'Licensed producers must pass regular CASC field inspections during crop growth', 'Only CASC-certified fields produce seed eligible for official color-coded labels', 'Join the Egyptian Seed Association (ESAS) for industry representation and regulatory updates'], ar: ['الخطوة 1: تسجيل شركة عبر GAFI (2-4 أسابيع، هيكل LLC أو JSC)', 'الخطوة 2: التقدم للحصول على ترخيص التقاوي القطاعي من MALR/CASC', 'حتى 2006: 178 شركة إنتاج تقاوي مرخصة، 11,675 منفذ تداول تقاوي مرخصاً', 'يجب على المنتجين المرخصين اجتياز فحوصات CASC الحقلية المنتظمة أثناء نمو المحاصيل', 'الحقول المعتمدة من CASC فقط تنتج تقاوي مؤهلة للعلامات ذات الألوان الرسمية', 'انضم إلى الجمعية المصرية لمنتجي البذور (ESAS) للتمثيل الصناعي'] },
          authorityIds: ['casc'],
          documentIds: ['law-53-1966'],
        }
      },
      { id: 'certify', label: { en: 'Certify my seed production', ar: 'اعتماد إنتاجي من التقاوي' },
        result: {
          title: { en: 'Seed Certification Process in Egypt', ar: 'عملية اعتماد التقاوي في مصر' },
          summary: { en: 'Egypt follows an AOSCA-type 4-class certification system. Each class carries a distinct color-coded label. CASC manages the full process from field inspection to laboratory testing.', ar: 'تتبع مصر نظام اعتماد من 4 درجات على غرار AOSCA. كل درجة تحمل علامة ملونة مميزة.' },
          keyPoints: { en: ['4 seed classes: Breeder (white), Foundation (white), Registered (purple), Certified (blue)', 'Field inspection by CASC during growing season verifies isolation, rogueing, and purity', 'Laboratory testing at ISTA-accredited labs: purity, germination, moisture, seed health', 'Only fields passing BOTH field and lab tests receive official certification tags', 'Certified Seed (blue): must meet ≥99% genetic purity + crop-specific germination rates', 'ISTA methods applied: 4 replications of 100 seeds for germination testing'], ar: ['4 درجات بذور: مربي (أبيض)، أساس (أبيض)، مسجل (بنفسجي)، معتمد (أزرق)', 'فحص حقلي من CASC خلال موسم النمو للتحقق من العزل والتنقية والنقاء', 'اختبارات مخبرية في مختبرات معتمدة من ISTA: نقاء، إنبات، رطوبة، صحة البذور', 'الحقول التي تجتاز فحوصات CASC الحقلية والمخبرية فقط تحصل على علامات الاعتماد الرسمية', 'البذور المعتمدة (زرقاء): ≥99% نقاء جيني + معدلات إنبات محددة لكل محصول', 'طرق ISTA: 4 تكرارات من 100 بذرة لاختبار الإنبات'] },
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
          keyPoints: { en: ['EXEMPT from VCU testing — significantly faster process than field crops', 'DUS testing required: Distinctness, Uniformity, Stability (UPOV guidelines)', 'File application at PVPO/CASC with technical statement and fees', '60-day opposition period after publication in the monthly gazette', 'Final grant via ministerial decision, published in "Egyptian Gazette of Protected Plant Varieties"', 'Exception: Onion is treated as a FIELD CROP and requires VCU testing despite being horticultural'], ar: ['معفاة من اختبار VCU — عملية أسرع بكثير من المحاصيل الحقلية', 'اختبار DUS مطلوب: التميز، التجانس، الاستقرار (إرشادات UPOV)', 'تقديم الطلب في PVPO/CASC مع البيان التقني والرسوم', 'فترة اعتراض 60 يوماً بعد النشر في الجريدة الشهرية', 'المنح النهائي بقرار وزاري، ينشر في "الجريدة المصرية للأصناف النباتية المحمية"', 'استثناء: البصل يُعامَل كمحصول حقلي ويحتاج اختبار VCU رغم كونه بستانياً'] },
          authorityIds: ['pvpo', 'casc'],
          documentIds: ['law-82-2002'],
        }
      },
      { id: 'maize_var', label: { en: 'Maize', ar: 'ذرة' },
        result: {
          title: { en: 'Registering a Maize Variety', ar: 'تسجيل صنف ذرة جديد' },
          summary: { en: 'Maize has an expedited VCU testing timeline of 2 years (vs. 3 years for most other field crops). Testing occurs across multiple agro-ecological zones in Egypt.', ar: 'الذرة لديها جدول زمني معجل لاختبار VCU مدته سنتان (مقابل 3 سنوات لمعظم المحاصيل الحقلية الأخرى).' },
          keyPoints: { en: ['VCU testing: 2 years (expedited vs. standard 3-year timeline)', 'DUS testing also required alongside VCU', '7-step registration: Application → Documentation → Processing → DUS Exam → Publication → Opposition (60 days) → Final Grant', 'Multi-location testing across agro-ecological zones: yield, disease resistance, quality', 'Comparison against existing commercial check varieties required', 'COMESA regional registration available if variety already registered in other COMESA state'], ar: ['اختبار VCU: سنتان (معجَّل مقابل 3 سنوات المعيارية)', 'اختبار DUS مطلوب أيضاً جنباً إلى جنب مع VCU', 'تسجيل من 7 خطوات: طلب → توثيق → معالجة → فحص DUS → نشر → اعتراض (60 يوماً) → المنح النهائي', 'اختبار متعدد المواقع عبر مناطق زراعية بيئية: المحصول، مقاومة الأمراض، الجودة', 'مقارنة مع الأصناف التجارية المرجعية الحالية مطلوبة', 'التسجيل الإقليمي في COMESA متاح إذا كان الصنف مسجلاً بالفعل في دولة COMESA أخرى'] },
          authorityIds: ['pvpo', 'casc'],
          documentIds: ['law-82-2002', 'law-53-1966'],
        }
      },
      { id: 'field_var', label: { en: 'Other field crops (wheat, cotton, rice, etc.)', ar: 'محاصيل حقلية أخرى (قمح، قطن، أرز، إلخ)' },
        result: {
          title: { en: 'Registering a Field Crop Variety', ar: 'تسجيل صنف محصول حقلي جديد' },
          summary: { en: 'Field crop variety registration requires 3 years of VCU testing across multiple agro-ecological zones, plus DUS testing. The full 7-step process typically takes 4-5 years from first application.', ar: 'يستلزم تسجيل أصناف المحاصيل الحقلية 3 سنوات من اختبار VCU عبر مناطق زراعية بيئية متعددة، بالإضافة إلى اختبار DUS.' },
          keyPoints: { en: ['VCU testing: 3 years minimum (field crop standard)', 'Testing evaluates: yield vs. check varieties, disease/pest resistance, quality, adaptation to Egyptian conditions', 'Stability (S): characteristics must remain unchanged for 2 consecutive years/cycles', 'Variety Registration Committee (VRC) evaluates and the PVPO administers', 'Opposition period: 60 days after gazette publication for third-party challenges', 'Protection period after grant: 20 years (25 years for trees and vines)'], ar: ['اختبار VCU: 3 سنوات كحد أدنى (معيار المحاصيل الحقلية)', 'يقيّم الاختبار: المحصول مقارنة بالأصناف المرجعية، مقاومة الأمراض/الآفات، الجودة، التكيف', 'الاستقرار (S): يجب أن تبقى الخصائص دون تغيير لدورتين متتاليتين', 'لجنة تسجيل الأصناف (VRC) تقيّم ومكتب PVPO يدير', 'فترة اعتراض: 60 يوماً بعد نشر الجريدة للطعون من أطراف ثالثة', 'فترة الحماية بعد المنح: 20 سنة (25 سنة للأشجار والكروم)'] },
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
          keyPoints: { en: ['Coordinate with ARC (Field Crops Research Institute or Horticulture Research Institute)', 'CASC field inspectors must supervise and validate trial plots', 'Multi-location testing required: covers different agro-ecological zones of Egypt', 'Test parameters: yield vs. check varieties, disease resistance, quality, adaptation', 'VCU trials: 3 years (field crops), 2 years (maize), exempt (vegetables)', 'DUS trials: 2 consecutive years/cycles to demonstrate stability'], ar: ['التنسيق مع ARC (معهد بحوث المحاصيل الحقلية أو معهد بحوث البستنة)', 'مفتشو CASC الحقليون يجب أن يشرفوا على قطع التجارب ويتحققوا منها', 'اختبار متعدد المواقع مطلوب: يغطي مناطق زراعية بيئية مختلفة في مصر', 'معايير الاختبار: المحصول مقابل الأصناف المرجعية، مقاومة الأمراض، الجودة، التكيف', 'تجارب VCU: 3 سنوات (محاصيل حقلية)، سنتان (ذرة)، معفاة (خضروات)', 'تجارب DUS: دورتان متتاليتان لإثبات الاستقرار'] },
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
          keyPoints: { en: ['Application fee: EGP 100 | Certificate delivery: EGP 750 | Opposition filing: EGP 150', 'Annual maintenance fees: up to EGP 2,000/year (7% surcharge for late payment)', 'Protection: 20 years (most crops) or 25 years (trees and vines)', 'Rights cover: production, conditioning, sale, marketing, import, export, stocking', 'Rights extend to harvested material if breeder could not exercise rights on propagating material', 'Egypt is UPOV 1991 member since December 1, 2019 — internationally recognized protection'], ar: ['رسوم الطلب: 100 جنيه | تسليم الشهادة: 750 جنيه | تقديم الاعتراض: 150 جنيه', 'رسوم الصيانة السنوية: حتى 2,000 جنيه/سنة (7% غرامة للتأخر)', 'الحماية: 20 سنة (معظم المحاصيل) أو 25 سنة (الأشجار والكروم)', 'الحقوق تشمل: الإنتاج، التكييف، البيع، التسويق، الاستيراد، التصدير، التخزين', 'تمتد الحقوق إلى المحصول إذا لم يتمكن المربي من ممارسة حقوقه على المادة التكاثرية', 'مصر عضو في UPOV 1991 منذ 1 ديسمبر 2019 — حماية معترف بها دولياً'] },
          authorityIds: ['pvpo'],
          documentIds: ['law-82-2002'],
        }
      },
      { id: 'individual_pvp', label: { en: 'Individual, institution, or small entity', ar: 'فرد أو مؤسسة أو كيان صغير' },
        result: {
          title: { en: 'PVP Application — Group B (Individuals & Institutions)', ar: 'طلب PVP — المجموعة ب (الأفراد والمؤسسات)' },
          summary: { en: 'Group B applicants (individuals, small entities, public institutions) pay significantly reduced fees. The same 7-step registration process applies with the same protection period.', ar: 'تدفع المجموعة ب (الأفراد، الكيانات الصغيرة، المؤسسات العامة) رسوماً مخفضة بشكل كبير.' },
          keyPoints: { en: ['Application fee: EGP 25 | Certificate delivery: EGP 100 | Opposition filing: EGP 50', 'Annual maintenance: up to EGP 2,000/year (same as Group A)', 'Same protection period: 20 or 25 years from grant date', '7-step process: File → Documentation → Processing → DUS Exam → Publication → Opposition → Grant', 'Documents needed: Technical statement, Gene Bank deposit certificate, foreign application copies (Arabic)', 'Supplementary documents (items 3-5) may be submitted within 4 months of filing'], ar: ['رسوم الطلب: 25 جنيه | تسليم الشهادة: 100 جنيه | تقديم الاعتراض: 50 جنيه', 'الصيانة السنوية: حتى 2,000 جنيه/سنة (نفس المجموعة أ)', 'نفس فترة الحماية: 20 أو 25 سنة من تاريخ المنح', '7 خطوات: تقديم → توثيق → معالجة → فحص DUS → نشر → اعتراض → منح', 'المستندات المطلوبة: بيان تقني، شهادة إيداع في البنك الجيني، نسخ من الطلبات الأجنبية (عربي)', 'المستندات التكميلية يمكن تقديمها خلال 4 أشهر من التقديم'] },
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
          keyPoints: { en: ['Egypt ratified IT-PGRFA in 2004 — covers 35 crops + 29 forages (Annex I)', 'National Gene Bank (NGB) provides material FREE under Standard Material Transfer Agreement (SMTA)', 'Access open to farmers, researchers, and breeders in public AND private sectors', 'No individual access negotiations required for Annex I crops', 'NGB holds 21,000-30,000 accessions with capacity for 200,000', 'Storage: +5°C (active), -5°C (medium-term), -20°C (long-term base collection)'], ar: ['صادقت مصر على IT-PGRFA عام 2004 — يشمل 35 محصولاً + 29 علفاً (الملحق الأول)', 'البنك القومي للجينات يوفر المواد مجاناً بموجب اتفاقية SMTA القياسية', 'الوصول مفتوح للمزارعين والباحثين والمربين في القطاعين العام والخاص', 'لا حاجة لمفاوضات وصول فردية لمحاصيل الملحق الأول', 'يحتفظ NGB بـ21,000-30,000 تجميع بطاقة استيعابية لـ200,000', 'التخزين: +5°م (نشط)، -5°م (متوسط الأمد)، -20°م (مجموعة قاعدة طويلة الأمد)'] },
          authorityIds: ['ngb'],
          documentIds: ['law-53-1966'],
        }
      },
      { id: 'commercial', label: { en: 'Commercial, non-food, or medicinal use', ar: 'استخدام تجاري أو غير غذائي أو طبي' },
        result: {
          title: { en: 'Germplasm Access for Non-Food / Commercial Purposes', ar: 'الوصول إلى الجرمبلازم لأغراض غير غذائية / تجارية' },
          summary: { en: 'For non-Annex I crops, commercial use, or medicinal purposes, separate bilateral agreements apply under the Nagoya Protocol. This may involve payment or technology transfer.', ar: 'للمحاصيل من غير الملحق الأول، الاستخدام التجاري، أو الأغراض الطبية، تطبق اتفاقيات ثنائية منفصلة بموجب بروتوكول ناغويا.' },
          keyPoints: { en: ['Bilateral agreements required — negotiate directly with NGB/MALR', 'May involve financial payment or technology transfer arrangements', 'Subject to Access and Benefit-Sharing (ABS) under Nagoya Protocol (ratified by Egypt 2013)', 'Egypt maintains active ABS Clearing-House profile', 'Draft ABS law awaits parliamentary approval — interim ad-hoc permits currently used', 'Procedure: MALR approval → Egyptian Environmental Affairs Agency → local partner → PIC + benefit-sharing agreement'], ar: ['اتفاقيات ثنائية مطلوبة — تفاوض مباشرة مع NGB/MALR', 'قد تتضمن مدفوعات مالية أو ترتيبات نقل تكنولوجيا', 'يخضع لتقاسم الوصول والفوائد (ABS) بموجب بروتوكول ناغويا (صادقت عليه مصر 2013)', 'تحتفظ مصر بملف نشط في مقاصة ABS', 'قانون ABS المسودة ينتظر موافقة البرلمان — يُستخدم حالياً تصاريح مؤقتة', 'الإجراء: موافقة MALR → هيئة شؤون البيئة المصرية → شريك محلي → PIC + اتفاق تقاسم الفوائد'] },
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
          keyPoints: { en: ['COMESA members accepting Egyptian seed: Burundi, Egypt, Kenya, Malawi, Rwanda, Uganda, Zambia, Zimbabwe', 'Register variety on COMESA Variety Catalogue for automatic multi-country access', 'No 2-3 year pre-commercialization periods required for regionally registered varieties', 'Full customs duty exemption with COMESA certificate of origin', 'COMSHIP covers 13 staple crops: wheat, maize, sorghum, barley, cassava, potato, groundnuts, soy, sunflower, cotton, rice, beans, pearl millet', 'CASC issues COMESA certification for eligible crop varieties'], ar: ['دول COMESA التي تقبل التقاوي المصرية: بوروندي، مصر، كينيا، ملاوي، رواندا، أوغندا، زامبيا، زيمبابوي', 'سجّل الصنف في كتالوج أصناف COMESA للوصول التلقائي متعدد الدول', 'لا حاجة لفترات ما قبل التسويق 2-3 سنوات للأصناف المسجلة إقليمياً', 'إعفاء كامل من الرسوم الجمركية مع شهادة منشأ COMESA', 'يغطي COMSHIP 13 محصولاً رئيسياً', 'تصدر CASC اعتماد COMESA لأصناف المحاصيل المؤهلة'] },
          authorityIds: ['casc', 'capq'],
          documentIds: ['law-53-1966'],
        }
      },
      { id: 'eu_exp', label: { en: 'European Union', ar: 'الاتحاد الأوروبي' },
        result: {
          title: { en: 'Exporting Seed to the European Union', ar: 'تصدير التقاوي إلى الاتحاد الأوروبي' },
          summary: { en: 'The EU-Egypt Association Agreement (in force since 2004) has liberalized 90%+ of agricultural goods since 2010. However, EU phytosanitary standards and pesticide residue rules are strict.', ar: 'أتاح اتفاق الشراكة بين مصر والاتحاد الأوروبي (سري المفعول منذ 2004) تحرير أكثر من 90% من السلع الزراعية منذ 2010.' },
          keyPoints: { en: ['EU-Egypt Association Agreement in force since June 2004 — 90%+ agricultural goods liberalized', 'CAPQ field inspection of production area required during growth cycle', 'OECD certification tags issued by CASC enhance export credibility for EU buyers', 'Phytosanitary Certificate from CAPQ mandatory for each shipment', 'Warning: Saudi Arabia imposed 2019 ban on Egyptian onions due to pesticide residues — EU standards equally strict', 'Egypt works with FAO/EU to strengthen compliance with export market pesticide residue standards'], ar: ['اتفاق الشراكة بين مصر والاتحاد الأوروبي سري المفعول منذ يونيو 2004 — تحرير 90%+ من السلع الزراعية', 'مطلوب فحص CAPQ الحقلي لمنطقة الإنتاج أثناء دورة النمو', 'علامات OECD الصادرة من CASC تعزز مصداقية التصدير لمشتري الاتحاد الأوروبي', 'شهادة صحة نباتية من CAPQ إلزامية لكل شحنة', 'تحذير: فرضت السعودية حظراً عام 2019 على البصل المصري بسبب بقايا مبيدات — معايير الاتحاد الأوروبي صارمة بالمثل', 'مصر تعمل مع FAO/الاتحاد الأوروبي لتعزيز الامتثال لمعايير بقايا المبيدات'] },
          authorityIds: ['capq', 'casc'],
          documentIds: ['res-562-2019'],
          warning: { en: 'Pesticide residue compliance is critical. Egypt has faced market bans for non-compliance. Engage CAPQ early for field-level inspections.', ar: 'الامتثال لبقايا المبيدات أمر بالغ الأهمية. واجهت مصر حظراً في السوق لعدم الامتثال. تواصل مع CAPQ مبكراً للفحوصات الحقلية.' },
        }
      },
      { id: 'arab_exp', label: { en: 'Arab countries (GAFTA / Agadir)', ar: 'الدول العربية (GAFTA / أغادير)' },
        result: {
          title: { en: 'Exporting Seed to Arab Countries', ar: 'تصدير التقاوي إلى الدول العربية' },
          summary: { en: 'Egypt enjoys zero tariffs with 18 Arab countries under GAFTA (Pan Arab Free Trade Area) since 2005. The Agadir Agreement also provides diagonal cumulation benefits with the EU.', ar: 'تتمتع مصر بتعريفات صفرية مع 18 دولة عربية بموجب GAFTA منذ 2005.' },
          keyPoints: { en: ['GAFTA: Zero tariffs since 2005 among 18 Arab countries', 'Agadir Agreement: Full liberalization — members: Egypt, Morocco, Tunisia, Jordan', 'Agadir allows diagonal cumulation with EU (inputs from EU count toward origin)', '40% value-added origin requirement for GAFTA certificates', 'Phytosanitary Certificate from CAPQ required for all Arab markets', 'Export process: 4 steps — Field inspection → Lab testing → Phytosanitary cert → CASC certification'], ar: ['GAFTA: تعريفات صفرية منذ 2005 بين 18 دولة عربية', 'اتفاقية أغادير: تحرير كامل — الأعضاء: مصر، المغرب، تونس، الأردن', 'تتيح أغادير التراكم القطري مع الاتحاد الأوروبي', 'متطلب قيمة مضافة 40% لشهادات GAFTA', 'شهادة صحة نباتية من CAPQ مطلوبة لجميع الأسواق العربية', 'عملية التصدير: 4 خطوات — فحص حقلي → اختبار مخبري → شهادة صحة نباتية → اعتماد CASC'] },
          authorityIds: ['capq', 'casc'],
          documentIds: ['res-562-2019'],
        }
      },
      { id: 'other_exp', label: { en: 'Other international markets', ar: 'أسواق دولية أخرى' },
        result: {
          title: { en: 'General Seed Export Process', ar: 'عملية تصدير التقاوي العامة' },
          summary: { en: 'Egyptian seed exports follow a 4-step process coordinated between CAPQ and CASC. OECD certification labels significantly enhance export credibility in international markets.', ar: 'تتبع صادرات التقاوي المصرية عملية من 4 خطوات منسقة بين CAPQ وCACS.' },
          keyPoints: { en: ['Step 1: CAPQ field inspection of production area during growth cycle', 'Step 2: Post-harvest lab testing (germination, purity, pathogen) per importing country requirements', 'Step 3: CAPQ issues Phytosanitary Certificate — essential for customs clearance in destination', 'Step 4: CASC issues OECD certification tags/certificates for eligible crops', 'Egypt participates in OECD Seed Schemes: Grasses, Cereals, Maize/Sorghum, Vegetables, Fodder, Crucifers, and more', 'Tripartite FTA (TFTA) in force July 2024 — covers 29 COMESA+EAC+SADC states'], ar: ['الخطوة 1: فحص CAPQ الحقلي لمنطقة الإنتاج أثناء دورة النمو', 'الخطوة 2: اختبار مخبري بعد الحصاد (إنبات، نقاء، مسببات مرض) حسب متطلبات بلد الاستيراد', 'الخطوة 3: CAPQ يصدر شهادة الصحة النباتية — أساسية للتخليص الجمركي في الوجهة', 'الخطوة 4: CASC تصدر علامات/شهادات اعتماد OECD للمحاصيل المؤهلة', 'مصر تشارك في مخططات بذور OECD: أعشاب، حبوب، ذرة/سورغم، خضروات، علف، صليبيات وأكثر', 'اتفاقية التجارة الحرة الثلاثية (TFTA) سارية يوليو 2024 — تغطي 29 دولة COMESA+EAC+SADC'] },
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
          keyPoints: { en: ['LLC: Minimum 2 shareholders, EGP 50,000 paid-in capital, 100% foreign ownership permitted, at least 1 Egyptian manager', 'JSC: Minimum 3 shareholders, EGP 250,000 minimum capital', 'Timeline: 2-4 weeks typical (days 1-2: name reservation → days 3-7: notarization → days 7-14: GAFI submission → days 14-30: registration)', 'Foreign national security screening can take up to 7 months — plan ahead', 'After GAFI: also need MALR/CASC sector-specific seed license', 'Website: www.gafi.gov.eg'], ar: ['LLC: 2 مساهمين كحد أدنى، 50,000 جنيه رأس مال، ملكية أجنبية 100%، مدير مصري واحد على الأقل', 'JSC: 3 مساهمين كحد أدنى، 250,000 جنيه رأس مال كحد أدنى', 'الجدول الزمني: 2-4 أسابيع نموذجياً', 'الفحص الأمني للرعايا الأجانب يمكن أن يستغرق حتى 7 أشهر — خطط مسبقاً', 'بعد GAFI: تحتاج أيضاً ترخيص MALR/CASC القطاعي للتقاوي', 'الموقع: www.gafi.gov.eg'] },
          authorityIds: ['casc'],
          documentIds: ['law-53-1966'],
        }
      },
      { id: 'land', label: { en: 'Produce seed on Egyptian agricultural land', ar: 'إنتاج التقاوي على الأراضي الزراعية المصرية' },
        result: {
          title: { en: 'Agricultural Land Rules for Foreign Investors', ar: 'قواعد الأراضي الزراعية للمستثمرين الأجانب' },
          summary: { en: 'Law No. 15 of 1963 prohibits foreign ownership of agricultural land in the Nile Valley, Delta, and Oases. This is the single most significant barrier for foreign seed companies, but 4 viable alternatives exist.', ar: 'يحظر القانون رقم 15 لعام 1963 الملكية الأجنبية للأراضي الزراعية في وادي النيل والدلتا والواحات. ولكن توجد 4 بدائل قابلة للتطبيق.' },
          keyPoints: { en: ['PROHIBITED: Foreign direct land ownership in Nile Valley, Delta, and Oases', 'Alternative 1: Long-term LEASE — up to 50 years for desert/reclaimed land', 'Alternative 2: Special Economic Zones (SEZ) — different land rules, more flexible for integrated operations', 'Alternative 3: Public Free Zones (9 locations: Alexandria, Port Said, Suez, etc.) — no capital ownership restriction', 'Alternative 4: Joint Ventures with Egyptian majority land-title holders', 'Free Zones requirement: export >50% of total production'], ar: ['محظور: الملكية المباشرة الأجنبية للأراضي في وادي النيل والدلتا والواحات', 'البديل 1: إيجار طويل الأمد — حتى 50 سنة للأراضي الصحراوية/المستصلحة', 'البديل 2: المناطق الاقتصادية الخاصة (SEZ) — قواعد أراضي مختلفة، أكثر مرونة', 'البديل 3: المناطق الحرة العامة (9 مواقع: الإسكندرية، بورسعيد، السويس، إلخ)', 'البديل 4: مشاريع مشتركة مع مصريين يملكون سندات ملكية الأراضي', 'متطلب المناطق الحرة: تصدير أكثر من 50% من إجمالي الإنتاج'] },
          authorityIds: ['casc'],
          documentIds: ['law-53-1966'],
          warning: { en: 'Circumventing the land prohibition through nominees or shell entities can result in contract nullification. Always use legitimate alternative structures.', ar: 'التحايل على حظر الأراضي عبر وسطاء أو كيانات وهمية يمكن أن يؤدي إلى إبطال العقود.' },
        }
      },
      { id: 'incentives', label: { en: 'Access investment incentives and tax benefits', ar: 'الاستفادة من حوافز الاستثمار والمزايا الضريبية' },
        result: {
          title: { en: 'Investment Incentives for the Seed Sector', ar: 'حوافز الاستثمار لقطاع التقاوي' },
          summary: { en: 'Investment Law No. 72 of 2017 provides substantial incentives for agricultural projects including seed production. The seed sector qualifies for Sector B special incentives.', ar: 'يوفر قانون الاستثمار رقم 72 لعام 2017 حوافز كبيرة للمشاريع الزراعية بما فيها إنتاج التقاوي.' },
          keyPoints: { en: ['General incentives (all sectors): 5-year stamp duty exemption, unified 2% customs on machinery, exemption from notary fees', 'Sector B (agriculture incl. seed): 30% deduction from investment costs off taxable net profits for up to 7 years', 'Seed production and processing facilities explicitly qualify for Sector B', 'SEZONE (Suez SEZ): 10% unified income tax vs. 20% outside, 0% customs if exporting final products', '50% land price refund if production starts within 2 years', 'UPOV 1991 membership: strong IP protection framework attractive to foreign breeders'], ar: ['حوافز عامة (جميع القطاعات): إعفاء رسوم دمغة 5 سنوات، جمارك موحدة 2% على الآلات', 'القطاع ب (زراعة بما في ذلك التقاوي): خصم 30% من تكاليف الاستثمار من صافي الأرباح الخاضعة للضريبة لمدة 7 سنوات', 'مرافق إنتاج التقاوي ومعالجتها مؤهلة صراحةً للقطاع ب', 'SEZONE: ضريبة دخل موحدة 10% مقابل 20% خارج المناطق، جمارك 0% عند تصدير المنتج النهائي', 'استرداد 50% من سعر الأرض إذا بدأ الإنتاج خلال سنتين', 'عضوية UPOV 1991: إطار حماية ملكية فكرية قوي يجذب المربين الأجانب'] },
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
