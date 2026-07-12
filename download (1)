import React, { useState } from "react";
import { Calendar, Clock, Sparkles, RefreshCw, Send, ChevronRight, Leaf, ShieldAlert } from "lucide-react";

interface MonthlyData {
  monthNum: number;
  monthName: string;
  avgTemp: string;
  touristLevel: "Low" | "High";
  flowers: string[];
  festivals: string[];
  wellnessTip: string;
}

const YEAR_TIMELINE: MonthlyData[] = [
  { monthNum: 1, monthName: "มกราคม", avgTemp: "15-25°C", touristLevel: "High", flowers: ["เสี้ยวดอกขาว", "บัวตอง", "เอื้องกล้วยไม้ป่า"], festivals: ["ปีใหม่ม้ง"], wellnessTip: "อากาศหนาวจัดดอยสูง เหมาะกับการแช่เท้าสมุนไพรร้อนกระตุ้นระบบประสาทล้า" },
  { monthNum: 2, monthName: "กุมภาพันธ์", avgTemp: "16-28°C", touristLevel: "High", flowers: ["ทองกวาวแสด", "เสี้ยวดอกขาว"], festivals: ["ประเพณีดอกไม้พันดวงไทลื้อ"], wellnessTip: "ชมทัศนียภาพกิ่งก้านทองกวาวผลัดใบเบ่งบาน ดื่มชาเกสรบัวหลวงรสเย็นบำรุงชีพจร" },
  { monthNum: 3, monthName: "มีนาคม", avgTemp: "20-33°C", touristLevel: "High", flowers: ["ทองกวาวส้ม", "เสี้ยวดอกขาว"], festivals: ["หกเป็งนมัสการพระธาตุแช่แห้ง"], wellnessTip: "ขึ้นไหว้พระธาตุแช่แห้งยามเช้าตรู่เพื่อหลบไอแดดบ่าย นั่งสมาธิกำหนดลมหายใจคลายเครียด" },
  { monthNum: 4, monthName: "เมษายน", avgTemp: "23-36°C", touristLevel: "Low", flowers: ["ดอกไม้ป่า", "ดอกมะลิสด"], festivals: ["สงกรานต์ล้านนา", "เลี้ยงผีขุนน้ำต้นน้ำน่าน"], wellnessTip: "แช่น้ำสรงลอยดอกมะลิบำบัดระบายพิษร้อน ชิมชาใบหม่อนรสอ่อนช่วยขับเหงื่อสารพิษ" },
  { monthNum: 5, monthName: "พฤษภาคม", avgTemp: "24-34°C", touristLevel: "Low", flowers: ["บัวหลวงขาว", "พุดซ้อนหอม"], festivals: ["แปดเป็งจอมแจ้ง", "ไหว้พระธาตุเขาน้อย"], wellnessTip: "สายลมมรสุมพัดโบก สูดไออโรมาพุดซ้อนเพื่อจัดอารมณ์บวกลดความวิงเวียนสมอง" },
  { monthNum: 6, monthName: "มิถุนายน", avgTemp: "24-33°C", touristLevel: "Low", flowers: ["บัวหลวงชมพู", "กระดังงาสยาม"], festivals: ["เวิร์กชอปสุมยาสมุนไพรป่าเกี๋ยน"], wellnessTip: "หน้าฝนสีเขียวขจี เหมาะกับการทำสปาขัดผิวด้วยเกลือสินเธาว์ผสมเกสรมะลิคลายกล้ามเนื้อ" },
  { monthNum: 7, monthName: "กรกฎาคม", avgTemp: "23-32°C", touristLevel: "Low", flowers: ["บัวหลวงฝักอ่อน", "ลีลาวดีขาว"], festivals: ["แห่เทียนพรรษาข่วงน่าน"], wellnessTip: "ความชื้นฝนป่าสูง แนะนำการสุมยารมไอดินเพื่อล้างปอด ขจัดเสมหะและภูมิแพ้อากาศ" },
  { monthNum: 8, monthName: "สิงหาคม", avgTemp: "23-32°C", touristLevel: "Low", flowers: ["บัวหลวงเม็ดนวล", "ไพลสมุนไพรร้อน"], festivals: ["เวิร์กชอปบ่อสวกพอกข้อเข่าดินเผา"], wellnessTip: "หน้าฝนหนาแน่น เหมาะกับกิจกรรมในร่ม แช่เท้าบำบัดความล้า ยืดหลังฟ้อนแง้นไทลื้อ" },
  { monthNum: 9, monthName: "กันยายน", avgTemp: "23-31°C", touristLevel: "High", flowers: ["ดาวเรืองทอง", "มะลิหอม"], festivals: ["ตานก๋วยสลากหลวง", "แข่งเรือยาวเปิดสนามน่าน"], wellnessTip: "ร่วมประเพณีทำบุญอุทิศบรรพบุรุษ บำบัดสติด้วยการสานก๋วยไผ่ สร้างอารมณ์สงบนิ่งละมุน" },
  { monthNum: 10, monthName: "ตุลาคม", avgTemp: "22-30°C", touristLevel: "High", flowers: ["เสี้ยวดอกขาว", "บานไม่รู้โรย"], festivals: ["แข่งเรือยาวชิงถ้วยพระราชทานฯ"], wellnessTip: "ฤดูกาลเปลี่ยนผ่านปลายฝนต้นหนาว ดื่มชาเบญจเกสรร้อนช่วยปรับระบบย่อยอาหารให้เสถียร" },
  { monthNum: 11, monthName: "พฤศจิกายน", avgTemp: "18-28°C", touristLevel: "High", flowers: ["บัวตองเหลือง", "ดาวเรืองตระการ"], festivals: ["ยี่เป็งลอยประทีปโคมน่าน"], wellnessTip: "พิธีลอยเคราะห์ชำระล้างจิตใจ สูดดมไอหอมกุหลาบและกระดังงาปรับความรักความสัมพันธ์" },
  { monthNum: 12, monthName: "ธันวาคม", avgTemp: "15-25°C", touristLevel: "High", flowers: ["บัวตอง", "เสี้ยวดอกขาวป่า", "เอื้องคำดอย"], festivals: ["งานท่องเที่ยวประจำปีของดี 15 อำเภอ"], wellnessTip: "หนาวจัดต่ำสุดของปี นั่งล้อมวงผิงไฟ Visualization Yoga กำหนดลมหายใจร้อนขับหนาว" }
];

