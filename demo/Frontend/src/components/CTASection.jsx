import { Link } from "react-router-dom";

function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Launch Your <span className="text-yellow-300">Campaign</span>?
        </h2>
        <p className="text-lg mb-8">
          Join thousands of creators who turned their ideas into reality with our crowdfunding platform.
        </p>
        <Link
          to="/create"
          className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition"
        >
          Start a Campaign Now
        </Link>
      </div>
    </section>
  );
}

export default CTASection;
