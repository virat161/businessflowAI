import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MessageBubbleProps = {
  message: string;
  sender: "user" | "ai";
};

export default function MessageBubble({
  message,
  sender,
}: MessageBubbleProps) {
  const isUser = sender === "user";

  return (
    <div className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-3xl px-5 py-4 rounded-2xl leading-7 break-words ${
          isUser
            ? "bg-blue-600 text-white rounded-br-md shadow-lg whitespace-pre-wrap"
            : "bg-white border border-slate-200 rounded-bl-md shadow-md text-slate-800"
        }`}
      >
        {isUser ? (
          message
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold mb-4">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-semibold mb-3">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold mb-2">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mb-3">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc ml-6 mb-3">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal ml-6 mb-3">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="mb-1">{children}</li>
              ),
              code: ({ children }) => (
                <code className="bg-slate-100 px-1 py-0.5 rounded text-red-600">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-slate-900 text-white rounded-lg p-4 overflow-x-auto my-4">
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-slate-300 pl-4 italic my-4">
                  {children}
                </blockquote>
              ),
            }}
          >
            {message}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}