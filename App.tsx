import React, { useState } from "react";
import { MapPin, Camera, Star, Sliders, Info, ShieldCheck } from "lucide-react";

interface Spot {
  id: string;
  name: string;
  district: string;
  lat: number;
  lng: number;
  photoScore: number;
  scent: string;
  bestTime: string;
  description: string;
  imageUrl: string;
}

const NAN_SPOTS: Spot[] = [
  {
    id: "S001",
    name: "ซุ้มต้นลีลาวดี พิพิธภัณฑสถานแห่งชาติน่าน",
    district: "เมืองน่าน",
    lat: 18.77624,
    lng: 100.77064,
    photoScore: 10,
    scent: "ลีลาวดีหวานอบอุ่น (Creamy Plumeria)",
    bestTime: "ช่วงบ่ายแก่ๆ แสงลอดอุโมงค์กิ่งไม้",
    description: "ซุ้มต้นลีลาวดีแผ่กิ่งก้านไขว้เว้าประสานกันเป็นอุโมงค์สีเขียวขรึม มีโบราณสถานสีขาวของคุ้มหลวงเป็นฉากหลัง ถือเป็นไอคอนิคแลนด์มาร์คของการกระซิบรักที่สวยสะดุดตาที่สุดในน่าน",
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "S002",
    name: "ดอยเสมอดาว อุทยานแห่งชาติศรีน่าน",
    district: "นาน้อย",
    lat: 18.36816,
    lng: 100.84013,
    photoScore: 10,
    scent: "ลมหนาวหญ้าภูเขา (Fresh Cold Wind)",
    bestTime: "กลางคืน (ถ่ายทางช้างเผือก) และรุ่งเช้าพระอาทิตย์ขึ้น",
    description: "ลานกางเต็นท์บนยอดภูเขาสูง มองเห็นทิวเขาสลับซับซ้อนและโค้งแม่น้ำน่านเบื้องล่าง ในค่ำคืนที่ท้องฟ้าเปิดประดับด้วยกลุ่มดาวนับล้านดวงดั่งเอื้อมถึง เหมาะกับการจัดจิตวิทยา Digital Detox",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "S003",
    name: "แหล่งเตาเผาและเตาดินเผา บ่อสวก",
    district: "เมืองน่าน",
    lat: 18.75068,
    lng: 100.69830,
    photoScore: 8,
    scent: "ดินเผารมควันใบเมี่ยง (Earthy Clay)",
    bestTime: "ช่วงเช้า มีสายหมอกจางและแสงนวล",
    description: "แหล่งเรียนรู้ทางโบราณคดีเตาเผาเครื่องปั้นดินเผาอายุกว่า 700 ปี ผสานการจัดกิจกรรมพอกเข่าสมุนไพรสดด้วยสมุนไพรพื้นถิ่นสูตรพิเศษ ให้ภาพถ่ายอารมณ์ดั้งเดิมและเชื่อมต่อดิน",
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "S004",
    name: "ทุ่งดอกกระดาษและเอื้อง ดอยภูคา",
    district: "ปัว",
    lat: 19.20056,
    lng: 101.08065,
    photoScore: 9,
    scent: "เสี้ยวดอกขาวพราวชงโค (Soft Bauhinia)",
    bestTime: "ฤดูหนาว (พฤศจิกายน-กุมภาพันธ์)",
    description: "จุดสูงสุดบนเทือกเขาอุทยานแห่งชาติดอยภูคา รายล้อมด้วยสายหมอกสีขาว พรรณไม้หายากดั่งประติมากรรมธรรมชาติ เช่น ต้นเสี้ยวดอกขาวป่าที่ผลิดอกสีขาวสลัดใบสวยบริสุทธิ์เต็มหุบเขา",
    imageUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600"
  }
];

