/**
 * ChatBot.jsx — "Ask My Portfolio" floating assistant.
 *
 * Architecture (clean separation of concerns):
 *   DATA    → src/data/chatOptions.js (Q&A pairs, only file to edit for content)
 *   STATE   → useState inside this component (messages, loading, open)
 *   UI      → this file only
 *
 * Flow:
 *   1. User clicks a question button
 *   2. User message appended immediately
 *   3. 600ms typing delay (simulates thinking)
 *   4. Bot answer appended
 *   5. Auto-scroll to latest message
 *   6. Buttons stay visible for follow-up questions
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { chatOptions } from "../../data/chatOptions";
import { cn } from "../../utils/cn";

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */
const BOT_DELAY_MS = 650;

const WELCOME = {
  id: "welcome",
  role: "bot",
  text: "Hi! 👋 I'm Sandip's portfolio assistant. Select a question below to learn about his projects, skills, and experience.",
};

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

/** Single chat bubble */
function Bubble({ role, text }) {
  const isUser = role === "user";
  return (
    <div className={cn("flex items-end gap-2", isUser ? "flex-row-reverse" : "flex-row")}>
      {/* Avatar */}
      <div
        className={cn(
          "shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold",
          isUser ? "bg-violet-600 text-white" : "bg-slate-700 text-slate-300"
        )}
      >
        {isUser ? "You" : "AI"}
      </div>

      {/* Message */}
      <div
        className={cn(
          "max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
          isUser
            ? "bg-violet-600 text-white rounded-br-sm"
            : "bg-slate-800 text-slate-200 border border-slate-700/60 rounded-bl-sm"
        )}
      >
        {text}
      </div>
    </div>
  );
}

/** Three-dot typing indicator */
function TypingDots() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-[11px] font-bold text-slate-300 shrink-0">
        AI
      </div>
      <div className="bg-slate-800 border border-slate-700/60 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

/** Clickable question pill button */
function QuestionButton({ option, disabled, onClick }) {
  return (
    <button
      onClick={() => onClick(option)}
      disabled={disabled}
      className={cn(
        "w-full text-left px-3 py-2 rounded-xl text-xs leading-snug transition-all duration-150",
        "border bg-slate-900 text-slate-300",
        disabled
          ? "opacity-40 cursor-not-allowed border-slate-800"
          : "hover:bg-violet-500/10 hover:text-violet-300 hover:border-violet-500/40 border-slate-700 cursor-pointer"
      )}
    >
      {option.question}
    </button>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef(null);

  /* Auto-scroll whenever messages or typing state changes */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* Mark as opened to remove the pulse ring */
  useEffect(() => {
    if (isOpen) setHasOpened(true);
  }, [isOpen]);

  /* Handle a question button click */
  const handleSelect = useCallback(
    (option) => {
      if (isTyping) return; // prevent double-tap during bot response

      // 1. Append user message immediately
      const userMsg = {
        id: `u-${Date.now()}`,
        role: "user",
        text: option.question,
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      // 2. After delay, append bot answer
      setTimeout(() => {
        const botMsg = {
          id: `b-${Date.now()}`,
          role: "bot",
          text: option.answer,
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, BOT_DELAY_MS);
    },
    [isTyping]
  );

  const handleClear = () => {
    setMessages([WELCOME]);
    setIsTyping(false);
  };

  /* ── Render ── */
  return (
    <>
      {/* ── Chat panel ── */}
      <div
        className={cn(
          "fixed bottom-24 right-5 z-50 flex flex-col",
          "w-[340px] sm:w-[380px] rounded-2xl overflow-hidden",
          "bg-slate-950 border border-slate-700/80 shadow-2xl shadow-black/50",
          "transition-all duration-300 ease-out origin-bottom-right",
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        )}
        style={{ height: "560px" }}
      >
        {/* ── Header ── */}
        <div className="flex items-center gap-3 px-4 py-3 bg-slate-900 border-b border-slate-800 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center text-sm shrink-0">
            🤖
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold leading-none">Ask My Portfolio</p>
            <p className="text-emerald-400 text-[11px] flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              Always online
            </p>
          </div>
          {/* Clear */}
          <button
            onClick={handleClear}
            title="Reset chat"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 .49-3.59" />
            </svg>
          </button>
          {/* Close */}
          <button
            onClick={() => setIsOpen(false)}
            title="Close"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* ── Message list ── */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
          {messages.map((msg) => (
            <Bubble key={msg.id} role={msg.role} text={msg.text} />
          ))}
          {isTyping && <TypingDots />}
          <div ref={bottomRef} />
        </div>

        {/* ── Question buttons ── */}
        <div className="border-t border-slate-800 bg-slate-900/80 px-3 py-3 shrink-0">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2 px-1">
            Select a question
          </p>
          <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-0.5">
            {chatOptions.map((opt) => (
              <QuestionButton
                key={opt.id}
                option={opt}
                disabled={isTyping}
                onClick={handleSelect}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── FAB trigger ── */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close chat" : "Open portfolio assistant"}
        className={cn(
          "fixed bottom-5 right-5 z-50 w-14 h-14 rounded-2xl",
          "bg-gradient-to-br from-violet-600 to-violet-800",
          "hover:from-violet-500 hover:to-violet-700",
          "flex items-center justify-center shadow-2xl shadow-black/30",
          "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-400/50",
          !isOpen && "hover:scale-110"
        )}
      >
        {isOpen ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
        {/* Attention pulse — only before first open */}
        {!hasOpened && (
          <span className="absolute inset-0 rounded-2xl animate-ping bg-violet-500/30 pointer-events-none" />
        )}
      </button>
    </>
  );
}
