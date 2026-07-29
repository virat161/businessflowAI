import type { Conversation } from "../types/chat";

const STORAGE_KEY = "businessflow-conversations";

export const chatStorage = {
  load(): Conversation[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);

      if (!data) return [];

      return JSON.parse(data);
    } catch (error) {
      console.error("Failed to load conversations:", error);
      return [];
    }
  },

  save(conversations: Conversation[]) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(conversations)
      );
    } catch (error) {
      console.error("Failed to save conversations:", error);
    }
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },
};