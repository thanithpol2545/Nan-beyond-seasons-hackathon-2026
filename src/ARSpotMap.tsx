import { Flower, Festival, WellnessCommunity, EthnicGroup, EcomProduct } from "./types";

export const FLOWERS_DATA: Flower[] = [
  {
    id: "FL001",
    name_th: "เสี้ยวดอกขาว",
    name_en: "Orchid Tree / Mountain Ebony",
    scientific: "Bauhinia variegata",
    family: "Fabaceae (ถั่ว)",
    symbol: "ดอกไม้ประจำจังหวัดน่าน",
    season: "ตลอดปี, ชอบอากาศเย็น",
    scent: "หอมอ่อนๆ ละมุนละไม",
    color: "ชมพูอ่อน, ขาว",
    medical: {
      benefits_th: [
        "เปลือกมีสารแทนนินใช้ย้อมแห อวน ต้านเชื้อแบคทีเรีย",
        "ดอกมีฤทธิ์ต้านมะเร็ง",
        "ใบอ่อนและฝักอ่อนกินได้ มีสารต้านอนุมูลอิสระ"
      ],
      uses_th: [
        "ย้อมผ้าธรรมชาติ",
        "พืชอาหาร (ใบอ่อน, ฝักอ่อน)",
        "สมุนไพรพื้นบ้าน"
      ],
      benefits_en: [
        "Bark contains tannins with antibacterial properties",
        "Flowers show anticancer activity",
        "Young leaves and pods are edible with antioxidants"
      ]
    },
    aesthetic: {
      description_th: "ไม้ยืนต้นสูง 10-15 ม. ดอกคล้ายดอกชงโค 5 กลีบ สีชมพูอ่อนหรือขาว กลิ่นหอมอ่อนๆ ใบบางรูปหัวใจ ปลายเว้าลึก เวลาดอกบานจะทิ้งใบ เห็นแต่ดอกเต็มต้นสวยงาม",
      description_en: "Medium tree 10-15m. Flowers resemble orchid blooms with 5 petals in pale pink or white. Deciduous during flowering — bare branches covered in blossoms.",
      photography_score: 9,
      instagram_worthy: true
    },
    tradition: {
      uses_th: [
        "ดอกไม้ประจำจังหวัดน่าน",
        "ปลูกเป็นไม้ประดับริมถนน",
        "ใช้เปลือกย้อมแหและอวน"
      ],
      food_th: "ใบอ่อนใช้ห่อหมก หรือปรุงเป็นผักสด ฝักอ่อนนำมาแกงหรือผัด"
    },
    belief: {
      meaning_th: "ความงามที่เรียบง่าย, ความอดทนดั่งภูเขาสูง",
      beliefs_th: [
        "เป็นไม้มงคล",
        "ในอินเดียถือเป็น 'โควิทารา' ต้นไม้ศักดิ์สิทธิ์ ใช้ในพิธีบูชาเทวดา",
        "เชื่อว่าปลูกแล้วจะช่วยเสริมสิริมงคลแก่บ้านและเมือง"
      ],
      beliefs_en: [
        "Sacred tree (Kovidara) in Hinduism",
        "Believed to bring prosperity and protection"
      ]
    },
    wellness_activity: [
      "Flower photography tour in Doi Phu Kha",
      "Nature walk to spot blooming season",
      "Edible flower cooking workshop"
    ],
    fragrance_family: "Floral - Soft",
    element: "ลม (Wind)",
    knowledge_graph_tags: [
      "nan_province_flower",
      "edible_flower",
      "sacred_tree",
      "ornamental"
    ],
    image_url: "https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "FL002",
    name_th: "มะลิ",
    name_en: "Jasmine",
    scientific: "Jasminum spp.",
    family: "Oleaceae",
    symbol: "ความกตัญญู, ความบริสุทธิ์อันนิรันดร์",
    season: "ตลอดปี (ออกดอกมากในหน้าร้อน)",
    scent: "หอมหวานเข้มข้น ดึงดูดอารมณ์ให้ดื่มด่ำ",
    color: "ขาวบริสุทธิ์",
    medical: {
      benefits_th: [
        "ปรับสมดุลฮอร์โมนเพศหญิง คลายวิตกกังวล",
        "ลดความเครียดและวิตกกังวลสะสม",
        "ช่วยให้นอนหลับสบายเต็มตื่น",
        "สดชื่น, กระปรี้กระเปร่าทันทีที่สูดดม"
      ],
      uses_th: [
        "น้ำมันหอมระเหยบำบัด",
        "ชาดอกมะลิอบอวล",
        "ปรุงยาหอมแก้วิงเวียนบำรุงหัวใจ",
        "ฟื้นฟูสภาพผิว"
      ],
      benefits_en: [
        "Hormone balancing",
        "Anxiety reduction",
        "Sleep aid",
        "Mood uplifting"
      ]
    },
    aesthetic: {
      description_th: "ดอกสีขาวขนาดเล็ก กลีบซ้อนหรือกลีบเดี่ยว กลิ่นหอมหวานเป็นเอกลักษณ์ นิยมร้อยเป็นพวงมาลัยและอุบะอันประณีต",
      photography_score: 8,
      instagram_worthy: true
    },
    tradition: {
      uses_th: [
        "พวงมาลัยถวายพระพุทธ",
        "สรงน้ำพระ รดน้ำดำหัวผู้ใหญ่ในวันปีใหม่เมือง",
        "ประดับในก๋วยสลาก",
        "ลอยประดับกระทงงานยี่เป็ง"
      ],
      food_th: "ชามะลิน่าน, น้ำลอยดอกมะลิสำหรับทำขนมไทยโบราณ"
    },
    belief: {
      meaning_th: "ความบริสุทธิ์, ความกตัญญูสูงสุดต่อบรรพชน",
      beliefs_th: [
        "ดอกไม้มงคลที่ขาดไม่ได้ในงานพุทธศาสนา",
        "ใช้ในพิธีบูชาพระและสิ่งศักดิ์สิทธิ์เพื่อขอพรความสงบ",
        "เชื่อว่าดอกมะลิสีขาวแทนจิตที่สะอาดหลุดพ้น"
      ],
      beliefs_en: [
        "Symbol of purity and gratitude in Buddhism",
        "Essential flower for worship and ceremonies"
      ]
    },
    wellness_activity: [
      "Jasmine tea ceremony & tasting",
      "Aromatherapy with organic jasmine essential oil",
      "DIY jasmine garland workshop",
      "Jasmine-scented mindful meditation"
    ],
    fragrance_family: "Floral",
    element: "ดิน (Earth)",
    knowledge_graph_tags: [
      "buddhist_offering",
      "aromatherapy",
      "edible_flower",
      "garland_flower"
    ],
    image_url: "https://images.unsplash.com/photo-1508747705729-4074ecda0cd3?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "FL003",
    name_th: "บัวหลวง",
    name_en: "Sacred Lotus",
    scientific: "Nelumbo nucifera",
    family: "Nelumbonaceae",
    symbol: "การตื่นรู้ทางจิตวิญญาณและความบริสุทธิ์เหนือโคลนตม",
    season: "ฤดูฝน-ฤดูหนาว (พฤษภาคม-กุมภาพันธ์)",
    scent: "หอมสะอาด เย็นใจ ไร้กังวล",
    color: "ชมพูระเรื่อ, ขาว",
    medical: {
      benefits_th: [
        "รสเย็นระงับร้อน บำรุงหัวใจตามศาสตร์โบราณ",
        "ส่วนผสมหลักในตำรับเบญจเกสรปรับธาตุ",
        "เกสรและเม็ดบัวช่วยชะลอวัยบำรุงพลังกาย",
        "บำรุงครรภ์และฟื้นฟูระบบประสาท"
      ],
      uses_th: [
        "ปรุงตำรับยาหอมเบญจเกสรน่าน",
        "ชาดอกบัวหลวงอบแห้ง",
        "ประกอบอาหารเพื่อสุขภาพบำรุงกำลัง"
      ],
      benefits_en: [
        "Cooling effect, heart tonic (Thai traditional medicine)",
        "Part of Benjakesorn formula for longevity",
        "Lotus seed nutrient enrichment"
      ]
    },
    aesthetic: {
      description_th: "ดอกขนาดใหญ่ สีชมพูหรือขาว กลีบหลายชั้นซ้อนกันประณีต ลอยพ้นน้ำเคียงคู่ใบบนผิวน้ำนิ่ง สะท้อนความสงบ",
      photography_score: 10,
      instagram_worthy: true
    },
    tradition: {
      uses_th: [
        "บูชาองค์พระสัมมาสัมพุทธเจ้า",
        "ประดับบายศรีและเครื่องสูงในการสืบชะตาหลวง",
        "ลอยกระทงบูชาแม่คงคาในเทศกาลยี่เป็ง"
      ],
      food_th: "ชาดอกเกสรบัว, เม็ดบัวเชื่อม, กลีบบัวทอดกรอบ, แกงส้มฝักบัวหลวง"
    },
    belief: {
      meaning_th: "ความสงบภายใน, ปัญญา และการหลุดพ้นจากพันธนาการ",
      beliefs_th: [
        "สัญลักษณ์แห่งความดีงามและปัญญาที่พ้นจากกิเลส",
        "เปรียบเสมือนบัวสี่เหล่าที่พร้อมผลิบานรับแสงธรรม",
        "เชื่อว่าการบูชาด้วยดอกบัวส่งผลให้สติปัญญาแจ่มใสเฉียบคม"
      ],
      beliefs_en: [
        "Symbol of enlightenment and pristine purity in Buddhism",
        "Different stages of lotus represent spiritual progression"
      ]
    },
    wellness_activity: [
      "Lotus visual & sound meditation",
      "Organic lotus flower tea tasting",
      "Lotus pond minimalist photography journey",
      "Benjakesorn wellness remedy blending"
    ],
    fragrance_family: "Floral - Green",
    element: "น้ำ (Water)",
    knowledge_graph_tags: [
      "buddhist_flower",
      "benjakesorn",
      "meditation_flower",
      "thai_medicine",
      "edible_flower"
    ],
    image_url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "FL004",
    name_th: "ดาวเรือง",
    name_en: "Marigold",
    scientific: "Tagetes erecta",
    family: "Asteraceae",
    symbol: "ความรุ่งเรือง รุ่งโรจน์ด้วยโชคลาภ",
    season: "ตลอดทั้งปี",
    scent: "กลิ่นหอมสมุนไพร ฉุนเฉพาะตัว ปลุกพลังสมอง",
    color: "เหลืองทอง, ส้มเจิดจ้า",
    medical: {
      benefits_th: [
        "สารลูทีนเข้มข้นช่วยบำรุงสายตาและต้านความเสื่อม",
        "ต้านเชื้อแบคทีเรียและรักษาผิวอักเสบ",
        "ขับสารพิษตกค้างในร่างกาย",
        "สมานแผลภายนอกและบำรุงผิวพรรณ"
      ],
      uses_th: [
        "ทำยาสมานแผลและครีมบำรุงผิว",
        "สกัดน้ำมันหอมระเหยบำบัดกล้ามเนื้อ",
        "ทำลูกประคบแก้ปวดเมื่อย"
      ],
      benefits_en: [
        "Rich in lutein for eye care",
        "Anti-inflammatory, antibacterial properties",
        "Wound healing acceleration"
      ]
    },
    aesthetic: {
      description_th: "ดอกสีเหลืองส้มเป็นพุ่มกลมแน่น กลีบซ้อนแน่นเอียด แข็งแรง ทนแดด ทนฝน ให้ความรู้สึกอบอุ่นมีพลัง",
      photography_score: 7,
      instagram_worthy: true
    },
    tradition: {
      uses_th: [
        "ร้อยบายศรีสืบชะตาหลวงน่าน",
        "ประดับซุ้มประตูป่าในเทศกาลลอยกระทงยี่เป็ง",
        "เครื่องสักการะถวายทานสลากภัต"
      ],
      food_th: "ชุบแป้งทอดทานคู่กับน้ำพริกหนุ่มน่าน, ชาดอกดาวเรืองบำรุงสายตา"
    },
    belief: {
      meaning_th: "ความเจริญก้าวหน้า, ทรัพย์สินเงินทอง, บารมี",
      beliefs_th: [
        "ดอกไม้สีทองมงคลส่งเสริมความมั่งคั่งและอายุยืน",
        "เป็นแกนหลักในพานบายศรีมงคลของทางล้านนา",
        "เชื่อว่าปลูกแล้วช่วยเสริมชื่อเสียงและโชคลาภวาสนาแก่ผู้ครอบครอง"
      ],
      beliefs_en: [
        "Golden flower symbolizing extreme wealth and spiritual light",
        "Indispensable element in traditional Lanna baisri offerings"
      ]
    },
    wellness_activity: [
      "Baisri making flow workshop",
      "Marigold natural dye workshop for organic silk",
      "Eye-wellness marigold tea therapy sessions"
    ],
    fragrance_family: "Fresh - Herbal",
    element: "ไฟ (Fire)",
    knowledge_graph_tags: [
      "offering_flower",
      "baisri_flower",
      "lanna_tradition",
      "edible_flower",
      "medicinal_flower"
    ],
    image_url: "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "FL010",
    name_th: "ลีลาวดี",
    name_en: "Plumeria / Frangipani",
    scientific: "Plumeria spp.",
    family: "Apocynaceae",
    symbol: "ความสุขอันลึกซึ้ง ความงามอมตะสงบนิ่ง",
    season: "ตลอดปี (ผลิบานสะพรั่งฤดูร้อนและฝน)",
    scent: "หอมอบอุ่น นุ่มละมุน คล้ายวนิลลากลางป่าร้อน",
    color: "ขาวใจกลางเหลือง, ชมพูเอิบอิ่ม",
    medical: {
      benefits_th: [
        "ช่วยให้จิตใจสงบ คลายความตึงเครียดของกล้ามเนื้อสมอง",
        "แก้วิงเวียนศีรษะ หน้ามืด คลื่นไส้",
        "ต้านไวรัสและแบคทีเรียตามธรรมชาติ",
        "ช่วยให้ผ่อนคลายลึกเพื่อเตรียมนอนหลับ"
      ],
      uses_th: [
        "น้ำมันหอมระเหยบำบัดอารมณ์ซึมเศร้า",
        "ทำสเปรย์ปรับอากาศอโรมาในห้องสมาธิ",
        "ทำเทียนหอมบำบัดความเครียด"
      ],
      benefits_en: [
        "Deep emotional relaxation",
        "Dizziness relief",
        "Antiviral properties and natural aromatherapy base"
      ]
    },
    aesthetic: {
      description_th: "ดอก 5 กลีบสวยสมมาตร กลิ่นหอมฟุ้ง ต้นแตกกิ่งก้านโค้งเว้าสวยงาม ปลูกเคียงคู่โบราณสถาน",
      photography_score: 9,
      instagram_worthy: true
    },
    tradition: {
      uses_th: [
        "ปลูกรอบคุ้มหลวงน่านและตามวัดสำคัญ เช่น ซุ้มลีลาวดีที่พิพิธภัณฑสถานแห่งชาติน่าน",
        "ร้อยมาลัยบูชาสิ่งศักดิ์สิทธิ์",
        "ตกแต่งสถานที่ต้อนรับแขกบ้านแขกเมือง"
      ],
      food_th: "ไม่นิยมรับประทานดิบเนื่องจากมียางสูง"
    },
    belief: {
      meaning_th: "ความรักแท้ที่มั่นคง, ความละเมียดละไม, ความสงบในจิตวิญญาณ",
      beliefs_th: [
        "อดีตเคยห้ามปลูกในบ้านเพราะชื่อสอดคล้องกับ 'ระทม' แต่ปัจจุบันเปลี่ยนชื่อเป็น 'ลีลาวดี' เสริมบารมีทางศิลปะ",
        "เชื่อว่าปลูกตามวัดวาอารามช่วยดูดซับความเงียบสงบเย็นใจ"
      ],
      beliefs_en: [
        "Symbol of eternity, devotion, and absolute inner peace",
        "Commonly planted near Lanna sanctuaries and old temples"
      ]
    },
    wellness_activity: [
      "Zen meditation under the Plumeria archway",
      "Scented wax tablet workshop",
      "Nan historical photo-walk at the Plumeria arch"
    ],
    fragrance_family: "Floral - Tropical",
    element: "ลม (Wind)",
    knowledge_graph_tags: [
      "temple_flower",
      "aromatherapy",
      "thai_garden",
      "photogenic"
    ],
    image_url: "https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "FL012",
    name_th: "กระดังงา",
    name_en: "Ylang-Ylang",
    scientific: "Cananga odorata",
    family: "Annonaceae",
    symbol: "เสน่ห์ลึกซึ้ง ความอบอุ่นผ่อนคลายลึก",
    season: "ตลอดปี",
    scent: "หอมหวานอบอุ่น เย้ายวนใจ ปลอบโยนอารมณ์",
    color: "เหลืองอมเขียว",
    medical: {
      benefits_th: [
        "ลดความเครียดสะสม คลายอาการวิตกกังวลหนักหน่วง",
        "ช่วยให้ระดับชีพจรเต้นช้าลงและลดความดันโลหิตสูง",
        "ต้านภาวะซึมเศร้าและปรับสภาพอารมณ์แปรปรวน",
        "กระตุ้นความรู้สึกอบอุ่น อบอวลด้วยความรัก"
      ],
      uses_th: [
        "น้ำมันหอมนวดตัวเพื่อสปาอโรมาบำบัดลึก",
        "ทำน้ำอบไทยและน้ำมันปรุงกลั่นโบราณ",
        "ครีมบำรุงผิวกายยามค่ำคืน"
      ],
      benefits_en: [
        "Excellent anxiety reducer and soothing agent",
        "Regulates heart rate and relieves mild depression",
        "Sensory warmth stimulator"
      ]
    },
    aesthetic: {
      description_th: "ดอกมีกลีบยาวอ่อนลู่ ม้วนเกลียวสวยงามดุจพัดทอง ห้อยระย้าเป็นพวงหนาแน่น กลิ่นฟุ้งกระจายไกลเวลากลางคืน",
      photography_score: 8,
      instagram_worthy: true
    },
    tradition: {
      uses_th: [
        "ร้อยมาลัยต้อนรับงานสืบชะตาเมืองน่าน",
        "ใช้อบผ้าห่ม คลุมเครื่องประดับล้านนาชั้นสูง",
        "ทำน้ำปรุงลอยกระทงในพิธีกระซิบรักเมืองน่าน"
      ],
      food_th: "ใช้อบขนมไทยโบราณ เช่น ทองหยิบ ทองหยอด สลิ่ม"
    },
    belief: {
      meaning_th: "ความรักที่เจริญงอกงาม ชื่อเสียงโด่งดังไปไกล แฝงด้วยความอ่อนน้อม",
      beliefs_th: [
        "ความเชื่อโบราณ 'กระดังงาไทยต้องลนไฟยิ่งหอม' สื่อถึงความเข้มแข็งที่ผ่านอุปสรรคแล้วยิ่งงดงาม",
        "เชื่อว่าปลูกช่วยให้ผู้อาศัยมีชื่อเสียงหอมหวนเลื่องลือขจรไกล"
      ],
      beliefs_en: [
        "Symbolizes resilience, alluring charm, and far-reaching positive reputation"
      ]
    },
    wellness_activity: [
      "Aromatherapy relaxation massage",
      "Essential oil distillation and blending masterclass",
      "Scented Lanna wax candle crafting workshop"
    ],
    fragrance_family: "Floral-Oriental",
    element: "น้ำ (Water)",
    knowledge_graph_tags: [
      "aromatherapy",
      "essential_oil",
      "thai_fragrance",
      "relaxation_oil"
    ],
    image_url: "https://images.unsplash.com/photo-1541256996761-85df2eff3124?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "FL013",
    name_th: "กุหลาบ",
    name_en: "Rose",
    scientific: "Rosa spp.",
    family: "Rosaceae",
    symbol: "ความรักลึกซึ้ง ความสง่างามและเปี่ยมพลังชีวิต",
    season: "ฤดูหนาว (พฤศจิกายน-กุมภาพันธ์)",
    scent: "หอมหวานละมุนละไม เข้มข้นแต่อ่อนหวาน",
    color: "แดงคลาสสิก, ชมพูอบอุ่น, ขาว",
    medical: {
      benefits_th: [
        "กระตุ้นสารเอ็นดอร์ฟินเพื่อระงับความเจ็บปวดทางอารมณ์",
        "สารต้านอนุมูลอิสระประสิทธิภาพสูงช่วยชะลอผิวแก่",
        "ต้านภาวะซึมเศร้า วิตกกังวล และนอนไม่หลับ",
        "วิตามินซีเข้มข้นช่วยฟื้นฟูระบบภูมิคุ้มกันร่างกาย"
      ],
      uses_th: [
        "สกัด Rose Hydrosol สเปรย์บำรุงผิวหน้าชั้นสูง",
        "ชาดอกกุหลาบตูบอบแห้ง",
        "ปรุงน้ำมันนวดสกัดอุ่นบำบัดจิตใจ"
      ],
      benefits_en: [
        "Uplifts emotional vitality and reduces internal stress",
        "Powerhouse of organic Vitamin C & antioxidants",
        "Nourishes the skin and balances reproductive hormones"
      ]
    },
    aesthetic: {
      description_th: "กลีบเรียงซ้อนตัวประณีตสมบูรณ์แบบ ลวดลายคลาสสิก ดอกชูตระหง่านกิ่งหนาม คมคายหรูหรา",
      photography_score: 9,
      instagram_worthy: true
    },
    tradition: {
      uses_th: [
        "ร้อยบายศรีเครื่องบูชาหลวงพวงมาลัยถวายพระธาตุแช่แห้ง",
        "จัดตกแต่งประตูป่าในพิธียี่เป็ง",
        "ใช้ในพิธีมงคลสมรสแบบล้านนาโบราณ (สรงขันหมาก)"
      ],
      food_th: "ชากุหลาบเวียงปัว, แยมกลีบดอกกุหลาบออร์แกนิก, น้ำเชื่อมกุหลาบ"
    },
    belief: {
      meaning_th: "ความรักอมตะเหนือพ้นกาลเวลา ความสง่างามที่ต้องรักษาความเคารพ",
      beliefs_th: [
        "เป็นสัญญาลักษณ์แทนความศรัทธาต่อศาสนาและความประเสริฐใจ",
        "เชื่อว่าปลูกปัดเป่าสิ่งชั่วร้ายออกจากขอบเขตบ้านด้วยพลังหนามมงคล"
      ],
      beliefs_en: [
        "Universal symbol of true love, pristine honor, and sensory re-awakening"
      ]
    },
    wellness_activity: [
      "Mindful breathing meditation with fresh rose petals",
      "Rose water hydrosol distillation workshop",
      "Rose oil sound healing bath experience"
    ],
    fragrance_family: "Floral",
    element: "น้ำ (Water)",
    knowledge_graph_tags: [
      "universal_flower",
      "aromatherapy",
      "edible_flower",
      "skincare"
    ],
    image_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "FL014",
    name_th: "ทองกวาว",
    name_en: "Flame of the Forest",
    scientific: "Butea monosperma",
    family: "Fabaceae",
    symbol: "ความรุ่งโรจน์ดั่งไฟป่า อนาคตสดใสโชติช่วง",
    season: "ฤดูร้อน (กุมภาพันธ์-เมษายน)",
    scent: "ไม่มีกลิ่นหอมหวล แต่มีเสน่ห์ทางสายตาขั้นสุด",
    color: "ส้มแสดเจิดจ้าดั่งดวงอาทิตย์",
    medical: {
      benefits_th: [
        "แก้อาการไข้ตัวร้อน ดับกระหายคลายความร้อนในตับ",
        "สารสกัดจากดอกช่วยลดไขมันในเส้นเลือดและต้านอักเสบ",
        "สมานแผลพุพอง รักษาอาการระคายเคืองตาตามภูมิปัญญา"
      ],
      uses_th: [
        "ยาสมุนไพรต้มดื่มแก้ไข้พิษร้อน",
        "เปลือกและดอกนำมาต้มสกัดสีย้อมผ้าสีแสดและสีส้มธรรมชาติ"
      ],
      benefits_en: [
        "Natural cooling antipyretic for high fevers",
        "Anti-inflammatory compounds with liver protective qualities",
        "Vibrant natural dye source"
      ]
    },
    aesthetic: {
      description_th: "ดอกรูปถั่วขนาดใหญ่ สีแสดสว่างไสวเป็นช่อชี้ขึ้นฟ้า ผลัดใบจนเกลี้ยงต้นเวลาผลิบาน ทำให้เห็นดอกสีส้มล้อมรอบต้นคล้ายคบเพลิงขนาดใหญ่กลางทุ่งนา",
      photography_score: 10,
      instagram_worthy: true
    },
    tradition: {
      uses_th: [
        "ปลูกรอบเขตหมู่บ้านเพื่อเตือนสัญญาการเข้าสู่หน้าร้อนล้านนา",
        "ใช้ดอกในการประกอบพิธีสืบชะตาเพื่อความเจริญรุ่งเรือง",
        "ใช้ย้อมด้ายฝ้ายสำหรับการทอผ้าลายไทลื้อโบราณ"
      ],
      food_th: "ใช้เกสรเป็นสีผสมอาหารธรรมชาติ (ส้มแสด) อบแป้งเค้ก"
    },
    belief: {
      meaning_th: "ความเจริญรุ่งเรืองอย่างยิ่งยวด มีชัยเหนือความแห้งแล้งอุปสรรค",
      beliefs_th: [
        "ชาวเหนือถือเป็นไม้มงคลนามพัวพันกับคำว่า 'ทอง' นำเงินทองมาสู่ครอบครัว",
        "ใช้ในพิธีมงคลโกนผมไฟหรือสรงน้ำถวายพระภิกษุสงฆ์ชั้นผู้ใหญ่"
      ],
      beliefs_en: [
        "Auspicious Lanna tree representing spiritual victory, glow of wisdom, and vast fortune"
      ]
    },
    wellness_activity: [
      "Nan traditional natural dye weaving masterclass",
      "Landscape photography safari in low-season spring",
      "Golden hour fire-visualization yoga classes"
    ],
    fragrance_family: "None",
    element: "ไฟ (Fire)",
    knowledge_graph_tags: [
      "lanna_flower",
      "natural_dye",
      "medicinal_flower",
      "northern_thailand"
    ],
    image_url: "https://images.unsplash.com/photo-1587334274328-64186a80aeee?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "FL018",
    name_th: "ไพล",
    name_en: "Phlai",
    scientific: "Zingiber montanum",
    family: "Zingiberaceae",
    symbol: "การเยียวยาลึกซึ้ง พลังการผ่อนคลายกล้ามเนื้อที่อ่อนล้า",
    season: "เก็บเกี่ยวเหง้าได้ตลอดทั้งปี",
    scent: "สมุนไพรร้อนแรง สดชื่น โล่งจมูก กระฉับกระเฉง",
    color: "เหลืองนวล (เหง้าใต้ดิน)",
    medical: {
      benefits_th: [
        "ลดอักเสบ บรรเทาอาการฟกช้ำและเส้นยึดตึงอย่างรวดเร็ว",
        "คลายอาการปวดกล้ามเนื้อเรื้อรัง (Office Syndrome)",
        "กระตุ้นระบบหมุนเวียนเลือดและลดอาการบวมน้ำ",
        "บำรุงระบบหายใจ ลดอาการภูมิแพ้อากาศ"
      ],
      uses_th: [
        "แช่เท้าสมุนไพรบำบัดอาการรองช้ำล้า",
        "พอกข้อเข่าด้วยตำรับวิถีบ่อสวกน่าน",
        "ปรุงน้ำมันนวดสปาบรรเทาอาการเส้นเอ็นตึง",
        "ลูกประคบสมุนไพรร้อน"
      ],
      benefits_en: [
        "Powerful organic anti-inflammatory and pain-relieving herb",
        "Accelerates muscle rehabilitation after rigorous travel/work",
        "Enhances circulation and skin detox"
      ]
    },
    aesthetic: {
      description_th: "พืชล้มลุกคล้ายขิง มีลำต้นเทียมแทงใบเรียวยาวหนาเป็นกอหนาแน่น ดอกเป็นรูปกรวยคว่ำสีนวลส้มแปลกตาซ่อนตัวใต้พุ่ม",
      photography_score: 4,
      instagram_worthy: false
    },
    tradition: {
      uses_th: [
        "ใช้ในตำรับยาล้านนาโบราณ 700 ปีในการรักษาโรคเส้นยึดอัมพฤกษ์",
        "ตำรับพอกเข่าโบราณของแพทย์แผนไทยวิสาหกิจชุมชนบ่อสวก",
        "ใช้สระผมสรงน้ำเด็กทารกแรกเกิดเพื่อขับลมเย็นออก"
      ],
      food_th: "ใช้เป็นยารักษาโรคท้องอืด (ไม่นิยมประกอบอาหารสากล)"
    },
    belief: {
      meaning_th: "การฟื้นตัว, พลังแผ่นดินปกป้องรักษาพยาบาล",
      beliefs_th: [
        "เชื่อว่าไพลมีฤทธิ์ปัดเป่ามนต์ดำและสิ่งอัปมงคลตามตำราหมอยาเก่า",
        "ใช้ทำเครื่องรางปกป้องคุ้มครองโรคภัยไข้เจ็บแก่ทารก"
      ],
      beliefs_en: [
        "Traditional protective healing element in Lanna animistic folklore"
      ]
    },
    wellness_activity: [
      "Traditional Nan herbal foot bath workshop at Bo Sok",
      "Knee thermal herbal compress treatment session",
      "Herbal medicine grinding and formulation workshop"
    ],
    fragrance_family: "Fresh - Herbal",
    element: "ไฟ (Fire)",
    knowledge_graph_tags: [
      "bosok_herb",
      "traditional_medicine",
      "herbal_compress",
      "foot_bath"
    ],
    image_url: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600"
  }
];

