import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function SendFeedbackPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Send Feedback</h1>
      <form className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Your name" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Your email" />
        </div>
        <div>
          <Label htmlFor="feedback">Feedback</Label>
          <Textarea id="feedback" placeholder="Your feedback" rows={5} />
        </div>
        <div>
          <Label htmlFor="image">Upload Image (Optional)</Label>
          <Input id="image" type="file" accept="image/*" className="mt-1" />
        </div>
        <Button type="submit">Submit Feedback</Button>
      </form>
    </div>
  );
}