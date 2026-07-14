import React, { useState, useMemo } from "react";
import { Calendar, Clock, Sparkles, RefreshCw, Send, ChevronRight, Leaf, ShieldAlert } from "lucide-react";
import { marked } from "marked";
import { useLanguage } from "./i18n/LanguageContext";

interface MonthlyData {
  monthNum: number;
  monthNameKey: string;
  avgTemp: string;
  touristLevel: "Low" | "High";
  flowers: string[];
  festivals: string[];
  wellnessTip: string; // translation key
}

const YEAR_TIMELINE: MonthlyData[] = [
  { monthNum: 1, monthNameKey: "month.1", avgTemp: "15-25°C", touristLevel: "High", flowers: ["เสี้ยวดอกขาว", "บัวตอง", "เอื้องกล้วยไม้ป่า", "พุดพิชญา", "ชวนชม"], festivals: ["ปีใหม่ม้ง"], wellnessTip: "wellness.tip.1" },
  { monthNum: 2, monthNameKey: "month.2", avgTemp: "16-28°C", touristLevel: "High", flowers: ["ทองกวาวแสด", "เสี้ยวดอกขาว", "ชงโคป่า", "หางนกยูงไทย", "กุหลาบพันปี"], festivals: ["ประเพณีดอกไม้พันดวงไทลื้อ"], wellnessTip: "wellness.tip.2" },
  { monthNum: 3, monthNameKey: "month.3", avgTemp: "20-33°C", touristLevel: "High", flowers: ["ทองกวาวส้ม", "เสี้ยวดอกขาว", "อินทนิล", "แก้ว", "ฟ้าประดิษฐ์"], festivals: ["หกเป็งนมัสการพระธาตุแช่แห้ง"], wellnessTip: "wellness.tip.3" },
  { monthNum: 4, monthNameKey: "month.4", avgTemp: "23-36°C", touristLevel: "Low", flowers: ["ดอกไม้ป่า", "ดอกมะลิสด", "พุดซ้อน", "บานบุรี", "เฟื่องฟ้า"], festivals: ["สงกรานต์ล้านนา", "เลี้ยงผีขุนน้ำต้นน้ำน่าน"], wellnessTip: "wellness.tip.4" },
  { monthNum: 5, monthNameKey: "month.5", avgTemp: "24-34°C", touristLevel: "Low", flowers: ["บัวหลวงขาว", "พุดซ้อนหอม", "กระดังงา", "ลั่นทมขาว", "มณฑา"], festivals: ["แปดเป็งจอมแจ้ง", "ไหว้พระธาตุเขาน้อย"], wellnessTip: "wellness.tip.5" },
  { monthNum: 6, monthNameKey: "month.6", avgTemp: "24-33°C", touristLevel: "Low", flowers: ["บัวหลวงชมพู", "กระดังงาสยาม", "บัวสาย", "อุบลชาติ", "กาหลง"], festivals: ["เวิร์กชอปสุมยาสมุนไพรป่าเกี๋ยน"], wellnessTip: "wellness.tip.6" },
  { monthNum: 7, monthNameKey: "month.7", avgTemp: "23-32°C", touristLevel: "Low", flowers: ["บัวหลวงฝักอ่อน", "ลีลาวดีขาว", "บัวผัน", "ดอกเข็ม", "ชบา"], festivals: ["แห่เทียนพรรษาข่วงน่าน"], wellnessTip: "wellness.tip.7" },
  { monthNum: 8, monthNameKey: "month.8", avgTemp: "23-32°C", touristLevel: "Low", flowers: ["บัวหลวงเม็ดนวล", "ไพลสมุนไพรร้อน", "ขมิ้นชัน", "ว่านกั๊กจือ", "ดาหลา"], festivals: ["เวิร์กชอปบ่อสวกพอกข้อเข่าดินเผา"], wellnessTip: "wellness.tip.8" },
  { monthNum: 9, monthNameKey: "month.9", avgTemp: "23-31°C", touristLevel: "High", flowers: ["ดาวเรืองทอง", "มะลิหอม", "พุทธรักษา", "โกสน", "บานเช้า"], festivals: ["ตานก๋วยสลากหลวง", "แข่งเรือยาวเปิดสนามน่าน"], wellnessTip: "wellness.tip.9" },
  { monthNum: 10, monthNameKey: "month.10", avgTemp: "22-30°C", touristLevel: "High", flowers: ["เสี้ยวดอกขาว", "บานไม่รู้โรย", "ดอกรัก", "รางแดง", "กาฬพฤกษ์"], festivals: ["แข่งเรือยาวชิงถ้วยพระราชทานฯ"], wellnessTip: "wellness.tip.10" },
  { monthNum: 11, monthNameKey: "month.11", avgTemp: "18-28°C", touristLevel: "High", flowers: ["บัวตองเหลือง", "ดาวเรืองตระการ", "ทานตะวัน", "บัวดิน", "ขจร"], festivals: ["ยี่เป็งลอยประทีปโคมน่าน"], wellnessTip: "wellness.tip.11" },
  { monthNum: 12, monthNameKey: "month.12", avgTemp: "15-25°C", touristLevel: "High", flowers: ["บัวตอง", "เสี้ยวดอกขาวป่า", "เอื้องคำดอย", "คริสต์มาส", "ปูยอดดอย", "กุหลาบขาว"], festivals: ["งานท่องเที่ยวประจำปีของดี 15 อำเภอ"], wellnessTip: "wellness.tip.12" }
];

