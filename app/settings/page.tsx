"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Settings, User, Palette, Bell, Shield, Info, Github, Twitter, Camera, X } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Accent colors for appearance tab
const ACCENT_COLORS = [
  { value: "zinc", hex: "#18181B", className: "bg-zinc-900" },
  { value: "purple", hex: "#7C3AED", className: "bg-purple-600" },
  { value: "violet", hex: "#6D28D9", className: "bg-violet-600" },
  { value: "indigo", hex: "#4F46E5", className: "bg-indigo-600" },
  { value: "blue", hex: "#2563EB", className: "bg-blue-600" },
  { value: "sky", hex: "#0284C7", className: "bg-sky-600" },
  { value: "cyan", hex: "#0891B2", className: "bg-cyan-600" },
  { value: "green", hex: "#059669", className: "bg-green-600" }
]

export default function SettingsPage() {
  const [selectedColor, setSelectedColor] = useState(ACCENT_COLORS[3])
  const [customColor, setCustomColor] = useState("")
  const [theme, setTheme] = useState("system")
  const [language, setLanguage] = useState("english")
  const [profileImage, setProfileImage] = useState("/profile-placeholder.jpg")
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }
  
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-2">
        <Settings className="h-5 w-5" />
        <h1 className="text-2xl font-semibold">Settings</h1>
      </div>
      <p className="text-sm text-muted-foreground mb-8">
        Manage your account settings and preferences.
      </p>
      
      <div className="space-y-16">
        {/* Account Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <h2 className="text-lg font-medium">Account</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Update your account settings and manage your profile.
          </p>
          <Separator />
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile information and email address.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Image */}
              <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative group cursor-pointer">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={profileImage} alt="Profile" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Change profile picture</DialogTitle>
                      <DialogDescription>
                        Upload a new profile picture or choose from the options below.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="flex justify-center">
                        <Avatar className="h-32 w-32">
                          <AvatarImage src={profileImage} alt="Profile" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="grid gap-4">
                        <Label htmlFor="picture" className="text-center">Upload a picture</Label>
                        <Input 
                          id="picture" 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageChange}
                          className="cursor-pointer"
                        />
                      </div>
                      <div className="flex justify-center gap-2 mt-2">
                        <Button variant="outline" size="sm" className="rounded-full h-10 w-10 p-0">
                          <span className="sr-only">Red</span>
                          <span className="h-full w-full rounded-full bg-red-500" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-full h-10 w-10 p-0">
                          <span className="sr-only">Green</span>
                          <span className="h-full w-full rounded-full bg-green-500" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-full h-10 w-10 p-0">
                          <span className="sr-only">Blue</span>
                          <span className="h-full w-full rounded-full bg-blue-500" />
                        </Button>
                      </div>
                    </div>
                    <DialogFooter className="flex space-x-2 sm:justify-between">
                      <Button type="button" variant="destructive" size="sm">
                        <X className="mr-2 h-4 w-4" />
                        Remove photo
                      </Button>
                      <div className="flex space-x-2">
                        <DialogClose asChild>
                          <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button type="submit">Save changes</Button>
                        </DialogClose>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <div className="space-y-4 flex-1">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </section>
        
        {/* Appearance Section 
        <section className="space-y-6">
  <div className="flex items-center gap-2">
    <Palette className="h-5 w-5" />
    <h2 className="text-lg font-medium">Appearance</h2>
  </div>
  <p className="text-sm text-muted-foreground">
    Change how the application looks and feels in your browser.
  </p>
  <Separator />

  <div className="space-y-4">
    <div>
      <h3 className="text-md font-medium">Accent color</h3>
      <p className="text-sm text-muted-foreground">
        Update your dashboard to your brand color.
      </p>
    </div>
    <div className="flex flex-wrap gap-3 items-center">
      {ACCENT_COLORS.map((color) => (
        <button
          key={color.value}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center ring-offset-2",
            color.className,
            selectedColor.value === color.value && "ring-2 ring-primary"
          )}
          onClick={() => setSelectedColor(color)}
        >
          {selectedColor.value === color.value && (
            <div className="w-2.5 h-2.5 rounded-full bg-white" />
          )}
        </button>
      ))}
      <div className="flex items-center gap-2">
        <Label htmlFor="custom-color" className="sr-only">Custom color</Label>
        <Input
          id="custom-color"
          value={customColor}
          onChange={(e) => setCustomColor(e.target.value)}
          placeholder="# F5F5F5"
          className="w-24 h-8 px-2"
        />
      </div>
    </div>
  </div>

  <div className="space-y-4">
    <div>
      <h3 className="text-md font-medium">Interface theme</h3>
      <p className="text-sm text-muted-foreground">
        Select or customize your UI theme.
      </p>
    </div>
    <RadioGroup
      value={theme}
      onValueChange={(value) => {
        setTheme(value); // Update the theme state
        applyTheme(value); // Apply the selected theme to the application
      }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
    >
      {[
        {
          value: "system",
          label: "System preference",
          preview: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=250&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        },
        {
          value: "light",
          label: "Light",
          preview: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=250&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        },
        {
          value: "dark",
          label: "Dark",
          preview: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=250&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        }
      ].map((option) => (
        <Label
          key={option.value}
          className={cn(
            "relative flex flex-col gap-2 rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
            theme === option.value && "border-primary"
          )}
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value={option.value} id={option.value} />
            <span className="text-sm font-medium">{option.label}</span>
          </div>
          <div className="rounded-md border bg-background overflow-hidden">
            <img
              src={option.preview}
              alt={`${option.label} theme preview`}
              className="w-full h-auto rounded-md"
            />
          </div>
        </Label>
      ))}
    </RadioGroup>
  </div>

  <div className="flex items-center justify-between py-4 border-t">
    <div>
      <h3 className="text-md font-medium">Language</h3>
      <p className="text-sm text-muted-foreground">
        Select your preferred language.
      </p>
    </div>
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="english">English</SelectItem>
        <SelectItem value="spanish">Spanish</SelectItem>
        <SelectItem value="french">French</SelectItem>
        <SelectItem value="german">German</SelectItem>
        <SelectItem value="chinese">Chinese</SelectItem>
        <SelectItem value="japanese">Japanese</SelectItem>
      </SelectContent>
    </Select>
  </div>

  <Button className="mt-4">Save preferences</Button>
</section> */}
        
        {/* Notifications Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <h2 className="text-lg font-medium">Notifications</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Configure how you receive notifications.
          </p>
          <Separator />
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Choose what types of emails you want to receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="marketing" className="flex-1">
                  Marketing emails
                </Label>
                <Switch id="marketing" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="social" className="flex-1">
                  Social notifications
                </Label>
                <Switch id="social" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="security" className="flex-1">
                  Security alerts
                </Label>
                <Switch id="security" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="promotions" className="flex-1">
                  Promotions and offers
                </Label>
                <Switch id="promotions" />
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/settings/notifications">
                  Manage notification preferences
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </section>
        
        {/* Privacy Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <h2 className="text-lg font-medium">Privacy & Security</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage your privacy settings and security preferences.
          </p>
          <Separator />
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control your privacy preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="data-collection" className="flex-1">
                  Allow data collection for service improvement
                </Label>
                <Switch id="data-collection" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="personalized-ads" className="flex-1">
                  Show personalized advertisements
                </Label>
                <Switch id="personalized-ads" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="cookies" className="flex-1">
                  Accept all cookies
                </Label>
                <Switch id="cookies" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/settings/privacy">
                  Manage privacy settings
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Manage your account security.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm new password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Change password</Button>
            </CardFooter>
          </Card>
        </section>
        
        {/* About Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            <h2 className="text-lg font-medium">About</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Information about the platform and its features.
          </p>
          <Separator />
          
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
        </section>
      </div>
    </div>
  )
}