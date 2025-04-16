'use client'

import { useState } from 'react'

const partners = [
  { name: 'Aravind Eye Hospital', logo: '/logo1.jpg?height=100&width=100' },
  { name: 'Bommal', logo: '/logo2.jpg??height=100&width=100' },
  { name: 'Research Brain', logo: '/logo3.jpg??height=100&width=100' },
//   { name: 'THIRUMALA AGRO FOODS', logo: '/logo4.jpg?height=100&width=100' },
//   { name: 'KOWSALYA TRADERS', logo: '/logo5.jpg?height=100&width=100' },
//   { name: 'NOVEL NEST', logo: '/placeholder.svg?height=100&width=100' },
// ]
]
export default function TrustedPartners() {
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null)

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Trusted partner of successful enterprises
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12">
          We've partnered with some of the world's biggest brands to redesign complex web software that directly impacted thousands of users.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="relative"
              onMouseEnter={() => setHoveredPartner(partner.name)}
              onMouseLeave={() => setHoveredPartner(null)}
            >
              <img src={partner.logo || "/placeholder.svg"} alt={partner.name} className="w-24 h-24 object-contain" />
              {hoveredPartner === partner.name && (
                <div className="absolute inset-0 flex items-center justify-center bg-green-600 bg-opacity-90 text-white text-center p-2 rounded">
                  {partner.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

