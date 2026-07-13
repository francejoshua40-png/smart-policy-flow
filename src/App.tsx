import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Sparkles, Award, TrendingUp, Users, Check, ArrowRight } from "lucide-react";
import Navbar from "./components/Navbar";
import Questionnaire from "./components/Questionnaire";
import LeadForm from "./components/LeadForm";

/* ─────────────── Hero Section ─────────────── */

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden pt-16">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute top-1/3 left-1/4 h-60 w-60 rounded-full bg-primary/3 blur-2xl" />
      </div>

      <div className="relative mx-auto flex min-h-[90vh] max-w-6xl flex-col items-center justify-center px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Smart Insurance for Modern Nigeria
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Insurance That&apos;s
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Actually Smart
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Stop guessing. Our intelligent advisor matches you with the perfect coverage
            based on your real needs — not a one-size-fits-all plan.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#questionnaire"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl active:scale-[0.98]"
            >
              Start My Assessment
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-base font-semibold transition-all hover:bg-muted active:scale-[0.98]"
            >
              How It Works
            </a>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid w-full max-w-lg grid-cols-3 gap-4 rounded-2xl border border-border bg-card/50 p-5 backdrop-blur-sm sm:max-w-xl"
        >
          {[
            { value: "10K+", label: "Assessments", icon: Users },
            { value: "95%", label: "Satisfaction", icon: Award },
            { value: "₦2.1B", label: "Claims Saved", icon: TrendingUp },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <Icon className="mx-auto h-5 w-5 text-primary" aria-hidden="true" />
                <p className="mt-1 text-lg font-bold">{stat.value}</p>
                <p className="text-[11px] text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────── How It Works Section ─────────────── */

const steps = [
  {
    number: "01",
    title: "Answer a few questions",
    description: "Tell us about your occupation, lifestyle, and assets. It takes less than 2 minutes.",
    icon: Users,
  },
  {
    number: "02",
    title: "Get your AI-powered profile",
    description: "Our engine analyzes your needs and generates a personalized protection score.",
    icon: Shield,
  },
  {
    number: "03",
    title: "Receive your quote",
    description: "Get matched with the best plans from trusted Nigerian insurers — all in one place.",
    icon: TrendingUp,
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Three Steps to Peace of Mind
          </h2>
          <p className="mt-3 text-muted-foreground">
            No calls. No paperwork. Just smart recommendations in minutes.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <span className="text-4xl font-black text-primary/15 transition-colors group-hover:text-primary/25">
                  {step.number}
                </span>
                <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Trust Section ─────────────── */

const trustItems = [
  {
    icon: ShieldCheck,
    title: "NAICOM Licensed",
    description: "We partner with NAICOM-licensed insurers across Nigeria.",
  },
  {
    icon: Award,
    title: "No Hidden Fees",
    description: "Transparent pricing with no surprise charges — ever.",
  },
  {
    icon: Users,
    title: "24/7 Support",
    description: "Our team is always available via WhatsApp, phone, or email.",
  },
];

function TrustSection() {
  return (
    <section className="border-t border-border bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Trusted & Transparent
            </h2>
            <p className="mt-2 text-muted-foreground">
              We put your interests first, always.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-semibold">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Footer ─────────────── */

function Footer() {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Shield className="h-5 w-5 text-primary" aria-hidden="true" />
          Insure<span className="text-primary">Smart</span> NG
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} InsureSmart NG. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ─────────────── App ─────────────── */

export default function App() {
  const [showLeadForm, setShowLeadForm] = useState(false);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />

        {!showLeadForm ? (
          <Questionnaire onLeadCapture={() => setShowLeadForm(true)} />
        ) : (
          <LeadForm onComplete={() => setShowLeadForm(false)} />
        )}

        <TrustSection />
      </main>
      <Footer />
    </div>
  );
}