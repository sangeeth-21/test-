"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function NotificationSettingsPage() {
  const [notifyAbout, setNotifyAbout] = useState("all")
  const [emailSettings, setEmailSettings] = useState({
    communication: true,
    marketing: true,
    social: true,
    security: true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({
      notifyAbout,
      emailSettings,
    })
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Configure how you receive notifications.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Notify me about section */}
          <div className="space-y-4">
            <h2 className="text-base font-semibold">Notify me about...</h2>
            <RadioGroup
              value={notifyAbout}
              onValueChange={setNotifyAbout}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">All new messages</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="direct" id="direct" />
                <Label htmlFor="direct">Direct messages and mentions</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nothing" id="nothing" />
                <Label htmlFor="nothing">Nothing</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Email Notifications section */}
          <div className="space-y-4">
            <h2 className="text-base font-semibold">Email Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="communication">Communication emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about your account activity.
                  </p>
                </div>
                <Switch
                  id="communication"
                  checked={emailSettings.communication}
                  onCheckedChange={(checked) =>
                    setEmailSettings(prev => ({ ...prev, communication: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing">Marketing emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about new products, features, and more.
                  </p>
                </div>
                <Switch
                  id="marketing"
                  checked={emailSettings.marketing}
                  onCheckedChange={(checked) =>
                    setEmailSettings(prev => ({ ...prev, marketing: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="social">Social emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails for friend requests, follows, and more.
                  </p>
                </div>
                <Switch
                  id="social"
                  checked={emailSettings.social}
                  onCheckedChange={(checked) =>
                    setEmailSettings(prev => ({ ...prev, social: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="security">Security emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about your account activity and security.
                  </p>
                </div>
                <Switch
                  id="security"
                  checked={emailSettings.security}
                  onCheckedChange={(checked) =>
                    setEmailSettings(prev => ({ ...prev, security: checked }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full sm:w-auto">
            Update notifications
          </Button>
        </form>
      </div>
    </div>
  )
}

