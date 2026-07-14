import express from "express";
import dotenv from "dotenv";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const raw = JSON.parse(readFileSync(join(__dirname, "..", "nan_dataset.json"), "utf-8"));

const FLOWERS_DATA = raw.flowers || [];
const FESTIVALS_DATA = raw.festivals || [];
const WELLNESS_COMMUNITIES = raw.wellness_communities || [];

const app = express();
app.use(express.json());

const TYPHOON_API_KEY = process.env.TYPHOON_API_KEY;
const TYPHOON_API_URL = "https://api.opentyphoon.ai/v1/chat/completions";
const IS_MOCK = !TYPHOON_API_KEY || TYPHOON_API_KEY === "your_typhoon_api_key_here";

function detectLang(text: string): "th" | "en" {
  const thaiRegex = /[\u0E00-\u0E7F]/;
  return thaiRegex.test(text) ? "th" : "en";
}

function getSystemPrompt(lang: "th" | "en"): string {
  if (lang === "th") {
    return "คุณคือ 'พวงมาลัย' มัคคุเทศก์อโรมาบำบัดล้านนาประจำจังหวัดน่าน พูดจาสุภาพ ใช้คำลงท้าย 'เจ้า' มีความรู้เรื่องดอกไม้ประจำถิ่น จุดท่องเที่ยวเชิงสุขภาพ สมุนไพรล้านนา และวัฒนธรรมน่าน ตอบตามคำถามผู้ใช้โดยตรง กระชับ ใช้ประโยชน์ได้จริง ใช้ Markdown สวยงาม";
  }
  return "You are 'Malai' (พวงมาลัย), a Lanna Aromatherapy guide for Nan Province, Thailand. Speak gently with wisdom. You know Nan's native flowers, wellness spots, herbal remedies, and local culture. Answer the user's question directly, concisely, and practically. Use beautiful Markdown formatting.";
}

