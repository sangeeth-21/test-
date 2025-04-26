"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from 'lucide-react'

export default function MembershipPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Membership</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Choose the perfect membership plan for your needs.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Basic",
              description: "Perfect for getting started",
              price: "Free",
              features: [
                "Access to public events",
                "Basic event creation",
                "Community support",
              ],
              popular: false,
            },
            {
              title: "Pro",
              description: "Best for event organizers",
              price: "$19/month",
              features: [
                "All Basic features",
                "Advanced event analytics",
                "Priority support",
                "Custom branding",
                "Unlimited events",
              ],
              popular: true,
            },
            {
              title: "Enterprise",
              description: "For large organizations",
              price: "Custom",
              features: [
                "All Pro features",
                "Dedicated account manager",
                "Custom integrations",
                "SLA support",
                "Advanced security",
              ],
              popular: false,
            },
          ].map((plan) => (
            <Card key={plan.title} className={plan.popular ? "border-primary" : undefined}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{plan.title}</CardTitle>
                  {plan.popular && (
                    <Badge variant="secondary">Popular</Badge>
                  )}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-6">{plan.price}</div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                  {plan.title === "Enterprise" ? "Contact Sales" : "Upgrade"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Current Plan</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Basic Plan</p>
                <p className="text-sm text-muted-foreground">Free</p>
              </div>
              <Button variant="outline">Manage Subscription</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

