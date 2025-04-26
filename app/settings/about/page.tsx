import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Twitter } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">About</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Information about the platform and its features.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tech Events Platform</CardTitle>
            <CardDescription>Version 2.0.0</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Tech Events is a platform dedicated to connecting technology enthusiasts,
              professionals, and innovators through a wide range of events and conferences.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button variant="outline" size="sm">
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Legal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="link" className="h-auto p-0">Terms of Service</Button>
            <Button variant="link" className="h-auto p-0">Privacy Policy</Button>
            <Button variant="link" className="h-auto p-0">Cookie Policy</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Need help? Our support team is available 24/7.
            </p>
            <Button>Contact Support</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

