"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Bell, Calendar, Home, Layers, MenuIcon, PieChart, Plus, Search, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { logout } from "./logout"
import { AddProjectModal } from "@/components/add-project-modal"
import { getUserProjects } from "@/app/actions/projects"

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false)
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState({ name: "User", username: "user" })

  useEffect(() => {
    // Get user from JWT token
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user")
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error)
      }
    }

    fetchUserData()

    async function loadProjects() {
      try {
        const userProjects = await getUserProjects()
        setProjects(userProjects)
      } catch (error) {
        console.error("Failed to load projects:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [])

  const refreshProjects = async () => {
    setIsLoading(true)
    const userProjects = await getUserProjects()
    setProjects(userProjects)
    setIsLoading(false)
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
              { icon: Home, label: "Dashboard", active: true, href: "/dashboard" },
              { icon: Layers, label: "Projects", href: "/dashboard/projects" },
              { icon: Calendar, label: "Calendar", href: "/dashboard/calendar" },
              { icon: Settings, label: "Settings", href: "/dashboard/settings" },
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

          <div className="mt-6 px-3">
            <div className="rounded-lg bg-muted p-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-full bg-primary/10 p-1">
                  <PieChart className="h-4 w-4 text-primary" />
                </div>
                <motion.span
                  className="text-sm font-medium"
                  animate={{ opacity: isSidebarOpen ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  Usage
                </motion.span>
              </div>
              <motion.div animate={{ opacity: isSidebarOpen ? 1 : 0 }} transition={{ duration: 0.2 }}>
                <Progress value={65} className="h-1 mb-2" />
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium">65%</span> of your monthly usage
                </p>
              </motion.div>
            </div>
          </div>
        </nav>

        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>
                {user.name.charAt(0)}
                {user.name.split(" ")[1]?.charAt(0) || ""}
              </AvatarFallback>
            </Avatar>
            <motion.div
              className="flex-1 truncate"
              animate={{ opacity: isSidebarOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-sm font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground truncate">@{user.username}</div>
            </motion.div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout()}>
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
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>
                      {user.name.charAt(0)}
                      {user.name.split(" ")[1]?.charAt(0) || ""}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-6"
          >
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Button size="sm" className="hidden sm:flex" onClick={() => setIsAddProjectModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </motion.div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <motion.div
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {[
                  { title: "Total Users", value: "12,345", change: "+12%", changeType: "positive" },
                  { title: "Active Projects", value: "48", change: "+3", changeType: "positive" },
                  { title: "Conversion Rate", value: "3.2%", change: "-0.4%", changeType: "negative" },
                  { title: "Revenue", value: "$34,567", change: "+8%", changeType: "positive" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{item.value}</div>
                        <p className={`text-xs ${item.changeType === "positive" ? "text-green-500" : "text-red-500"}`}>
                          {item.change} from last month
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="col-span-4"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Overview</CardTitle>
                      <CardDescription>Visualize your metrics and growth over time</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <div className="h-full bg-muted/50 rounded-md flex items-center justify-center">
                        <p className="text-sm text-muted-foreground">Chart visualization would go here</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  className="col-span-3"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activities</CardTitle>
                      <CardDescription>Latest updates from your projects</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { title: "Project Alpha launched", time: "2 hours ago" },
                          { title: "New team member added", time: "5 hours ago" },
                          { title: "Server maintenance completed", time: "1 day ago" },
                          { title: "New feature implemented", time: "2 days ago" },
                        ].map((activity, index) => (
                          <div key={index} className="flex items-start gap-4 rounded-md p-2 hover:bg-muted/50">
                            <div className="rounded-full bg-muted p-2">
                              <div className="h-2 w-2 rounded-full bg-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{activity.title}</p>
                              <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full">
                        View all activities
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate="visible"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Active Projects</CardTitle>
                    <CardDescription>Track and manage your ongoing projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                      </div>
                    ) : projects.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No projects yet. Create your first project!</p>
                        <Button className="mt-4" onClick={() => setIsAddProjectModalOpen(true)}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Project
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {projects.slice(0, 4).map((project, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50"
                          >
                            <div className="space-y-1">
                              <p className="text-sm font-medium">{project.name}</p>
                              <div className="flex items-center gap-2">
                                <Progress value={project.progress} className="h-1.5 w-24 md:w-32" />
                                <span className="text-xs text-muted-foreground">{project.progress}%</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                  project.status === "On Track"
                                    ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300"
                                    : project.status === "At Risk"
                                      ? "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-300"
                                      : "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-300"
                                }`}
                              >
                                {project.status}
                              </span>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">More</span>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => setIsAddProjectModalOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Project
                    </Button>
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="notifications" className="h-[60vh] flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="rounded-full bg-primary/10 p-3 inline-flex">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Notifications Content</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Your notifications and alerts would be displayed here, keeping you updated on important events.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </motion.div>
      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={isAddProjectModalOpen}
        onClose={() => setIsAddProjectModalOpen(false)}
        onSuccess={refreshProjects}
      />
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

function MoreVertical(props) {
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
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  )
}

function ClipboardList(props) {
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
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  )
}

