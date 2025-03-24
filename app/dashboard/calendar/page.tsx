"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CalendarIcon, ChevronLeft, ChevronRight, Home, Layers, MenuIcon, Plus, Search, Settings } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CalendarPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const events = [
    {
      id: 1,
      title: "Team Meeting",
      date: new Date(2023, 10, 15, 10, 0),
      endDate: new Date(2023, 10, 15, 11, 30),
      type: "meeting",
      attendees: 5,
    },
    {
      id: 2,
      title: "Project Deadline",
      date: new Date(2023, 10, 20, 18, 0),
      type: "deadline",
      project: "Website Redesign",
    },
    {
      id: 3,
      title: "Client Call",
      date: new Date(2023, 10, 10, 14, 0),
      endDate: new Date(2023, 10, 10, 15, 0),
      type: "call",
      client: "Acme Inc.",
    },
    {
      id: 4,
      title: "Product Launch",
      date: new Date(2023, 10, 25, 9, 0),
      endDate: new Date(2023, 10, 25, 12, 0),
      type: "event",
      location: "Main Office",
    },
    {
      id: 5,
      title: "Design Review",
      date: new Date(2023, 10, 8, 13, 0),
      endDate: new Date(2023, 10, 8, 14, 0),
      type: "meeting",
      attendees: 3,
    },
  ]

  const getMonthData = (date) => {
    const month = date.getMonth()
    const year = date.getFullYear()

    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)

    const daysInMonth = lastDayOfMonth.getDate()
    const startingDayOfWeek = firstDayOfMonth.getDay()

    const monthData = []
    let day = 1

    // Create 6 weeks (42 days) to ensure we have enough rows
    for (let i = 0; i < 6; i++) {
      const week = []
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < startingDayOfWeek) || day > daysInMonth) {
          week.push(null)
        } else {
          week.push(new Date(year, month, day++))
        }
      }
      monthData.push(week)

      // Break if we've already included all days of the month
      if (day > daysInMonth) {
        break
      }
    }

    return monthData
  }

  const monthData = getMonthData(currentMonth)

  const getEventsForDate = (date) => {
    if (!date) return []

    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    )
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getEventTypeColor = (type) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-300"
      case "deadline":
        return "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-300"
      case "call":
        return "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300"
      case "event":
        return "bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-300"
    }
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const isToday = (date) => {
    if (!date) return false

    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
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
              { icon: CalendarIcon, label: "Calendar", active: true, href: "/dashboard/calendar" },
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
                  <CalendarIcon className="h-4 w-4 text-primary" />
                </div>
                <motion.span
                  className="text-sm font-medium"
                  animate={{ opacity: isSidebarOpen ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  Upcoming Events
                </motion.span>
              </div>
              <motion.div
                animate={{ opacity: isSidebarOpen ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                {events.slice(0, 3).map((event, i) => (
                  <div key={i} className="text-sm">
                    <p className="font-medium truncate">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.date.toLocaleDateString()} at {formatTime(event.date)}
                    </p>
                  </div>
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
                  <UserIcon className="mr-2 h-4 w-4" />
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
                  placeholder="Search events..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>

          <div className="flex items-center gap-2">
            <Select defaultValue="month">
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>

            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Event
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
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Calendar</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-lg font-medium min-w-[140px] text-center">
                  {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </h2>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button variant="outline" size="sm" onClick={() => setCurrentMonth(new Date())}>
              Today
            </Button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="bg-background rounded-lg border shadow-sm overflow-hidden"
          >
            <div className="grid grid-cols-7 border-b">
              {daysOfWeek.map((day, i) => (
                <div key={i} className="p-2 text-center font-medium text-sm">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 auto-rows-fr">
              {monthData.map((week, weekIndex) =>
                week.map((date, dayIndex) => {
                  const dayEvents = getEventsForDate(date)
                  const isCurrentMonth = date && date.getMonth() === currentMonth.getMonth()

                  return (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`min-h-[120px] p-1 border-r border-b relative ${
                        isCurrentMonth ? "bg-background" : "bg-muted/30"
                      } ${isToday(date) ? "bg-primary/5" : ""}`}
                    >
                      {date && (
                        <>
                          <div
                            className={`text-right p-1 ${
                              isToday(date)
                                ? "bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center ml-auto"
                                : ""
                            }`}
                          >
                            {date.getDate()}
                          </div>

                          <div className="space-y-1 mt-1">
                            {dayEvents.slice(0, 3).map((event, i) => (
                              <div key={i} className={`text-xs p-1 rounded truncate ${getEventTypeColor(event.type)}`}>
                                {formatTime(event.date)} {event.title}
                              </div>
                            ))}

                            {dayEvents.length > 3 && (
                              <div className="text-xs text-center text-muted-foreground">
                                +{dayEvents.length - 3} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )
                }),
              )}
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <h2 className="text-lg font-medium mb-4">Upcoming Events</h2>
            <div className="space-y-3">
              {events.slice(0, 5).map((event, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-center">
                      <div className={`w-2 self-stretch ${getEventTypeColor(event.type).split(" ")[0]}`} />
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{event.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {event.date.toLocaleDateString()} at {formatTime(event.date)}
                              {event.endDate && ` - ${formatTime(event.endDate)}`}
                            </p>
                            {event.type === "meeting" && event.attendees && (
                              <div className="flex items-center gap-1 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {event.attendees} attendees
                                </Badge>
                              </div>
                            )}
                            {event.type === "deadline" && event.project && (
                              <div className="flex items-center gap-1 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  Project: {event.project}
                                </Badge>
                              </div>
                            )}
                            {event.type === "call" && event.client && (
                              <div className="flex items-center gap-1 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  Client: {event.client}
                                </Badge>
                              </div>
                            )}
                            {event.type === "event" && event.location && (
                              <div className="flex items-center gap-1 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  Location: {event.location}
                                </Badge>
                              </div>
                            )}
                          </div>
                          <Badge className={getEventTypeColor(event.type)}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
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

function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