const FILTERS = [
  { id: "f-normal", name: "Original Scent", css: "" },
  { id: "f-vintage", name: "Lanna Nostalgia (ส้มอบอุ่น)", css: "sepia(40%) contrast(110%) saturate(120%) hue-rotate(10deg)" },
  { id: "f-cool", name: "Forest Mist (ฟ้าน้ำหมอก)", css: "contrast(95%) brightness(105%) saturate(80%) hue-rotate(190deg) sepia(10%)" },
  { id: "f-gold", name: "Golden Sunset (ทองอร่าม)", css: "brightness(110%) saturate(140%) sepia(30%) hue-rotate(-15deg)" },
  { id: "f-noir", name: "Earthy Minimal (ดรามาติกขาวดำ)", css: "grayscale(100%) contrast(130%)" }
];

export default function ARSpotMap() {
  const [selectedSpot, setSelectedSpot] = useState<Spot>(NAN_SPOTS[0]);
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);
  const [arActivated, setArActivated] = useState(false);

  return (
    <div className="space-y-8">
      {/* Editorial Scent Spots Description */}
      <div className="border border-[#2a2e28] rounded-3xl bg-[#161a15] p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif italic text-2xl text-[#f2f4f1]">Photography & Scent Spots of Nan</h3>
            <p className="text-xs text-[#819177] mt-1 leading-relaxed">
              แผนที่จุดถ่ายภาพสร้างสรรค์ผสานกลิ่นสุคนธบำบัด ออกแบบสำหรับนักเดินทางที่ชื่นชอบองค์ประกอบศิลป์ แสงพรีเมียม และประเทืองสุขจิตวิญญาณ
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#0d0f0c] px-4 py-2 rounded-full border border-[#2a2e28] text-xs">
            <ShieldCheck className="h-4 w-4 text-[#c9b097]" />
            <span className="text-[#819177]">TAT API Gps Certified 108</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Location Selection list & Stats */}
        <div className="lg:col-span-5 space-y-4">
          <h4 className="font-display font-semibold text-xs tracking-wider uppercase text-[#819177] flex items-center gap-1.5">
            <Sliders className="h-4 w-4 text-[#c9b097]" />
            <span>เลือกจุดแลนด์มาร์คเพื่อวิเคราะห์กลิ่น</span>
          </h4>

          <div className="space-y-2">
            {NAN_SPOTS.map((spot) => (
              <button
                key={spot.id}
                onClick={() => {
                  setSelectedSpot(spot);
                  setArActivated(false);
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                  selectedSpot.id === spot.id
                    ? "bg-[#161a15] border-[#c9b097] shadow-lg"
                    : "bg-[#0d0f0c] border-[#2a2e28] hover:border-[#819177]/30"
                }`}
              >
                <MapPin className={`h-5 w-5 shrink-0 mt-0.5 ${selectedSpot.id === spot.id ? "text-[#c9b097]" : "text-[#819177]"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-[#819177]">{spot.district}</span>
                    <div className="flex items-center gap-0.5 text-[#c9b097] text-[10px] font-medium">
                      <Star className="h-3 w-3 fill-current" />
                      <span>{spot.photoScore}.0</span>
                    </div>
                  </div>
                  <h5 className="font-display font-semibold text-[#f2f4f1] text-xs mt-1 truncate">{spot.name}</h5>
                  <p className="text-[11px] text-[#819177] mt-1 truncate">{spot.scent}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Location Detailed Stats Card */}
          <div className="bg-[#161a15] rounded-3xl p-5 border border-[#2a2e28] space-y-3">
            <h6 className="text-xs font-display font-semibold text-[#f2f4f1]">มิติด้านแสงและพฤกษภูมิสถาปัตย์</h6>
            <p className="text-xs text-[#819177] leading-relaxed">{selectedSpot.description}</p>
            
            <div className="pt-3 border-t border-[#2a2e28] grid grid-cols-2 gap-4 text-[11px]">
              <div>
                <span className="text-[#819177] block">ช่วงเวลาแสงสีทอง (Best Light)</span>
                <span className="text-[#f2f4f1] font-medium mt-0.5 block">{selectedSpot.bestTime}</span>
              </div>
              <div>
                <span className="text-[#819177] block">พิกัดทางภูมิศาสตร์ (GPS)</span>
                <span className="text-[#f2f4f1] font-mono mt-0.5 block">{selectedSpot.lat.toFixed(4)}, {selectedSpot.lng.toFixed(4)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Simulated Camera Viewport with AR Filters */}
        <div className="lg:col-span-7 bg-[#161a15] border border-[#2a2e28] rounded-3xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-display font-semibold text-[#f2f4f1] flex items-center gap-2">
              <Camera className="h-4 w-4 text-[#c9b097]" />
              กล้องจำลองฟิลเตอร์อโรมา (AR Scent-Filter Cam)
            </span>
            <div className="text-[10px] bg-[#0d0f0c] text-[#819177] px-3 py-1 rounded-full border border-[#2a2e28] font-mono">
              REC 1080P // LN_108
            </div>
          </div>

          {/* Camera Canvas Viewport */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-[#2a2e28] shadow-inner group">
            {/* Main Location Image */}
            <img
              src={selectedSpot.imageUrl}
              alt={selectedSpot.name}
              className="w-full h-full object-cover transition-all duration-700"
              style={{ filter: activeFilter.css }}
            />

            {/* Fog overlay for Forest Mist Filter */}
            {activeFilter.id === "f-cool" && (
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/10 via-teal-900/10 to-transparent pointer-events-none mix-blend-color animate-pulse duration-[8000ms]" />
            )}

            {/* Sun flare for Golden Sunset */}
            {activeFilter.id === "f-gold" && (
              <div className="absolute top-4 right-12 w-28 h-28 bg-[#c9b097]/30 rounded-full blur-2xl pointer-events-none mix-blend-screen" />
            )}

            {/* Grid overlay lines (Camera Viewfinder style) */}
            <div className="absolute inset-0 border border-white/5 pointer-events-none grid grid-cols-3 grid-rows-3">
              <div className="border-r border-b border-white/5"></div>
              <div className="border-r border-b border-white/5"></div>
              <div className="border-b border-white/5"></div>
              <div className="border-r border-b border-white/5"></div>
              <div className="border-r border-b border-white/5"></div>
              <div className="border-b border-white/5"></div>
              <div className="border-r border-white/5"></div>
              <div className="border-r border-white/5"></div>
              <div></div>
            </div>

            {/* Scent Info Watermark (looks premium on Instagram) */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-3 text-white flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono text-[#c9b097] uppercase tracking-wider">Nan Flourish Scent-Map</span>
                <h6 className="text-[11px] font-display font-bold truncate max-w-[200px] sm:max-w-xs">{selectedSpot.name}</h6>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[9px] text-[#819177] block font-mono">SCENT MATCH</span>
                <span className="text-[10px] font-medium text-[#c9b097]">{selectedSpot.scent.split(" (")[0]}</span>
              </div>
            </div>

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none text-white text-xs gap-2">
              <Camera className="h-4 w-4 animate-bounce" />
              <span>กดปุ่มด้านล่างเพื่อสลับฟิลเตอร์อัพลง IG / TikTok</span>
            </div>
          </div>

          {/* Filter selector row */}
          <div className="mt-5 space-y-4">
            <span className="text-[11px] font-display font-semibold uppercase tracking-wider text-[#819177] block">
              เลือกโทนสีอารมณ์บำบัด (Scent Filter Preset)
            </span>
            <div className="grid grid-cols-5 gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setActiveFilter(f);
                    setArActivated(true);
                  }}
                  className={`py-2 px-1 rounded-xl border text-[10px] text-center font-display font-medium transition-all ${
                    activeFilter.id === f.id
                      ? "bg-[#c9b097] border-[#c9b097] text-[#0d0f0c] shadow-md font-bold"
                      : "bg-[#0d0f0c] border-[#2a2e28] text-[#819177] hover:border-[#819177]/30"
                  }`}
                >
                  {f.name.split(" (")[0]}
                </button>
              ))}
            </div>

            {arActivated && (
              <div className="bg-[#0d0f0c] rounded-xl p-3 border border-emerald-900/30 text-[10px] text-emerald-400 flex items-center gap-2">
                <Info className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>เปิดใช้งานฟิลเตอร์เสมือนจริงเรียบร้อยแล้วเจ้า! ถ่ายหน้าจอเพื่อเก็บภาพองค์ประกอบแบบ Minimalist ได้เลยเจ้า 📸</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
