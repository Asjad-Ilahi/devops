"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Calendar, Home, Layers, MenuIcon, Moon, SettingsIcon, Sun, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleSaveProfile = (e) => {
    e.preventDefault()
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  const handleSavePassword = (e) => {
    e.preventDefault()
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    })
  }

  const handleSaveNotifications = (e) => {
    e.preventDefault()
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated.",
    })
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 z-50 flex w-64 flex-col bg-background border-r md:relative`}
        initial={false}
        animate={{
          x: isSidebarOpen ? 0 : -256,
          width: isSidebarOpen ? 256 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex h-14 items-center px-4 border-b">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
              <span className="font-bold text-xs text-primary-foreground">P</span>
            </div>
            <motion.span
              className="font-bold text-lg"
              animate={{ opacity: isSidebarOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              Pulse
            </motion.span>
          </div>
        </div>

        <nav className="flex-1 overflow-auto py-4">
          <ul className="space-y-1 px-2">
            {[
              { icon: Home, label: "Dashboard", href: "/dashboard" },
              { icon: Layers, label: "Projects", href: "/dashboard/projects" },
              { icon: Calendar, label: "Calendar", href: "/dashboard/calendar" },
              { icon: SettingsIcon, label: "Settings", active: true, href: "/dashboard/settings" },
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted ${
                    item.active ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <motion.span animate={{ opacity: isSidebarOpen ? 1 : 0 }} transition={{ duration: 0.2 }}>
                    {item.label}
                  </motion.span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <motion.div
              className="flex-1 truncate"
              animate={{ opacity: isSidebarOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-sm font-medium">John Doe</div>
              <div className="text-xs text-muted-foreground truncate">john@example.com</div>
            </motion.div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <SettingsIcon className="h-4 w-4" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <motion.div
        className="flex flex-1 flex-col"
        animate={{
          marginLeft: isSidebarOpen ? 0 : 0,
          width: isSidebarOpen ? "calc(100% - 256px)" : "100%",
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden md:flex"
          >
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold">Settings</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)} className="relative">
              <Sun className={`h-5 w-5 transition-all ${isDarkMode ? "scale-0 opacity-0" : "scale-100 opacity-100"}`} />
              <Moon
                className={`absolute h-5 w-5 transition-all ${isDarkMode ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
              />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary"></span>
            </Button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <h1 className="text-2xl font-bold">Account Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and settings</p>
          </motion.div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="mb-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <motion.div variants={fadeInUp}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Update your account profile information and settings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSaveProfile}>
                        <div className="space-y-6">
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex flex-col items-center gap-4">
                              <Avatar className="h-24 w-24">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback>JD</AvatarFallback>
                              </Avatar>
                              <Button variant="outline" size="sm">
                                Change Avatar
                              </Button>
                            </div>

                            <div className="flex-1 space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="first-name">First Name</Label>
                                  <Input id="first-name" defaultValue="John" />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="last-name">Last Name</Label>
                                  <Input id="last-name" defaultValue="Doe" />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" defaultValue="john@example.com" />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="job-title">Job Title</Label>
                                <Input id="job-title" defaultValue="Product Designer" />
                              </div>
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                              id="bio"
                              rows={4}
                              defaultValue="I'm a product designer with 5+ years of experience in creating user-centered digital products."
                            />
                            <p className="text-xs text-muted-foreground">
                              Brief description for your profile. URLs are hyperlinked.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="timezone">Timezone</Label>
                            <select
                              id="timezone"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              defaultValue="America/New_York"
                            >
                              <option value="America/New_York">Eastern Time (US & Canada)</option>
                              <option value="America/Chicago">Central Time (US & Canada)</option>
                              <option value="America/Denver">Mountain Time (US & Canada)</option>
                              <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                              <option value="Europe/London">London</option>
                              <option value="Europe/Paris">Paris</option>
                              <option value="Asia/Tokyo">Tokyo</option>
                            </select>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                          <Button type="submit">Save Changes</Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="password">
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <motion.div variants={fadeInUp}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                      <CardDescription>Update your password to keep your account secure</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSavePassword}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" />
                            <p className="text-xs text-muted-foreground">
                              Password must be at least 8 characters long and include a mix of letters, numbers, and
                              symbols.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input id="confirm-password" type="password" />
                          </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                          <Button type="submit">Update Password</Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeInUp} className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Two-Factor Authentication</CardTitle>
                      <CardDescription>Add an extra layer of security to your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="font-medium">Two-factor authentication</p>
                          <p className="text-sm text-muted-foreground">
                            Protect your account with an additional security layer
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="notifications">
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <motion.div variants={fadeInUp}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>Choose how and when you want to be notified</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSaveNotifications}>
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                            <div className="space-y-4">
                              {[
                                {
                                  id: "email-projects",
                                  label: "Project updates",
                                  description: "Get notified about project changes and milestones",
                                },
                                {
                                  id: "email-comments",
                                  label: "Comments and mentions",
                                  description: "Receive emails when someone mentions you or comments on your work",
                                },
                                {
                                  id: "email-reminders",
                                  label: "Task reminders",
                                  description: "Get reminders about upcoming and overdue tasks",
                                },
                                {
                                  id: "email-newsletter",
                                  label: "Product newsletter",
                                  description: "Receive our monthly newsletter with product updates and tips",
                                },
                              ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between">
                                  <div className="space-y-0.5">
                                    <Label htmlFor={item.id}>{item.label}</Label>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                  </div>
                                  <Switch id={item.id} defaultChecked={i < 3} />
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          <div>
                            <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                            <div className="space-y-4">
                              {[
                                {
                                  id: "push-projects",
                                  label: "Project updates",
                                  description: "Get notified about project changes and milestones",
                                },
                                {
                                  id: "push-comments",
                                  label: "Comments and mentions",
                                  description:
                                    "Receive notifications when someone mentions you or comments on your work",
                                },
                                {
                                  id: "push-reminders",
                                  label: "Task reminders",
                                  description: "Get reminders about upcoming and overdue tasks",
                                },
                              ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between">
                                  <div className="space-y-0.5">
                                    <Label htmlFor={item.id}>{item.label}</Label>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                  </div>
                                  <Switch id={item.id} defaultChecked={i < 2} />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                          <Button type="submit">Save Preferences</Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="appearance">
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <motion.div variants={fadeInUp}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Appearance</CardTitle>
                      <CardDescription>Customize how the application looks and feels</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Theme</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div
                              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                                !isDarkMode ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                              }`}
                              onClick={() => setIsDarkMode(false)}
                            >
                              <div className="flex items-center justify-between mb-4">
                                <span className="font-medium">Light</span>
                                {!isDarkMode && <CheckIcon className="h-5 w-5 text-primary" />}
                              </div>
                              <div className="h-20 bg-background border rounded-md"></div>
                            </div>

                            <div
                              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                                isDarkMode ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                              }`}
                              onClick={() => setIsDarkMode(true)}
                            >
                              <div className="flex items-center justify-between mb-4">
                                <span className="font-medium">Dark</span>
                                {isDarkMode && <CheckIcon className="h-5 w-5 text-primary" />}
                              </div>
                              <div className="h-20 bg-slate-800 rounded-md"></div>
                            </div>

                            <div className={`border rounded-lg p-4 cursor-pointer transition-colors hover:bg-muted/50`}>
                              <div className="flex items-center justify-between mb-4">
                                <span className="font-medium">System</span>
                              </div>
                              <div className="h-20 bg-gradient-to-r from-background to-slate-800 rounded-md"></div>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-lg font-medium mb-4">Sidebar Position</h3>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="sidebar-left"
                                name="sidebar-position"
                                className="h-4 w-4 border-primary text-primary focus:ring-primary"
                                defaultChecked
                              />
                              <Label htmlFor="sidebar-left">Left</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="sidebar-right"
                                name="sidebar-position"
                                className="h-4 w-4 border-primary text-primary focus:ring-primary"
                              />
                              <Label htmlFor="sidebar-right">Right</Label>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-lg font-medium mb-4">Density</h3>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="density-comfortable"
                                name="density"
                                className="h-4 w-4 border-primary text-primary focus:ring-primary"
                                defaultChecked
                              />
                              <Label htmlFor="density-comfortable">Comfortable</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="density-compact"
                                name="density"
                                className="h-4 w-4 border-primary text-primary focus:ring-primary"
                              />
                              <Label htmlFor="density-compact">Compact</Label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end">
                        <Button>Save Preferences</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </main>
      </motion.div>
    </div>
  )
}

function LogOut(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  )
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

