import { useState } from 'react'

const items = [
  { q: 'How do I start a campaign?', a: 'Create an account, click Start a Campaign, and follow the guided setup to publish your campaign.' },
  { q: 'Is my payment secure?', a: 'Yes. We use trusted payment gateways and follow industry best practices for data security.' },
  { q: 'What fees are involved?', a: 'Platform and payment processing fees may apply. You can view estimated fees before publishing.' },
  { q: 'Can I donate anonymously?', a: 'Yes, you can choose to hide your name from public listings when donating.' }
]

export default function FAQ(){
  const [openIndex, setOpenIndex] = useState(0)
  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {items.map((it, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
              <button onClick={()=> setOpenIndex(openIndex === idx ? -1 : idx)} className="w-full text-left px-5 py-4 bg-gray-50 hover:bg-gray-100 font-medium">
                {it.q}
              </button>
              {openIndex === idx && (
                <div className="px-5 py-4 text-gray-700 bg-white">{it.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}



