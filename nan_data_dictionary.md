# Data Dictionary — nan_dataset.json

## 1. ภาพรวม (Overview)

| รายการ | รายละเอียด |
|--------|-----------|
| ชื่อไฟล์ | `nan_dataset.json` |
| เวอร์ชัน | 1.0 → 1.1 |
| อัปเดตล่าสุด | 2026-07-13 |
| ภาษา | ไทย / อังกฤษ |
| ขนาดไฟล์ | ~227 KB |
| วัตถุประสงค์ | ใช้เป็นฐานข้อมูลสำหรับ Train Model, Recommendation System, และพัฒนา Application |
| การเปลี่ยนแปลงใน v1.1 | เพิ่มข้อมูลจาก TAT Data API (events, places, routes, articles แบบ real-time) |

---

## 2. metadata

ข้อมูลเมตาโดยรวมของ dataset

| ฟิลด์ | ชนิดข้อมูล | คำอธิบาย | ตัวอย่าง |
|-------|-----------|---------|---------|
| `title` | `string` | ชื่อ dataset | "Nan Province Dataset — Festivals, Traditions, Flowers & Wellness" |
| `description` | `string` | คำอธิบายโดยรวม | "Comprehensive dataset of Nan province covering all festivals..." |
| `version` | `string` | เวอร์ชัน | "1.1" |
| `last_updated` | `string` (date) | วันที่อัปเดตล่าสุด | "2026-07-13" |
| `total_festivals` | `number` | จำนวนเทศกาลทั้งหมด | 15 |
| `total_flowers` | `number` | จำนวนดอกไม้ทั้งหมด | 20 |
| `total_wellness_communities` | `number` | จำนวนชุมชน wellness | 4 |
| `total_ethnic_groups` | `number` | จำนวนกลุ่มชาติพันธุ์ | 6 |
| `\*NEW\* total_api_events` | `number` | จำนวนกิจกรรมจาก TAT API | 30 |
| `\*NEW\* total_api_places` | `number` | จำนวนสถานที่จาก TAT API | 50 |
| `\*NEW\* total_api_routes` | `number` | จำนวนเส้นทางจาก TAT API | 3 |
| `\*NEW\* total_api_articles` | `number` | จำนวนบทความจาก TAT API | 11 |

---

## 3. festivals

ข้อมูลเทศกาลและประเพณีในจังหวัดน่าน

| ฟิลด์ | ชนิดข้อมูล | คำอธิบาย | ตัวอย่าง |
|-------|-----------|---------|---------|
| `id` | `string` | รหัสประจำเทศกาล (รหัสขึ้นต้น F) | "F001" |
| `name_th` | `string` | ชื่อเทศกาลภาษาไทย | "ปีใหม่ม้ง (น่อเป๊โจ่วฮ์)" |
| `name_en` | `string` | ชื่อเทศกาลภาษาอังกฤษ | "Hmong New Year" |
| `month` | `number \| null` | เดือนที่จัด (1-12), `null` ถ้าไม่固定 | 1 |
| `period` | `string` | ช่วงเวลาจัด (เพิ่มเติมจากเดือน) | "หลังจากเก็บเกี่ยวผลผลิต (ประมาณมกราคม)" |
| `location` | `string` | สถานที่จัด | "อำเภอปัว, จังหวัดน่าน" |
| `ethnic_group` | `string` | กลุ่มชาติพันธุ์ที่เป็นเจ้าของประเพณี | "ม้ง (Hmong)" |
| `description_th` | `string` | คำอธิบายเทศกาลภาษาไทย | "งานรื่นเริงของชาวม้ง..." |
| `description_en` | `string` | คำอธิบายเทศกาลภาษาอังกฤษ | "Hmong New Year celebration..." |
| `flowers_used` | `array<object>` | รายการดอกไม้ที่ใช้ในเทศกาล | ดูตารางย่อยด้านล่าง |
| `wellness_connection` | `string` | ความเชื่อมโยงกับ wellness | "Ethnic cultural experience..." |

### 3.1 flowers_used (ใน festivals)

