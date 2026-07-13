import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Briefcase,
  HeartPulse,
  CarFront,
  Laptop,
  Wallet,
  Plane,
  Users,
  Shield,
  ShieldCheck,
  ChevronLeft,
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";

/* ─────────────── Types ─────────────── */
interface QuestionnaireData {
  occupation: string;
  industry: string;
  incomeRange: string;
  protectionLevel: string;
  lifestyle: string[];
  assets: string[];
}

const defaultData: QuestionnaireData = {
  occupation: "",
  industry: "",
  incomeRange: "",
  protectionLevel: "",
  lifestyle: [],
  assets: [],
};

const STORAGE_KEY = "insuresmart_questionnaire";

/* ─────────────── Step Data ─────────────── */
const occupations = [
  { id: "tech", label: "Tech / Freelance", icon: Laptop },
  { id: "corporate", label: "Corporate", icon: Building2 },
  { id: "medical", label: "Medical", icon: HeartPulse },
  { id: "trades", label: "Trades / Artisan", icon: Briefcase },
  { id: "student", label: "Student", icon: Users },
  { id: "other", label: "Other", icon: Briefcase },
];

const incomeRanges = [
  { id: "low", label: "₦0 – ₦500K", sub: "Entry / Junior" },
  { id: "mid", label: "₦500K – ₦2M", sub: "Mid-level" },
  { id: "high", label: "₦2M – ₦6M", sub: "Senior / Management" },
  { id: "premium", label: "₦6M+", sub: "Executive / Business" },
];

const lifestyleOptions = [
  { id: "travels", label: "Travels frequently", icon: Plane },
  { id: "commutes", label: "Commutes by car", icon: CarFront },
  { id: "dependents", label: "Has dependents", icon: Users },
  { id: "active", label: "Active lifestyle", icon: HeartPulse },
  { id: "remote", label: "Works remotely", icon: Laptop },
];

const assetOptions = [
  { id: "home", label: "Home / Property", icon: Building2 },
  { id: "vehicle", label: "Vehicle(s)", icon: CarFront },
  { id: "business", label: "Business Assets", icon: Briefcase },
  { id: "electronics", label: "Electronics", icon: Laptop },
  { id: "investments", label: "Investments", icon: Wallet },
];

/* ─────────────── Step Components ─────────────── */

function StepOccupation({
  data,
  setData,
}: {
  data: QuestionnaireData;
  setData: (d: QuestionnaireData) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          What do you do?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Select your occupation and industry to get started.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {occupations.map((occ) => {
          const selected = data.occupation === occ.id;
          const Icon = occ.icon;
          return (
            <button
              key={occ.id}
              onClick={() => setData({ ...data, occupation: occ.id })}
              className={`relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all hover:shadow-md active:scale-[0.98] ${
                selected
                  ? "border-primary bg-primary/5 text-primary shadow-sm"
                  : "border-border bg-card text-card-foreground hover:border-primary/40"
              }`}
              aria-pressed={selected}
            >
              {selected && (
                <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  <Check className="h-3 w-3" />
                </span>
              )}
              <Icon className="h-7 w-7" aria-hidden="true" />
              <span className="text-sm font-medium">{occ.label}</span>
            </button>
          );
        })}
      </div>
      <div>
        <label htmlFor="industry" className="block text-sm font-medium text-muted-foreground">
          Industry (optional)
        </label>
        <input
          id="industry"
          type="text"
          placeholder="e.g. Fintech, Education, Healthcare"
          value={data.industry}
          onChange={(e) => setData({ ...data, industry: e.target.value })}
          className="mt-1.5 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
    </div>
  );
}