async function callTyphoon(prompt: string, lang: "th" | "en" = "th"): Promise<string | null> {
  if (IS_MOCK) return null;
  try {
    const res = await fetch(TYPHOON_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TYPHOON_API_KEY}`
      },
      body: JSON.stringify({
        model: "typhoon-v2-70b-instruct",
        messages: [
          { role: "system", content: getSystemPrompt(lang) },
          { role: "user", content: prompt }
        ],
        max_tokens: 2048,
        temperature: 0.7
      })
    });
    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? null;
  } catch (err) {
    console.error("Typhoon API error:", err);
    return null;
  }
}

async function generateWellnessResponse(prompt: string, fallback: string, lang: "th" | "en" = "th"): Promise<string> {
  const result = await callTyphoon(prompt, lang);
  return result ?? fallback;
}

const NAN_PLACES: Record<string, { th: string; en: string }> = {
  "ดอยภูคา": { th: "ดอยภูคา — จุดชมทุ่งบัวตองและเสี้ยวดอกขาวที่สวยที่สุดในน่าน", en: "Doi Phu Kha — the most stunning sunflower & wildflower fields in Nan" },
  "วัดภูมินทร์": { th: "วัดภูมินทร์ — จิตรกรรมฝาผนัง 'ปู่-ย่า' คู่รักชื่อดัง", en: "Wat Phumin — famous 'Grandfather-Grandmother' mural painting" },
  "บ่อสวก": { th: "บ่อสวกโมเดล — ศูนย์วิสาหกิจสุมยาสมุนไพรและพอกข้อเข่าดินเผา", en: "Bo Sok Model — herbal steam & clay compress wellness center" },
  "น้ำเกี๋ยน": { th: "บ้านน้ำเกี๋ยน — เวิร์กชอปน้ำมันหอมระเหยและผ้าทอย้อมสีธรรมชาติ", en: "Ban Nam Kien — essential oil & natural dye weaving workshop" },
  "สะปัน": { th: "สะปัน — วิลล่าริมน้ำและคาเฟ่ชมวิวบรรยากาศชิล", en: "Saparn — riverside villas & scenic cafe" },
  "เขาน้อย": { th: "พระธาตุเขาน้อย — จุดชมวิวเมืองน่าน 360 องศา", en: "Wat Phra That Khao Noi — 360° Nan city viewpoint" },
  "แช่แห้ง": { th: "พระธาตุแช่แห้ง — พระธาตุคู่บ้านคู่เมืองน่านอายุ 600 ปี", en: "Wat Phra That Chae Haeng — Nan's 600-year-old sacred temple" },
};

function generateChatFallback(msg: string, lang: "th" | "en"): string {
  const lower = msg.toLowerCase();
  const isTh = lang === "th";

  const spotItems = Object.entries(NAN_PLACES).map(([k, v]) => `- **${k}** — ${isTh ? v.th : v.en}`);
  const spotsList = spotItems.join("\n");

  const flowerListEN = ["White Bauhinia", "Sunflower", "Red Silk Cotton", "Fragrant Gardenia", "Ylang-Ylang"];
  const flowerListTH = ["เสี้ยวดอกขาว", "บัวตอง", "ทองกวาว", "พุดซ้อนหอม", "กระดังงา"];

  const outro = isTh
    ? "มีอะไรให้พวงมาลัยช่วยเหลือเพิ่มเติมไหมเจ้า? 🙏✨"
    : "Anything else I can help with? 🙏✨";

  // --- Wellness / Relaxation ---
  if (/wellness|สุขภาพ|health|relax|ผ่อนคลาย|spa|massage|นวด|body|ร่างกาย|คลาย|stress|เครียด|เหนื่อย|lazy/.test(lower)) {
    return isTh
      ? `สวัสดีเจ้า \`พวงมาลัย\` ยินดีต้อนรับสู่ข่วงปัญญาอโรมาล้านนาเจ้า 🌸

อยากผ่อนคลายเนาะเจ้า น่านมีโปรแกรมสุขภาพครบวงจรตั้งแต่สมุนไพรล้านนาไปจนถึงสปาธรรมชาติเลยเจ้า

🧘 **กิจกรรมแนะนำ:**
- ♨️ **สุมยาสมุนไพรบ่อสวก** — อบสมุนไพรล้านนาล้างพิษ
- 🧖 **สปาขัดผิวเกลือสินเธาว์ดอกมะลิ** — ผ่อนคลายกล้ามเนื้อ
- 🌲 **Forest Bathing ดอยภูคา** — เดินป่าบำบัดจิต
- 🧘 **นั่งสมาธิซุ้มลีลาวดีวัดภูมินทร์** — สมาธิท่ามกลางธรรมชาติ
- 🍵 **ชิมชาสมุนไพรเบญจเกสร** — ปรับสมดุลธาตุทั้ง 5

💡 ช่วง Low Season (เม.ย.-ส.ค.) มีส่วนลด Flourish Pass สูงถึง 40% ด้วยเจ้า

${outro}`
      : `🌸 *Malai here.* Looking to unwind? Nan has complete wellness programs from Lanna herbs to natural spas.

🧘 **Recommended:**
- ♨️ **Bo Sok Herbal Steam** — Lanna herbal detox
- 🧖 **Salt & Jasmine Body Scrub Spa** — muscle relaxation
- 🌲 **Doi Phu Kha Forest Bathing** — mindful nature walk
- 🧘 **Plumeria Tunnel Meditation** — meditate in nature
- 🍵 **Five-Herb Tea Tasting** — balance all 5 elements

💡 Low Season (Apr-Aug) offers Flourish Pass discounts up to 40%.

${outro}`;
  }

  // --- Trip planning ---
  if (/trip|เที่ยว|travel|tour|itinerary|plan|place|ที่เที่ยว|สถานที่|spot|จุด/.test(lower)) {
    return isTh
      ? `สวัสดีเจ้า \`พวงมาลัย\` ยินดีต้อนรับสู่ข่วงปัญญาอโรมาล้านนาเจ้า 🌸

น่านมีจุดท่องเที่ยวเชิงสุขภาพหลากหลายให้เลือกตามธาตุเจ้าเรือนเจ้า

📍 **จุดแนะนำในน่าน:**
${spotsList}

🌺 **ดอกไม้เด่น:** ${flowerListTH.join(", ")}

💡 แนะนำให้เริ่มที่บ่อสวกเพื่อสุมยาสมุนไพรก่อน แล้วค่อยขึ้นดอยภูคาชมทุ่งดอกไม้บาน แล้วปิดท้ายที่วัดภูมินทร์ช่วงเย็นเจ้า

${outro}`
      : `🌸 *Malai here.* Nan offers diverse wellness spots for every element.

📍 **Recommended spots:**
${spotsList}

🌺 **Signature flowers:** ${flowerListEN.join(", ")}

💡 Start at Bo Sok for herbal steam, then Doi Phu Kha for flower fields, finish at Wat Phumin at sunset.

${outro}`;
  }

  // --- Flowers / Scents / Aromatherapy ---
  if (/flower|ดอกไม้|scent|กลิ่น|aroma|อโรมา|essential oil|น้ำมันหอม|herb|สมุนไพร/.test(lower)) {
    return isTh
      ? `สวัสดีเจ้า \`พวงมาลัย\` ยินดีต้อนรับสู่ข่วงปัญญาอโรมาล้านนาเจ้า 🌸

น่านมีพรรณไม้หอมกว่า 200 ชนิดที่เหมาะกับการทำอโรมาบำบัดเจ้า

🌼 **ดอกไม้หอมแนะนำ:**
- **เสี้ยวดอกขาว** — กลิ่นหอมหวานอ่อนๆ ช่วยผ่อนคลาย คลายเครียด
- **พุดซ้อนหอม** — กลิ่นหอมเข้มข้น ช่วยปรับอารมณ์ ลดวิตกกังวล
- **กระดังงา** — กลิ่นหอมหวานอบอุ่น เหมาะกับการทำสมาธิ
- **มะลิออร์แกนิกน่าน** — กลิ่นหอมละมุน ปลอบประโลมจิตใจ
- **บัวหลวง** — กลิ่นหอมบริสุทธิ์ ใช้ในพิธีกรรมทางจิตวิญญาณ

💡 ลองซื้อน้ำมันหอมระเหยจากชุมชนบ้านน้ำเกี๋ยน หรือแวะร้าน Organic Herb ที่บ่อสวกเจ้า

${outro}`
      : `🌸 *Malai here.* Nan has over 200 aromatic plant species perfect for aromatherapy.

🌼 **Recommended fragrant flowers:**
- **White Bauhinia** — sweet subtle scent, stress relief
- **Fragrant Gardenia** — rich fragrance, mood balancing
- **Ylang-Ylang** — warm sweet scent, meditation aid
- **Nan Organic Jasmine** — gentle fragrance, soul-calming
- **Lotus** — pure sacred scent, spiritual ceremonies

💡 Buy essential oils from Ban Nam Kien community or visit Organic Herb shop at Bo Sok.

${outro}`;
  }

  // --- Elements / Zodiac ---
  if (/ธาตุ|element|zodiac|ดวง|horoscope|ราศี|sign/.test(lower)) {
    return isTh
      ? `สวัสดีเจ้า \`พวงมาลัย\` ยินดีต้อนรับสู่ข่วงปัญญาอโรมาล้านนาเจ้า 🌸

ธาตุเจ้าเรือนทั้ง 4 (ดิน น้ำ ลม ไฟ) เชื่อมโยงกับดอกไม้และจุดท่องเที่ยวในน่านเจ้า

🔥🔥🔥🔥 **ธาตุทั้ง 4 กับการบำบัด**
| **ธาตุ** | **ดอกไม้คู่ธาตุ** | **จุดแนะนำ** |
|----------|-----------------|-------------|
| 🌍 **ดิน (Earth)** | มะลิ, ดาวเรือง | บ่อสวก — พอกดินเผา |
| 🌊 **น้ำ (Water)** | บัวหลวง, พุดซ้อน | วัดภูมินทร์, สะปัน |
| 🌬️ **ลม (Wind)** | เสี้ยวดอกขาว, กระดังงา | ดอยภูคา — ลมเย็นยอดดอย |
| 🔥 **ไฟ (Fire)** | ทองกวาว, บานบุรี | พระธาตุแช่แห้ง — จุดธูปเทียน |

💡 ลองทำ Quiz Zodiac ในเว็บเพื่อค้นหาธาตุเจ้าเรือนของคุณเจ้า

${outro}`
      : `🌸 *Malai here.* The 4 elements (Earth, Water, Wind, Fire) connect to Nan's flowers and spots.

🔥🔥🔥🔥 **Elements & Remedies**
| **Element** | **Flower** | **Recommended Spot** |
|-------------|-----------|---------------------|
| 🌍 **Earth** | Jasmine, Marigold | Bo Sok — clay compress |
| 🌊 **Water** | Lotus, Gardenia | Wat Phumin, Saparn |
| 🌬️ **Wind** | White Bauhinia, Ylang-Ylang | Doi Phu Kha — mountain breeze |
| 🔥 **Fire** | Red Silk Cotton, Bougainvillea | Wat Chae Haeng — candle lighting |

💡 Take the Zodiac Quiz on this site to discover your element.

${outro}`;
  }

  // --- General ---
  return isTh
    ? `สวัสดีเจ้า \`พวงมาลัย\` ยินดีต้อนรับสู่ข่วงปัญญาอโรมาล้านนาเจ้า 🌸

📍 **แหล่งท่องเที่ยวเด่น:**
${spotsList}

🌺 **ดอกไม้ประจำถิ่น:** ${flowerListTH.join(", ")}

💡 พวงมาลัยสามารถช่วยแนะนำทริป ให้ข้อมูลดอกไม้ แนะนำกิจกรรมสุขภาพ หรือวิเคราะห์ธาตุเจ้าเรือนได้เจ้า

${outro}`
    : `🌸 *Malai here.*

📍 **Top spots:**
${spotsList}

🌺 **Local flowers:** ${flowerListEN.join(", ")}

💡 I can help plan a trip, recommend flowers, suggest wellness activities, or analyze your element.

${outro}`;
}