| ฟิลด์ | ชนิดข้อมูล | คำอธิบาย | ตัวอย่าง |
|-------|-----------|---------|---------|
| `name` | `string` | ชื่อดอกไม้ | "ดอกป๊อปปี้" |
| `use` | `string` | การใช้ในเทศกาล | "ประดับตกแต่ง" |
| `symbolism` | `string` | ความหมาย/สัญลักษณ์ | "ความอุดมสมบูรณ์" |

---

## 4. flowers

ข้อมูลดอกไม้ของจังหวัดน่าน ครอบคลุม 4 มิติ: ทางการแพทย์, ความสวยงาม, ประเพณี, ความเชื่อ

| ฟิลด์ | ชนิดข้อมูล | คำอธิบาย | ตัวอย่าง |
|-------|-----------|---------|---------|
| `id` | `string` | รหัสประจำดอกไม้ (รหัสขึ้นต้น FL) | "FL001" |
| `name_th` | `string` | ชื่อดอกไม้ภาษาไทย | "เสี้ยวดอกขาว" |
| `name_en` | `string` | ชื่อดอกไม้ภาษาอังกฤษ | "Orchid Tree / Mountain Ebony" |
| `scientific` | `string` | ชื่อวิทยาศาสตร์ | "Bauhinia variegata" |
| `family` | `string` | วงศ์ (พฤกษศาสตร์) | "Fabaceae (ถั่ว)" |
| `symbol` | `string` | สัญลักษณ์/ความหมายประจำดอก | "ดอกไม้ประจำจังหวัดน่าน" |
| `season` | `string` | ฤดูกาลที่ดอกบาน | "ตลอดปี, ชอบอากาศเย็น" |
| `scent` | `string` | ลักษณะกลิ่น | "หอมอ่อนๆ" |
| `color` | `string` | สีของดอก | "ชมพูอ่อน, ขาว" |
| `medical` | `object` | ข้อมูลทางการแพทย์ (ดูตารางย่อย 4.1) | — |
| `aesthetic` | `object` | ข้อมูลความสวยงาม (ดูตารางย่อย 4.2) | — |
| `tradition` | `object` | ข้อมูลประเพณี (ดูตารางย่อย 4.3) | — |
| `belief` | `object` | ข้อมูลความเชื่อ (ดูตารางย่อย 4.4) | — |
| `wellness_activity` | `array<string>` | กิจกรรม wellness ที่แนะนำ | ["Flower photography tour", ...] |
| `fragrance_family` | `string` | กลุ่มกลิ่นน้ำหอม | "Floral - Soft" |
| `element` | `string` | ธาตุเจ้าเรือนที่ตรงกับดอก | "ลม (Wind)" |
| `knowledge_graph_tags` | `array<string>` | แท็กสำหรับ Knowledge Graph | ["nan_province_flower", "edible_flower", ...] |

### 4.1 medical

| ฟิลด์ | ชนิดข้อมูล | คำอธิบาย | ตัวอย่าง |
|-------|-----------|---------|---------|
| `benefits_th` | `array<string>` | สรรพคุณทางยาภาษาไทย | ["เปลือกมีสารแทนนิน...", "ดอกมีฤทธิ์ต้านมะเร็ง"] |
| `uses_th` | `array<string>` | การใช้ประโยชน์ทางการแพทย์แผนไทย | ["ย้อมผ้าธรรมชาติ", "พืชอาหาร"] |
| `benefits_en` | `array<string>` | สรรพคุณทางยาภาษาอังกฤษ | ["Bark contains tannins..."] |

### 4.2 aesthetic

| ฟิลด์ | ชนิดข้อมูล | คำอธิบาย | ตัวอย่าง |
|-------|-----------|---------|---------|
| `description_th` | `string` | คำอธิบายความสวยงามภาษาไทย | "ไม้ยืนต้นสูง 10-15 ม. ดอกคล้ายดอกชงโค..." |
| `description_en` | `string` | คำอธิบายความสวยงามภาษาอังกฤษ (optional) | "Medium tree 10-15m..." |
| `photography_score` | `number` | คะแนนความเหมาะในการถ่ายรูป (1-10) | 9 |
| `instagram_worthy` | `boolean` | เหมาะลงโซเชียลมีเดียหรือไม่ | true |

### 4.3 tradition

