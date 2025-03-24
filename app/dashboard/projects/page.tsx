"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Calendar,
  Clock,
  Filter,
  Folder,
  Home,
  Layers,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Tag,
  Users,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddProjectModal } from "@/components/add-project-modal"
import { getUserProjects } from "@/app/actions/projects"

export default function ProjectsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false)
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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

  const getStatusColor = (status) => {
    switch (status) {
      case "On Track":
        return "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300"
      case "At Risk":
        return "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-300"
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-300"
      case "Just Started":
        return "bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-300"
    }
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
              { icon: Layers, label: "Projects", active: true, href: "/dashboard/projects" },
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
                  <Folder className="h-4 w-4 text-primary" />
                </div>
                <motion.span
                  className="text-sm font-medium"
                  animate={{ opacity: isSidebarOpen ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  Recent Projects
                </motion.span>
              </div>
              <motion.div
                animate={{ opacity: isSidebarOpen ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                {projects.slice(0, 3).map((project, i) => (
                  <Link key={i} href="#" className="block text-sm truncate hover:text-primary transition-colors">
                    {project.name}
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>
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
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
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
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search projects..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
              <span className="sr-only">More options</span>
            </Button>
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
            <h1 className="text-2xl font-bold">Projects</h1>
            <Button size="sm" onClick={() => setIsAddProjectModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </motion.div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                >
                  {projects.length > 0 ? (
                    <>
                      {projects.map((project, index) => (
                        <motion.div
                          key={index}
                          variants={fadeInUp}
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                          <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-lg">{project.name}</CardTitle>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">More options</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Edit Project</DropdownMenuItem>
                                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                    <DropdownMenuItem>Archive</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              <CardDescription>{project.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 pb-2">
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>Progress</span>
                                    <span className="font-medium">{project.progress}%</span>
                                  </div>
                                  <Progress value={project.progress} className="h-2" />
                                </div>

                                <div className="flex flex-wrap gap-2">
                                  {project.tags &&
                                    project.tags.map((tag, i) => (
                                      <Badge key={i} variant="outline" className="flex items-center gap-1">
                                        <Tag className="h-3 w-3" />
                                        {tag}
                                      </Badge>
                                    ))}
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="pt-2 flex justify-between items-center">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>Due {new Date(project.dueDate).toLocaleDateString()}</span>
                              </div>
                              <div className="flex -space-x-2">
                                {Array.from({ length: project.members }).map((_, i) => (
                                  <Avatar key={i} className="h-7 w-7 border-2 border-background">
                                    <AvatarFallback className="text-xs">{i + 1}</AvatarFallback>
                                  </Avatar>
                                ))}
                              </div>
                            </CardFooter>
                            <div className={`h-1 w-full rounded-b-lg ${getStatusColor(project.status)}`} />
                          </Card>
                        </motion.div>
                      ))}
                    </>
                  ) : null}

                  <motion.div variants={fadeInUp} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                    <Card
                      className="h-full flex flex-col items-center justify-center p-6 border-dashed hover:border-primary/50 hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => setIsAddProjectModalOpen(true)}
                    >
                      <div className="rounded-full bg-muted p-3 mb-4">
                        <Plus className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <p className="font-medium">Create New Project</p>
                      <p className="text-sm text-muted-foreground mt-1">Add a new project to your workspace</p>
                    </Card>
                  </motion.div>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="active" className="h-[60vh] flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="rounded-full bg-primary/10 p-3 inline-flex">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Active Projects</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  This tab would display only your active projects that are currently in progress.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="completed" className="h-[60vh] flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="rounded-full bg-primary/10 p-3 inline-flex">
                  <CheckIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Completed Projects</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  This tab would display your completed projects that have been successfully delivered.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="archived" className="h-[60vh] flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="rounded-full bg-primary/10 p-3 inline-flex">
                  <ArchiveIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Archived Projects</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  This tab would display your archived projects that are no longer active but preserved for reference.
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

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
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

function ArchiveIcon(props) {
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
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </svg>
  )
}

