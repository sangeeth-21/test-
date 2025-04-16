import Layout from '../components/Layout'

export default function Products() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Our Products</h1>
        <p className="text-xl text-gray-600 mb-12">
          We offer a range of innovative products designed to streamline your business processes and boost productivity.
        </p>
        {/* Add product listings here */}
      </div>
    </Layout>
  )
}

