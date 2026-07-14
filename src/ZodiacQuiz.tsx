import React, { useState } from "react";
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, Leaf, Check } from "lucide-react";
import { useLanguage } from "./i18n/LanguageContext";
import { elementMatching } from "./data/nanDataset";

interface Question {
  id: number;
  qKey: string;
  optionKeys: string[];
  optionValues: ("Earth" | "Water" | "Wind" | "Fire")[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    qKey: "quiz.q1",
    optionKeys: ["quiz.q1.a", "quiz.q1.b", "quiz.q1.c", "quiz.q1.d"],
    optionValues: ["Earth", "Water", "Wind", "Fire"]
  },
  {
    id: 2,
    qKey: "quiz.q2",
    optionKeys: ["quiz.q2.a", "quiz.q2.b", "quiz.q2.c", "quiz.q2.d"],
    optionValues: ["Earth", "Water", "Wind", "Fire"]
  },
  {
    id: 3,
    qKey: "quiz.q3",
    optionKeys: ["quiz.q3.a", "quiz.q3.b", "quiz.q3.c", "quiz.q3.d"],
    optionValues: ["Earth", "Water", "Wind", "Fire"]
  }
];

interface Props {
  onAddProductToCart: (productId: string) => void;
  onSelectElement: (element: string) => void;
}

const ELEMENT_PRODUCTS: Record<string, { nameKey: string; price: string; id: string }> = {
  Earth: { nameKey: "product.earth", price: "320 ฿", id: "P001" },
  Water: { nameKey: "product.water", price: "450 ฿", id: "P002" },
  Wind: { nameKey: "product.wind", price: "350 ฿", id: "P004" },
  Fire: { nameKey: "product.fire", price: "390 ฿", id: "P003" }
};

