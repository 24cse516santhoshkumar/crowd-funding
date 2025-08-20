import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-bold mb-6">
          Ready to Launch Your <span className="text-yellow-300">Campaign</span>?
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="text-lg mb-8">
          Join thousands of creators who turned their ideas into reality with our crowdfunding platform.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <Link
            to="/create"
            className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition"
          >
            Start a Campaign Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;
