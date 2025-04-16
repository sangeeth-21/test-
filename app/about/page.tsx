import Layout from '../components/Layout'

export default function About() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">About AIMindzTechnology</h1>
        <div className="prose prose-lg text-gray-600">
          <p>
            Our goal is to streamline processes for our customers and help them achieve optimized organizational performance. From web and mobile application development, to e-commerce and digital marketing, we offer a wide range of services to meet the unique needs of any business.
          </p>
          <p>
            We specialize in data science and artificial intelligence, utilizing leading technologies such as machine learning and natural language processing to drive growth and success for our clients. At AI Mindz Technologies, we are dedicated to providing exceptional software solutions and dedicated customer support.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
          <p>
            To empower businesses with innovative technology solutions that drive growth, efficiency, and success in the digital age.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Values</h2>
          <ul className="list-disc pl-6">
            <li>Innovation: We constantly push the boundaries of what's possible in technology.</li>
            <li>Quality: We deliver high-quality solutions that exceed our clients' expectations.</li>
            <li>Collaboration: We work closely with our clients to ensure their success.</li>
            <li>Integrity: We conduct our business with honesty and transparency.</li>
            <li>Continuous Learning: We stay at the forefront of technological advancements.</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}

