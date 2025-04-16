import Layout from './components/Layout'
import Carousel from './components/Carousel'
import Services from './components/Services'
import TrustedPartners from './components/TrustedPartners'
import Products from './components/Products'
import About from './components/About'
import Contact from './components/Contact'

export default function Home() {
  return (
    <Layout>
      <Carousel />
      <Services />
      <TrustedPartners />
      <Products />
      <About />
      <Contact />
    </Layout>
  )
}

