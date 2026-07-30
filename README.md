# BusinessFlow AI

BusinessFlow AI is a React frontend with a FastAPI backend for persisting chat conversations and messages in SQLite.

## Run locally

### 1. Start the backend

The checked-in `backend/venv` points to a Python installation that is no longer available. Create a fresh virtual environment with Python 3.11 or newer:

```powershell
cd backend
py -3.11 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```

The API runs at `http://127.0.0.1:8000`. Open `http://127.0.0.1:8000/docs` to try the endpoints interactively.

### 2. Configure Gemini

Create a Gemini API key in [Google AI Studio](https://aistudio.google.com/app/apikey). Copy `backend/.env.example` to `backend/.env`, then replace the placeholder value:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.5-flash
```

Keep this key only in `backend/.env`; never add it to frontend files or commit it to Git. Restart the backend after adding or changing the key.

### 3. Start the frontend

In another terminal:

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

The frontend uses `http://127.0.0.1:8000` by default. To use a different API address, create `frontend/.env.local` with:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## Available API endpoints

- `GET /conversations/` lists saved chats.
- `POST /conversations/` creates a chat with a `title`.
- `PUT /conversations/{id}` updates a chat title.
- `DELETE /conversations/{id}` deletes a chat and its messages.
- `GET /messages/conversation/{id}` lists a chat's messages.
- `POST /messages/conversation/{id}` saves a message with `sender` and `message`.
- `DELETE /messages/{id}` deletes a message.
- `POST /messages/conversation/{id}/chat` sends a user message to Gemini and stores both messages.

## Current chat behavior

The chat page now loads, creates, titles, and saves conversations through the FastAPI API. With `GEMINI_API_KEY` configured, it also generates and stores Gemini replies.