| ฟิลด์ | ชนิดข้อมูล | คำอธิบาย | ตัวอย่าง |
|-------|-----------|---------|---------|
| `uses_th` | `array<string>` | การใช้ในประเพณี/วัฒนธรรมไทย | ["ดอกไม้ประจำจังหวัดน่าน", "ปลูกเป็นไม้ประดับริมถนน"] |
| `food_th` | `string` | การใช้ประกอบอาหาร | "ใบอ่อนใช้ห่อหมก หรือปรุงเป็นผักสด" |

### 4.4 belief

| ฟิลด์ | ชนิดข้อมูล | คำอธิบาย | ตัวอย่าง |
|-------|-----------|---------|---------|
| `meaning_th` | `string` | ความหมายเชิงสัญลักษณ์ | "ความงามที่เรียบง่าย, ความอดทน" |
| `beliefs_th` | `array<string>` | ความเชื่อที่เกี่ยวข้องภาษาไทย | ["เป็นไม้มงคล", "ในอินเดียถือเป็น 'โควิทารา'..."] |
| `beliefs_en` | `array<string>` | ความเชื่อที่เกี่ยวข้องภาษาอังกฤษ | ["Sacred tree (Kovidara) in Hinduism"] |

---

## 5. wellness_communities

ข้อมูลชุมชน Wellness ต้นแบบในจังหวัดน่าน

| ฟิลด์ | ชนิดข้อมูล | คำอธิบาย | ตัวอย่าง |
|-------|-----------|---------|---------|
| `id` | `string` | รหัส (ขึ้นต้น WC) | "WC001" |
| `name` | `string` | ชื่อภาษาไทย | "บ่อสวกโมเดล" |
| `name_en` | `string` | ชื่อภาษาอังกฤษ | "Bo Sok Model" |
| `location` | `string` | ที่ตั้ง | "ตำบลบ่อสวก, จังหวัดน่าน" |
| `type` | `string` | ประเภท/มาตรฐาน | "Wellness Community (มาตรฐานกรมการแพทย์แผนไทยฯ)" |
| `description` | `string` | คำอธิบาย | "วิสาหกิจชุมชนชมรมแพทย์แผนไทย..." |
| `services` | `array<string>` | รายการบริการ/กิจกรรม | ["การสุมยา — บรรเทาหวัดและภูมิแพ้...", ...] |
| `key_herbs` | `array<string>` | สมุนไพรหลัก (optional) | ["ใบเมี่ยง", "หม่อน", "ไพล"] |
| `flowers_in_use` | `array<string>` | ดอกไม้ที่ใช้ (optional) | ["ดาวเรือง (พอกเข่า)", "มะลิ (พวงมาลัย)"] |
| `products_certified` | `string` | ผลิตภัณฑ์ที่ได้รับการรับรอง (optional) | "ผลิตภัณฑ์ขึ้นทะเบียน อย. แล้ว 7 รายการ" |

---

## 6. ethnic_groups

ข้อมูลกลุ่มชาติพันธุ์ในจังหวัดน่าน

| ฟิลด์ | ชนิดข้อมูล | คำอธิบาย | ตัวอย่าง |
|-------|-----------|---------|---------|
| `id` | `string` | รหัส (ขึ้นต้น EG) | "EG001" |
| `name_th` | `string` | ชื่อภาษาไทย | "ไทลื้อ" |
| `name_en` | `string` | ชื่อภาษาอังกฤษ | "Tai Lue" |
| `population_in_nan` | `string` | จำนวนประชากร/ความสำคัญ | "มากที่สุดในประเทศไทย" |
| `districts` | `array<string>` | อำเภอที่อาศัย | ["อำเภอปัว", "อำเภอท่าวังผา", "อำเภอทุ่งช้าง"] |
| `language` | `string` | ภาษาที่ใช้ | "ภาษาไทลื้อ (Tai Lü) — กลุ่มภาษาไท-กะได" |
| `religion` | `string` | ศาสนา/ความเชื่อ | "พุทธเถรวาท + ความเชื่อเรื่องผี" |
| `cultural_highlights` | `object` | จุดเด่นทางวัฒนธรรม (ดูตารางย่อย) | — |
| `flower_connection` | `object` | ความเชื่อมโยงกับดอกไม้ (ดูตารางย่อย) | — |