// 1. POST /api/generate-itinerary
app.post("/api/generate-itinerary", async (req, res) => {
  const { month, zodiacElement, interests, mood, lang: reqLang } = req.body;
  const lang: "th" | "en" = reqLang === "en" ? "en" : "th";
  const currentMonth = Number(month) || 12;
  const element = zodiacElement || "Water";
  const userInterests = interests || ["nature", "spiritual"];
  const userMood = mood || "peaceful";

  const seasonalFestivals = (FESTIVALS_DATA as any[]).filter((f) => f.month === currentMonth);
  const matchedFlowers = (FLOWERS_DATA as any[]).filter((f) => f.element.toLowerCase().includes(element.toLowerCase()));

  const prompt = `You are an expert travel coordinator for Nan Province. Create a bilingual (Thai/English) wellness itinerary for month ${currentMonth}, element ${element}, mood ${userMood}, interests ${userInterests.join(", ")}. Context - festivals: ${JSON.stringify(seasonalFestivals)}, flowers: ${JSON.stringify(matchedFlowers)}, wellness: ${JSON.stringify(WELLNESS_COMMUNITIES)}. Format with Markdown: headings, tables, bold, bullet points. Include 3-day itinerary with flower scent meditation, herbal activities, and essential oil guidance.`;

  const fallback = `
## 🌿 Lanna Aromatherapy Wellness Plan — แผนอโรมาสุคนธบำบัดล้านนา

### 3 Days / 2 Nights — ${element} Element Journey
*สำหรับผู้มีธาตุเจ้าเรือน **${element}** เดือนที่ ${currentMonth}*

---

### 📋 Seasonal Forecast

| Aspect | Detail |
|--------|--------|
| Month | ${currentMonth} |
| Element | ${element} |
| Mood | ${userMood} |
| Interests | ${userInterests.join(", ")} |

---

### 🌸 Element Flowers — ดอกไม้คู่ธาตุ
${matchedFlowers.length > 0 ? matchedFlowers.map((f: any) => `- **${f.name_th}** (${f.name_en}) — *${f.scent}*`).join("\n") : "- **มะลิออร์แกนิกน่าน** (Organic Jasmine) — หอมละมุน"}

---

### 📅 Day-by-Day Itinerary

**Day 1 | Mindfulness & Herbal Healing — สติและสมุนไพรบำบัด**
- 🏛 เช้า: วัดภูมินทร์ — Meditation at Wat Phumin / นั่งสมาธิชมจิตรกรรมฝาผนัง
- 🌿 บ่าย: **Bo Sok Model** — Herbal steam & clay compress / สุมยาสมุนไพรล้านนา
- 🍵 เย็น: Organic herbal tea tasting / ชิมชาสมุนไพรออร์แกนิก

**Day 2 | Forest Bathing & Aromatherapy — ป่าบำบัดและอโรมา**
- 🌲 เช้า: **Doi Phu Kha** — Forest bathing / เดินป่าถ่ายภาพดอกไม้
- 🎨 บ่าย: **Ban Nam Kien** — Essential oil workshop / เวิร์กชอปน้ำมันหอมระเหย
- 🌅 เย็น: Sunset meditation at Plumeria tunnel / นั่งสมาธิซุ้มลีลาวดี

**Day 3 | Scent & Spirit — กลิ่นและจิตวิญญาณ**
- 🧘 เช้า: Yoga with flower scent meditation / โยคะสมาธิกลิ่นดอกไม้
- 🛍 บ่าย: Tai Lue craft village / หมู่บ้านทอผ้าไทลื้อ
- 🌸 เย็น: Farewell flower blessing / พิธีอำลาด้วยดอกไม้

---

> "Let the fragrance of Nan's flowers guide your spirit to peace."
> "ให้กลิ่นหอมของดอกไม้น่านนำจิตวิญญาณคุณสู่ความสงบ"
  `;

  res.json({ itinerary: await generateWellnessResponse(prompt, fallback, lang) });
});

