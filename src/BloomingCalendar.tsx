import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, X, RefreshCw } from "lucide-react";
import { useLanguage } from "./i18n/LanguageContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: ""
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { t, lang } = useLanguage();
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      setMessages([{ sender: "bot", text: t("chat.welcome") }]);
    }
  }, [lang]); // Re-run when language changes

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].sender === "bot") {
        return [{ sender: "bot", text: t("chat.welcome") }];
      }
      return prev;
    });
  }, [lang, t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/wellness-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          history: messages.slice(-5)
        })
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: t("chat.error")
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        sender: "bot",
        text: t("chat.reset")
      }
    ]);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#c9b097] px-5 py-3 text-sm font-display font-medium text-[#0d0f0c] shadow-2xl transition-transform hover:scale-105 active:scale-95 duration-300"
        id="ai-bot-toggle"
      >
        <MessageSquare className="h-4 w-4 animate-pulse" />
        <span>{t("chat.toggle")}</span>
      </button>

      {/* Floating Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-fade-in">
          <div className="h-full w-full max-w-md bg-[#0d0f0c] border-l border-[#2a2e28] shadow-2xl flex flex-col justify-between">
            {/* Header */}
            <div className="p-4 border-b border-[#2a2e28] bg-[#161a15] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#2a2e28] border border-[#c9b097]/40 flex items-center justify-center text-lg">
                  🌸
                </div>
                <div>
                  <h4 className="font-display font-semibold text-[#f2f4f1] text-sm tracking-wide">
                    {t("chat.header.title")}
                  </h4>
                  <span className="text-[11px] text-[#819177] flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-[#c9b097]" />
                    {t("chat.header.subtitle")}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  title={t("chat.clear.tooltip")}
                  className="p-1.5 rounded-md hover:bg-[#2a2e28] text-[#819177] hover:text-[#f2f4f1] transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-md hover:bg-[#2a2e28] text-[#819177] hover:text-[#f2f4f1] transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#0d0f0c] to-[#111410] scrollbar-thin">
              {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      m.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                        m.sender === "user"
                          ? "bg-[#c9b097] text-[#0d0f0c] rounded-tr-xs font-medium"
                          : "bg-[#161a15] text-[#f2f4f1] border border-[#2a2e28] rounded-tl-xs prose prose-invert prose-xs max-w-none"
                      }`}
                    >
                      {m.sender === "bot" ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {m.text}
                        </ReactMarkdown>
                      ) : (
                        m.text
                      )}
                    </div>
                  </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#161a15] text-[#819177] border border-[#2a2e28] rounded-2xl rounded-tl-xs p-3.5 text-xs flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-[#c9b097] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-1.5 h-1.5 bg-[#c9b097] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-1.5 h-1.5 bg-[#c9b097] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                    <span>{t("chat.loading")}</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSend} className="p-4 border-t border-[#2a2e28] bg-[#0d0f0c] flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("chat.placeholder")}
                className="flex-1 bg-[#161a15] border border-[#2a2e28] rounded-full px-4 py-2.5 text-xs text-[#f2f4f1] focus:outline-hidden focus:border-[#c9b097] placeholder-[#819177]"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="h-10 w-10 rounded-full bg-[#c9b097] flex items-center justify-center text-[#0d0f0c] hover:bg-[#b09a82] active:scale-95 transition-all disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
