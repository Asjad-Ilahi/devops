"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight, ChevronDown, Globe, Shield, Zap, ArrowUpRight, Users, Star } from "lucide-react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const testimonialsRef = useRef(null)
  const ctaRef = useRef(null)

  const heroInView = useInView(heroRef, { once: false, amount: 0.2 })
  const featuresInView = useInView(featuresRef, { once: false, amount: 0.2 })
  const testimonialsInView = useInView(testimonialsRef, { once: false, amount: 0.2 })
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.2 })

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
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
        <section className="py-20 md:py-32 overflow-hidden" ref={heroRef}>
          <div className="container px-4 md:px-6 relative">
            <motion.div
              style={{ opacity, scale }}
              className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            />
            <motion.div
              style={{ opacity, scale }}
              className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
            />

            <div className="flex flex-col items-center gap-4 text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="space-y-2"
              >
                <Badge className="mb-4 animate-pulse">
                  <span className="text-xs font-medium">✨ Just Launched</span>
                </Badge>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
                  Elevate Your{" "}
                  <span className="text-primary relative">
                    Digital Presence
                    <motion.span
                      className="absolute -bottom-2 left-0 w-full h-1 bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 1 }}
                    />
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Seamlessly manage your projects with our intuitive platform designed for modern teams.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-3 mt-6"
              >
                <Link href="/signup">
                  <Button size="lg" className="group relative overflow-hidden">
                    <span className="relative z-10">Get Started</span>
                    <motion.span
                      className="absolute inset-0 bg-primary/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/features">
                  <Button size="lg" variant="outline" className="group">
                    Learn More
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="ml-2"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </motion.span>
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                className="mt-8 flex items-center gap-4 text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center"
                    >
                      <span className="text-xs">{i}</span>
                    </div>
                  ))}
                </div>
                <span>Trusted by 10,000+ teams worldwide</span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 md:mt-24 relative mx-auto max-w-5xl overflow-hidden rounded-xl shadow-2xl"
            >
              <div className="bg-muted/5 backdrop-blur-sm absolute inset-0 z-10 flex items-center justify-center">
                <Link href="/signup">
                  <Button size="lg" className="animate-pulse">
                    Explore Dashboard
                  </Button>
                </Link>
              </div>
              <div className="h-[300px] md:h-[500px] bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <motion.div
                  className="bg-background/90 p-6 rounded-lg shadow-lg w-[80%] h-[80%] flex flex-col"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={heroInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="h-8 border-b flex items-center">
                    <div className="flex gap-2 ml-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-3 gap-4 p-4">
                    <div className="col-span-2 bg-muted rounded-md"></div>
                    <div className="col-span-1 space-y-4">
                      <div className="h-20 bg-muted rounded-md"></div>
                      <div className="h-20 bg-muted rounded-md"></div>
                      <div className="h-20 bg-muted rounded-md"></div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
              variants={staggerContainer}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
            >
              {[
                { label: "Active Users", value: "10K+" },
                { label: "Countries", value: "150+" },
                { label: "Uptime", value: "99.9%" },
                { label: "Projects Created", value: "1M+" },
              ].map((stat, i) => (
                <motion.div key={i} variants={fadeInUp} className="space-y-2">
                  <h3 className="text-3xl md:text-4xl font-bold">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-muted/30 overflow-hidden" ref={featuresRef}>
          <div className="container px-4 md:px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
              className="text-center mb-12 md:mb-16"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-3xl font-bold tracking-tight">Why Choose Us?</h2>
                <p className="mt-4 text-gray-500 md:text-lg">
                  Our platform offers unparalleled features to power your projects
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description: "Optimized performance to keep your projects running smoothly and efficiently.",
                },
                {
                  icon: Shield,
                  title: "Secure by Default",
                  description: "Enterprise-grade security with end-to-end encryption to protect your data.",
                },
                {
                  icon: Globe,
                  title: "Global Scaling",
                  description: "Seamlessly scale your projects to millions of users worldwide.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm hover:shadow-md transition-all"
                >
                  <div className="rounded-full bg-primary/10 p-3 mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="mt-2 text-gray-500">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-24 grid md:grid-cols-2 gap-12 items-center"
              variants={staggerContainer}
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
            >
              <motion.div variants={fadeInUp} className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Collaboration
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">Work together seamlessly</h3>
                <p className="text-muted-foreground">
                  Our real-time collaboration tools make teamwork effortless. Edit, comment, and share with your team in
                  real-time.
                </p>
                <ul className="space-y-2">
                  {[
                    "Real-time document editing",
                    "Threaded comments and discussions",
                    "Role-based permissions",
                    "Version history and rollback",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div>
                  <Button variant="link" className="p-0 h-auto font-medium">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>

              <motion.div
                variants={scaleIn}
                className="bg-gradient-to-br from-primary/20 to-blue-500/20 p-1 rounded-lg"
              >
                <div className="bg-background rounded-lg p-6 h-[300px] flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Users className="h-12 w-12 mx-auto text-primary" />
                    <p className="text-muted-foreground">Collaboration visualization</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 overflow-hidden" ref={testimonialsRef}>
          <div className="container px-4 md:px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={testimonialsInView ? "visible" : "hidden"}
              className="text-center mb-12"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-3xl font-bold tracking-tight">What Our Customers Say</h2>
                <p className="mt-4 text-gray-500 md:text-lg">Don't just take our word for it</p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={testimonialsInView ? "visible" : "hidden"}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                {
                  quote:
                    "Pulse has transformed how our team collaborates. The interface is intuitive and the features are exactly what we needed.",
                  author: "Sarah J.",
                  role: "Product Manager",
                  company: "TechCorp",
                },
                {
                  quote:
                    "We've tried many project management tools, but Pulse stands out with its performance and thoughtful design.",
                  author: "Michael L.",
                  role: "CTO",
                  company: "StartupX",
                },
                {
                  quote:
                    "The customer support is exceptional. Any questions we had were answered promptly and thoroughly.",
                  author: "Elena R.",
                  role: "Team Lead",
                  company: "DesignStudio",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="flex flex-col p-6 rounded-lg bg-muted/30 border relative"
                >
                  <div className="absolute -top-4 -left-4 text-4xl text-primary opacity-30">"</div>
                  <div className="mb-4 flex-1">
                    <p className="italic">{testimonial.quote}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs">{testimonial.author[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 text-yellow-400 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-16 text-center"
              variants={fadeInUp}
              initial="hidden"
              animate={testimonialsInView ? "visible" : "hidden"}
            >
              <Link href="/about">
                <Button variant="outline" size="lg">
                  Read More Success Stories
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-primary/5 overflow-hidden" ref={ctaRef}>
          <div className="container px-4 md:px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={ctaInView ? "visible" : "hidden"}
              className="text-center mb-12"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-3xl font-bold tracking-tight">Ready to Get Started?</h2>
                <p className="mt-4 text-gray-500 md:text-lg">Join thousands of satisfied customers today</p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={ctaInView ? "visible" : "hidden"}
              className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
            >
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto group relative overflow-hidden">
                  <span className="relative z-10">Sign Up Now</span>
                  <motion.span
                    className="absolute inset-0 bg-primary/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Contact Sales
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="mt-16 p-8 rounded-xl bg-background border shadow-lg max-w-3xl mx-auto"
              variants={scaleIn}
              initial="hidden"
              animate={ctaInView ? "visible" : "hidden"}
            >
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/2">
                  <h3 className="text-xl font-bold mb-2">Subscribe to our newsletter</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Get the latest updates, news and product offers sent straight to your inbox.
                  </p>
                </div>
                <div className="md:w-1/2 w-full">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <Button>Subscribe</Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex justify-center py-8"
      >
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 rounded-full"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to top
          <ChevronDown className="h-4 w-4 rotate-180" />
        </Button>
      </motion.div>

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