function StepIncome({
  data,
  setData,
}: {
  data: QuestionnaireData;
  setData: (d: QuestionnaireData) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Your income & protection
        </h2>
        <p className="mt-2 text-muted-foreground">
          Tell us about your income bracket and desired coverage level.
        </p>
      </div>
      <div>
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          Income Range (Annual)
        </p>
        <div className="grid grid-cols-2 gap-3">
          {incomeRanges.map((range) => {
            const selected = data.incomeRange === range.id;
            return (
              <button
                key={range.id}
                onClick={() => setData({ ...data, incomeRange: range.id })}
                className={`rounded-xl border-2 p-4 text-left transition-all hover:shadow-md active:scale-[0.98] ${
                  selected
                    ? "border-primary bg-primary/5 text-primary shadow-sm"
                    : "border-border bg-card text-card-foreground hover:border-primary/40"
                }`}
                aria-pressed={selected}
              >
                <span className="text-sm font-semibold">{range.label}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{range.sub}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          Protection Level
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "basic", label: "Basic", desc: "Essential cover" },
            { id: "standard", label: "Standard", desc: "Balanced cover" },
            { id: "premium", label: "Premium", desc: "Full cover" },
          ].map((level) => {
            const selected = data.protectionLevel === level.id;
            return (
              <button
                key={level.id}
                onClick={() => setData({ ...data, protectionLevel: level.id })}
                className={`rounded-xl border-2 p-3 text-center transition-all hover:shadow-md active:scale-[0.98] ${
                  selected
                    ? "border-primary bg-primary/5 text-primary shadow-sm"
                    : "border-border bg-card text-card-foreground hover:border-primary/40"
                }`}
                aria-pressed={selected}
              >
                <span className="text-sm font-semibold">{level.label}</span>
                <span className="mt-0.5 block text-[11px] text-muted-foreground">{level.desc}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StepLifestyle({
  data,
  setData,
}: {
  data: QuestionnaireData;
  setData: (d: QuestionnaireData) => void;
}) {
  const toggle = (id: string) => {
    const next = data.lifestyle.includes(id)
      ? data.lifestyle.filter((x) => x !== id)
      : [...data.lifestyle, id];
    setData({ ...data, lifestyle: next });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Your lifestyle
        </h2>
        <p className="mt-2 text-muted-foreground">
          Select all that apply to you.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {lifestyleOptions.map((opt) => {
          const selected = data.lifestyle.includes(opt.id);
          const Icon = opt.icon;
          return (
            <button
              key={opt.id}
              onClick={() => toggle(opt.id)}
              className={`relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all hover:shadow-md active:scale-[0.98] ${
                selected
                  ? "border-accent bg-accent/5 text-accent shadow-sm"
                  : "border-border bg-card text-card-foreground hover:border-accent/40"
              }`}
              aria-pressed={selected}
            >
              {selected && (
                <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] text-accent-foreground">
                  <Check className="h-3 w-3" />
                </span>
              )}
              <Icon className="h-6 w-6" aria-hidden="true" />
              <span className="text-sm font-medium">{opt.label}</span>
            </button>
          );
        })}
      </div>
      {data.lifestyle.length === 0 && (
        <p className="text-center text-xs text-muted-foreground">
          Select at least one option to continue
        </p>
      )}
    </div>
  );
}

function StepAssets({
  data,
  setData,
}: {
  data: QuestionnaireData;
  setData: (d: QuestionnaireData) => void;
}) {
  const toggle = (id: string) => {
    const next = data.assets.includes(id)
      ? data.assets.filter((x) => x !== id)
      : [...data.assets, id];
    setData({ ...data, assets: next });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          What do you own?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Select your primary assets so we can recommend the right coverage.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {assetOptions.map((opt) => {
          const selected = data.assets.includes(opt.id);
          const Icon = opt.icon;
          return (
            <button
              key={opt.id}
              onClick={() => toggle(opt.id)}
              className={`relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all hover:shadow-md active:scale-[0.98] ${
                selected
                  ? "border-primary bg-primary/5 text-primary shadow-sm"
                  : "border-border bg-card text-card-foreground hover:border-primary/40"
              }`}
              aria-pressed={selected}
            >
              {selected && (
                <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  <Check className="h-3 w-3" />
                </span>
              )}
              <Icon className="h-6 w-6" aria-hidden="true" />
              <span className="text-sm font-medium">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────── Recommendations Engine ─────────────── */

interface Recommendation {
  type: string;
  label: string;
  description: string;
  icon: typeof Shield;
  score: number;
  color: string;
}

function computeRecommendations(data: QuestionnaireData): Recommendation[] {
  const recs: Recommendation[] = [
    { type: "health", label: "Health Insurance", description: "Medical coverage for you and your family", icon: HeartPulse, score: 0, color: "text-emerald-600" },
    { type: "auto", label: "Auto Insurance", description: "Protection for your vehicle(s)", icon: CarFront, score: 0, color: "text-sky-600" },
    { type: "life", label: "Life Insurance", description: "Financial security for your dependents", icon: ShieldCheck, score: 0, color: "text-indigo-600" },
    { type: "property", label: "Property Insurance", description: "Cover your home and assets", icon: Building2, score: 0, color: "text-amber-600" },
    { type: "travel", label: "Travel Insurance", description: "Peace of mind when you travel", icon: Plane, score: 0, color: "text-rose-600" },
  ];

  // Occupation scoring
  if (data.occupation === "medical") recs[0].score += 25;
  if (data.occupation === "tech") recs[2].score += 10;
  if (data.occupation === "corporate") { recs[2].score += 15; recs[0].score += 10; }
  if (data.occupation === "trades") { recs[1].score += 15; recs[0].score += 15; }

  // Income scoring
  if (data.incomeRange === "premium") { recs[2].score += 20; recs[3].score += 20; }
  if (data.incomeRange === "high") { recs[2].score += 15; recs[0].score += 10; }
  if (data.incomeRange === "mid") { recs[0].score += 15; recs[1].score += 10; }
  if (data.incomeRange === "low") { recs[0].score += 20; }

  // Protection level
  if (data.protectionLevel === "premium") recs.forEach((r) => (r.score += 10));
  if (data.protectionLevel === "standard") recs.forEach((r) => (r.score += 5));

  // Lifestyle scoring
  if (data.lifestyle.includes("travels")) recs[4].score += 30;
  if (data.lifestyle.includes("commutes")) recs[1].score += 25;
  if (data.lifestyle.includes("dependents")) { recs[2].score += 20; recs[0].score += 10; }
  if (data.lifestyle.includes("active")) recs[0].score += 10;
  if (data.lifestyle.includes("remote")) recs[3].score += 10;

  // Asset scoring
  if (data.assets.includes("vehicle")) recs[1].score += 30;
  if (data.assets.includes("home")) recs[3].score += 25;
  if (data.assets.includes("business")) recs[3].score += 20;
  if (data.assets.includes("electronics")) recs[3].score += 10;
  if (data.assets.includes("investments")) recs[2].score += 10;

  // Cap scores
  recs.forEach((r) => { r.score = Math.min(r.score, 100); });

  return recs.sort((a, b) => b.score - a.score);
}

function ResultsScreen({
  data,
  onReset,
  onLeadCapture,
}: {
  data: QuestionnaireData;
  onReset: () => void;
  onLeadCapture: () => void;
}) {
  const recommendations = computeRecommendations(data);
  const topScore = recommendations[0]?.score ?? 0;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          Your Insurance Profile
        </h2>
        <p className="mt-2 text-muted-foreground">
          Based on your inputs, here&apos;s how you score across different coverage types.
        </p>
      </div>

      {/* Overall Score Ring */}
      <div className="mx-auto flex max-w-xs flex-col items-center">
        <div className="relative flex h-28 w-28 items-center justify-center">
          <svg className="h-28 w-28 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="oklch(0.922 0 0)" strokeWidth="8" />
            <motion.circle
              cx="60" cy="60" r="52" fill="none"
              stroke="oklch(0.45 0.15 195)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={326.7}
              initial={{ strokeDashoffset: 326.7 }}
              animate={{ strokeDashoffset: 326.7 - (326.7 * topScore) / 100 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </svg>
          <span className="absolute text-2xl font-bold">{Math.round(topScore)}%</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">Overall Protection Score</p>
      </div>

      {/* Recommendation Cards */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Recommended Plans</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {recommendations.slice(0, 4).map((rec, i) => {
            const Icon = rec.icon;
            return (
              <motion.div
                key={rec.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <Icon className={`h-5 w-5 ${rec.color}`} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold">{rec.label}</p>
                      <p className="text-xs text-muted-foreground">{rec.description}</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold">{rec.score}%</span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className={`h-full rounded-full ${rec.score > 70 ? "bg-emerald-500" : rec.score > 40 ? "bg-amber-500" : "bg-muted-foreground/30"}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${rec.score}%` }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <button
          onClick={onLeadCapture}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl active:scale-[0.98]"
        >
          <Sparkles className="h-5 w-5" aria-hidden="true" />
          Get Secured Quote
        </button>
        <p className="mt-3 text-xs text-muted-foreground">
          Want to start over?{" "}
          <button onClick={onReset} className="underline hover:text-foreground">
            Reset questionnaire
          </button>
        </p>
      </div>
    </div>
  );
}

/* ─────────────── Main Questionnaire ─────────────── */

const STEP_TITLES = ["Occupation", "Income", "Lifestyle", "Assets", "Results"];

export default function Questionnaire({ onLeadCapture }: { onLeadCapture: () => void }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuestionnaireData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as QuestionnaireData) : defaultData;
    } catch {
      return defaultData;
    }
  });
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const canProceed = useCallback(() => {
    if (step === 0) return data.occupation !== "";
    if (step === 1) return data.incomeRange !== "" && data.protectionLevel !== "";
    if (step === 2) return data.lifestyle.length > 0;
    if (step === 3) return data.assets.length > 0;
    return true;
  }, [step, data]);

  const next = () => {
    if (step < 4) {
      setDirection(1);
      setStep(step + 1);
    }
  };

  const prev = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const reset = () => {
    setData(defaultData);
    setStep(0);
    localStorage.removeItem(STORAGE_KEY);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  const progress = ((step) / 4) * 100;

  return (
    <section id="questionnaire" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Step {step + 1} of 5</span>
            <span>{STEP_TITLES[step]}</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
            />
          </div>
        </div>

        {/* Step Slider */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {step === 0 && <StepOccupation data={data} setData={setData} />}
                {step === 1 && <StepIncome data={data} setData={setData} />}
                {step === 2 && <StepLifestyle data={data} setData={setData} />}
                {step === 3 && <StepAssets data={data} setData={setData} />}
                {step === 4 && (
                  <ResultsScreen data={data} onReset={reset} onLeadCapture={onLeadCapture} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          {step < 4 && (
            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
              <button
                onClick={prev}
                disabled={step === 0}
                className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Back
              </button>
              <button
                onClick={next}
                disabled={!canProceed()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
              >
                {step === 3 ? "See Results" : "Continue"}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}