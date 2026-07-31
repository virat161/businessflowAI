import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import DashboardPage from "@/pages/DashboardPage";
import ChatPage from "@/pages/ChatPage";
import PdfPage from "@/pages/PdfPage";
import ReplyGeneratorPage from "@/pages/ReplyGeneratorPage";
import BusinessPage from "@/pages/BusinessPage";
import { PDFSummarizer } from "@/pages/SummarizePage";
import NotFoundPage from "@/pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/pdf" element={<PdfPage />} />
        <Route path="/reply" element={<ReplyGeneratorPage />} />
        <Route path="/memory" element={<BusinessPage />} />
        <Route path="/summarize" element={<PDFSummarizer />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}