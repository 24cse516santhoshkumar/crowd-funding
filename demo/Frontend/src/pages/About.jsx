export default function About(){
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* background image */}
      <img
        src="https://images.unsplash.com/photo-1529336953121-a0ce9a0bfbf3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=60"
        alt="Team collaborating about vision and impact"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/80 to-white/90" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-20 py-16">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">About CrowdFund</h1>
        <p className="text-gray-700 leading-7">
          CrowdFund is a simple, transparent crowdfunding platform where creators can launch
          campaigns and supporters can contribute to bring ideas to life. Track progress in
          real-time, celebrate milestones, and build community around meaningful projects.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="p-6 rounded-2xl bg-blue-50/80 backdrop-blur-sm">
            <h3 className="font-semibold text-blue-700 mb-2">Mission</h3>
            <p className="text-sm text-gray-700">Empower anyone to fund, build, and share impactful ideas.</p>
          </div>
          <div className="p-6 rounded-2xl bg-green-50/80 backdrop-blur-sm">
            <h3 className="font-semibold text-green-700 mb-2">How it works</h3>
            <p className="text-sm text-gray-700">Create a campaign, receive donations, and track progress.</p>
          </div>
          <div className="p-6 rounded-2xl bg-indigo-50/80 backdrop-blur-sm">
            <h3 className="font-semibold text-indigo-700 mb-2">Trust & Safety</h3>
            <p className="text-sm text-gray-700">Clear goals, visible totals, and secure payment flows.</p>
          </div>
        </div>
      </div>
    </section>
  )
}





