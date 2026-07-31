# 🚀 BusinessFlow AI

> **An AI-powered business productivity platform built with React + FastAPI.**
>
> Chat with AI, summarize PDFs, generate professional emails, and manage business context — all from one modern dashboard.

---

## ✨ Features

### 🤖 AI Chat
- Chat with AI in real time
- Persistent conversation history
- Clean ChatGPT-like interface

### 📄 PDF Summarizer
- Upload PDF documents
- AI-generated concise summaries
- Fast processing

### ✉️ Email Generator
- Generate professional email replies
- Multiple writing tones
- Business-friendly formatting

### 🧠 Business Memory
- Store business context
- AI remembers previous conversations
- Context-aware responses

### 🔐 Authentication
- JWT Authentication
- Secure Login & Signup
- Protected Routes
- Logout Support

---

# 🖥 Dashboard

The application provides a centralized dashboard to access every AI tool.

- AI Chat
- PDF Summarizer
- Email Generator
- Business Memory

---

# ⚙ Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide Icons

## Backend

- FastAPI
- SQLAlchemy
- SQLite
- JWT Authentication
- Pydantic

## AI

- Google Gemini API
- Multi-provider Architecture (Upcoming)
- Groq Support (Upcoming)

---

# 📂 Project Structure

```
BusinessFlowAI
│
├── backend
│   ├── app
│   │   ├── routers
│   │   ├── services
│   │   ├── database.py
│   │   ├── models.py
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── routes
│   │
│   └── package.json
│
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/virat161/businessflowAI.git

cd businessflowAI
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs at

```
http://localhost:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
GOOGLE_API_KEY=your_google_api_key

JWT_SECRET_KEY=your_secret_key

JWT_ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60
```

---

# 📸 Screenshots

### Landing Page

> *(Add Screenshot Here)*

---

### Dashboard

> *(Add Screenshot Here)*

---

### AI Chat

> *(Add Screenshot Here)*

---

### PDF Summarizer

> *(Add Screenshot Here)*

---

### Email Generator

> *(Add Screenshot Here)*

---

# 🔒 Security

- JWT Authentication
- Password Hashing
- Protected Routes
- Secure API Access

---

# 🛣 Roadmap

## ✅ Completed

- Landing Page
- AI Chat
- PDF Summarizer
- Email Generator
- Business Memory
- JWT Authentication
- Protected Routes

## 🚧 In Progress

- AI Provider Manager
- Gemini + Groq Auto Fallback
- Deployment
- Better Business Memory

## 🎯 Future

- RAG Support
- File Chat
- Team Workspace
- Admin Dashboard
- AI Analytics
- Dark Mode

---

# 📈 Future AI Providers

- Google Gemini
- Groq
- OpenAI
- Anthropic Claude
- DeepSeek

---

# 🤝 Contributing

Contributions are welcome.

Feel free to fork this repository and submit a Pull Request.

---

# 👨‍💻 Author

**Virat Raj**

GitHub

https://github.com/virat161

---

# ⭐ Support

If you like this project,

⭐ Star the repository.

---

# 📄 License

MIT License