export default function BloomingCalendar() {
  const [selectedMonth, setSelectedMonth] = useState<MonthlyData>(YEAR_TIMELINE[6]);
  const { t } = useLanguage();

  const monthName = t(selectedMonth.monthNameKey);

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
      setItinerary(t("calendar.ai.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Monthly Timeline Horizontal Track */}
      <div className="space-y-3">
        <span className="text-[11px] font-display font-semibold uppercase tracking-wider text-[#819177] block">
          {t("calendar.timeline.title")}
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
              <span className="text-[11px] font-display mt-1.5 leading-none block">{t(m.monthNameKey)}</span>
              {m.touristLevel === "Low" && (
                <span className="text-[8px] mt-1 bg-emerald-950 text-emerald-400 border border-emerald-800/40 rounded px-1.5 py-0.5 leading-none">
                  {t("calendar.lowSeason.badge")}
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
            <h4 className="font-serif italic text-2xl text-[#f2f4f1]">{monthName}</h4>
            <span className="text-xs bg-[#0d0f0c] border border-[#2a2e28] text-[#c9b097] px-3 py-1 rounded-full font-mono">
              {selectedMonth.avgTemp}
            </span>
          </div>

          <div className="space-y-3 text-xs text-[#819177]">
            {selectedMonth.touristLevel === "Low" ? (
              <div className="bg-emerald-950/40 border border-emerald-900/30 rounded-2xl p-4 text-emerald-400 space-y-1">
                <span className="font-display font-semibold block text-xs flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4" />
                  {t("calendar.lowSeason.title")}
                </span>
                <p className="text-[11px] leading-relaxed text-emerald-300">
                  {t("calendar.lowSeason.desc")}
                </p>
              </div>
            ) : (
              <div className="bg-amber-950/20 border border-amber-900/30 rounded-2xl p-4 text-amber-400 space-y-1">
                <span className="font-display font-semibold block text-xs">{t("calendar.peakSeason.title")}</span>
                <p className="text-[11px] leading-relaxed text-amber-300">
                  {t("calendar.peakSeason.desc")}
                </p>
              </div>
            )}

            <div>
              <span className="font-display font-semibold uppercase text-[10px] tracking-wider block text-[#f2f4f1]">{t("calendar.flowers.label")}</span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {selectedMonth.flowers.map((fl, idx) => (
                  <span key={idx} className="text-[10px] px-2.5 py-0.5 rounded-md bg-[#0d0f0c] border border-[#2a2e28] text-[#c9b097]">
                    {fl}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-display font-semibold uppercase text-[10px] tracking-wider block text-[#f2f4f1]">{t("calendar.festivals.label")}</span>
              <p className="text-[11px] text-white mt-1 font-medium">
                {selectedMonth.festivals.length > 0 ? selectedMonth.festivals.join(", ") : t("calendar.festivals.empty")}
              </p>
            </div>

            <div className="pt-3 border-t border-[#2a2e28]/40">
              <span className="font-display font-semibold uppercase text-[10px] tracking-wider block text-[#f2f4f1]">{t("calendar.tip.label")}</span>
              <p className="text-[11px] leading-relaxed mt-1 italic">
                "{t(selectedMonth.wellnessTip)}"
              </p>
            </div>
          </div>
        </div>

        {/* Right: AI Travel Itinerary Generator with Typhoon AI */}
        <div className="md:col-span-8 bg-[#161a15] border border-[#2a2e28] rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-[#c9b097] animate-pulse" />
            <h4 className="font-serif italic text-2xl text-[#f2f4f1]">{t("calendar.ai.title")}</h4>
          </div>

          {!itinerary && !loading && (
            <form onSubmit={handleGenerate} className="space-y-6">
              <p className="text-xs text-[#819177] leading-relaxed">
                {t("calendar.ai.desc", { month: monthName })}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Zodiac Element Input */}
                <div>
                  <label className="block text-[10px] font-mono text-[#819177] uppercase tracking-wider mb-1.5">
                    {t("calendar.ai.elementLabel")}
                  </label>
                  <select
                    value={zodiacElement}
                    onChange={(e) => setZodiacElement(e.target.value)}
                    className="w-full bg-[#0d0f0c] border border-[#2a2e28] rounded-xl px-4 py-2.5 text-xs text-[#f2f4f1] focus:outline-hidden focus:border-[#c9b097]"
                  >
                    <option value="Earth">{t("element.Earth")}</option>
                    <option value="Water">{t("element.Water")}</option>
                    <option value="Wind">{t("element.Wind")}</option>
                    <option value="Fire">{t("element.Fire")}</option>
                  </select>
                </div>

                {/* Mood Input */}
                <div>
                  <label className="block text-[10px] font-mono text-[#819177] uppercase tracking-wider mb-1.5">
                    {t("calendar.ai.moodLabel")}
                  </label>
                  <select
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="w-full bg-[#0d0f0c] border border-[#2a2e28] rounded-xl px-4 py-2.5 text-xs text-[#f2f4f1] focus:outline-hidden focus:border-[#c9b097]"
                  >
                    <option value="stressed">{t("mood.stressed")}</option>
                    <option value="tired">{t("mood.tired")}</option>
                    <option value="anxious">{t("mood.anxious")}</option>
                    <option value="sad">{t("mood.sad")}</option>
                    <option value="peaceful">{t("mood.peaceful")}</option>
                  </select>
                </div>
              </div>

              {/* Interests checklist */}
              <div>
                <label className="block text-[10px] font-mono text-[#819177] uppercase tracking-wider mb-2">
                  {t("calendar.ai.interestsLabel")}
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "nature", labelKey: "interest.nature" },
                    { id: "spiritual", labelKey: "interest.spiritual" },
                    { id: "handicraft", labelKey: "interest.handicraft" },
                    { id: "gastronomy", labelKey: "interest.gastronomy" }
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
                      {t(i.labelKey)}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#c9b097] text-[#0d0f0c] hover:bg-[#b09a82] font-display font-semibold text-xs tracking-wider uppercase text-center flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <span>{t("calendar.ai.submit")}</span>
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
                  {t("calendar.ai.loading.title")}
                </h5>
                <p className="text-[10px] text-[#819177] max-w-xs mx-auto">
                  {t("calendar.ai.loading.desc")}
                </p>
              </div>
            </div>
          )}

          {/* Render Itinerary Results */}
          {itinerary && !loading && (
            <div className="space-y-4 animate-fade-in">
              <div
                className="prose prose-invert prose-sm max-w-none overflow-y-auto bg-[#0d0f0c] border border-[#2a2e28] rounded-2xl p-5 leading-relaxed font-sans space-y-4 scrollbar-thin max-h-[500px] [&_h3]:text-[#c9b097] [&_h3]:font-serif [&_h3]:italic [&_h3]:text-lg [&_h4]:text-[#f2f4f1] [&_h4]:font-display [&_h4]:text-sm [&_strong]:text-[#f2f4f1] [&_li]:text-[#819177] [&_p]:text-[#819177] [&_blockquote]:border-l-[#c9b097] [&_blockquote]:text-[#a0a89a] [&_hr]:border-[#2a2e28] [&_table]:w-full [&_th]:text-[#c9b097] [&_th]:text-xs [&_th]:font-display [&_th]:uppercase [&_th]:tracking-wider [&_td]:text-xs [&_td]:text-[#819177] [&_td]:border [&_td]:border-[#2a2e28] [&_td]:p-2 [&_th]:border [&_th]:border-[#2a2e28] [&_th]:p-2"
                dangerouslySetInnerHTML={{ __html: marked.parse(itinerary) }}
              />

              <div className="flex gap-2">
                <button
                  onClick={() => setItinerary(null)}
                  className="flex-1 py-3 rounded-full border border-[#2a2e28] text-xs font-display font-semibold uppercase tracking-wider text-center text-[#819177] hover:text-[#f2f4f1]"
                >
                  {t("calendar.ai.reset")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