export const FESTIVALS_DATA: Festival[] = [
  {
    id: "F002",
    name_th: "หกเป็งนมัสการพระธาตุแช่แห้ง",
    name_en: "Hok Peng Phra That Chae Haeng Worship",
    month: 3,
    period: "วันขึ้น 15 ค่ำ เดือน 6 เหนือ (ประมาณเดือนมีนาคมของทุกปี)",
    location: "วัดพระธาตุแช่แห้ง, อำเภอภูเพียง, จังหวัดน่าน",
    ethnic_group: "ล้านนา / ไทลื้อ",
    description_th: "ประเพณีขึ้นนมัสการพระบรมธาตุแช่แห้ง องค์พระธาตุคู่บ้านคู่เมืองประจำปีเถาะของจังหวัดน่าน เพื่อสักการะพระบรมสารีริกธาตุอันศักดิ์สิทธิ์ ชาวบ้านจะร่วมใจเดินจงกรมขึ้นเขา บูชาบายศรีและสรงน้ำศักดิ์สิทธิ์",
    description_en: "The grand annual pilgrimage to Phra That Chae Haeng, the historical pagoda of Nan and the sacred birthplace of those born in the Year of the Rabbit. Pilgrims offer beautiful lotus arrangements, incense, and candles for spiritual merit and deep relaxation.",
    flowers_used: [
      { name: "ดอกบัวหลวง", use: "บูชาสักการะพระบรมธาตุ", symbolism: "ความสว่างไสว ตรัสรู้ พ้นจากอารมณ์ขุ่นมัว" },
      { name: "ดอกมะลิ", use: "ร้อยพวงมาลัยสรงน้ำพระธาตุ", symbolism: "ความสะอาดบริสุทธิ์ของจิตใจและการชำระล้าง" },
      { name: "ดอกดาวเรือง", use: "ประดับบายศรีมณฑลพิธีหลวง", symbolism: "ความรุ่งโรจน์และความอุดมสมบูรณ์ในโชคลาภ" }
    ],
    wellness_connection: "Spiritual walking meditation up the temple hill, mindfulness, inner stress release through communal chant, candle-gazing peace."
  },
  {
    id: "F006",
    name_th: "ตานก๋วยสลากหลวงน่าน",
    name_en: "Tan Kuay Salak Festival",
    month: 9,
    period: "ช่วงวันเพ็ญขึ้น 15 ค่ำ เดือน 12 เหนือ (ประมาณเดือนกันยายน-ตุลาคม)",
    location: "วัดพระธาตุช้างค้ำวรวิหาร และวัดต่างๆ ทั่วทั้งจังหวัดน่าน",
    ethnic_group: "ล้านนา / ไทลื้อ",
    description_th: "ประเพณีทานก๋วยสลากอุทิศบุญแก่บรรพบุรุษผู้ล่วงลับ ชาวบ้านจัดก๋วยสลากทำจากไผ่สาน ประดับประดาด้วยของป่า อาหารแห้ง ร่มสีสดใส ดอกไม้บูชา และยอดปัจจัยอย่างประณีต",
    description_en: "An ancient Lanna ancestral remembrance festival. Beautiful bamboo baskets (Kuay) are meticulously crafted, packed with provisions, organic seeds, and wild flowers, then presented to monks, serving as grief-healing and community-bonding practices.",
    flowers_used: [
      { name: "ดอกมะลิ", use: "ประดับยอดก๋วยสลากโบราณ", symbolism: "ความรักและกตัญญูอันมั่นคงไม่มีวันจืดจางต่อบรรพบุรุษ" },
      { name: "ดอกดาวเรือง", use: "มัดประดับพานบายศรีสักการะ", symbolism: "ทองคำและความอุดมสมบูรณ์ไหลเวียนสู่รุ่นลูกหลาน" },
      { name: "ดอกบานไม่รู้โรย", use: "ตกแต่งสายทานเครื่องอุทิศ", symbolism: "บุญกุศลอันอมตะยั่งยืนมั่นคง ยืนยาวไม่รู้โรยรา" }
    ],
    wellness_connection: "Grief healing through ancestral dialogue, therapeutic bamboo hand-weaving (flow state), active walking in community temples, selfless generosity."
  },
  {
    id: "F009",
    name_th: "ยี่เป็งลอยกระทงเมืองน่าน",
    name_en: "Nan Yi Peng Floating Lantern Festival",
    month: 11,
    period: "วันเพ็ญเดือน 12 (ประมาณกลางเดือนพฤศจิกายน)",
    location: "ข่วงเมืองน่าน และริมลำน้ำน่าน",
    ethnic_group: "ล้านนา / ทั่วไป",
    description_th: "เทศกาลประทีปเมืองเหนือ ตกแต่ง 'ประตูป่า' ด้วยดอกไม้สดทางเข้าวิหารอย่างอลังการ บูชาแสงไฟผางประทีป และประดิษฐ์กระทงจากใบตองและดอกไม้สดเพื่อลอยปลดปล่อยเคราะห์ร้ายลงสู่แม่น้ำน่าน",
    description_en: "The iconic Lanna lantern festival. Gates of temples are adorned with wild aromatic herbs and flowers. Citizens light small earthenware candles (phang pratheep) and release handmade botanical rafts to restore emotional balance.",
    flowers_used: [
      { name: "ดอกดาวเรือง", use: "ตกแต่งซุ้มประตูป่าวิหารและตัวกระทง", symbolism: "โชคลาภและความรุ่งโรจน์ดั่งดวงประทีป" },
      { name: "ดอกบัวหลวง", use: "วางจุดกึ่งกลางพานกระทง", symbolism: "การลอยความทุกข์กิเลสลอยไปสู่การตรัสรู้ปัญญา" },
      { name: "ดอกรัก", use: "ร้อยประดับอุบะชายกระทง", symbolism: "ความเมตตาปรานีและความปรองดองในครอบครัว" }
    ],
    wellness_connection: "Ritual therapy of 'letting go' of heavy feelings, light and color therapy, slow-paced botanical assembly crafting, stargazing calm."
  }
];

