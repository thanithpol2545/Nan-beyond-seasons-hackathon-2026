import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { FLOWERS_DATA, FESTIVALS_DATA, WELLNESS_COMMUNITIES } from "./src/data/nanApiData";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;
const isProd = process.env.NODE_ENV === "production";

const TYPHOON_API_KEY = process.env.TYPHOON_API_KEY;
const TYPHOON_API_URL = "https://api.opentyphoon.ai/v1/chat/completions";

const IS_MOCK = !TYPHOON_API_KEY || TYPHOON_API_KEY === "your_typhoon_api_key_here";

async function callTyphoon(prompt: string): Promise<string | null> {
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
          {
            role: "system",
            content: "คุณคือผู้เชี่ยวชาญด้านการท่องเที่ยวเชิงสุขภาพและพฤกษาบำบัดของจังหวัดน่าน ตอบอย่างสวยงาม เป็นภาษาไทย ใช้เครื่องหมาย Markdown ให้เรียบร้อย"
          },
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

async function generateWellnessResponse(prompt: string, fallback: string): Promise<string> {
  const result = await callTyphoon(prompt);
  return result ?? fallback;
}

// --- API ROUTES ---

// 1. POST /api/generate-itinerary
app.post("/api/generate-itinerary", async (req, res) => {
  const { month, zodiacElement, interests, mood } = req.body;

  const currentMonth = Number(month) || 12;
  const element = zodiacElement || "Water";
  const userInterests = interests || ["nature", "spiritual"];
  const userMood = mood || "peaceful";

  const seasonalFestivals = FESTIVALS_DATA.filter(f => f.month === currentMonth);
  const matchedFlowers = FLOWERS_DATA.filter(f => f.element.toLowerCase().includes(element.toLowerCase()));

  const prompt = `
    You are an expert travel coordinator, ML strategist, and herbal wellness practitioner for Nan Province, Thailand.
    Create a detailed, beautiful, and authentic wellness travel itinerary for a visitor who is traveling during Month: ${currentMonth} (Low or High season depending on typical Nan weather).
    
    The visitor has the following profile:
    - Zodiac Element: ${element}
    - Mood: ${userMood}
    - Key Interests: ${userInterests.join(", ")}
    
    Local Nan Context to ground in:
    - Festivals of this month: ${JSON.stringify(seasonalFestivals)}
    - Local elemental flowers matched: ${JSON.stringify(matchedFlowers)}
    - Wellness communities nearby: ${JSON.stringify(WELLNESS_COMMUNITIES)}

    Provide a professional, ThemeForest-editorial-style wellness proposal written in beautiful Thai (with English activity terms where helpful). Include:
    1. **Seasonal Forecast & ML Recommendation (Low-season advice or High-season insights)**.
    2. **Element Matching (How the element matches the current mood and flora)**.
    3. **A detailed Day-by-Day (3 Days) Itinerary including flower scent meditation, local Tai Lue visits, and actual herbal wellness activities (e.g., foot bath, knee compress at Bo Sok)**.
    4. **Scent & Essential Oil pairing guidance**.
    
    Format the response cleanly with Markdown headings, elegant spacing, and bullet points. Avoid any developer jargon or system logs.
  `;

  const fallback = `
## 🌿 Lanna Aromatherapy Wellness Plan — แผนอโรมาสุคนธบำบัดล้านนา

### 3 Days / 2 Nights — ${element} Element Journey
*สำหรับผู้มีธาตุเจ้าเรือน **${element}** เดือนที่ ${currentMonth}*

---

### 📋 Seasonal Forecast & Recommendation — พยากรณ์ฤดูกาล

| Aspect | Detail |
|--------|--------|
| Month | เดือน ${currentMonth} |
| Element | ${element} |
| Mood | ${userMood} |
| Interests | ${userInterests.join(", ")} |

**Recommendation:** We recommend visiting Nan during this period to experience ${seasonalFestivals.length > 0 ? "the unique festivals and" : "the serene beauty of"} Nan's natural landscape. The weather is ideal for wellness activities and flower meditation.

*คำแนะนำ:* ช่วงนี้เหมาะแก่การเยือนน่านเพื่อสัมผัสธรรมชาติและกิจกรรม wellness อย่างแท้จริง

---

### 🌸 Element Flower Matching — ดอกไม้คู่ธาตุ

**Recommended flowers / ดอกไม้แนะนำ:**
${matchedFlowers.length > 0 ? matchedFlowers.map(f => `- **${f.name_th}** (${f.name_en}) — *${f.scent}* — ${f.medical.benefits_th[0] || ""}`).join("\n") : "- **มะลิออร์แกนิกน่าน** (Organic Jasmine) — หอมละมุน — ช่วยคลายเครียดและบำรุงหัวใจ"}

---

### 📅 Day-by-Day Itinerary — แผนการเดินรายวัน

**Day 1 | Mindfulness & Herbal Healing — สติและสมุนไพรบำบัด**
- 🏛 Morning: วัดภูมินทร์ — Meditation at Wat Phumin's famous mural hall / นั่งสมาธิชมจิตรกรรมฝาผนัง
- 🌿 Afternoon: **Bo Sok Model** — Herbal steam & hot clay compress / สุมยาสมุนไพรล้านนาและพอกเข่าดินเผา
- 🍵 Evening: Organic herbal tea tasting / ชิมชาสมุนไพรออร์แกนิก

**Day 2 | Forest Bathing & Aromatherapy — ป่าบำบัดและอโรมา**
- 🌲 Morning: **Doi Phu Kha National Park** — Forest bathing & flower photography / เดินป่าถ่ายภาพเสี้ยวดอกขาว
- 🎨 Afternoon: **Ban Nam Kien** — Essential oil workshop / เวิร์กชอปทำน้ำมันหอมระเหย
- 🌅 Evening: Sunset meditation at Plumeria tunnel, Nan National Museum / นั่งสมาธิซุ้มลีลาวดี

**Day 3 | Scent & Spirit — กลิ่นและจิตวิญญาณ**
- 🧘 Morning: Yoga & scent meditation with ${matchedFlowers[0]?.name_th || "ดอกมะลิ"} / โยคะและสมาธิกลิ่นดอกไม้
- 🛍 Afternoon: Local Tai Lue craft village visit / เยือนหมู่บ้านทอผ้าไทลื้อ
- 🌸 Evening: Farewell flower blessing ceremony / พิธีอำลาด้วยดอกไม้

---

### 💆 Scent & Essential Oil Guide — คู่มือกลิ่นและน้ำมันหอมระเหย

| Element | Recommended Scent | Benefits |
|---------|------------------|----------|
| ${element} | ${matchedFlowers.map(f => f.name_th).join(", ") || "มะลิ + กระดังงา"} | Calming, balancing, restorative / ผ่อนคลาย สมดุล ฟื้นฟู |

> "Let the fragrance of Nan's flowers guide your spirit to peace."
> "ให้กลิ่นหอมของดอกไม้น่านนำจิตวิญญาณคุณสู่ความสงบ"
  `;

  const result = await generateWellnessResponse(prompt, fallback);
  res.json({ itinerary: result });
});

// 2. POST /api/zodiac-analysis
app.post("/api/zodiac-analysis", async (req, res) => {
  const { sign, birthMonth, currentAnxiety } = req.body;

  const prompt = `
    Analyze the horoscope and botanical energy profile for a person born in month ${birthMonth} under the zodiac sign of '${sign}'.
    They are currently experiencing: '${currentAnxiety}'.
    
    Ground your response in the Nan Province botanical knowledge graph (Thai wellness heritage):
    Provide an elegant, calming reading in Thai:
    - Their Zodiac Element (ดิน, น้ำ, ลม, ไฟ)
    - Recommended local Nan flowers and their aromatherapy effects (such as Jasmine, Plumeria, Lotus, Rose, Phlai)
    - A daily 'Scent Journal' prompt to help them ground their emotions.
    
    Keep it beautifully designed and encouraging, in a minimalist wellness tone.
  `;

  const fallback = `
## 🔮 Zodiac Botanical Analysis — ผลวิเคราะห์ดวงชะตาบุปผาบำบัด

### ${sign} — Month ${birthMonth}

**Current concern / สิ่งที่กังวล:** *${currentAnxiety || "Emotional fatigue / ความเหนื่อยล้าทางอารมณ์"}*

---

### Element Diagnosis — วินิจฉัยธาตุ

| Element / ธาตุ | Recommendation / คำแนะนำ |
|---------|------------------|
| Earth ดิน | Grounding with wood & moss scents / กลิ่นเนื้อไม้และดิน |
| Water น้ำ | Cooling with lotus & jasmine / เกสรบัวหลวงและมะลิ |
| Wind ลม | Uplifting with plumeria & lemongrass / ลีลาวดีและตะไคร้ |
| Fire ไฟ | Warming with marigold & phlai / ดาวเรืองและไพล |

**Your recommended element / ธาตุเจ้าเรือนแนะนำ:** ดิน (Earth) — สุขุม มั่นคง อดทน

---

### 🌸 Flower Remedy — บุปผาบำบัด

แนะนำให้ใช้กลิ่นอโรมาของ **ดอกมะลิออร์แกนิกน่าน (Organic Jasmine)** และ **สารเกสรบัวหลวงเย็นบำรุงหัวใจ (Lotus Pollen)** เพื่อคลายความวิตกกังวล ปลอบประโลมประสาทส่วนกลางและสร้างสมาธิความสงบภายในใจ

*We recommend Organic Jasmine from Nan and Lotus Pollen to calm anxiety, soothe the nervous system, and restore inner peace.*

---

### 📝 Daily Scent Journal Prompt — คำแนะนำบันทึกกลิ่นวันนี้

> "สูดลมหายใจเข้าลึกๆ นึกถึงละอองน้ำค้างเกาะกลีบมะลิขาว แล้วจดบันทึก 3 สิ่งที่คุณรู้สึกขอบคุณต่อผืนดินในวันนี้"
>
> "Breathe deeply, imagine dewdrops on white jasmine petals, and write down 3 things you're grateful for today."
  `;

  const result = await generateWellnessResponse(prompt, fallback);
  res.json({ analysis: result });
});

// 3. POST /api/wellness-chat
app.post("/api/wellness-chat", async (req, res) => {
  const { message, history } = req.body;

  const conversationHistory = history ? history.map((h: any) => `${h.sender === "user" ? "User" : "Therapist"}: ${h.text}`).join("\n") : "";

  const prompt = `
    You are 'พวงมาลัย' (Malai), an AI Scent Therapist and Wellness Guide of Nan Province, Thailand.
    Your personality is calming, empathetic, elegant, and highly knowledgeable about Thai traditional medicine (แพทย์แผนไทย), flower scents (FragranceFamilies), and Nan's beautiful sites (like Bo Sok Model, Doi Phu Kha, Ban Sapan).
    
    The user is asking: "${message}"
    
    Previous conversation:
    ${conversationHistory}
    
    Guidelines:
    - Respond in extremely gentle and polite Thai ("เจ้า", "คะ", "ค่ะ").
    - Relate your answers to the elements of nature, floral scent properties, or Nan wellness spots.
    - Keep it short, comforting, and deeply relaxing. No robotic system terms or headers.
  `;

  const fallback = `สวัสดีเจ้า ข้าเจ้าชื่อพวงมาลัย ยินดีต้อนรับสู่ข่วงปัญญาอโรมาล้านนาเจ้า 🌸

*Welcome to Lanna Aromatherapy Wisdom Hall.*

**คำถามของวันนี้ / Your question:**
"${message}"

ข้าเจ้าเข้าใจความรู้สึกของเจ้านะคะ... การได้สูดดมกลิ่นหอมของดอกไม้ป่าบนดอยภูคา หรือจิบชาเกสรบัวหลวงอุ่นๆ สักแก้น่าจะช่วยให้จิตใจสงบลงได้เจ้า

*Malai understands your feelings... The scent of wildflowers on Doi Phu Kha or a warm cup of lotus pollen tea may help calm your mind.*

📿 **คำแนะนำข้าเจ้าสำหรับวันนี้ / Malai's tip for today:**
ลองหลับตาช้าๆ สูดลมหายใจเข้าลึก 3 ครั้ง นึกถึงสายลมเย็นที่พัดผ่านทุ่งดอกไม้ในน่าน แล้วคุณจะพบกับความสงบภายในเจ้า

*Close your eyes, take 3 deep breaths, imagine the cool wind across Nan's flower fields, and you will find inner peace.*

มีอะไรให้พวงมาลัยช่วยเหลือเพิ่มเติมไหมเจ้า? 🙏✨`;

  const result = await generateWellnessResponse(prompt, fallback);
  res.json({ response: result });
});


// --- SERVING THE FRONTEND ---

if (isProd) {
  const distPath = path.resolve(__dirname, "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
} else {
  import("vite").then(({ createServer: createViteServer }) => {
    createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    }).then((vite) => {
      app.use(vite.middlewares);
      app.use("*", async (req, res, next) => {
        const url = req.originalUrl;
        try {
          let template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
          template = await vite.transformIndexHtml(url, template);
          res.status(200).set({ "Content-Type": "text/html" }).end(template);
        } catch (e) {
          vite.ssrFixStacktrace(e as Error);
          next(e);
        }
      });
    });
  });
}

// Only start listener in non-Vercel environments
if (!process.env.VERCEL) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Full-stack server running locally on http://localhost:${PORT}`);
  });
}

export default app;
