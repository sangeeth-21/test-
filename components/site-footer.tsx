import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Github, Youtube } from 'lucide-react'
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/">
              <div className="w-10 h-10 bg-gray-800 rounded-full" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 col-span-2 sm:col-span-3">
            <div className="space-y-4 col-span-1">
              <div>
                <h3 className="font-semibold mb-3">Solutions</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">Marketing</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">Analytics</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">Commerce</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">Insights</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Support</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">Pricing</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">Documentation</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">Guides</Link></li>
                </ul>
              </div>
            </div>
            <div className="space-y-4 col-span-1">
              <div>
                <h3 className="font-semibold mb-3">Company</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">About</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">Jobs</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">Press</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">Terms</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">Privacy</Link></li>
                  <li><Link href="#" className="text-gray-600 hover:text-gray-900">Cookies</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>


        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">© 2024 Your Company, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              <Github className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              <Youtube className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

