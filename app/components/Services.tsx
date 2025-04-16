const services = [
  {
    title: "Product Discovery",
    description: "Transform your vision into market-ready products with our expert discovery process.",
    icon: "🎯",
    link: "Learn more",
  },
  {
    title: "UI/UX Design",
    description: "Create engaging, intuitive interfaces that users love to interact with.",
    icon: "🎨",
    link: "View services",
  },
  {
    title: "Web Development",
    description: "Build powerful, scalable web applications using cutting-edge technologies.",
    icon: "💻",
    link: "Explore more",
  },
  {
    title: "Mobile Apps",
    description: "Develop native and cross-platform mobile applications that perform.",
    icon: "📱",
    link: "See details",
  },
  {
    title: "AI Solutions",
    description: "Implement smart AI solutions to automate and optimize your business.",
    icon: "🤖",
    link: "Discover more",
  },
  {
    title: "Cloud Services",
    description: "Scale your applications with reliable and secure cloud infrastructure.",
    icon: "☁️",
    link: "Learn more",
  },
]

export default function Services() {
  return (
    <section id="services" className="py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {/* <h2 className="heading-1">Our Services</h2> */}
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Our Services
        </h2>
          <h2 className="text-3xl font-extrabold text-center text-gray-900">Transforming ideas into powerful solutions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.title} className="card-hover bg-white rounded-xl p-6 border border-green-100">
              <div className="flex items-start space-x-4">
                <span className="text-5xl">{service.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-lg mb-3">{service.description}</p>
                  <a
                    href="#"
                    className="text-green-600 hover:text-green-700 text-lg font-medium inline-flex items-center group"
                  >
                    {service.link}
                    <svg
                      className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

