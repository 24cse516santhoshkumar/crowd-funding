import { motion } from "framer-motion";
import { Rocket, DollarSign, BarChart, Heart } from "lucide-react";

const steps = [
  {
    icon: Rocket,
    title: "1. Create Campaign",
    description: "Set up your campaign with goals, story, and media.",
  },
  {
    icon: DollarSign,
    title: "2. Receive Donations",
    description: "Supporters contribute securely to your project.",
  },
  {
    icon: BarChart,
    title: "3. Track Progress",
    description: "Monitor funding status with live updates and analytics.",
  },
  {
    icon: Heart,
    title: "4. Make an Impact",
    description: "Turn your vision into reality and inspire others.",
  },
];

function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          How <span className="text-blue-600">It Works</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-blue-50 rounded-2xl p-6 shadow hover:shadow-lg"
            >
              <step.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
