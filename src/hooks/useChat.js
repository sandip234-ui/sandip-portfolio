/**
 * hooks/useChat.js
 *
 * Manages the full chatbot state:
 *   - message history
 *   - loading state
 *   - sending a message → calling the engine → appending response
 *
 * Keeps all business logic out of the UI layer.
 */

import { useState, useCallback } from "react";
import { getResponse } from "../chatbot/engine";

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant",
  text: "Hey! 👋 I'm Sandip's portfolio assistant. Ask me about his projects, skills, or work — I'll give you the real engineering story behind each one.",
  timestamp: new Date(),
};

export function useChat() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (userText) => {
    const trimmed = userText.trim();
    if (!trimmed || isLoading) return;

    // Add user message immediately
    const userMsg = {
      id: `u-${Date.now()}`,
      role: "user",
      text: trimmed,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const responseText = await getResponse(trimmed);
      const botMsg = {
        id: `b-${Date.now()}`,
        role: "assistant",
        text: responseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          text: "Sorry, something went wrong. Try asking again!",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const clearHistory = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
  }, []);

  return { messages, isLoading, sendMessage, clearHistory };
}
