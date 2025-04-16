const navigation = {
  main: [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Products", href: "#products" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-green-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h3>
            <ul className="space-y-4">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-base text-gray-600 hover:text-green-600">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 md:mt-0 text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
            <address className="text-base text-gray-600 not-italic">
              <p>123 Business Street</p>
              <p>Tech City, TC 12345</p>
              <p className="mt-2">Email: info@aimindztech.com</p>
              <p>Phone: +1 (234) 567-8900</p>
            </address>
          </div>
        </div>
        <div className="mt-8 border-t border-green-100 pt-8">
          <p className="text-base text-gray-500 text-center">
            &copy; {new Date().getFullYear()} AIMindzTechnology. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

