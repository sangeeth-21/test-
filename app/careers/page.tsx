import Layout from '../components/Layout'

export default function Careers() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Careers at AIMindzTechnology</h1>
        <p className="text-xl text-gray-600 mb-12">
          Join our team of innovators and problem-solvers. While we don't have any current openings, we're always on the lookout for talented individuals who are passionate about technology and innovation.
        </p>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Opportunity to work on cutting-edge technologies</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Collaborative and innovative work environment</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Continuous learning and professional development</span>
            </li>
          </ul>
        </div>
        <div className="mt-8">
          <p className="text-lg text-gray-600">
            Interested in joining our team? Send your resume to <a href="mailto:careers@aimindztech.com" className="text-green-600 hover:underline">careers@aimindztech.com</a>. We'll keep your information on file and contact you when a suitable position becomes available.
          </p>
        </div>
      </div>
    </Layout>
  )
}