### 6.1 cultural_highlights

| ฟิลด์ | ชนิดข้อมูล | คำอธิบาย | ตัวอย่าง |
|-------|-----------|---------|---------|
| `textile` | `string` | ข้อมูลเกี่ยวกับผ้าทอ | "ผ้าทอมือไทลื้อ — ลวดลายเอกลักษณ์, ย้อมสีธรรมชาติ..." |
| `food` | `array<string>` | รายการอาหาร | ["ข้าวแคบ", "แคบหมูไทลื้อ", ...] |
| `music` | `array<string>` | รายการดนตรี | ["จ๊อยซอ", "ปี่แม่ (Pi Mae)", ...] |
| `dance` | `string` | การฟ้อนรำ | "ฟ้อนแง้น, ฟ้อนไทลื้อ" |
| `medicine` | `string` | การแพทย์พื้นบ้าน | "ภูมิปัญญาสมุนไพร 700 ปี..." |

### 6.2 flower_connection

| ฟิลด์ | ชนิดข้อมูล | คำอธิบาย | ตัวอย่าง |
|-------|-----------|---------|---------|
| `traditional_flowers` | `array<string>` | ดอกไม้ที่ใช้ในประเพณี | ["ดอกมะลิ", "ดอกดาวเรือง", ...] |
| `special_tradition` | `string` | ประเพณีพิเศษเกี่ยวกับดอกไม้ | "ประเพณีดอกไม้พันดวง..." |

---

## 7. relationship_matrix

ตารางเชื่อมโยงความสัมพันธ์ระหว่างเทศกาล ดอกไม้ ความเชื่อ และกิจกรรม wellness สำหรับใช้เทรนโมเดล

| ฟิลด์ | ชนิดข้อมูล | คำอธิบาย | ตัวอย่าง |
|-------|-----------|---------|---------|
| `description` | `string` | คำอธิบายของ matrix | "Matrix connecting festivals → flowers → beliefs → wellness activities" |
| `example_connections` | `array<object>` | ตัวอย่างความเชื่อมโยง | ดูตารางย่อย |

### 7.1 example_connections

| ฟิลด์ | ชนิดข้อมูล | คำอธิบาย | ตัวอย่าง |
|-------|-----------|---------|---------|
| `festival` | `string` | ชื่อเทศกาล | "หกเป็งนมัสการพระธาตุแช่แห้ง" |
| `flower` | `string` | ชื่อดอกไม้ | "ดอกบัวหลวง" |
| `belief` | `string` | ความเชื่อ | "การตรัสรู้, ความบริสุทธิ์" |
| `wellness` | `string` | กิจกรรม wellness | "Walking meditation up the mountain, Spiritual reflection" |
| `ai_prompt` | `string` | ตัวอย่าง prompt ที่ใช้แนะนำผู้ใช้ | "แนะนำดอกบัวหลวงและกิจกรรมเดินจงกรมขึ้นพระธาตุแช่แห้ง..." |

---

## 8. ml_training_notes

คำแนะนำสำหรับใช้ dataset นี้ในการ Train Machine Learning Model

| ฟิลด์ | ชนิดข้อมูล | คำอธิบาย | ตัวอย่าง |
|-------|-----------|---------|---------|
| `recommendation_features` | `array<string>` | Feature ที่ใช้ใน Recommendation System | ["user_zodiac_sign → element → recommended flowers", ...] |
| `example_training_data` | `array<object>` | ตัวอย่าง Training Data | ดูตารางย่อย |

### 8.1 example_training_data

| ฟิลด์ | ชนิดข้อมูล | คำอธิบาย | ตัวอย่าง |
|-------|-----------|---------|---------|
| `user_element` | `string` | ธาตุเจ้าเรือนของผู้ใช้ | "ดิน" |
| `recommended_flowers` | `array<string>` | ดอกไม้ที่แนะนำ | ["มะลิ", "กุหลาบ", "พุดซ้อน"] |
| `recommended_festivals` | `array<string>` | เทศกาลที่แนะนำ | ["สืบชะตา", "ตานก๋วยสลาก"] |
| `wellness_tip` | `string` | คำแนะนำ wellness | "ดอกมะลิจะช่วยให้คุณรู้สึกมั่นคงและผ่อนคลาย" |
| `visit_month` | `number` | เดือนที่มาเที่ยว (optional) | 10 |
| `festival` | `string` | เทศกาลในเดือนนั้น (optional) | "แข่งเรือชิงถ้วยพระราชทาน" |
| `suggested_experience` | `string` | ประสบการณ์แนะนำ (optional) | "ชมการแข่งเรือ + พัก Wellness Stay ที่บ่อสวก..." |

