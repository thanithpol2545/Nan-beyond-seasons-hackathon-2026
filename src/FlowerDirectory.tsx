import React, { useState, useEffect } from "react";
import { BookOpen, Smile, Leaf, Info, Trash2 } from "lucide-react";
import { useLanguage, type Lang } from "./i18n/LanguageContext";
import { JournalLog } from "./types";
import { FLOWERS_DATA } from "./data/nanDataset";

const getMoodFlowerMatches = (mood: string): string[] => {
  switch (mood) {
    case "stressed":
      return ["FL002", "FL012"];
    case "sad":
      return ["FL013", "FL014"];
    case "tired":
      return ["FL018", "FL001"];
    case "anxious":
      return ["FL003", "FL002"];
    case "peaceful":
      return ["FL003", "FL010"];
    default:
      return ["FL002"];
  }
};

const MOOD_ICONS: Record<string, string> = {
  stressed: "🤯",
  sad: "😢",
  tired: "🥱",
  anxious: "😰",
  peaceful: "🧘"
};

export default function ScentMoodJournal() {
  const [logs, setLogs] = useState<JournalLog[]>([]);
  const [mood, setMood] = useState<"stressed" | "sad" | "tired" | "anxious" | "peaceful">("peaceful");
  const [note, setNote] = useState("");
  const { lang, t } = useLanguage();

  useEffect(() => {
    const saved = localStorage.getItem("nan_scent_mood_logs");
    if (saved) {
      try {
        setLogs(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      const seedLogs: JournalLog[] = [
        {
          id: "seed-1",
          date: "2026-07-11T16:20:00.000Z",
          mood: "stressed",
          note: "เหนื่อยจากการทำงานติดต่อกันทั้งสัปดาห์ รู้สึกปวดบ่าและสมองตึงเครียดมากเป็นพิเศษ",
          matchedFlowerIds: ["FL002", "FL012"]
        },
        {
          id: "seed-2",
          date: "2026-07-12T09:30:00.000Z",
          mood: "peaceful",
          note: "จิบชาอุ่นเกสรบัวหลวงตอนเช้า นั่งสูดบรรยากาศสงบ อารมณ์นิ่งและปลอดโปร่งดี",
          matchedFlowerIds: ["FL003", "FL010"]
        }
      ];
      setLogs(seedLogs);
      localStorage.setItem("nan_scent_mood_logs", JSON.stringify(seedLogs));
    }
  }, []);

  const saveLogs = (newLogs: JournalLog[]) => {
    setLogs(newLogs);
    localStorage.setItem("nan_scent_mood_logs", JSON.stringify(newLogs));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;

    const matchedFlowerIds = getMoodFlowerMatches(mood);
    const newLog: JournalLog = {
      id: "log-" + Date.now(),
      date: new Date().toISOString(),
      mood,
      note,
      matchedFlowerIds
    };

    const updated = [newLog, ...logs];
    saveLogs(updated);
    setNote("");
    setMood("peaceful");
  };

  const deleteLog = (id: string) => {
    const filtered = logs.filter((l) => l.id !== id);
    saveLogs(filtered);
  };

  const moodLabels: Record<string, string> = {
    stressed: t("journal.mood.stressed"),
    sad: t("journal.mood.sad"),
    tired: t("journal.mood.tired"),
    anxious: t("journal.mood.anxious"),
    peaceful: t("journal.mood.peaceful")
  };

  const moodOptions = [
    { value: "stressed", labelKey: "journal.mood.stressed", icon: "🤯" },
    { value: "sad", labelKey: "journal.mood.sad", icon: "😢" },
    { value: "tired", labelKey: "journal.mood.tired", icon: "🥱" },
    { value: "anxious", labelKey: "journal.mood.anxious", icon: "😰" },
    { value: "peaceful", labelKey: "journal.mood.peaceful", icon: "🧘" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Form */}
      <div className="lg:col-span-5 bg-[#161a15] rounded-3xl p-6 border border-[#2a2e28] h-fit">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="h-5 w-5 text-[#c9b097]" />
          <h3 className="font-display font-semibold text-[#f2f4f1] tracking-wide text-base">
            {t("journal.title")}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mood Selector Grid */}
          <div>
            <label className="block text-[11px] font-display font-semibold uppercase tracking-wider text-[#819177] mb-3">
              {t("journal.moodLabel")}
            </label>
            <div className="grid grid-cols-5 gap-2">
              {moodOptions.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setMood(m.value as any)}
                  className={`flex flex-col items-center justify-center py-3 px-1 rounded-2xl border text-center transition-all ${
                    mood === m.value
                      ? "bg-[#c9b097] border-[#c9b097] text-[#0d0f0c]"
                      : "bg-[#0d0f0c] border-[#2a2e28] text-[#f2f4f1] hover:border-[#819177]/40"
                  }`}
                >
                  <span className="text-xl mb-1">{m.icon}</span>
                  <span className="text-[10px] font-medium leading-none">{t(m.labelKey)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Notes Input */}
          <div>
            <label className="block text-[11px] font-display font-semibold uppercase tracking-wider text-[#819177] mb-2">
              {t("journal.noteLabel")}
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t("journal.notePlaceholder")}
              rows={4}
              maxLength={250}
              className="w-full bg-[#0d0f0c] border border-[#2a2e28] rounded-2xl p-4 text-xs text-[#f2f4f1] placeholder-[#819177]/60 focus:outline-hidden focus:border-[#c9b097] resize-none"
            />
            <div className="text-right text-[10px] text-[#819177] mt-1">
              {t("journal.charCount", { count: note.length })}
            </div>
          </div>

          {/* Scent Recommendation Warning box */}
          <div className="bg-[#0d0f0c]/60 rounded-2xl p-4 border border-[#2a2e28] text-[11px] text-[#819177] flex gap-3">
            <Info className="h-4 w-4 text-[#c9b097] shrink-0 mt-0.5" />
            <div>
              <span className="text-[#f2f4f1] font-medium">{t("journal.info.title")}</span>
              <p className="mt-1 leading-relaxed">
                {t("journal.info.desc")}
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={!note.trim()}
            className="w-full py-3 rounded-full bg-[#c9b097] text-[#0d0f0c] font-display font-semibold text-xs tracking-wider uppercase hover:bg-[#b09a82] active:scale-98 transition-all disabled:opacity-40"
          >
            {t("journal.submit")}
          </button>
        </form>
      </div>

      {/* Right Column: List of historical logs */}
      <div className="lg:col-span-7 space-y-4">
        <h4 className="font-display font-semibold text-sm text-[#f2f4f1] tracking-wider uppercase flex items-center gap-2 mb-2">
          <Smile className="h-4 w-4 text-[#819177]" />
          <span>{t("journal.logsTitle", { count: logs.length })}</span>
        </h4>

        {logs.length === 0 ? (
          <div className="bg-[#161a15] rounded-3xl p-12 border border-[#2a2e28] text-center text-[#819177]">
            <Leaf className="h-10 w-10 text-[#2a2e28] mx-auto mb-3" />
            <p className="text-xs">{t("journal.empty")}</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
            {logs.map((l) => {
              const matchedFlowers = FLOWERS_DATA.filter((f) => l.matchedFlowerIds.includes(f.id));
              const dateLocale = lang === "th" ? "th-TH" : "en-US";
              const dateStr = new Date(l.date).toLocaleDateString(dateLocale, {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              });

              return (
                <div
                  key={l.id}
                  className="bg-[#161a15] rounded-2xl p-5 border border-[#2a2e28] hover:border-[#c9b097]/40 transition-colors flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="text-[10px] font-mono text-[#819177]">{dateStr}</span>
                      <p className="text-xs text-[#f2f4f1] mt-1 leading-relaxed italic">
                        "{l.note}"
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[#0d0f0c] text-[#f2f4f1] border border-[#2a2e28] font-medium flex items-center gap-1.5 capitalize">
                        <span>
                          {MOOD_ICONS[l.mood]} {moodLabels[l.mood] || l.mood}
                        </span>
                      </span>
                      <button
                        onClick={() => deleteLog(l.id)}
                        className="p-1.5 rounded-md hover:bg-[#0d0f0c] text-[#819177] hover:text-red-400 transition-colors"
                        title={t("journal.delete")}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="pt-3 border-t border-[#2a2e28]/60 flex flex-wrap items-center gap-3">
                    <span className="text-[10px] font-display font-medium text-[#819177] uppercase tracking-wider flex items-center gap-1">
                      <Leaf className="h-3 w-3 text-[#c9b097]" />
                      {t("journal.recommend")}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {matchedFlowers.map((f) => (
                        <div
                          key={f.id}
                          className="text-[10px] px-2.5 py-0.5 rounded-md bg-[#c9b097]/10 text-[#c9b097] border border-[#c9b097]/25"
                        >
                          {lang === "th" ? f.name_th : f.name_en} ({lang === "th" ? f.scent : (f as any).scent_en || f.scent})
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