export default function BloomingCalendar() {
  const [selectedMonth, setSelectedMonth] = useState<MonthlyData>(YEAR_TIMELINE[6]); // default to July (Low Season)
  
  // AI Form States
  const [zodiacElement, setZodiacElement] = useState("Water");
  const [mood, setMood] = useState("tired");
  const [interests, setInterests] = useState<string[]>(["nature", "spiritual"]);
  
  const [itinerary, setItinerary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleInterest = (id: string) => {
    setInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setItinerary(null);

    try {
      const res = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          month: selectedMonth.monthNum,
          zodiacElement,
          interests,
          mood
        })
      });
      const data = await res.json();
      setItinerary(data.itinerary);
    } catch (err) {
      console.error(err);
      setItinerary(`
        ### 🌿 แผนอโรมาสุคนธบำบัดล้านนาประจำตัวคุณ (ระบบจำลองภายนอก)
        ต้อนรับคุณผู้มีธาตุเจ้าเรือน **${zodiacElement}** เข้าสู่น่านในเดือน **${selectedMonth.monthName}**
        
        **แผนการบำบัดรายวัน:**
        - **วันแรก:** เยือนศูนย์วิสาหกิจ บ่อสวกโมเดล ทำหัตถการสุมยาเพื่อกระตุ้นจิตวิญญาณ ดื่มชาออร์แกนิก
        - **วันที่สอง:** เดินจงกรมทำสมาธิในคุ้มหลวงน่าน ถ่ายภาพ Minimalist ซุ้มต้นลีลาวดีผลิใบระเรื่อ
        - **วันที่สาม:** บำบัดกล้ามเนื้อที่ตึงเครียดด้วยน้ำมันสปากลั่นร้อนผสมกระดังงาปักษ์ใต้ที่หมู่บ้านน้ำเกี๋ยน
      `);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Monthly Timeline Horizontal Track */}
      <div className="space-y-3">
        <span className="text-[11px] font-display font-semibold uppercase tracking-wider text-[#819177] block">
          ปฏิทินพฤกษาบานรายเดือนจังหวัดน่าน (Select Month to Explore)
        </span>
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-thin">
          {YEAR_TIMELINE.map((m) => (
            <button
              key={m.monthNum}
              onClick={() => setSelectedMonth(m)}
              className={`px-4 py-3 rounded-2xl border text-center min-w-[90px] transition-all flex flex-col items-center shrink-0 ${
                selectedMonth.monthNum === m.monthNum
                  ? "bg-[#c9b097] border-[#c9b097] text-[#0d0f0c] shadow-lg font-bold"
                  : "bg-[#161a15] border-[#2a2e28] text-[#819177] hover:border-[#819177]/40"
              }`}
            >
              <span className="text-[10px] font-mono leading-none block">M_{m.monthNum.toString().padStart(2, "0")}</span>
              <span className="text-[11px] font-display mt-1.5 leading-none block">{m.monthName}</span>
              {m.touristLevel === "Low" && (
                <span className="text-[8px] mt-1 bg-emerald-950 text-emerald-400 border border-emerald-800/40 rounded px-1.5 py-0.5 leading-none">
                  LOW SEASON
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Interactive Month Display & Detail Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left: Monthly Snapshot */}
        <div className="md:col-span-4 bg-[#161a15] border border-[#2a2e28] rounded-3xl p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-[#2a2e28]/60 pb-3">
            <h4 className="font-serif italic text-2xl text-[#f2f4f1]">{selectedMonth.monthName}</h4>
            <span className="text-xs bg-[#0d0f0c] border border-[#2a2e28] text-[#c9b097] px-3 py-1 rounded-full font-mono">
              {selectedMonth.avgTemp}
            </span>
          </div>

          <div className="space-y-3 text-xs text-[#819177]">
            {selectedMonth.touristLevel === "Low" ? (
              <div className="bg-emerald-950/40 border border-emerald-900/30 rounded-2xl p-4 text-emerald-400 space-y-1">
                <span className="font-display font-semibold block text-xs flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4" />
                  แคมเปญกรีนน่าน (Low-Season Campaign)
                </span>
                <p className="text-[11px] leading-relaxed text-emerald-300">
                  นักท่องเที่ยวหนาแน่นต่ำ เหมาะกับการมาทวงคืนความสงบ มีโปรโมชันส่วนลด Flourish Pass บ่อสวกกว่า 40% และวิลล่าริมน้ำสะปันสุดพิเศษ
                </p>
              </div>
            ) : (
              <div className="bg-amber-950/20 border border-amber-900/30 rounded-2xl p-4 text-amber-400 space-y-1">
                <span className="font-display font-semibold block text-xs">ไฮซีซั่นน่านสะพรั่ง (Peak Season)</span>
                <p className="text-[11px] leading-relaxed text-amber-300">
                  อากาศหนาวเย็นสบาย สายหมอกหนายอดดอย แนะนำให้จองโปรแกรมทำสปาบำบัดล่วงหน้าเพื่อเลี่ยงความวุ่นวาย
                </p>
              </div>
            )}

            <div>
              <span className="font-display font-semibold uppercase text-[10px] tracking-wider block text-[#f2f4f1]">บุปผาบานหลัก (Flowers in Bloom):</span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {selectedMonth.flowers.map((fl, idx) => (
                  <span key={idx} className="text-[10px] px-2.5 py-0.5 rounded-md bg-[#0d0f0c] border border-[#2a2e28] text-[#c9b097]">
                    {fl}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-display font-semibold uppercase text-[10px] tracking-wider block text-[#f2f4f1]">ประเพณีสำคัญ (Festivals & Events):</span>
              <p className="text-[11px] text-white mt-1 font-medium">
                {selectedMonth.festivals.join(", ") || "ไม่มีเทศกาลหลัก (เหมาะแก่การล้างพิษจิตใจอย่างสงบ)"}
              </p>
            </div>

            <div className="pt-3 border-t border-[#2a2e28]/40">
              <span className="font-display font-semibold uppercase text-[10px] tracking-wider block text-[#f2f4f1]">ข้อเสนอสุคนธบำบัด (Therapist Tip):</span>
              <p className="text-[11px] leading-relaxed mt-1 italic">
                "{selectedMonth.wellnessTip}"
              </p>
            </div>
          </div>
        </div>

        {/* Right: AI Travel Itinerary Generator with Gemini */}
        <div className="md:col-span-8 bg-[#161a15] border border-[#2a2e28] rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-[#c9b097] animate-pulse" />
            <h4 className="font-serif italic text-2xl text-[#f2f4f1]">ผู้ออกแบบแผนเดินทางอโรมา AI</h4>
          </div>

          {!itinerary && !loading && (
            <form onSubmit={handleGenerate} className="space-y-6">
              <p className="text-xs text-[#819177] leading-relaxed">
                โมเดลปัญญาประดิษฐ์และฐานข้อมูลภูมิปัญญาล้านนาร่วมกันวิเคราะห์พฤติกรรม สภาพดาราศาสตร์ประจำราศี และสภาพอากาศในเดือน **{selectedMonth.monthName}** เพื่อสร้างแผนท่องเที่ยวบำบัด 3 วัน 2 คืน
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Zodiac Element Input */}
                <div>
                  <label className="block text-[10px] font-mono text-[#819177] uppercase tracking-wider mb-1.5">
                    ธาตุราศีเจ้าเรือน (Zodiac Element)
                  </label>
                  <select
                    value={zodiacElement}
                    onChange={(e) => setZodiacElement(e.target.value)}
                    className="w-full bg-[#0d0f0c] border border-[#2a2e28] rounded-xl px-4 py-2.5 text-xs text-[#f2f4f1] focus:outline-hidden focus:border-[#c9b097]"
                  >
                    <option value="Earth">ธาตุดิน (พิจิก มังกร พฤษภ)</option>
                    <option value="Water">ธาตุน้ำ (กรกฎ มีน พิจิก)</option>
                    <option value="Wind">ธาตุลม (กุมภ์ มิถุน ตุลย์)</option>
                    <option value="Fire">ธาตุไฟ (เมษ สิงห์ ธนู)</option>
                  </select>
                </div>

                {/* Mood Input */}
                <div>
                  <label className="block text-[10px] font-mono text-[#819177] uppercase tracking-wider mb-1.5">
                    ระดับความล้าทางอารมณ์ของคุณ (Mental State)
                  </label>
                  <select
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="w-full bg-[#0d0f0c] border border-[#2a2e28] rounded-xl px-4 py-2.5 text-xs text-[#f2f4f1] focus:outline-hidden focus:border-[#c9b097]"
                  >
                    <option value="stressed">มีความเครียดสะสมหนักหน่วง</option>
                    <option value="tired">เมื่อยล้าทางกาย ออฟฟิศซินโดรม</option>
                    <option value="anxious">กระวนกระวาย วิตกกังวลใจ</option>
                    <option value="sad">หดหู่ เศร้าใจ ต้องการเสียงธรรมชาติบำบัด</option>
                    <option value="peaceful">ผ่อนคลายดี แต่อยากเติมแรงบันดาลใจสร้างสรรค์</option>
                  </select>
                </div>
              </div>

              {/* Interests checklist */}
              <div>
                <label className="block text-[10px] font-mono text-[#819177] uppercase tracking-wider mb-2">
                  ความสนใจหลักในการท่องเที่ยวบำบัด (Select Interests)
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "nature", label: "🌿 กิจกรรมเดินป่า Forest Bathing" },
                    { id: "spiritual", label: "🧘 สมาธิจิตและกราบพระพุทธบูชา" },
                    { id: "handicraft", label: "🎨 เวิร์กชอปทำผ้าทอย้อมสีธรรมชาติ" },
                    { id: "gastronomy", label: "🍵 ชิมชาวิถีน่านแซนด์บ็อกซ์" }
                  ].map((i) => (
                    <button
                      key={i.id}
                      type="button"
                      onClick={() => toggleInterest(i.id)}
                      className={`py-2 px-3 rounded-full text-[11px] font-display font-medium border transition-all ${
                        interests.includes(i.id)
                          ? "bg-[#c9b097]/15 border-[#c9b097] text-[#c9b097]"
                          : "bg-[#0d0f0c] border-[#2a2e28] text-[#819177] hover:border-[#819177]/40"
                      }`}
                    >
                      {i.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#c9b097] text-[#0d0f0c] hover:bg-[#b09a82] font-display font-semibold text-xs tracking-wider uppercase text-center flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <span>วิเคราะห์ด้วย AI & เจนเนอเรตทริป</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </form>
          )}

          {/* Loading View */}
          {loading && (
            <div className="py-16 text-center space-y-4 animate-pulse">
              <RefreshCw className="h-8 w-8 text-[#c9b097] animate-spin mx-auto" />
              <div className="space-y-1">
                <h5 className="font-display font-semibold text-xs text-[#f2f4f1] tracking-wider uppercase">
                  กำลังต้มกลั่นสารพฤกษาด้วยโมเดล AI...
                </h5>
                <p className="text-[10px] text-[#819177] max-w-xs mx-auto">
                  ระบบเชื่อมต่อ API ของ Tourism Authority (TAT) และ Gemini AI ของคุณอยู่เจ้า กรุณารอสักครู่นะเจ้า
                </p>
              </div>
            </div>
          )}

          {/* Render Itinerary Results */}
          {itinerary && !loading && (
            <div className="space-y-4 animate-fade-in">
              <div className="max-h-[400px] overflow-y-auto bg-[#0d0f0c] border border-[#2a2e28] rounded-2xl p-5 text-xs text-[#819177] leading-relaxed font-sans space-y-4 scrollbar-thin whitespace-pre-line">
                {itinerary}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setItinerary(null)}
                  className="flex-1 py-3 rounded-full border border-[#2a2e28] text-xs font-display font-semibold uppercase tracking-wider text-center text-[#819177] hover:text-[#f2f4f1]"
                >
                  แก้ไขพารามิเตอร์ใหม่
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
