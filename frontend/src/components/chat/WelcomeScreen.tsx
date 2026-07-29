type WelcomeScreenProps = {
  onSuggestionClick: (message: string) => void;
};

export default function WelcomeScreen({
  onSuggestionClick,
}: WelcomeScreenProps) {
  const suggestions = [
    {
      icon: "📈",
      text: "Create a business strategy",
    },
    {
      icon: "📄",
      text: "Summarize a PDF",
    },
    {
      icon: "📧",
      text: "Write a professional email",
    },
    {
      icon: "💡",
      text: "Generate marketing ideas",
    },
  ];

  return (
    <div className="flex flex-1 items-center justify-center px-6">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-3">
          BusinessFlow AI
        </h1>

        <p className="text-slate-500 text-lg mb-10">
          How can I help your business today?
        </p>

        <div className="grid gap-4">
          {suggestions.map((item) => (
            <button
              key={item.text}
              onClick={() => onSuggestionClick(item.text)}
              className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:border-blue-500 hover:shadow-md hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>

                <span className="font-medium text-slate-700">
                  {item.text}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}