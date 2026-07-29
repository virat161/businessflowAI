import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">BusinessFlow AI</h2>

            <p className="mt-5 leading-7 text-slate-400">
              Build your own AI workforce with intelligent AI tools that
              automate repetitive work, improve productivity and help
              businesses grow faster.
            </p>

            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="rounded-lg bg-slate-900 p-3 transition-all duration-300 hover:bg-blue-600 hover:scale-110"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="#"
                className="rounded-lg bg-slate-900 p-3 transition-all duration-300 hover:bg-blue-600 hover:scale-110"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="#"
                className="rounded-lg bg-slate-900 p-3 transition-all duration-300 hover:bg-blue-600 hover:scale-110"
              >
                <FaXTwitter size={18} />
              </a>

              <a
                href="mailto:contact@businessflow.ai"
                className="rounded-lg bg-slate-900 p-3 transition-all duration-300 hover:bg-blue-600 hover:scale-110"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-lg font-semibold">Product</h3>

            <ul className="mt-5 space-y-3 text-slate-400">
              <li>
                <Link to="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard"
                  className="transition hover:text-white"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link to="/chat" className="transition hover:text-white">
                  AI Chat
                </Link>
              </li>

              <li>
                <Link to="/pdf" className="transition hover:text-white">
                  PDF Summarizer
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold">Company</h3>

            <ul className="mt-5 space-y-3 text-slate-400">
              <li>
                <a href="#" className="transition hover:text-white">
                  About Us
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-white">
                  Careers
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold">Resources</h3>

            <ul className="mt-5 space-y-3 text-slate-400">
              <li>
                <a href="#" className="transition hover:text-white">
                  Documentation
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-white">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} BusinessFlow AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}