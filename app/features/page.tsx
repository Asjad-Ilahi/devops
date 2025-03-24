"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Code, Database, Globe, RefreshCw, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FeaturesPage() {
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
            <Link href="/features" className="text-sm font-medium text-primary">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">
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
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Powerful Features for Modern Teams
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Discover the tools and capabilities that make Pulse the preferred choice for innovative teams.
              </p>
            </motion.div>

            <div className="mt-8">
              <Tabs defaultValue="productivity" className="space-y-8">
                <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
                  <TabsTrigger value="productivity">Productivity</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="integration">Integrations</TabsTrigger>
                </TabsList>

                <TabsContent value="productivity" className="space-y-12">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                  >
                    {[
                      {
                        icon: Zap,
                        title: "Lightning Fast Performance",
                        description:
                          "Optimized for speed and efficiency, ensuring your projects load quickly and run smoothly.",
                      },
                      {
                        icon: RefreshCw,
                        title: "Real-Time Collaboration",
                        description:
                          "Work together with your team in real-time, making edits and seeing changes instantly.",
                      },
                      {
                        icon: Code,
                        title: "Advanced Analytics",
                        description: "Gain insights into your projects with detailed analytics and reporting tools.",
                      },
                      {
                        icon: Globe,
                        title: "Global CDN",
                        description:
                          "Content delivery network ensures your projects are accessible worldwide with minimal latency.",
                      },
                      {
                        icon: Database,
                        title: "Automated Backups",
                        description: "Never lose your work with scheduled backups and version history tracking.",
                      },
                      {
                        icon: CheckCircle2,
                        title: "Smart Workflow",
                        description:
                          "Streamline your processes with intelligent workflow automation and task management.",
                      },
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="h-full hover:shadow-md transition-shadow">
                          <CardHeader>
                            <div className="flex items-center gap-2">
                              <div className="rounded-full bg-primary/10 p-2">
                                <feature.icon className="h-5 w-5 text-primary" />
                              </div>
                              <CardTitle>{feature.title}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">{feature.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-muted/50 rounded-lg p-8"
                  >
                    <div className="grid gap-8 md:grid-cols-2 items-center">
                      <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Boost Your Team's Productivity</h2>
                        <p className="text-muted-foreground">
                          Our platform is designed to reduce friction and streamline workflows, allowing your team to
                          focus on what matters most: creating amazing products.
                        </p>
                        <ul className="space-y-2">
                          {[
                            "Intuitive project management",
                            "Custom automation workflows",
                            "Smart task prioritization",
                            "Team performance analytics",
                            "Resource allocation optimization",
                          ].map((item, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <Button className="mt-2">Learn More</Button>
                      </div>
                      <div className="rounded-lg bg-background p-6 shadow-lg">
                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                          <p className="text-sm text-muted-foreground">Productivity demo video</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="security" className="space-y-12">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                  >
                    {[
                      {
                        icon: Shield,
                        title: "End-to-End Encryption",
                        description: "All your data is encrypted in transit and at rest, ensuring maximum security.",
                      },
                      {
                        icon: Shield,
                        title: "Two-Factor Authentication",
                        description: "Add an extra layer of security to your account with 2FA.",
                      },
                      {
                        icon: Shield,
                        title: "Role-Based Access Control",
                        description: "Define who can access what with fine-grained permission controls.",
                      },
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="h-full hover:shadow-md transition-shadow">
                          <CardHeader>
                            <div className="flex items-center gap-2">
                              <div className="rounded-full bg-primary/10 p-2">
                                <feature.icon className="h-5 w-5 text-primary" />
                              </div>
                              <CardTitle>{feature.title}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">{feature.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>

                <TabsContent value="integration" className="space-y-12">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                  >
                    {[
                      {
                        title: "GitHub",
                        description: "Seamlessly connect your repositories and automate your development workflow.",
                      },
                      {
                        title: "Slack",
                        description: "Get notifications and updates directly in your team's communication channels.",
                      },
                      {
                        title: "Google Workspace",
                        description: "Integrate with Google Docs, Sheets, and more for effortless collaboration.",
                      },
                      {
                        title: "Microsoft 365",
                        description: "Connect with Microsoft tools like Teams, OneDrive, and Office apps.",
                      },
                      {
                        title: "Zapier",
                        description: "Create automated workflows with thousands of other applications.",
                      },
                      {
                        title: "Custom API",
                        description: "Build your own integrations with our comprehensive API documentation.",
                      },
                    ].map((integration, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="h-full hover:shadow-md transition-shadow">
                          <CardHeader>
                            <CardTitle>{integration.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">{integration.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4 mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Experience Pulse?</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Join thousands of teams who are already using Pulse to transform their workflow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Link href="/signup">
                  <Button size="lg">Start for Free</Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Contact Sales
                  </Button>
                </Link>
              </div>
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

