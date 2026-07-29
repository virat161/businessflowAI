import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Conversation {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

// GET ALL CONVERSATIONS
export const getConversations = async (): Promise<Conversation[]> => {
  const response = await API.get("/conversations/");
  return response.data;
};

// CREATE CONVERSATION
export const createConversation = async (
  title: string
): Promise<Conversation> => {
  const response = await API.post("/conversations/", {
    title,
  });

  return response.data;
};

// UPDATE CONVERSATION
export const updateConversation = async (
  id: number,
  title: string
): Promise<Conversation> => {
  const response = await API.put(`/conversations/${id}`, {
    title,
  });

  return response.data;
};

// DELETE CONVERSATION
export const deleteConversation = async (
  id: number
): Promise<void> => {
  await API.delete(`/conversations/${id}`);
};

export default API;