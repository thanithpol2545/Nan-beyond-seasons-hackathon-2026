import "./styles.css";
import React, { Suspense, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import { ArrowDownRight, Globe, Leaf, MessageCircleHeart, Sparkles, Stars } from "lucide-react";
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext";
import ARSpotMap from "./App";
import ZodiacQuiz from "./ZodiacQuiz";
import ScentMoodJournal from "./FlowerDirectory";
import BloomingCalendar from "./EcomBoutique";

const AIAssistant = React.lazy(() => import("./BloomingCalendar"));

const SECTION_LINKS = ["spots", "quiz", "journal", "calendar", "chat"] as const;

function App() {
  const [selectedElement, setSelectedElement] = useState<string>("Earth");
  const [cartCount, setCartCount] = useState(0);
  const { lang, toggleLang, t } = useLanguage();

  const heroStats = useMemo(
    () =>
      lang === "th"
        ? [
            { value: "20+", label: "พรรณไม้และกลิ่นบำบัด", note: "เลือกจับคู่กับธาตุและอารมณ์" },
            { value: "12", label: "หน้าต่างฤดูกาลรายเดือน", note: "พร้อมข้อมูลเทศกาลและช่วงเดินทาง" },
            { value: "AI", label: "ที่ปรึกษา itinerary", note: "ใช้ชุดข้อมูลน่านประกอบคำแนะนำ" },
          ]
        : [
            { value: "20+", label: "botanical scent profiles", note: "matched against element and mood" },
            { value: "12", label: "seasonal monthly windows", note: "with festivals and travel cues" },
            { value: "AI", label: "itinerary guidance", note: "grounded in the Nan dataset" },
          ],
    [lang]
  );

  const sectionNotes = useMemo(
    () =>
      lang === "th"
        ? {
            spots: "คัด landmark ที่เด่นทั้งองค์ประกอบภาพ กลิ่น และประสบการณ์ถ่ายภาพเชิงบำบัด",
            quiz: "แปลบุคลิกเป็นธาตุพฤกษา แล้วโยงไปสู่ผลิตภัณฑ์และจังหวะการดูแลตัวเอง",
            journal: "จดอารมณ์ประจำวันแบบสั้น ๆ แล้วให้ระบบจับคู่พรรณไม้และแนวทางผ่อนคลาย",
            calendar: "ดู seasonal rhythm ทั้งปีและสร้างแผนเดินทาง 3 วัน 2 คืนจากบริบทเดือนนั้น",
            chat: "คุยกับผู้ช่วยกลิ่นและการเดินทางเพื่อขอคำแนะนำแบบโต้ตอบ",
          }
        : {
            spots: "Curated landmarks where composition, scent, and restorative travel overlap.",
            quiz: "Translate personality into an elemental floral profile and a matching remedy path.",
            journal: "Track daily emotional tone and pair it with calming flowers and rituals.",
            calendar: "Read Nan's seasonal rhythm, then turn it into a 3-day restorative route.",
            chat: "Talk with a scent and travel guide for interactive wellness suggestions.",
          },
    [lang]
  );

  const heroCopy =
    lang === "th"
      ? {
          eyebrow: "Nan Beyond Seasons 2026",
          title: "ออกแบบการเดินทางน่าน ให้หอม สงบ และมีจังหวะเหมือนบทบรรณาธิการ",
          body:
            "Nan Flourish คือหน้ารวมประสบการณ์สำหรับนักท่องเที่ยวที่อยากใช้กลิ่น พฤกษา และฤดูกาลเป็นตัวนำทาง ตั้งแต่จุดถ่ายภาพแบบมี mood ไปจนถึง itinerary เชิง wellness ที่คัดมาให้เฉพาะบุคคล",
          primary: "สำรวจ seasonal journey",
          secondary: "เริ่มจาก zodiac quiz",
          capsuleTitle: "Wellness Signals",
          capsuleBody:
            "แกนหลักของประสบการณ์นี้คือการผสม visual travel, scent therapy, local rituals, และ AI trip-planning ให้กลายเป็นหน้าที่เล่าเรื่องได้ชัดขึ้นกว่าเดิม",
          storyLead: "ภาพรวมใหม่ของหน้าเว็บ",
          storyLine1: "ยก hierarchy ให้ section แรกชัดขึ้นและทำให้หน้า landing ดูมีจุดเริ่มต้นจริง",
          storyLine2: "เก็บโลกสีเดิมไว้ แต่ขยับไปทาง editorial-luxury ที่อ่านง่ายขึ้นบนมือถือ",
        }
      : {
          eyebrow: "Nan Beyond Seasons 2026",
          title: "A calmer, more editorial way to plan Nan through scent, season, and ritual.",
          body:
            "Nan Flourish becomes a destination page for travelers who want floral identity, mindful travel, and seasonal context in one polished flow, from AR-style spot curation to AI-assisted wellness itineraries.",
          primary: "Explore seasonal journey",
          secondary: "Start with zodiac quiz",
          capsuleTitle: "Wellness Signals",
          capsuleBody:
            "The interface now leans into visual travel, scent therapy, local rituals, and AI trip-planning as one continuous story instead of a stack of isolated widgets.",
          storyLead: "What this refresh emphasizes",
          storyLine1: "A stronger landing moment and cleaner narrative flow across sections.",
          storyLine2: "The same dark botanical world, rebuilt with clearer hierarchy and mobile readability.",
        };

  return (
    <div className="page-shell min-h-screen bg-[#0f110e] text-[#f2f4f1] font-sans antialiased selection:bg-[#c9b097] selection:text-[#0f110e]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-[#c9b097] focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-[#0d0f0c]"
      >
        Skip to content
      </a>

      <div className="grain-overlay" />
      <div className="floating-orb floating-orb-a" />
      <div className="floating-orb floating-orb-b" />

      <header className="sticky top-0 z-50 border-b border-[#2a2e28]/50 bg-[#0f110e]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9b097]/30 bg-[#c9b097]/10">
              <Leaf className="h-5 w-5 text-[#c9b097]" />
            </div>
            <div>
              <span className="block font-serif text-lg tracking-tight">{t("header.title")}</span>
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#819177]">
                {lang === "th" ? "botanical wellness atlas" : "botanical wellness atlas"}
              </span>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#819177]">
            {SECTION_LINKS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-full border border-transparent px-3 py-1.5 transition-colors hover:border-[#2a2e28] hover:text-[#c9b097]"
              >
                {t(`nav.${id}`)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={toggleLang}
              className="soft-button soft-button-secondary px-3 py-2 font-mono text-[11px] tracking-[0.16em]"
              title={t("tooltip.langToggle")}
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{lang === "th" ? "EN" : "TH"}</span>
            </button>
            <div className="hidden items-center gap-3 rounded-full border border-[#2a2e28] bg-[#11130f] px-4 py-2 sm:flex">
              <span className="text-[#819177]">
                {t("header.element")}: <span className="font-medium text-[#c9b097]">{selectedElement}</span>
              </span>
              <span className="h-4 w-px bg-[#2a2e28]" />
              <span className="text-[#819177]">
                {t("header.cart")}: <span className="font-medium text-[#c9b097]">{cartCount}</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      <main id="main" className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-8 md:py-12">
        <section className="glass-panel overflow-hidden rounded-[2rem] px-6 py-8 md:px-8 md:py-10">
          <div className="hero-grid">
            <div className="space-y-6">
              <span className="eyebrow">
                <Sparkles className="h-3.5 w-3.5" />
                {heroCopy.eyebrow}
              </span>

              <div className="max-w-3xl space-y-4">
                <h1 className="max-w-4xl font-serif text-4xl leading-[1.02] text-[#f6f3ee] sm:text-5xl md:text-6xl">
                  {heroCopy.title}
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-[#b4beb0] md:text-base">
                  {heroCopy.body}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="#calendar" className="soft-button soft-button-primary font-semibold">
                  <span>{heroCopy.primary}</span>
                  <ArrowDownRight className="h-4 w-4" />
                </a>
                <a href="#quiz" className="soft-button soft-button-secondary">
                  <span>{heroCopy.secondary}</span>
                </a>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {heroStats.map((item) => (
                  <div key={item.label} className="hero-stat">
                    <strong>{item.value}</strong>
                    <span className="mt-2 block text-[11px] uppercase tracking-[0.18em] text-[#c9b097]">
                      {item.label}
                    </span>
                    <p className="mt-2 text-xs leading-6 text-[#8f9b8a]">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="section-card flex h-full flex-col justify-between p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[#c9b097]">
                  <span className="eyebrow border-[#2a2e28] bg-[#161a15] text-[0.62rem]">Curated Frame</span>
                  <Stars className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#819177]">{heroCopy.storyLead}</p>
                  <p className="mt-3 font-serif text-2xl leading-tight text-[#f2f4f1]">{heroCopy.capsuleTitle}</p>
                </div>
                <p className="text-sm leading-7 text-[#a6afa2]">{heroCopy.capsuleBody}</p>
              </div>

              <div className="mt-8 space-y-4 border-t border-[#2a2e28] pt-5 text-sm text-[#d2d8d0]">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-1 h-4 w-4 shrink-0 text-[#c9b097]" />
                  <p>{heroCopy.storyLine1}</p>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircleHeart className="mt-1 h-4 w-4 shrink-0 text-[#819177]" />
                  <p>{heroCopy.storyLine2}</p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="spots" className="section-shell">
          <div className="section-card p-6 md:p-8">
            <div className="section-heading mb-8">
              <div>
                <span className="section-kicker">{t("section.spots")}</span>
                <h2 className="mt-3 font-serif text-3xl italic text-[#f2f4f1] md:text-4xl">
                  {t("section.spots.title")}
                </h2>
              </div>
              <p className="section-note">{sectionNotes.spots}</p>
            </div>
            <ARSpotMap />
          </div>
        </section>

        <section id="quiz" className="section-shell">
          <div className="section-card p-6 md:p-8">
            <div className="section-heading mb-8">
              <div>
                <span className="section-kicker">{t("section.quiz")}</span>
                <h2 className="mt-3 font-serif text-3xl italic text-[#f2f4f1] md:text-4xl">
                  {t("section.quiz.title")}
                </h2>
              </div>
              <p className="section-note">{sectionNotes.quiz}</p>
            </div>
            <ZodiacQuiz
              onAddProductToCart={() => setCartCount((c) => c + 1)}
              onSelectElement={(el: string) => setSelectedElement(el)}
            />
          </div>
        </section>

        <section id="journal" className="section-shell">
          <div className="section-card p-6 md:p-8">
            <div className="section-heading mb-8">
              <div>
                <span className="section-kicker">{t("section.journal")}</span>
                <h2 className="mt-3 font-serif text-3xl italic text-[#f2f4f1] md:text-4xl">
                  {t("section.journal.title")}
                </h2>
              </div>
              <p className="section-note">{sectionNotes.journal}</p>
            </div>
            <ScentMoodJournal />
          </div>
        </section>

        <section id="calendar" className="section-shell">
          <div className="section-card p-6 md:p-8">
            <div className="section-heading mb-8">
              <div>
                <span className="section-kicker">{t("section.calendar")}</span>
                <h2 className="mt-3 font-serif text-3xl italic text-[#f2f4f1] md:text-4xl">
                  {t("section.calendar.title")}
                </h2>
              </div>
              <p className="section-note">{sectionNotes.calendar}</p>
            </div>
            <BloomingCalendar />
          </div>
        </section>

        <section id="chat" className="section-shell">
          <div className="section-card p-6 md:p-8">
            <div className="section-heading mb-8">
              <div>
                <span className="section-kicker">{t("section.chat")}</span>
                <h2 className="mt-3 font-serif text-3xl italic text-[#f2f4f1] md:text-4xl">
                  {t("section.chat.title")}
                </h2>
              </div>
              <p className="section-note">{sectionNotes.chat}</p>
            </div>
            <Suspense fallback={null}>
              <AIAssistant />
            </Suspense>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#2a2e28]/50 py-8 text-center">
        <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#819177]">{t("footer.text")}</p>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
