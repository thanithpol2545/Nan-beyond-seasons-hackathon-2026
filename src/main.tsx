import "./styles.css";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import { ArrowDownRight, Globe, Leaf, MessageCircleHeart, Minus, Plus, ShoppingBag, Sparkles, Stars, X } from "lucide-react";
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext";
import ARSpotMap from "./App";
import ZodiacQuiz from "./ZodiacQuiz";
import ScentMoodJournal from "./FlowerDirectory";
import BloomingCalendar from "./EcomBoutique";

const AIAssistant = React.lazy(() => import("./BloomingCalendar"));

const SECTION_LINKS = ["spots", "quiz", "journal", "calendar", "chat"] as const;

interface CartLine {
  id: string;
  nameKey: string;
  price: string;
  quantity: number;
}

const PRODUCT_CATALOG: Record<string, Omit<CartLine, "quantity">> = {
  P001: { id: "P001", nameKey: "product.earth", price: "320 ฿" },
  P002: { id: "P002", nameKey: "product.water", price: "450 ฿" },
  P003: { id: "P003", nameKey: "product.fire", price: "390 ฿" },
  P004: { id: "P004", nameKey: "product.wind", price: "350 ฿" },
};

function App() {
  const [selectedElement, setSelectedElement] = useState<string>("Earth");
  const [cartItems, setCartItems] = useState<CartLine[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const addProductToCart = (productId: string) => {
    const product = PRODUCT_CATALOG[productId];
    if (!product) return;

    setCartItems((current) => {
      const existing = current.find((item) => item.id === productId);
      if (existing) {
        return current.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  useEffect(() => {
    if (!isCartOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsCartOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen]);

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
        <div className="site-header-inner mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4">
          <div className="site-brand flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9b097]/30 bg-[#c9b097]/10">
              <Leaf className="h-5 w-5 text-[#c9b097]" />
            </div>
            <div className="min-w-0">
              <span className="block font-serif text-lg tracking-tight">{t("header.title")}</span>
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#819177]">
                {lang === "th" ? "botanical wellness atlas" : "botanical wellness atlas"}
              </span>
            </div>
          </div>

          <nav className="site-nav flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#819177]" aria-label="Primary navigation">
            {SECTION_LINKS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="shrink-0 whitespace-nowrap rounded-full border border-transparent px-3 py-2 transition-colors hover:border-[#2a2e28] hover:text-[#c9b097]"
              >
                {t(`nav.${id}`)}
              </a>
            ))}
          </nav>

          <div className="site-header-controls flex shrink-0 items-center gap-3 text-xs">
            <button
              onClick={toggleLang}
              className="language-toggle soft-button soft-button-secondary px-3 py-2 font-mono text-[11px] tracking-[0.16em]"
              title={t("tooltip.langToggle")}
              aria-label={t("tooltip.langToggle")}
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{lang === "th" ? "EN" : "TH"}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="cart-summary flex items-center gap-2 rounded-full border border-[#2a2e28] bg-[#11130f] px-3 py-2 text-left transition-colors hover:border-[#c9b097]/60 hover:bg-[#161a15] sm:gap-3 sm:px-4"
              aria-expanded={isCartOpen}
              aria-controls="cart-drawer"
            >
              <ShoppingBag className="h-4 w-4 shrink-0 text-[#c9b097]" />
              <span className="cart-element text-[#819177]">
                {t("header.element")}: <span className="font-medium text-[#c9b097]">{selectedElement}</span>
              </span>
              <span className="cart-divider h-4 w-px bg-[#2a2e28]" />
              <span className="text-[#819177]">
                {t("header.cart")}: <span className="font-medium text-[#c9b097]">{cartCount}</span>
              </span>
            </button>
          </div>
        </div>
      </header>

      <main id="main" className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 md:py-12">
        <section className="glass-panel hero-shell overflow-hidden rounded-[2rem] px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
          <div className="hero-grid">
            <div className="min-w-0 space-y-6">
              <span className="eyebrow">
                <Sparkles className="h-3.5 w-3.5" />
                {heroCopy.eyebrow}
              </span>

              <div className="max-w-3xl space-y-4">
                <h1 className="hero-title max-w-4xl font-serif text-4xl leading-[1.08] text-[#f6f3ee] sm:text-5xl md:text-6xl">
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

            <aside className="section-card flex min-w-0 h-full flex-col justify-between p-5 sm:p-6">
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
          <div className="section-card p-4 sm:p-6 md:p-8">
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
          <div className="section-card p-4 sm:p-6 md:p-8">
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
              onAddProductToCart={addProductToCart}
              onSelectElement={(el: string) => setSelectedElement(el)}
            />
          </div>
        </section>

        <section id="journal" className="section-shell">
          <div className="section-card p-4 sm:p-6 md:p-8">
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
          <div className="section-card p-4 sm:p-6 md:p-8">
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
          <div className="section-card p-4 sm:p-6 md:p-8">
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

      {isCartOpen && (
        <div className="cart-layer fixed inset-0 z-[70]" role="presentation">
          <button
            type="button"
            aria-label={t("cart.close")}
            className="absolute inset-0 h-full w-full bg-black/60 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          <aside
            id="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="cart-drawer absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-[#2a2e28] bg-[#11130f] p-5 shadow-2xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#2a2e28] pb-5">
              <div>
                <span className="section-kicker">{t("header.cart")}</span>
                <h2 id="cart-title" className="mt-2 font-serif text-3xl italic text-[#f2f4f1]">
                  {t("cart.title")}
                </h2>
                <p className="mt-1 text-sm text-[#819177]">
                  {t("cart.items", { count: cartCount })}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="rounded-full border border-[#2a2e28] p-2 text-[#819177] transition-colors hover:border-[#c9b097] hover:text-[#f2f4f1]"
                aria-label={t("cart.close")}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <ShoppingBag className="h-10 w-10 text-[#c9b097]" />
                <p className="mt-4 font-serif text-2xl italic text-[#f2f4f1]">{t("cart.empty")}</p>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#819177]">{t("cart.emptyDesc")}</p>
              </div>
            ) : (
              <div className="flex flex-1 flex-col overflow-y-auto py-5">
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-[#2a2e28] bg-[#0d0f0c] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-display text-base leading-relaxed text-[#f2f4f1]">{t(item.nameKey)}</p>
                        <span className="shrink-0 font-mono text-sm text-[#c9b097]">{item.price}</span>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-[#819177]">{t("cart.quantity")}</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="rounded-full border border-[#2a2e28] p-1.5 text-[#c9b097] transition-colors hover:border-[#c9b097]"
                            aria-label={t("cart.decrease")}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-6 text-center font-mono text-sm text-[#f2f4f1]">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="rounded-full border border-[#2a2e28] p-1.5 text-[#c9b097] transition-colors hover:border-[#c9b097]"
                            aria-label={t("cart.increase")}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      )}

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
