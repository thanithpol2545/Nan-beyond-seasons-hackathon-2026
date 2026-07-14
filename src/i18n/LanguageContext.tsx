import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { TH, EN } from "./translations";

export type Lang = "th" | "en";

interface LangCtx {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const LangContext = createContext<LangCtx | null>(null);

const STORAGE_KEY = "nan_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    return saved === "en" ? "en" : "th";
  });

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === "th" ? "en" : "th";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>): string => {
      const dict = lang === "th" ? TH : EN;
      let val = dict[key];
      if (!val) {
        val = TH[key] || key;
      }
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          val = val.replace(`{${k}}`, String(v));
        }
      }
      return val;
    },
    [lang]
  );

  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLanguage(): LangCtx {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
