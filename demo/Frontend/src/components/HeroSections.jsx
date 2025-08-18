// src/components/HeroSection.jsx
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import FlowImage from "../assets/flowchart.png"; // <- use your uploaded flowchart image

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white py-20 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Content */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Empower Ideas Through <span className="text-blue-600">Crowdfunding</span>
          </h1>
          <p className="text-lg text-gray-600">
            Launch campaigns, support innovative projects, and be part of the change. 
            Our platform makes funding transparent, simple, and impactful.
          </p>

          {/* Buttons */}
          <div className="flex space-x-4">
            <Link
              to="/create"
              className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition flex items-center gap-2"
            >
              Start a Campaign <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/campaigns"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50 transition"
            >
              Explore Campaigns
            </Link>
          </div>
        </motion.div>

        {/* Right Side - Flowchart Image */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <img
            src={FlowImage}
            alt="Crowdfunding Flow"
            className="w-full max-w-lg drop-shadow-lg rounded-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
