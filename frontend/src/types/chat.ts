export interface Message {
  id: string;
  sender: "user" | "ai";
  message: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}