export const WELLNESS_COMMUNITIES: WellnessCommunity[] = [
  {
    id: "WC001",
    name: "วิสาหกิจชุมชนแพทย์แผนไทย บ่อสวกโมเดล",
    name_en: "Bo Sok Herb Wellness Center",
    location: "ตำบลบ่อสวก, จังหวัดน่าน (ห่างจากตัวเมืองเพียง 15 นาที)",
    type: "Wellness Community (รับรองมาตรฐานโดยกรมการแพทย์แผนไทยและการแพทย์ทางเลือก)",
    description: "ต้นแบบนวัตกรรมชีววิถีบำบัดด้วยภูมิปัญญาแพทย์แผนไทยล้านนากว่า 700 ปี ผสมผสานแหล่งเตาเผาเครื่องเคลือบโบราณ สู่บริการพอกเข่าแช่เท้าอันเลื่องชื่อระดับประเทศ",
    services: [
      "สุมยาสมุนไพรล้านนา: สูดอายความร้อนจากไพล ตะไคร้ มะกรูด บรรเทาภูมิแพ้และอาการล้าสมอง",
      "การแช่เท้าเกลือบ่อเกลืออุ่นสมุนไพร: กระตุ้นจุดประสาทฝ่าเท้า คลายปวดเมื่อยจากการปีนดอย",
      "การพอกข้อเข่าด้วยดินเผาบ่อสวกและสารสกัดไพลสด: ลดอักเสบ คลายเส้นเอ็น บรรเทาปวดข้อ",
      "เวิร์กชอปเบลนด์ชาใบหม่อนอินทรีย์และดอกไม้สดประจำราศีธาตุ"
    ],
    key_herbs: ["ใบเมี่ยงหมัก", "หม่อนอินทรีย์", "ไพลสกัดร้อน", "ตะไคร้หอม", "ขมิ้นชันชันสีทอง"],
    flowers_in_use: ["ดาวเรืองป่า (อบแห้งสำหรับพอกเข่า)", "มะลิป่า (สำหรับน้ำแช่เท้าและอบสุมยา)"]
  },
  {
    id: "WC002",
    name: "วิสาหกิจชีววิถีสมุนไพร บ้านน้ำเกี๋ยน",
    name_en: "Ban Nam Kian Herb Eco-Village",
    location: "ตำบลน้ำเกี๋ยน, จังหวัดน่าน",
    type: "Biovillage Standard & Organic Cosmetic Model",
    description: "หมู่บ้านต้นแบบการพึ่งตนเองด้วยการแปรรูปพืชสมุนไพรและดอกไม้พื้นถิ่นน่าน ให้กลายเป็นผลิตภัณฑ์ออร์แกนิกดูแลผิวพรรณมาตรฐานสากล ได้รับรางวัลระดับแผ่นดินอย่างต่อเนื่อง",
    services: [
      "Wellness Homestay: นอนพักค้างคืนในบรรยากาศหมู่บ้านหอมกลิ่นป่าเขาอินทรีย์",
      "เวิร์กชอปทำสบู่และโลชั่นบำรุงผิวจากใบหม่อน กระดังงา และพุดซ้อนธรรมชาติ",
      "สปาขัดผิวกายด้วยเกลือน่านผสมน้ำมันมะรุมและกลีบดอกไม้ป่า",
      "อาหารปรุงสุขภาพล้านนาปลอดเคมี 'ครัวม่วนจุ๊บ'"
    ],
    key_herbs: ["มะกรูดป่า", "ใบเมี่ยงสกัด", "มะรุมออร์แกนิก"],
    flowers_in_use: ["กระดังงาไทย (น้ำมันหอม)", "พุดซ้อน ( room spray)"]
  }
];

