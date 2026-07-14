import "./styles.css";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Leaf } from "lucide-react";
import ARSpotMap from "./App";
import ZodiacQuiz from "./ZodiacQuiz";
import ScentMoodJournal from "./FlowerDirectory";
import BloomingCalendar from "./EcomBoutique";
import AIAssistant from "./BloomingCalendar";

const SECTION_LINKS = [
  { id: "spots", label: "AR Spot Map" },
  { id: "quiz", label: "Zodiac Quiz" },
  { id: "journal", label: "Scent Journal" },
  { id: "calendar", label: "Blooming Calendar" },
  { id: "chat", label: "Malai AI" },
];

function App() {
  const [selectedElement, setSelectedElement] = useState<string>("Earth");
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="min-h-screen bg-[#0f110e] text-[#f2f4f1] font-sans antialiased selection:bg-[#c9b097] selection:text-[#0f110e]">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-[#0f110e]/80 backdrop-blur-xl border-b border-[#2a2e28]/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-[#c9b097]/20 rounded-full flex items-center justify-center border border-[#c9b097]/30">
              <Leaf className="h-5 w-5 text-[#c9b097]" />
            </div>
            <span className="font-serif italic text-lg tracking-tight">Nan Flourish</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-[11px] font-display font-medium uppercase tracking-widest">
            {SECTION_LINKS.map(s => (
              <a key={s.id} href={`#${s.id}`} className="text-[#819177] hover:text-[#c9b097] transition-colors">
                {s.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-[#819177]">Element: <span className="text-[#c9b097] font-medium">{selectedElement}</span></span>
            <span className="h-4 w-px bg-[#2a2e28]" />
            <span className="text-[#819177]">Cart: <span className="text-[#c9b097] font-medium">{cartCount}</span></span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-24">
        <section id="spots">
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono text-[#c9b097] uppercase tracking-[0.2em]">SECTION 01</span>
            <h2 className="font-serif italic text-3xl mt-2">Photography & Scent Spots</h2>
          </div>
          <ARSpotMap />
        </section>

        <section id="quiz">
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono text-[#c9b097] uppercase tracking-[0.2em]">SECTION 02</span>
            <h2 className="font-serif italic text-3xl mt-2">Elemental Zodiac Quiz</h2>
          </div>
          <ZodiacQuiz
            onAddProductToCart={() => setCartCount(c => c + 1)}
            onSelectElement={(el: string) => setSelectedElement(el)}
          />
        </section>

        <section id="journal">
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono text-[#c9b097] uppercase tracking-[0.2em]">SECTION 03</span>
            <h2 className="font-serif italic text-3xl mt-2">Scent Mood Journal</h2>
          </div>
          <ScentMoodJournal />
        </section>

        <section id="calendar">
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono text-[#c9b097] uppercase tracking-[0.2em]">SECTION 04</span>
            <h2 className="font-serif italic text-3xl mt-2">Blooming Calendar & Itinerary</h2>
          </div>
          <BloomingCalendar />
        </section>

        <section id="chat">
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono text-[#c9b097] uppercase tracking-[0.2em]">SECTION 05</span>
            <h2 className="font-serif italic text-3xl mt-2">Malai — AI Scent Therapist</h2>
          </div>
          <AIAssistant />
        </section>
      </main>

      <footer className="border-t border-[#2a2e28]/50 py-8 text-center">
        <p className="text-[11px] text-[#819177] font-mono">
          Nan Flourish &copy; 2026 &mdash; Powered by Typhoon AI &amp; Nan Dataset v1.0
        </p>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
