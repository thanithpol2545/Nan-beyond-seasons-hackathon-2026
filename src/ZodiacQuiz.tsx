import React, { useState } from "react";
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, Leaf, Check } from "lucide-react";
import { elementMatching } from "./data/nanDataset";

interface Question {
  id: number;
  q: string;
  options: { text: string; value: "Earth" | "Water" | "Wind" | "Fire" }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    q: "เมื่อคุณเดินเข้าไปในป่าน่านอันอุดมสมบูรณ์ สิ่งแรกที่คุณมองหาคืออะไร?",
    options: [
      { text: "ต้นไม้ใหญ่ร่มรื่นรากลึก มั่นคงไร้การสั่นคลอน", value: "Earth" },
      { text: "เสียงธารน้ำตกสะปันไหลรินเย็นชื่นใจ", value: "Water" },
      { text: "สายลมหนาวพัดโบกยอดดอยภูคาอันอิสรเสรี", value: "Wind" },
      { text: "แสงสีส้มรุ่งอรุณทอดผ่านส่องสว่างขอบฟ้า", value: "Fire" }
    ]
  },
  {
    id: 2,
    q: "เวลาที่คุณเผชิญกับอารมณ์ตึงเครียดสะสม วิธีใดช่วยเยียวยาคุณได้ดีที่สุด?",
    options: [
      { text: "การเหยียบย่ำผืนดินทราย นั่งเงียบๆ สงบนิ่งดั่งขุนเขา", value: "Earth" },
      { text: "การแช่น้ำอุ่น อาบไอสปา หรือการลอยตัวปลดปล่อยใจ", value: "Water" },
      { text: "การเดินสูดไอหมอกอโรมา สรรหาเรื่องคุยกับสหายสนิท", value: "Wind" },
      { text: "การออกกำลังเรียกเหงื่อ ทำกิจกรรมท้าทายใหม่ๆ เติมไฟ", value: "Fire" }
    ]
  },
  {
    id: 3,
    q: "หากกลิ่นอโรมาสามารถบอกนิสัยลึกๆ ของคุณ โทนกลิ่นใดที่บ่งบอกความเป็นคุณ?",
    options: [
      { text: "กลิ่นหอมอบอุ่นลุ่มลึก อโรมาเนื้อไม้และกุหลาบดิน", value: "Earth" },
      { text: "กลิ่นหอมสะอาดบางเบา ละอองดอกบัวและกระดังงาพราวพรรณ", value: "Water" },
      { text: "กลิ่นหอมสดชื่น ปลุกความกระฉับกระเฉงดั่งชงโคขาวและใบเมี่ยง", value: "Wind" },
      { text: "กลิ่นหอมฉุนสมุนไพร เครื่องเทศ ไพล ตะไคร้สดใสกระตุ้นชีพจร", value: "Fire" }
    ]
  }
];

interface Props {
  onAddProductToCart: (productId: string) => void;
  onSelectElement: (element: string) => void;
}