export const ETHNIC_GROUPS: EthnicGroup[] = [
  {
    id: "EG001",
    name_th: "ชาวไทลื้อจังหวัดน่าน",
    name_en: "Tai Lue Ethnic Group",
    population_in_nan: "กลุ่มชาติพันธุ์ไทลื้อตั้งถิ่นฐานในจังหวัดน่านหนาแน่นและสมบูรณ์ที่สุดในประเทศไทย",
    districts: ["อำเภอปัว (ศูนย์กลางวัฒนธรรมไทลื้อ)", "อำเภอท่าวังผา", "อำเภอทุ่งช้าง"],
    language: "ภาษาไทลื้อ (Tai Lü) — กลุ่มตระกูลภาษาไท-กะได",
    religion: "พุทธศาสนาฝ่ายเถรวาท ร่วมกับความศรัทธาเรื่องผีบรรพบุรุษและการดูแลป่าป้องภัย",
    cultural_highlights: {
      textile: "ผ้าทอลายน้ำไหลไทลื้อ: ย้อมสีคราม คูน เปลือกประดู่ และดอกไม้ป่าแบบทอมือ 100%",
      food: ["ข้าวแคบแผ่นใส", "ไส้อั่วสมุนไพรไทลื้อสูตรร้อนแรง", "ข้าวซอยไทลื้อน้ำใสโรยพริกแห้ง"],
      music: ["ขับลื้อบำบัดจิต", "ซอปี่แม่นำเสียงล่องลอยสะกดอารมณ์คลายเครียด", "ดนตรีบำบัดล้านนา"],
      dance: "ฟ้อนแง้นพริ้วไหวไทลื้อ (กายบริหารยืดหยุ่นสันหลังโบราณ)",
      medicine: "ภูมิปัญญาหมอเมือง 700 ปี: การใช้พืชหญ้าสมุนไพรกึ่งป่าในการบำบัดรักษาโรคความดันโลหิตและอาการนอนไม่หลับเรื้อรัง"
    },
    flower_connection: {
      traditional_flowers: ["ดอกเสี้ยวดอกขาว", "ดอกมะลิ", "ดอกดาวเรือง", "ดอกบัวแดงป่า"],
      special_tradition: "ประเพณีดอกไม้พันดวง: การพับกระดาษย้อมสีธรรมชาติจากพืชพรรณและดอกไม้สดกว่าพันชิ้น เพื่อประดับรอบธรรมาสน์เทศน์มหาชาติ อุทิศบารมีและสร้างสมาธิความสามัคคีร่วมกัน"
    }
  }
];

