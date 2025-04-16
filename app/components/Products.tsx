import Image from "next/image"

export default function Products() {
  return (
    <section id="products" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Our Product
        </h2>
        {/* <h2 className="heading-1 text-center">Our Products</h2> */}
        <div className="md:flex bg-green-50 rounded-xl overflow-hidden shadow-lg mt-12">
          <div className="md:w-1/3 p-6 bg-green-600 text-white">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-4">Hospital Management System</h3>
                <p className="text-xl mb-6">A comprehensive solution for modern healthcare facilities</p>
              </div>
              <div className="relative h-48 md:h-64">
                <Image
                  src="/product.jpeg"
                  alt="Hospital Management System"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
          <div className="md:w-2/3 p-8">
            <p className="paragraph">
              Our Hospital Management System simplifies patient registration, vital monitoring, doctor-prescription
              management, and billing. It features a reception dashboard for quick access to patient data, an
              admin-controlled pharmacy module for inventory and pricing, and automated discount calculations for
              transparent billing.
            </p>
            <h4 className="heading-3 mb-4">Key Features</h4>

              <ul className="space-y-4 text-gray-600 text-lg">
                <li className="flex items-start">
                 <svg className="w-6 h-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                 <span>Patient Management: Easy registration, vital monitoring, and record management</span>
                 </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Doctor Integration: Secure access to patient data and prescription management</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Billing & Payments: Automated bill generation with dynamic discount calculations</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Pharmacy Management: Admin-controlled inventory and real-time stock tracking</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

