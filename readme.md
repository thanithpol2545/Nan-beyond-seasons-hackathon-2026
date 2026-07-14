# Nan Flourish — Wellness Finder & Botanical E-Commerce

> A minimalist, premium wellness finder blending **flower scent profiling**, **zodiac element matching**, **AR photography filters**, and **low-season travel itinerary generation** for Nan Province, Thailand.  
> Built for the **Nan Beyond Seasons Hackathon 2026** — Track 2: Experience & Wellness Finder.

---

## Concept

ท่องเที่ยวดอกไม้ + ดูดวง — เชื่อมโยงเอกลักษณ์ของดอกไม้เข้ากับวัฒนธรรม สุขภาพ และอาหาร สู่ประสบการณ์ Wellness เชิง Mental Health

- ดึงข้อมูล **เอกลักษณ์ประจำดอกไม้** แต่ละชนิด (ความหมายทางวัฒนธรรม, สรรพคุณทางสุขภาพ, การนำไปประกอบอาหาร)
- ผสมผสานกับ **ศาสตร์แห่งการดูดวง** (Zodiac / ธาตุเจ้าเรือน) เพื่อแนะนำดอกไม้ที่เหมาะกับผู้ใช้
- เชื่อมโยงไปสู่ **Wellness Experience** เช่น การแวะชมสวนดอกไม้, เวิร์กชอปทำน้ำมันหอมระเหย, กิจกรรมสุขภาพจิต (Flower Meditation, Aromatherapy)
- ใช้ **Typhoon AI** วิเคราะห์และแนะนำ Itinerary เฉพาะบุคคลใน Low Seasons

## Features

| Section | Description |
|---------|-------------|
| 🗺️ **AR Spot Map** | Photography spots with scent profiles & aesthetic filters |
| 🔮 **Zodiac Quiz** | Find your elemental flower match (ดิน น้ำ ลม ไฟ) |
| 📓 **Scent Mood Journal** | Log your mood & get flower remedy recommendations |
| 📅 **Blooming Calendar** | Month-by-month flowers, festivals & AI itinerary generator |
| 🤖 **Malai AI Chat** | AI Scent Therapist — ปรึกษาสุขภาพจิตด้วยสุคนธบำบัดล้านนา |

## Tech Stack

| Layer | Stack |
|-------|-------|
| Frontend | React 19, Vite 6, Tailwind CSS v4, Framer Motion |
| Backend | Express.js, dotenv |
| AI | Typhoon AI API (`typhoon-v2-70b-instruct`) — OpenAI-compatible |
| Dataset | `nan_dataset.json` — 227KB structured dataset (festivals, flowers, wellness communities, TAT API data) |

## Dataset

Comprehensive dataset of Nan Province covering:
- **15 festivals** with flower usage & wellness connections
- **20 flowers** with medical, aesthetic, traditional & belief dimensions
- **4 wellness communities** (Bo Sok Model, Ban Nam Kien, etc.)
- **6 ethnic groups** (Tai Lue, Hmong, etc.)
- **30+ TAT API events**, **50+ places**, **3 routes**, **11 articles**

## Project Structure

```
├── api/index.ts            # Vercel serverless entry
├── server.ts               # Express server (Typhoon AI integration)
├── vercel.json             # Vercel deployment config
├── src/
│   ├── main.tsx            # App entry point
│   ├── App.tsx             # AR Spot Map
│   ├── ARSpotMap.tsx       # Data module (flowers, festivals, etc.)
│   ├── ZodiacQuiz.tsx      # Elemental zodiac quiz
│   ├── FlowerDirectory.tsx # Scent mood journal
│   ├── EcomBoutique.tsx    # Blooming calendar & itinerary
│   ├── BloomingCalendar.tsx# Malai AI Chat
│   ├── AIAssistant.tsx     # TypeScript interfaces
│   ├── styles.css          # Tailwind v4 theme
│   ├── types.ts            # Type re-exports
│   └── data/
│       └── nanDataset.ts   # Dataset barrel export
├── nan_dataset.json        # 227KB Nan province dataset
├── nan_data_dictionary.md  # Data dictionary (Thai)
└── .env.example            # Environment template
```

## Contributors

- **Adunwit Tiampae** ([atiampa](https://github.com/atiampa)) — Full-stack development, dataset research, concept design
- **Thanithpol Thiramongkolchai** (@thanithpol2545) — AI integration, dataset research, project coordination

Built for the **Nan Beyond Seasons Hackathon 2026** — July 2026.