// 2. POST /api/zodiac-analysis
app.post("/api/zodiac-analysis", async (req, res) => {
  const { sign, birthMonth, currentAnxiety, lang: reqLang } = req.body;
  const lang: "th" | "en" = reqLang === "en" ? "en" : "th";

  const prompt = `Analyze horoscope for ${sign}, month ${birthMonth}, anxiety: "${currentAnxiety}". Use Nan botanical knowledge. Provide bilingual Thai/English response with Markdown formatting. Include element analysis, flower recommendations, and daily scent journal prompt.`;

  const fallback = `
## 🔮 Zodiac Botanical Analysis — ผลวิเคราะห์ดวงชะตาบุปผาบำบัด

### ${sign} — Month ${birthMonth}

**Current concern:** *${currentAnxiety || "Emotional fatigue"}*

---

**Your element / ธาตุเจ้าเรือน:** ดิน (Earth) — สุขุม มั่นคง อดทน

**Flower remedy / บุปผาบำบัด:** ดอกมะลิออร์แกนิกน่าน (Organic Jasmine) + เกสรบัวหลวง (Lotus Pollen) — ช่วยคลายวิตกกังวล ปลอบประโลมประสาท

**Daily Scent Journal Prompt:**
> "สูดลมหายใจลึกๆ นึกถึงละอองน้ำค้างเกาะกลีบมะลิขาว จดบันทึก 3 สิ่งที่คุณรู้สึกขอบคุณ"
> "Breathe deeply, imagine dewdrops on jasmine petals, write 3 things you're grateful for."
  `;

  res.json({ analysis: await generateWellnessResponse(prompt, fallback, lang) });
});

// 3. POST /api/wellness-chat
app.post("/api/wellness-chat", async (req, res) => {
  const { message, history } = req.body;
  const lang = detectLang(message || "");
  const conversationHistory = history ? history.map((h: any) => `${h.sender === "user" ? "User" : "Therapist"}: ${h.text}`).join("\n") : "";

  const prompt = `You are 'พวงมาลัย' (Malai), AI Scent Therapist of Nan. User asks: "${message}". History: ${conversationHistory}. Respond gently in ${lang === "th" ? "Thai with 'เจ้า' polite form" : "English"}. Relate to Nan flowers, elements, wellness spots. Keep short, comforting. DO NOT repeat the user's question. Start directly with your answer. Use Markdown formatting for readability.${lang === "th" ? " Use some English too." : " Use some Thai too."}`;

  const fallback = generateChatFallback(message, lang);

  res.json({ response: await generateWellnessResponse(prompt, fallback, lang) });
});

export default app;