---

## 9. สรุป Schema ความสัมพันธ์

```
nan_dataset.json
├── metadata
├── festivals[]
│   └── flowers_used[]
├── flowers[]
│   ├── medical
│   ├── aesthetic
│   ├── tradition
│   └── belief
├── wellness_communities[]
├── ethnic_groups[]
│   ├── cultural_highlights
│   └── flower_connection
├── relationship_matrix
│   └── example_connections[]
└── ml_training_notes
    └── example_training_data[]
```

---

---

## 11. tat_api

ข้อมูลเชื่อมต่อ TAT Data API (Tourism Authority of Thailand) — API จริงที่ใช้ API key ที่ได้รับ

| ฟิลด์ | ชนิดข้อมูล | คำอธิบาย | ตัวอย่าง |
|-------|-----------|---------|---------|
| `description` | `string` | คำอธิบาย API | "ข้อมูลจาก TAT Data API..." |
| `base_url` | `string` | Base URL ของ API | "https://tatdataapi.io/api/v2" |
| `authentication.method` | `string` | วิธีการ Authentication | "X-API-Key header" |
| `authentication.language` | `string` | ภาษา (ใช้ Accept-Language header) | "Accept-Language header (th/en)" |
| `nan_province_id` | `number` | รหัสจังหวัดน่านในระบบ TAT | 108 |
| `endpoints.events` | `object` | รายละเอียด endpoint events | `{url: "/events", params: "..."}` |
| `endpoints.places` | `object` | รายละเอียด endpoint places | `{url: "/places", params: "..."}` |
| `endpoints.routes` | `object` | รายละเอียด endpoint routes | `{url: "/routes", params: "..."}` |
| `endpoints.articles` | `object` | รายละเอียด endpoint articles | `{url: "/articles", params: "..."}` |

---

## 12. tat_api_events

ข้อมูลกิจกรรม/อีเวนท์ในจังหวัดน่านจาก TAT Data API (ดึงจาก API จริง)

| ฟิลด์ | ชนิดข้อมูล | คำอธิบาย | ตัวอย่าง |
|-------|-----------|---------|---------|
| `event_id` | `number` | รหัสกิจกรรมจาก TAT | 36562 |
| `name_th` | `string` | ชื่อกิจกรรมภาษาไทย | "น่าน เมาเท่น เทรล 2026" |
| `slug` | `string` | URL slug | "น่าน-เมาเท่น-เทรล-2026" |
| `full_url` | `string` | URL เต็มบน tourismthailand.org | "https://thai.tourismthailand.org/Events-and-Festivals/..." |
| `start_date` | `string` (ISO date) | วันที่เริ่มต้น (UTC) | "2026-10-09T17:00:00.000Z" |
| `end_date` | `string` (ISO date) | วันที่สิ้นสุด (UTC) | "2026-10-10T17:00:00.000Z" |
| `latitude` | `number \| null` | พิกัดละติจูด | 18.2934281 |
| `longitude` | `number \| null` | พิกัดลองจิจูด | 100.484447 |
| `categories` | `array<string>` | หมวดหมู่ของกิจกรรม | `["เทศกาลสุดสร้างสรรค์"]` |
| `introduction` | `string \| null` | คำอธิบายสั้น | "โรงเรียนประกิตเวชศักดิ์ อ.นาน้อย จ.น่าน" |
| `contact_phones` | `array<string>` | เบอร์โทรศัพท์ติดต่อ | `["089 749 1949"]` |
| `contact_emails` | `array<string>` | อีเมลติดต่อ | `["NanMountainTrail@gmail.com"]` |
| `registration_urls` | `array<string>` | URL สำหรับลงทะเบียน | `["https://www.regis.run/event/nmt2026"]` |
| `thumbnail_url` | `string` | URL รูปภาพ thumbnail | "https://dmc.tatdataapi.io/assets/..." |
| `mobile_image_urls` | `array<string>` | รูปภาพสำหรับมือถือ | `["https://dmc.tatdataapi.io/assets/..."]` |
| `desktop_image_urls` | `array<string>` | รูปภาพสำหรับเดสก์ท็อป | `["https://dmc.tatdataapi.io/assets/..."]` |
| `province_id` | `number` | รหัสจังหวัด | 108 |
| `province_name` | `string` | ชื่อจังหวัด | "น่าน" |

