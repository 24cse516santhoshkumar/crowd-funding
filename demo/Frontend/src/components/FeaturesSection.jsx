import { Lightbulb, ShieldCheck, Globe2, Users } from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "Bring Ideas to Life",
    description: "Turn your innovative projects into reality with community-driven funding.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Transparent",
    description: "Track every contribution with full transparency and trusted security.",
  },
  {
    icon: Globe2,
    title: "Global Reach",
    description: "Access backers from around the world to grow your campaign faster.",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with people who believe in your vision and want to help.",
  },
];

function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          Why Choose Our <span className="text-blue-600">Crowdfunding</span> Platform?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
            >
              <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
