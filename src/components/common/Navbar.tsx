export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b">
      <h1 className="text-2xl font-bold text-blue-600">
        BusinessFlow AI
      </h1>

      <div className="flex gap-6 items-center">
        <a href="/" className="hover:text-blue-600">
          Home
        </a>

        <a href="#features" className="hover:text-blue-600">
          Features
        </a>

        <a href="#pricing" className="hover:text-blue-600">
          Pricing
        </a>

        <a
          href="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </a>
      </div>
    </nav>
  );
}