### ตัวอย่างกิจกรรมสำคัญจาก API

| event_id | กิจกรรม | ช่วงเวลา |
|----------|---------|---------|
| 36562 | น่าน เมาเท่น เทรล 2026 | 10-11 ต.ค. 2026 |
| 34693 | ประเพณีแข่งเรือจังหวัดน่าน ชิงถ้วยพระราชทานฯ 2568 | 18-19 ก.ย. 2568 |
| 33653 | ประเพณีแข่งเรือจังหวัดน่าน 2568 | 18 ส.ค. - 6 ก.ย. 2568 |
| 33654 | เสน่หา มนตรา น่านนครา | 6 มิ.ย. 2568 |
| 33191 | สรงน้ำพระ บูชาตุง ข่วงสะหลี ปี๋ใหม่เมืองน่าน | 11-16 เม.ย. 2568 |

---

## 13. tat_api_places

ข้อมูลสถานที่ท่องเที่ยวในจังหวัดน่านจาก TAT Data API

| ฟิลด์ | ชนิดข้อมูล | คำอธิบาย | ตัวอย่าง |
|-------|-----------|---------|---------|
| `place_id` | `string` | รหัสสถานที่จาก TAT | "18774" |
| `name_th` | `string` | ชื่อสถานที่ภาษาไทย | "อุทยานแห่งชาติแม่จริม" |
| `introduction` | `string \| null` | คำแนะนำสั้น | null |
| `category` | `string` | หมวดหมู่สถานที่ | "สถานที่ท่องเที่ยว" |
| `latitude` | `string \| null` | พิกัดละติจูด | "18.60254" |
| `longitude` | `string \| null` | พิกัดลองจิจูด | "100.98026" |
| `thumbnail_url` | `string \| array` | URL รูปภาพ (string หรือ array) | "https://dmc.tatdataapi.io/assets/..." |
| `detail_summary` | `string` | รายละเอียดสถานที่ | "แหล่งเรียนรู้..." |
| `detail_images` | `array<string>` | รูปภาพเพิ่มเติม | `["https://dmc.tatdataapi.io/assets/..."]` |
| `address` | `string \| null` | ที่อยู่ | null |
| `district` | `string` | อำเภอ | "แม่จริม" |
| `sub_district` | `string` | ตำบล | "น้ำปาย" |
| `postcode` | `string` | รหัสไปรษณีย์ | "55170" |
| `province_id` | `number \| null` | รหัสจังหวัด | 108 |
| `province_name` | `string` | ชื่อจังหวัด | "น่าน" |
| `tags` | `array<string>` | แท็ก | `["อุทยานแห่งชาติแม่จริม", "น่าน", ...]` |
| `status` | `string` | สถานะ | "approved" |

---

## 14. tat_api_routes

เส้นทางท่องเที่ยวที่ผ่านจังหวัดน่านจาก TAT Data API

| ฟิลด์ | ชนิดข้อมูล | คำอธิบาย | ตัวอย่าง |
|-------|-----------|---------|---------|
| `route_id` | `number` | รหัสเส้นทาง | 57 |
| `name_th` | `string` | ชื่อเส้นทางภาษาไทย | "3 วัน 2 คืน ชวนเธอมาหลงรัก \"น่าน\"" |
| `introduction` | `string` | คำอธิบายเส้นทาง | "เส้นทางท่องเที่ยว 3 วัน 2 คืน : น่าน" |
| `number_of_days` | `number` | จำนวนวัน | 3 |
| `thumbnail_url` | `string` | URL รูปภาพ | "https://dmc.tatdataapi.io/assets/..." |
| `provinces_with_days` | `array<object>` | จังหวัดและวันที่แวะ | `[{province: "น่าน", day: 1}]` |
| `regions` | `array<string>` | ภาคที่ผ่าน | `["ภาคเหนือ"]` |
| `place_image_urls` | `array<string>` | รูปภาพสถานที่ในเส้นทาง | `["https://dmc.tatdataapi.io/assets/..."]` |

