export interface Message {
  id: number;
  conversation_id: number;
  sender: "user" | "ai";
  message: string;
  created_at: string;
}

export interface Conversation {
  id: number;
  title: string;
  messages: Message[];
  created_at: string;
  updated_at: string;
}