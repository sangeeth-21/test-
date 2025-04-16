import Layout from '../components/Layout'

const services = [
  {
    category: 'APP Development',
    items: ['Web Application', 'Mobile Application', 'Report Dashboard', 'Custom Software Management'],
  },
  {
    category: 'AI Automation',
    items: ['AI Consulting', 'Custom AI/ML solutions', 'Generative AI Solution', 'Business AI Solution'],
  },
  {
    category: 'AI Security',
    items: ['Computer Vision', 'IOT management', 'Security implementing', 'Security Management and support'],
  },
  {
    category: 'Digital Marketing',
    items: ['Lead generation', 'SEO', 'Business Promotions', 'Content Writing'],
  },
]

export default function Services() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Our Services</h1>
        <p className="text-xl text-gray-600 mb-12">
          We offer a wide range of services to help your business thrive in the digital age.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.category} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{service.category}</h2>
              <ul className="space-y-2">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