### เส้นทางท่องเที่ยวที่ผ่านน่าน

| route_id | ชื่อ | จำนวนวัน |
|----------|-----|---------|
| 57 | 3 วัน 2 คืน ชวนเธอมาหลงรัก "น่าน" | 3 วัน |
| 68 | น่าน - แพร่ - เชียงราย - แม่ฮ่องสอน | 4 วัน |
| 54 | น่าน - แพร่ | 2 วัน |

---

## 15. tat_api_articles

บทความเกี่ยวกับจังหวัดน่านจาก TAT Data API

| ฟิลด์ | ชนิดข้อมูล | คำอธิบาย | ตัวอย่าง |
|-------|-----------|---------|---------|
| `article_id` | `string` | รหัสบทความ | "227" |
| `title_th` | `string` | ชื่อบทความภาษาไทย | "รีวิวเที่ยว พะเยา-น่าน 2 วัน 1 คืน" |
| `slug` | `string` | URL slug | "รีวิวเที่ยว-พะเยา-น่าน-2-วัน-1-คืน..." |
| `type` | `string` | ประเภทบทความ | "See & Do" |
| `type_id` | `string` | รหัสประเภท | "3" |
| `thumbnail_url` | `string` | URL รูปภาพ | "https://dmc.tatdataapi.io/assets/..." |
| `updated_at` | `string` (ISO date) | วันที่อัปเดตล่าสุด | "2025-02-03T14:06:50.663Z" |
| `created_at` | `string` (ISO date) | วันที่สร้าง | "2025-02-03T14:06:50.663Z" |

---

## 16. Usage Notes (วิธีการใช้ TAT API Data)

1. **Authentication**: ส่ง API key ใน header `X-API-Key` และภาษาใน `Accept-Language` (`th` หรือ `en`)
2. **API Key**: `Y94v9EU4ppWYAsuE6N8EKQX6SVLpXi8l`
3. **Base URL**: `https://tatdataapi.io/api/v2`
4. **Nan province ID**: `108` (ใช้ใน query parameter `provinceId=108`)
5. **Keyword search**: ใช้ keyword `"น่าน"` หรือ `"Nan"` ค้นหาข้อมูลที่เกี่ยวข้อง
6. **ข้อจำกัด**: 
   - endpoint `/places/provinceId` ไม่ filter ตามจังหวัด ต้องใช้ keyword search แทน
   - API ไม่มีข้อมูล wellness/flower โดยตรง ต้อง cross-reference กับ dataset
7. **Endpoint summary**:
   - `GET /events?provinceId=108` - กิจกรรมในน่าน
   - `GET /events/{id}` - รายละเอียดกิจกรรม
   - `GET /places?keyword=น่าน` - สถานที่ในน่าน
   - `GET /routes?keyword=น่าน` - เส้นทางท่องเที่ยวผ่านน่าน
   - `GET /articles?keyword=น่าน` - บทความเกี่ยวกับน่าน

---

## 17. หมายเหตุ (Notes)

1. **ฟิลด์ที่เป็น optional** จะมีเครื่องหมาย (optional) กำกับ อาจเป็น `null` หรือไม่มีในบาง record
2. **ข้อมูลภาษาไทย** เป็น primary ส่วนภาษาอังกฤษเป็น secondary สำหรับรองรับ multilingual
3. **photography_score** มีค่า 1-10 สำหรับใช้จัดอันดับความน่าสนใจของภาพถ่าย
4. **knowledge_graph_tags** ใช้สำหรับสร้าง Node ใน Graph Database (Neo4j) เพื่อทำ Recommendation
5. ฟิลด์ `fragrance_family` และ `element` เชื่อมโยงกับข้อมูลจาก `Track2_Experience_Wellness_Finder.md`
