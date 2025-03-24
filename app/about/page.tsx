"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="font-bold text-primary-foreground">P</span>
            </div>
            <span className="font-bold text-xl">Pulse</span>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center gap-6"
          >
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="/features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-medium text-primary">
              About
            </Link>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </motion.div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4 mb-12"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium mb-4 text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Story</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Learn about our mission, values, and the team behind Pulse.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid gap-8 md:grid-cols-2 items-center mb-16"
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Our Mission</h2>
                <p className="text-muted-foreground md:text-lg">
                  At Pulse, we're on a mission to empower teams with intuitive tools that streamline workflows and
                  foster innovation. We believe that when teams have the right tools, they can focus on what truly
                  matters: creating exceptional products and experiences.
                </p>
                <p className="text-muted-foreground md:text-lg">
                  Founded in 2020, we've grown from a small startup to a trusted platform serving thousands of teams
                  worldwide. Our journey is driven by a simple belief: that technology should simplify work, not
                  complicate it.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Company image</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center space-y-4 mb-12"
            >
              <h2 className="text-2xl font-bold tracking-tight">Our Values</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                These core principles guide everything we do at Pulse.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16"
            >
              {[
                {
                  title: "Customer Obsession",
                  description:
                    "We start with the customer and work backwards, ensuring every feature and update is designed with their needs in mind.",
                },
                {
                  title: "Continuous Innovation",
                  description:
                    "We're never satisfied with the status quo, constantly pushing boundaries to create better solutions.",
                },
                {
                  title: "Transparency",
                  description: "We believe in open communication, both within our team and with our customers.",
                },
                {
                  title: "Quality First",
                  description:
                    "We don't cut corners. Every line of code, every design element, and every customer interaction reflects our commitment to excellence.",
                },
                {
                  title: "Collaborative Spirit",
                  description:
                    "Great ideas can come from anywhere. We foster an environment where diverse perspectives are valued and heard.",
                },
                {
                  title: "Long-term Thinking",
                  description:
                    "We make decisions with the future in mind, prioritizing sustainable growth over short-term gains.",
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="rounded-lg border p-6 bg-background"
                >
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-center space-y-4 mb-12"
            >
              <h2 className="text-2xl font-bold tracking-tight">Meet Our Team</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                The passionate individuals behind Pulse's success.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {[
                { name: "Alex Johnson", role: "Co-founder & CEO" },
                { name: "Sarah Chen", role: "Co-founder & CTO" },
                { name: "Michael Park", role: "Head of Product" },
                { name: "Priya Sharma", role: "Lead Designer" },
                { name: "David Kim", role: "Engineering Manager" },
                { name: "Olivia Martinez", role: "Customer Success Lead" },
                { name: "James Wilson", role: "Marketing Director" },
                { name: "Aisha Patel", role: "Head of Operations" },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
                  className="text-center"
                >
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={`/placeholder.svg?height=96&width=96&text=${member.name.charAt(0)}`} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4 mb-8"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join Our Team</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                We're always looking for talented individuals to help us build the future of team collaboration.
              </p>
              <Button size="lg" className="mt-4">
                View Open Positions
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/20">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="md:w-1/3">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="font-bold text-primary-foreground">P</span>
                </div>
                <span className="font-bold text-xl">Pulse</span>
              </div>
              <p className="text-sm text-gray-500">
                Empowering teams to build amazing products with powerful, intuitive tools.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Product</h4>
                <ul className="space-y-2">
                  {["Features", "Pricing", "Integrations", "Changelog"].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium">Company</h4>
                <ul className="space-y-2">
                  {["About", "Careers", "Contact", "Blog"].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium">Legal</h4>
                <ul className="space-y-2">
                  {["Privacy", "Terms", "Security", "Cookies"].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-sm text-gray-500 hover:text-primary">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">© {new Date().getFullYear()} Pulse Inc. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {["Twitter", "GitHub", "LinkedIn", "YouTube"].map((social) => (
                <Link key={social} href="#" className="text-xs text-gray-500 hover:text-primary">
                  {social}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