export const PRODUCTS_DATA: EcomProduct[] = [
  {
    id: "P001",
    name: "ชาดอกไม้สิริมงคล 'เบญจเกสรน่าน'",
    ingredients: ["เกสรบัวหลวง", "ดอกสารภี", "ดอกพิกุล", "ดอกบุนนาค", "ดอกมะลิออร์แกนิก"],
    benefits: ["บำรุงกำลังหัวใจให้ชุ่มชื่น", "ปรับสมดุลความดันภายใน", "ผ่อนคลายความเครียดสะสมระบายความร้อน"],
    source: "วิสาหกิจชุมชนกลุ่มสมุนไพรแพทย์แผนไทยบ่อสวก จังหวัดน่าน",
    price: 320,
    image_url: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600",
    scent_family: "Floral - Soft",
    category: "tea"
  },
  {
    id: "P002",
    name: "น้ำมันนวดสปาอุ่นผสมอโรมากระดังงาและไพล 'สยามผ่อนคลาย'",
    ingredients: ["น้ำมันหอมระเหยกระดังงาป่า", "น้ำมันไพลสกัดร้อน", "น้ำมันงาดำสกัดเย็นน่าน", "น้ำมันมะพร้าวออร์แกนิก"],
    benefits: ["คลายความปวดเมื่อยล้าเส้นเอ็นหลังปีนดอย", "ลดผิวแห้งกร้าน บำรุงลึกถึงชั้นใต้ผิว", "กลิ่นอบอุ่นคลายความซึมเศร้ากังวล"],
    source: "วิสาหกิจชุมชนชีววิถีสมุนไพรบ้านน้ำเกี๋ยน จังหวัดน่าน",
    price: 450,
    image_url: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600",
    scent_family: "Floral-Oriental",
    category: "oil"
  },
  {
    id: "P003",
    name: "สครับผิวกายดีท็อกซ์เกลือสินเธาว์ผสมกลีบดาวเรืองแห้ง",
    ingredients: ["เกลือภูเขาโบราณบ่อเกลือน่าน", "ดอกดาวเรืองป่าแห้งบดละเอียด", "น้ำมันมะรุมบำรุงผิว", "ส้มมะกรูดสด"],
    benefits: ["ขัดผิวเก่าหมองคล้ำเผยผิวกระจ่างใส", "ดีท็อกซ์สารเคมีตกค้างบนชั้นผิวภายนอก", "กระตุ้นต่อมน้ำเหลืองและไหลเวียนเลือด"],
    source: "วิสาหกิจแปรรูปผลิตภัณฑ์โบราณอภิมหาเกลือน่าน อำเภอบ่อเกลือ",
    price: 390,
    image_url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600",
    scent_family: "Fresh - Herbal",
    category: "body"
  },
  {
    id: "P004",
    name: "สเปรย์น้ำลอยอโรมารสบัวสี่เหล่า 'Mindfulness Mist'",
    ingredients: ["สารสกัดบริสุทธิ์ดอกบัวหลวงขาว", "Rose hydrosol ผิวสดใส", "น้ำแร่ธรรมชาติป่าดอยภูคา"],
    benefits: ["เติมความสดชื่นทันทีระหว่างทำงานล้าหน้าจอ", "สร้างกลิ่นอโรมาหรูหราบริสุทธิ์เพื่อสมาธิ", "สเปรย์หมอนหนุนช่วยให้จิตสงบหลับลึก"],
    source: "สถาบันวิจัยพืชรักษ์น่านแซนด์บ็อกซ์ เกษตรยามาตรฐานระดับประเทศ",
    price: 350,
    image_url: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=600",
    scent_family: "Floral - Green",
    category: "body"
  },
  {
    id: "P005",
    name: "บัตรสะสมความอิ่มเอมใจช่วงโลว์ซีซั่น 'Flourish Wellness Pass'",
    ingredients: ["บริการแช่เท้าสมุนไพรบ่อสวก", "สุมยาแก้แพ้อากาศ", "ตำรับนวดผ่อนคลายล้านนา 60 นาที", "สิทธิ์รับชาเบญจเกสรสระน้ำพริก"],
    benefits: ["ช่วยสนับสนุนชุมชนน่านในช่วง Low-Season", "สัมผัสความงามสโลว์ไลฟ์น่านแบบปราศจากความวุ่นวาย", "ส่วนลดพิเศษกว่า 40% จากราคาปกติ"],
    source: "Nan Green Travel and Wellness Community Collaborative Matrix 2026",
    price: 1200,
    image_url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600",
    scent_family: "Fresh - Citrus",
    category: "pass"
  }
];

