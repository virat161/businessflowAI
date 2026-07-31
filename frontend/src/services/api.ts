import axios from "axios";
import type { Conversation, Message } from "../types/chat";

export interface ChatResponse {
  user_message: Message;
  assistant_message: Message;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===========================
   Conversation APIs
=========================== */

export async function getConversations() {
  const res = await api.get<Conversation[]>("/conversations/");
  return res.data;
}

export async function createConversation(title: string) {
  const res = await api.post<Conversation>("/conversations/", {
    title,
  });

  return res.data;
}

export async function updateConversation(
  id: number,
  title: string
) {
  const res = await api.put<Conversation>(
    `/conversations/${id}`,
    {
      title,
    }
  );

  return res.data;
}

export async function deleteConversation(id: number) {
  await api.delete(`/conversations/${id}`);
}
export async function clearConversation(
  conversationId: number
) {
  await api.delete(
    `/messages/conversation/${conversationId}`
  );
}

/* ===========================
   Message APIs
=========================== */

export async function getMessages(
  conversationId: number
) {
  const res = await api.get<Message[]>(
    `/messages/conversation/${conversationId}`
  );

  return res.data;
}

export async function sendMessage(
  conversationId: number,
  sender: string,
  message: string
) {
  const res = await api.post<Message>(
    `/messages/conversation/${conversationId}`,
    {
      sender,
      message,
    }
  );

  return res.data;
}

export async function sendChatMessage(
  conversationId: number,
  message: string,
) {
  const res = await api.post<ChatResponse>(
    `/messages/conversation/${conversationId}/chat`,
    { message },
  );

  return res.data;
}

export async function deleteMessage(
  messageId: number
) {
  await api.delete(`/messages/${messageId}`);
}
/* ===========================
   Email Generator APIs
=========================== */

export interface EmailRequest {
  purpose: string;
  recipient: string;
  tone: string;
  instructions: string;
}

export interface EmailResponse {
  email: string;
}

export async function generateEmail(
  request: EmailRequest
) {
  const res = await api.post<EmailResponse>(
    "/email/generate",
    request
  );

  return res.data;
}
/* ===========================
   Business Memory APIs
=========================== */

export interface BusinessMemory {
  company_name: string;
  industry: string;
  products: string;
  target_audience: string;
  brand_tone: string;
  website: string;
  email: string;
  phone: string;
  notes: string;
}

export async function getBusinessMemory() {
  const res = await api.get<BusinessMemory | null>("/business/");
  return res.data;
}

export async function saveBusinessMemory(
  data: BusinessMemory
) {
  const res = await api.post<BusinessMemory>(
    "/business/",
    data
  );

  return res.data;
}
export default api;
