import "./styles.css";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Leaf, Globe } from "lucide-react";
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext";
import ARSpotMap from "./App";
import ZodiacQuiz from "./ZodiacQuiz";
import ScentMoodJournal from "./FlowerDirectory";
import BloomingCalendar from "./EcomBoutique";
import AIAssistant from "./BloomingCalendar";

const SECTION_LINKS = ["spots", "quiz", "journal", "calendar", "chat"] as const;

function App() {
  const [selectedElement, setSelectedElement] = useState<string>("Earth");
  const [cartCount, setCartCount] = useState(0);
  const { lang, toggleLang, t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0f110e] text-[#f2f4f1] font-sans antialiased selection:bg-[#c9b097] selection:text-[#0f110e]">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-[#0f110e]/80 backdrop-blur-xl border-b border-[#2a2e28]/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-[#c9b097]/20 rounded-full flex items-center justify-center border border-[#c9b097]/30">
              <Leaf className="h-5 w-5 text-[#c9b097]" />
            </div>
            <span className="font-serif italic text-lg tracking-tight">{t("header.title")}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-[11px] font-display font-medium uppercase tracking-widest">
            {SECTION_LINKS.map((id) => (
              <a key={id} href={`#${id}`} className="text-[#819177] hover:text-[#c9b097] transition-colors">
                {t(`nav.${id}`)}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#161a15] border border-[#2a2e28] text-[#819177] hover:text-[#c9b097] hover:border-[#c9b097]/40 transition-colors font-mono text-[11px]"
              title={lang === "th" ? "Switch to English" : "เปลี่ยนเป็นภาษาไทย"}
            >
              <Globe className="h-3.5 w-3.5" />
              <span className="font-medium">{lang === "th" ? "EN" : "TH"}</span>
            </button>
            <span className="text-[#819177]">{t("header.element")}: <span className="text-[#c9b097] font-medium">{selectedElement}</span></span>
            <span className="h-4 w-px bg-[#2a2e28]" />
            <span className="text-[#819177]">{t("header.cart")}: <span className="text-[#c9b097] font-medium">{cartCount}</span></span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-24">
        <section id="spots">
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono text-[#c9b097] uppercase tracking-[0.2em]">{t("section.spots")}</span>
            <h2 className="font-serif italic text-3xl mt-2">{t("section.spots.title")}</h2>
          </div>
          <ARSpotMap />
        </section>

        <section id="quiz">
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono text-[#c9b097] uppercase tracking-[0.2em]">{t("section.quiz")}</span>
            <h2 className="font-serif italic text-3xl mt-2">{t("section.quiz.title")}</h2>
          </div>
          <ZodiacQuiz
            onAddProductToCart={() => setCartCount(c => c + 1)}
            onSelectElement={(el: string) => setSelectedElement(el)}
          />
        </section>

        <section id="journal">
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono text-[#c9b097] uppercase tracking-[0.2em]">{t("section.journal")}</span>
            <h2 className="font-serif italic text-3xl mt-2">{t("section.journal.title")}</h2>
          </div>
          <ScentMoodJournal />
        </section>

        <section id="calendar">
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono text-[#c9b097] uppercase tracking-[0.2em]">{t("section.calendar")}</span>
            <h2 className="font-serif italic text-3xl mt-2">{t("section.calendar.title")}</h2>
          </div>
          <BloomingCalendar />
        </section>

        <section id="chat">
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono text-[#c9b097] uppercase tracking-[0.2em]">{t("section.chat")}</span>
            <h2 className="font-serif italic text-3xl mt-2">{t("section.chat.title")}</h2>
          </div>
          <AIAssistant />
        </section>
      </main>

      <footer className="border-t border-[#2a2e28]/50 py-8 text-center">
        <p className="text-[11px] text-[#819177] font-mono">
          {t("footer.text")}
        </p>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
