// src/pages/HomePage.jsx
import { motion } from "framer-motion";
import { ArrowRight, Coins, Users, Target, Lightbulb, ShieldCheck, Globe2, Rocket, DollarSign, BarChart, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
        {/* background image */}
        <div aria-hidden className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=60"
            alt="Crowdfunding community collaboration"
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/90" />
        </div>
        {/* subtle blobs */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-20 py-24 grid gap-12 place-items-center text-center">
          {/* Left */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Empower Ideas through <span className="text-brand-600">Crowdfunding</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Launch campaigns, support bold projects, and track progress in real-time. Transparent. Simple. Impactful.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 justify-center">
              <Link
                to="/create"
                className="inline-flex items-center gap-2 bg-accent-500 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-accent-600 transition"
              >
                Start a Campaign <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/campaigns"
                className="inline-flex items-center gap-2 border border-brand-600 text-brand-700 px-6 py-3 rounded-full font-semibold hover:bg-brand-50 transition"
              >
                Explore Campaigns
              </Link>
            </div>

            {/* quick badges */}
            <div className="flex flex-wrap gap-3 pt-4 justify-center">
              <Badge icon={<ShieldCheck className="w-4 h-4" />}>Secure</Badge>
              <Badge icon={<Globe2 className="w-4 h-4" />}>Global Reach</Badge>
              <Badge icon={<BarChart className="w-4 h-4" />}>Live Tracking</Badge>
            </div>
          </motion.div>

          
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <section className="bg-white border-y border-gray-200">
        <div className="marquee">
          <div className="marquee-track text-brand-700 font-semibold">
            <span>Fuel Dreams</span>
            <span>•</span>
            <span>Back Innovation</span>
            <span>•</span>
            <span>Empower Creators</span>
            <span>•</span>
            <span>Join the Movement</span>
            <span>•</span>
            <span>Fuel Dreams</span>
            <span>•</span>
            <span>Back Innovation</span>
            <span>•</span>
            <span>Empower Creators</span>
            <span>•</span>
            <span>Join the Movement</span>
            {/* duplicate for seamless loop */}
            <span>•</span>
            <span>Fuel Dreams</span>
            <span>•</span>
            <span>Back Innovation</span>
            <span>•</span>
            <span>Empower Creators</span>
            <span>•</span>
            <span>Join the Movement</span>
            <span>•</span>
            <span>Fuel Dreams</span>
            <span>•</span>
            <span>Back Innovation</span>
            <span>•</span>
            <span>Empower Creators</span>
            <span>•</span>
            <span>Join the Movement</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose <span className="text-brand-600">Our Platform</span>?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={<Lightbulb className="w-12 h-12 text-brand-600" />} title="Bring Ideas to Life"
              desc="Turn innovative projects into reality with community funding." />
            <FeatureCard icon={<ShieldCheck className="w-12 h-12 text-brand-600" />} title="Secure & Transparent"
              desc="Clear progress, trusted payments, and real-time updates." />
            <FeatureCard icon={<Globe2 className="w-12 h-12 text-brand-600" />} title="Global Reach"
              desc="Connect with backers worldwide and grow faster." />
            <FeatureCard icon={<Users className="w-12 h-12 text-brand-600" />} title="Community Support"
              desc="Build a loyal audience that believes in your vision." />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            How <span className="text-brand-600">It Works</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StepCard icon={<Rocket className="w-10 h-10" />} title="1. Create Campaign"
              desc="Set your goal, craft your story, add media & launch." delay={0} />
            <StepCard icon={<DollarSign className="w-10 h-10" />} title="2. Receive Donations"
              desc="Backers contribute securely using multiple payment options." delay={0.1} />
            <StepCard icon={<BarChart className="w-10 h-10" />} title="3. Track Progress"
              desc="See live totals, milestones, and share updates with backers." delay={0.2} />
            <StepCard icon={<Heart className="w-10 h-10" />} title="4. Make an Impact"
              desc="Complete the project and celebrate with your community." delay={0.3} />
          </div>

          {/* mini flow line */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-600">
            <FlowPill icon={<Users className="w-4 h-4" />} text="Create" />
            <Arrow />
            <FlowPill icon={<Coins className="w-4 h-4" />} text="Donate" />
            <Arrow />
            <FlowPill icon={<Target className="w-4 h-4" />} text="Reach Goal" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center text-white bg-gradient-to-r from-brand-600 to-brand-800">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">Ready to Launch Your Campaign?</h2>
          <p className="text-lg text-blue-100 mb-8">
            Join thousands of creators turning their ideas into reality with community support.
          </p>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 bg-white text-brand-700 px-8 py-3 rounded-full font-semibold shadow hover:bg-brand-50 transition"
          >
            Start Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* FOOTER (simple, clean) */}
      <footer className="py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} CrowdFund • Built with ❤️ for creators
      </footer>
    </div>
  );
}

/* ========== Small presentational helpers (keep file self-contained) ========== */
function Badge({ children, icon }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/70 backdrop-blur px-3 py-1 text-sm shadow">
      {icon}{children}
    </span>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
      <p className="text-gray-600 text-center">{desc}</p>
    </div>
  );
}

function StepCard({ icon, title, desc, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl p-6 shadow hover:shadow-lg bg-blue-50"
    >
      <div className="mb-4 flex justify-center text-blue-600">{icon}</div>
      <h3 className="text-lg font-semibold text-center mb-2">{title}</h3>
      <p className="text-gray-700 text-center">{desc}</p>
    </motion.div>
  );
}

function FlowPill({ icon, text }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100">
      {icon}
      <span className="font-medium">{text}</span>
    </span>
  );
}

function Arrow() {
  return <span className="mx-2 text-gray-400">→</span>;
}
