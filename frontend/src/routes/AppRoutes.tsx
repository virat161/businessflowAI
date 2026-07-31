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

import ProtectedRoute from "@/components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pdf"
          element={
            <ProtectedRoute>
              <PdfPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reply"
          element={
            <ProtectedRoute>
              <ReplyGeneratorPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/memory"
          element={
            <ProtectedRoute>
              <BusinessPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/summarize"
          element={
            <ProtectedRoute>
              <PDFSummarizer />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </BrowserRouter>
  );
}