export const elementMatching = (element: string) => {
  switch (element) {
    case "Earth":
    case "ดิน (Earth)":
      return {
        element_th: "ดิน (Earth)",
        personality: "สุขุม มีสติ มั่นคงดุจแผ่นดิน และรักความยุติธรรม อดทนเป็นเลิศ",
        recommended: ["มะลิ (Jasmine)", "กุหลาบ (Rose)", "พุดซ้อน (Gardenia)"],
        tip: "กลิ่นมะลิและพุดซ้อนจะช่วยเสริมจิตใจให้มั่นคง แข็งแกร่ง แต่เปี่ยมด้วยความอ่อนโยน คลายกังวลสะสม"
      };
    case "Water":
    case "น้ำ (Water)":
      return {
        element_th: "น้ำ (Water)",
        personality: "กล้าแสดงออก ปรับตัวเก่ง มีไหวพริบดุจกระแสน้ำ อ่อนไหวและสร้างสรรค์",
        recommended: ["บัวหลวง (Lotus)", "กระดังงา (Ylang-Ylang)", "สารภี (Saraphi)"],
        tip: "กลิ่นกระดังงาและเกสรบัวหลวงเย็นจะช่วยปลอบประโลมอารมณ์ที่ขึ้นลงให้เข้าสู่สติและปัญญาสงบนิ่ง"
      };
    case "Wind":
    case "ลม (Wind)":
      return {
        element_th: "ลม (Wind)",
        personality: "คล่องแคล่ว รักอิสระ ชอบผจญภัย ช่างคิดช่างเจรจา มีไหวพริบปฏิภาณดี",
        recommended: ["เสี้ยวดอกขาว", "ลีลาวดี (Plumeria)", "ตะไคร้ (Lemongrass)"],
        tip: "กลิ่นลีลาวดีที่ชวนฝันและตะไคร้สดใสจะช่วยกระตุ้นพลังความคิดสร้างสรรค์ บรรเทาอากาศคัดสมองโล่งสบาย"
      };
    case "Fire":
    case "ไฟ (Fire)":
      return {
        element_th: "ไฟ (Fire)",
        personality: "กล้าหาญ บุกเบิก เป็นผู้นำเด็ดเดี่ยว มีสเน่ห์ดึงดูดใจ และเปี่ยมด้วยแพสชันเร่าร้อน",
        recommended: ["ดาวเรือง (Marigold)", "ทองกวาว", "ไพล (Phlai)"],
        tip: "กลิ่นสมุนไพรไพลและเกสรดาวเรืองบำรุงสายตาจะช่วยบรรเทาความร้อนรุ่มในใจ คืนสมดุลพลังกล้ามเนื้อที่ถูกกระตุ้นบ่อย"
      };
    default:
      return {
        element_th: "ดิน (Earth)",
        personality: "สุขุม มีสติ มั่นคงดุจแผ่นดิน และรักความยุติธรรม อดทนเป็นเลิศ",
        recommended: ["มะลิ (Jasmine)"],
        tip: "กลิ่นมะลิป่าจะช่วยให้ผ่อนคลายและสร้างรากฐานจิตใจที่มั่นคง"
      };
  }
};