export default function ZodiacQuiz({ onAddProductToCart, onSelectElement }: Props) {
  const [step, setStep] = useState(0); // 0: intro, 1-3: questions, 4: result
  const [answers, setAnswers] = useState<("Earth" | "Water" | "Wind" | "Fire")[]>([]);
  const [resultElement, setResultElement] = useState<string | null>(null);

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
      // Calculate majority
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
      setStep(step + 1); // Go to results
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
            <h3 className="font-serif italic text-3xl text-[#f2f4f1]">ค้นหาธาตุเจ้าเรือนบุปผาน่าน</h3>
            <p className="text-xs text-[#819177] max-w-md mx-auto leading-relaxed">
              ตอบคำถามทดสอบบุคลิกภาพเชิงชีววิทยาและสุคนธบำบัดล้านนา เพื่อวิเคราะห์ธาตุเจ้าเรือน (ดิน น้ำ ลม ไฟ) จับคู่พรรณไม้สมุนไพรและอโรมาบำบัดที่สอดรับกับจิตวิญญาณของคุณอย่างแท้จริง
            </p>
          </div>

          <button
            onClick={handleStart}
            className="px-8 py-3 rounded-full bg-[#c9b097] text-[#0d0f0c] font-display font-semibold text-xs uppercase tracking-wider hover:bg-[#b09a82] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            เริ่มทดสอบธาตุบำบัด
          </button>
        </div>
      )}

      {/* Question Steps */}
      {step > 0 && step <= QUESTIONS.length && currentQuestion && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center text-[10px] font-mono text-[#819177]">
            <span>QUESTION {step} OF {QUESTIONS.length}</span>
            <span>{Math.round((step / QUESTIONS.length) * 100)}% COMPLETE</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-[#0d0f0c] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#c9b097] transition-all duration-300"
              style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
            />
          </div>

          <h4 className="font-display font-medium text-lg text-[#f2f4f1] leading-relaxed">
            {currentQuestion.q}
          </h4>

          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt.value)}
                className="w-full text-left p-4 rounded-2xl bg-[#0d0f0c] border border-[#2a2e28] text-xs text-[#f2f4f1] hover:border-[#c9b097] hover:bg-[#161a15] transition-all flex items-center justify-between group"
              >
                <span>{opt.text}</span>
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
              <span>BACK</span>
            </button>
          </div>
        </div>
      )}

      {/* Results Screen */}
      {step > QUESTIONS.length && matchedInfo && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center py-4 border-b border-[#2a2e28]/60">
            <span className="text-[10px] font-mono text-[#c9b097] uppercase tracking-widest block">YOUR PERSONALITY ELEMENT</span>
            <h4 className="font-serif italic text-3xl text-[#f2f4f1] mt-1">ธาตุ{matchedInfo.element_th}</h4>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-display font-semibold uppercase tracking-wider text-[#819177]">บุคลิกลักษณะประจำตัว (Personality)</span>
              <p className="text-xs text-[#f2f4f1] mt-1 leading-relaxed">{matchedInfo.personality}</p>
            </div>

            <div>
              <span className="text-[11px] font-display font-semibold uppercase tracking-wider text-[#819177]">พฤกษาบำบัดประจำธาตุ (Floral Matches)</span>
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
              <span className="text-[#f2f4f1] font-semibold block mb-1">💡 คำแนะนำเพื่อความสุขใจ (Wellness Tip):</span>
              {matchedInfo.tip}
            </div>

            {/* Personalized Product Linking */}
            <div className="bg-[#c9b097]/10 border border-[#c9b097]/25 rounded-2xl p-5 mt-4 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-[#c9b097] font-bold block uppercase tracking-wider">RECOMMENDED BOTANICAL REMEDY</span>
                  <h5 className="font-display font-semibold text-sm text-[#f2f4f1] mt-1">
                    {resultElement === "Earth" && "ชาดอกไม้สิริมงคล 'เบญจเกสรน่าน'"}
                    {resultElement === "Water" && "น้ำมันนวดสปาอุ่นผสมอโรมากระดังงา 'สยามผ่อนคลาย'"}
                    {resultElement === "Wind" && "สเปรย์น้ำลอยอโรมารสบัว 'Mindfulness Mist'"}
                    {resultElement === "Fire" && "สครับผิวกายดีท็อกซ์เกลือดาวเรือง"}
                  </h5>
                  <p className="text-[11px] text-[#819177] mt-1">
                    ปรุงกลั่นเพื่อช่วยชำระล้าง เสริมพลังธาตุ และเยียวยาจุดบกพร่องตามภูมิปัญญาล้านนา
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono font-bold text-[#c9b097] block">
                    {resultElement === "Earth" && "320 ฿"}
                    {resultElement === "Water" && "450 ฿"}
                    {resultElement === "Wind" && "350 ฿"}
                    {resultElement === "Fire" && "390 ฿"}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    const id =
                      resultElement === "Earth"
                        ? "P001"
                        : resultElement === "Water"
                        ? "P002"
                        : resultElement === "Wind"
                        ? "P004"
                        : "P003";
                    onAddProductToCart(id);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-[#c9b097] text-[#0d0f0c] text-center font-display font-bold text-[11px] tracking-wider uppercase hover:bg-[#b09a82] transition-colors"
                >
                  เพิ่มผลิตภัณฑ์ลงรถเข็น
                </button>
                <button
                  onClick={resetQuiz}
                  className="px-4 py-2.5 rounded-xl border border-[#2a2e28] text-[#819177] hover:text-[#f2f4f1] text-[11px] font-display uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>RETEST</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
