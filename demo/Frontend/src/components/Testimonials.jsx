const quotes = [
  {
    name: 'Aarav Sharma',
    role: 'Tech Founder',
    text: 'We reached our funding goal in 10 days. The transparency and community support were incredible.'
  },
  {
    name: 'Diya Patel',
    role: 'Community Organizer',
    text: 'This platform helped us raise funds for our local library within weeks.'
  },
  {
    name: 'Rahul Verma',
    role: 'Student Innovator',
    text: 'Our student robotics project came to life thanks to generous backers.'
  }
]

export default function Testimonials(){
  return (
    <section className="py-20 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((q, i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-6">
              <p className="text-gray-700">“{q.text}”</p>
              <div className="mt-4 font-semibold text-gray-900">{q.name}</div>
              <div className="text-sm text-gray-500">{q.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}



