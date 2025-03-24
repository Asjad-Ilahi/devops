"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

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

  const plans = [
    {
      name: "Free",
      description: "For individuals and small projects",
      price: { monthly: 0, yearly: 0 },
      features: ["Up to 3 projects", "Basic analytics", "1 team member", "1GB storage", "Community support"],
      limitations: ["No custom domains", "No priority support", "Limited integrations"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      description: "For professionals and growing teams",
      price: { monthly: 19, yearly: 190 },
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "Up to 10 team members",
        "10GB storage",
        "Priority email support",
        "Custom domains",
        "API access",
        "Advanced security",
      ],
      limitations: ["Limited integrations"],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations with complex needs",
      price: { monthly: 49, yearly: 490 },
      features: [
        "Unlimited everything",
        "24/7 dedicated support",
        "Custom integrations",
        "Enterprise SSO",
        "Advanced permissions",
        "Dedicated account manager",
        "Custom contracts",
        "SLA guarantees",
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  const faqs = [
    {
      question: "How does the free trial work?",
      answer:
        "Our free trial gives you full access to all Pro plan features for 14 days. No credit card required. At the end of your trial, you can choose to subscribe or downgrade to our Free plan.",
    },
    {
      question: "Can I change plans later?",
      answer:
        "Yes, you can upgrade, downgrade, or cancel your plan at any time. If you upgrade, the new rate will be charged immediately. If you downgrade, the new rate will apply at the next billing cycle.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers for annual plans. Enterprise customers can also pay by invoice.",
    },
    {
      question: "Is there a discount for non-profits or educational institutions?",
      answer:
        "Yes, we offer special pricing for non-profits, educational institutions, and open-source projects. Please contact our sales team for more information.",
    },
    {
      question: "What happens to my data if I cancel?",
      answer:
        "Your data remains accessible for 30 days after cancellation. After that period, it will be permanently deleted from our servers.",
    },
  ]

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
            <Link href="/pricing" className="text-sm font-medium text-primary">
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
                Simple, Transparent Pricing
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Choose the perfect plan for your needs. No hidden fees or surprises.
              </p>

              <div className="flex items-center justify-center space-x-2 mt-6">
                <Label
                  htmlFor="billing-toggle"
                  className={billingCycle === "monthly" ? "font-medium" : "text-muted-foreground"}
                >
                  Monthly
                </Label>
                <Switch
                  id="billing-toggle"
                  checked={billingCycle === "yearly"}
                  onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
                />
                <Label
                  htmlFor="billing-toggle"
                  className={billingCycle === "yearly" ? "font-medium" : "text-muted-foreground"}
                >
                  Yearly{" "}
                  <Badge variant="outline" className="ml-1.5 font-normal">
                    Save 20%
                  </Badge>
                </Label>
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-3 gap-6 mt-8"
            >
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className={`relative ${plan.popular ? "md:scale-105 z-10" : ""}`}
                >
                  <Card className={`h-full flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-0 right-0 flex justify-center">
                        <Badge className="bg-primary hover:bg-primary">Most Popular</Badge>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-3xl font-bold">
                          ${billingCycle === "monthly" ? plan.price.monthly : plan.price.yearly}
                        </span>
                        {plan.price.monthly > 0 && (
                          <span className="text-muted-foreground ml-1">
                            /{billingCycle === "monthly" ? "month" : "year"}
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">What's included:</h4>
                          <ul className="space-y-2">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {plan.limitations.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">Limitations:</h4>
                            <ul className="space-y-2">
                              {plan.limitations.map((limitation, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                  <X className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                                  <span>{limitation}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className={`w-full ${plan.popular ? "" : "bg-muted-foreground/80 hover:bg-muted-foreground"}`}
                        variant={plan.popular ? "default" : "secondary"}
                      >
                        {plan.cta}
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-16 text-center"
            >
              <h2 className="text-2xl font-bold mb-2">Compare All Features</h2>
              <p className="text-muted-foreground mb-8">See exactly what's included in each plan</p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-4">Feature</th>
                      {plans.map((plan, i) => (
                        <th key={i} className={`py-4 px-4 text-center ${plan.popular ? "bg-primary/5" : ""}`}>
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Projects", values: ["3", "Unlimited", "Unlimited"] },
                      { name: "Team members", values: ["1", "10", "Unlimited"] },
                      { name: "Storage", values: ["1GB", "10GB", "Unlimited"] },
                      { name: "Custom domains", values: [false, true, true] },
                      { name: "API access", values: [false, true, true] },
                      { name: "Priority support", values: [false, true, true] },
                      { name: "SSO", values: [false, false, true] },
                      { name: "Custom contracts", values: [false, false, true] },
                    ].map((feature, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-4 px-4 font-medium">{feature.name}</td>
                        {feature.values.map((value, j) => (
                          <td key={j} className={`py-4 px-4 text-center ${plans[j].popular ? "bg-primary/5" : ""}`}>
                            {typeof value === "boolean" ? (
                              value ? (
                                <Check className="h-4 w-4 text-green-500 mx-auto" />
                              ) : (
                                <X className="h-4 w-4 text-red-500 mx-auto" />
                              )
                            ) : (
                              value
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-16 max-w-3xl mx-auto"
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-4">Still have questions?</p>
                <Button>Contact Sales</Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Get Started?</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Join thousands of teams who are already using Pulse to transform their workflow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Link href="/signup">
                  <Button size="lg">Start for Free</Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Schedule a Demo
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