export default function ZodiacQuiz({ onAddProductToCart, onSelectElement }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<("Earth" | "Water" | "Wind" | "Fire")[]>([]);
  const [resultElement, setResultElement] = useState<string | null>(null);
  const { lang, t } = useLanguage();

  const handleStart = () => {
    setAnswers([]);
    setStep(1);
  };

  const handleAnswer = (value: "Earth" | "Water" | "Wind" | "Fire") => {
    const updatedAnswers = [...answers, value];
    setAnswers(updatedAnswers);

    if (step < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      const counts = updatedAnswers.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      let maxVal = "Earth";
      let maxCount = 0;
      for (const [k, v] of Object.entries(counts)) {
        const count = v as number;
        if (count > maxCount) {
          maxCount = count;
          maxVal = k;
        }
      }

      setResultElement(maxVal);
      onSelectElement(maxVal);
      setStep(step + 1);
    }
  };

  const resetQuiz = () => {
    setAnswers([]);
    setResultElement(null);
    setStep(0);
  };

  const currentQuestion = QUESTIONS[step - 1];
  const matchedInfo = resultElement ? elementMatching(resultElement) : null;

  return (
    <div className="bg-[#161a15] rounded-3xl p-8 border border-[#2a2e28] max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
      {/* Decors */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9b097]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Intro Screen */}
      {step === 0 && (
        <div className="text-center space-y-6 py-6 animate-fade-in">
          <div className="h-16 w-16 bg-[#0d0f0c] rounded-full border border-[#c9b097] flex items-center justify-center mx-auto shadow-lg">
            <Sparkles className="h-8 w-8 text-[#c9b097] animate-pulse" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif italic text-3xl text-[#f2f4f1]">{t("quiz.intro.title")}</h3>
            <p className="text-xs text-[#819177] max-w-md mx-auto leading-relaxed">
              {t("quiz.intro.desc")}
            </p>
          </div>

          <button
            onClick={handleStart}
            className="px-8 py-3 rounded-full bg-[#c9b097] text-[#0d0f0c] font-display font-semibold text-xs uppercase tracking-wider hover:bg-[#b09a82] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            {t("quiz.intro.start")}
          </button>
        </div>
      )}

      {/* Question Steps */}
      {step > 0 && step <= QUESTIONS.length && currentQuestion && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center text-[10px] font-mono text-[#819177]">
            <span>{t("quiz.progress.question", { step, total: QUESTIONS.length })}</span>
            <span>{t("quiz.progress.percent", { percent: Math.round((step / QUESTIONS.length) * 100) })}</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-[#0d0f0c] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#c9b097] transition-all duration-300"
              style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
            />
          </div>

          <h4 className="font-display font-medium text-lg text-[#f2f4f1] leading-relaxed">
            {t(currentQuestion.qKey)}
          </h4>

          <div className="space-y-3 pt-2">
            {currentQuestion.optionKeys.map((key, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(currentQuestion.optionValues[idx])}
                className="w-full text-left p-4 rounded-2xl bg-[#0d0f0c] border border-[#2a2e28] text-xs text-[#f2f4f1] hover:border-[#c9b097] hover:bg-[#161a15] transition-all flex items-center justify-between group"
              >
                <span>{t(key)}</span>
                <ArrowRight className="h-4 w-4 text-[#819177] group-hover:text-[#c9b097] group-hover:translate-x-1 transition-all shrink-0" />
              </button>
            ))}
          </div>

          <div className="flex justify-start">
            <button
              onClick={() => {
                if (step > 1) {
                  setStep(step - 1);
                  setAnswers(answers.slice(0, -1));
                } else {
                  setStep(0);
                }
              }}
              className="text-xs text-[#819177] hover:text-[#f2f4f1] flex items-center gap-1.5 font-mono pt-4 transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>{t("quiz.back")}</span>
            </button>
          </div>
        </div>
      )}

      {/* Results Screen */}
      {step > QUESTIONS.length && matchedInfo && resultElement && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center py-4 border-b border-[#2a2e28]/60">
            <span className="text-[10px] font-mono text-[#c9b097] uppercase tracking-widest block">{t("quiz.result.badge")}</span>
            <h4 className="font-serif italic text-3xl text-[#f2f4f1] mt-1">
              {lang === "th"
                ? t("quiz.result.title", { element: matchedInfo.element_th })
                : `${matchedInfo.element_en} Element`}
            </h4>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-display font-semibold uppercase tracking-wider text-[#819177]">{t("quiz.result.personality")}</span>
              <p className="text-xs text-[#f2f4f1] mt-1 leading-relaxed">
                {lang === "th" ? matchedInfo.personality : matchedInfo.personality_en}
              </p>
            </div>

            <div>
              <span className="text-[11px] font-display font-semibold uppercase tracking-wider text-[#819177]">{t("quiz.result.floral")}</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {matchedInfo.recommended.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3.5 py-1 rounded-full bg-[#0d0f0c] border border-[#2a2e28] text-[#c9b097] flex items-center gap-1.5"
                  >
                    <Leaf className="h-3 w-3" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#0d0f0c] border border-[#2a2e28] rounded-2xl p-4 text-xs text-[#819177] leading-relaxed">
              <span className="text-[#f2f4f1] font-semibold block mb-1">{t("quiz.result.tip")}</span>
              {lang === "th" ? matchedInfo.tip : matchedInfo.tip_en}
            </div>

            {/* Personalized Product Linking */}
            <div className="bg-[#c9b097]/10 border border-[#c9b097]/25 rounded-2xl p-5 mt-4 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-[#c9b097] font-bold block uppercase tracking-wider">{t("quiz.result.productBadge")}</span>
                  <h5 className="font-display font-semibold text-sm text-[#f2f4f1] mt-1">
                    {t(ELEMENT_PRODUCTS[resultElement]?.nameKey || "product.earth")}
                  </h5>
                  <p className="text-[11px] text-[#819177] mt-1">
                    {t("quiz.result.productDesc")}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono font-bold text-[#c9b097] block">
                    {ELEMENT_PRODUCTS[resultElement]?.price}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => onAddProductToCart(ELEMENT_PRODUCTS[resultElement]?.id || "P001")}
                  className="flex-1 py-2.5 rounded-xl bg-[#c9b097] text-[#0d0f0c] text-center font-display font-bold text-[11px] tracking-wider uppercase hover:bg-[#b09a82] transition-colors"
                >
                  {t("quiz.result.addCart")}
                </button>
                <button
                  onClick={resetQuiz}
                  className="px-4 py-2.5 rounded-xl border border-[#2a2e28] text-[#819177] hover:text-[#f2f4f1] text-[11px] font-display uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>{t("quiz.result.retest")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
