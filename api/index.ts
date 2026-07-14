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
    return "คุณคือผู้เชี่ยวชาญด้านการท่องเที่ยวเชิงสุขภาพและพฤกษาบำบัดของจังหวัดน่าน ตอบอย่างสวยงาม เป็นภาษาไทย ใช้เครื่องหมาย Markdown ให้เรียบร้อย";
  }
  return "You are an expert in wellness tourism and botanical therapy of Nan Province, Thailand. Respond beautifully in English using Markdown formatting.";
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

  const prompt = `You are 'พวงมาลัย' (Malai), AI Scent Therapist of Nan. User asks: "${message}". History: ${conversationHistory}. Respond gently in ${lang === "th" ? "Thai with 'เจ้า' polite form" : "English"}. Relate to Nan flowers, elements, wellness spots. Keep short, comforting.${lang === "th" ? " Use some English too." : " Use some Thai too."}`;

  const fallback = `สวัสดีเจ้า ข้าเจ้าชื่อพวงมาลัย ยินดีต้อนรับสู่ข่วงปัญญาอโรมาล้านนาเจ้า 🌸

*Welcome to Lanna Aromatherapy Wisdom Hall.*

**คำถาม: "${message}"**

ข้าเจ้าเข้าใจความรู้สึกนะคะ... การสูดดมกลิ่นหอมของดอกไม้ป่าบนดอยภูคา หรือจิบชาเกสรบัวหลวงอุ่นๆ สักแก้น่าจะช่วยให้จิตใจสงบลงได้เจ้า

*Malai understands... The scent of wildflowers on Doi Phu Kha or warm lotus tea may calm your mind.*

📿 **คำแนะนำ:**
ลองหลับตาช้าๆ สูดลมหายใจเข้าลึก 3 ครั้ง นึกถึงสายลมเย็นพัดผ่านทุ่งดอกไม้ในน่าน แล้วคุณจะพบความสงบภายในเจ้า

*Close your eyes, take 3 deep breaths, imagine cool wind across Nan's flower fields.*

มีอะไรให้พวงมาลัยช่วยเหลือเพิ่มเติมไหมเจ้า? 🙏✨`;

  res.json({ response: await generateWellnessResponse(prompt, fallback, lang) });
});

export default app;
