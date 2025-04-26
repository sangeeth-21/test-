import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Help Center</h1>
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I create an event?</AccordionTrigger>
              <AccordionContent>
                To create an event, navigate to the "Create Event" page from the main menu. Fill in the required details such as event title, date, location, and description. You can also add custom fields and set ticket prices if applicable.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How can I manage my bookings?</AccordionTrigger>
              <AccordionContent>
                You can manage your bookings by going to the "My Bookings" section in your account dashboard. Here, you can view, modify, or cancel your bookings as needed.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What payment methods are accepted?</AccordionTrigger>
              <AccordionContent>
                We accept various payment methods including credit/debit cards, PayPal, and bank transfers. The available options may vary depending on your location and the event organizer's preferences.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

