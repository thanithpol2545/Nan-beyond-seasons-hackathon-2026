# Track 2: Experience & Wellness Finder

## Concept
ท่องเที่ยวดอกไม้ + ดูดวง — เชื่อมโยงเอกลักษณ์ของดอกไม้เข้ากับวัฒนธรรม สุขภาพ และอาหาร สู่ประสบการณ์ Wellness เชิง Mental Health

## Core Idea
- ดึงข้อมูล **เอกลักษณ์ประจำดอกไม้** แต่ละชนิด (ความหมายทางวัฒนธรรม, สรรพคุณทางสุขภาพ, การนำไปประกอบอาหาร)
- ผสมผสานกับ **ศาสตร์แห่งการดูดวง** ( zodiac / ราศี / Day Flower ) เพื่อแนะนำดอกไม้ที่เหมาะกับผู้ใช้ในแต่ละช่วงเวลา
- เชื่อมโยงไปสู่ **Wellness Experience** เช่น การแวะชมสวนดอกไม้, เวิร์กชอปทำอาหารจากดอกไม้, กิจกรรมสุขภาพจิต (Flower Meditation, Aromatherapy)
- ใช้ **AI / Training Model** วิเคราะห์พฤติกรรมท่องเที่ยวใน **Low Seasons** เพื่อแนะนำแพ็กเกจและโปรโมชันที่ตรงใจ

## Target Group
- **Performative Gen Z** — กลุ่มที่ชอบแชร์ประสบการณ์ลง social media, ต้องการคอนเทนต์สวยงามและมีสไตล์
- **Foreigners** — นักท่องเที่ยวต่างชาติที่เดินทางใน Low Seasons เพื่อหลีกเลี่ยง Peak Season

## Key Features
1. **Flower Personality Quiz** — ทายนิสัย/ดูดวงจากดอกไม้ที่ชอบ หรือคำนวณจากวันเกิด
2. **Wellness Recommendation Engine** — แนะนำกิจกรรม wellness ที่เชื่อมโยงกับดอกไม้ (Flower Tea Tasting, Natural Dye Workshop, Flower Bath)
3. **Low-Season Campaign** — โมเดล ML เรียนรู้พฤติกรรมนักท่องเที่ยวใน Low Seasons เพื่อเสนอ Discount / Itinerary ที่เหมาะสม
4. **AR Flower Filter / Photo Spot Map** — ตอบโจทย์ Performative Gen Z ที่ต้องการถ่ายรูปสวยลง IG / TikTok

## ML / Data Approach
- **Training Model for Low Seasons**:
  - เก็บข้อมูล historical tourist data (จำนวนนักท่องเที่ยวย้อนหลัง, สภาพอากาศ, เทศกาลท้องถิ่น)
  - ใช้ Time Series / Regression เพื่อพยากรณ์ช่วง Low Season
  - สร้าง Recommendation System (Collaborative Filtering + Content-Based) แนะนำแพ็กเกจ wellness ที่เหมาะกับแต่ละช่วง
- **Flower Knowledge Graph**:
  - สร้างฐานข้อมูลดอกไม้ — สรรพคุณ, ความหมาย, อาหาร/เครื่องดื่มที่เกี่ยวข้อง, กิจกรรม wellness ที่เชื่อมโยง

## Business Model
- Affiliate / Commission จากร้านค้า ที่พัก และกิจกรรม wellness
- Premium Feature (Flourish Pass) — ส่วนลดพิเศษช่วง Low Season, ฟีเจอร์ดูดวงรายสัปดาห์
- Partnership กับ Local Communities / วัด / สวนดอกไม้

## Tech Stack (แนวทาง)
- Frontend: React Native / Next.js + Tailwind
- Backend: FastAPI / Node.js
- ML: Python (scikit-learn / TensorFlow / PyTorch)
- Database: PostgreSQL + Neo4j (Graph DB สำหรับ Flower Knowledge)
- Infra: Docker + Cloud Run / EC2
