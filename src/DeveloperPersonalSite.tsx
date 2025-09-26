// src/DeveloperPersonalSite.tsx
import React, { useEffect, useMemo, useState } from "react";

// ---------- Helpers: Icons (inline SVG so there are no deps)
const Icon = {
  Github: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.2c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.35-1.77-1.35-1.77-1.1-.76.08-.74.08-.74 1.22.09 1.86 1.26 1.86 1.26 1.08 1.86 2.83 1.32 3.52 1.01.11-.8.42-1.33.76-1.64-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.9 1.24 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .5Z"
      />
    </svg>
  ),
  LinkedIn: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.94v5.66H9.35V9h3.4v1.56h.05c.47-.9 1.62-1.85 3.34-1.85 3.57 0 4.23 2.35 4.23 5.4v6.34ZM5.34 7.43a2.06 2.06 0 1 1 0-4.11 2.06 2.06 0 0 1 0 4.11Zm-1.77 13.02h3.55V9H3.57v11.45Z"
      />
    </svg>
  ),
  Mail: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z" />
    </svg>
  ),
  Menu: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
    </svg>
  ),
  X: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M18.3 5.7 5.7 18.3l-1.4-1.4L16.9 4.3l1.4 1.4Z" />
      <path fill="currentColor" d="M18.3 16.9 16.9 18.3 4.3 5.7l1.4-1.4 12.6 12.6Z" />
    </svg>
  ),
  ArrowUpRight: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M7 7h10v10h-2V9.414l-8.293 8.293-1.414-1.414L13.586 8H7V7Z" />
    </svg>
  ),
  External: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M14 3h7v7h-2V6.414l-9.293 9.293-1.414-1.414L17.586 5H14V3Z" />
      <path fill="currentColor" d="M5 5h6v2H7v10h10v-4h2v6H5V5Z" />
    </svg>
  ),
};

// ---------- Small UI primitives
function Container({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

function Section({
  id,
  title,
  eyebrow,
  children,
}: React.PropsWithChildren<{ id?: string; title: string; eyebrow?: string }>) {
  return (
    <section id={id} className="py-14 sm:py-20">
      <Container>
        <div className="mb-8 sm:mb-10">
          {eyebrow && (
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
        </div>
        {children}
      </Container>
    </section>
  );
}

function Badge(
  { children, className = "" }: React.PropsWithChildren<{ className?: string }>
) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-2 py-1 text-xs text-gray-700 dark:text-gray-200 ${className}`}
    >
      {children}
    </span>
  );
}

function Card({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-white/5 shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      {children}
    </div>
  );
}

function Button({
  children,
  as = "button",
  href,
  className = "",
  ...props
}: any) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-100";
  const classes = `${base} ${className}`;
  if (as === "a" && href)
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

// ---------- Main Component (NAMED export)
export function DeveloperPersonalSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("prefers_dark_v1");
    if (stored) return JSON.parse(stored);
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  useEffect(() => {
    try {
      localStorage.setItem("prefers_dark_v1", JSON.stringify(dark));
    } catch {}
  }, [dark]);

  const navItems = useMemo(
    () => [
      { id: "projects", label: "Projects" },
      { id: "experience", label: "Experience" },
      { id: "skills", label: "Skills" },
    ],
    []
  );

  // Demo data — replace with your own
  const projects = [
    {
      title: "Hair Reconstruction from Sparse Views",
      desc: "Developed a 3D hair reconstruction model using synthetic datasets and ML techniques, achieving faster runtimes and improved efficiency",
      tags: ["Python", "Pytorch", "C++", "Blender"],
      link: "https://github.com/s58vshar/Hair-Reconstruction-Thesis",
    },
    {
      title: "Movement Tracker App",
      desc: "Built a TensorFlow-powered web app that tracks body movements in real time and provides posture health feedback.",
      tags: ["React", "TypeScript", "Vite", "TensorFlow.js"],
      link: "https://github.com/s58vshar/movement-tracker",
    },
    {
      title: "Personal Website Design",
      desc: "Single source of truth → generates CSS vars, TS utils, and Figma styles.",
      tags: ["Node.js", "CLI", "DX"],
      link: "#",
    },
  ];

  const experience = [
    {
      company: "University of Bonn",
      role: "Research Assistant",
      period: "Feb,2024 — June,2025",
      points: [
        "Led migration to React Server Components, cutting TTFB by 42%.",
        "Built design system used across 12 product surfaces.",
        "Mentored 5 engineers; instituted review rubrics for accessibility.",
      ],
    },
    {
      company: "Samsung Research Institute",
      role: "Software Engineer",
      period: "July,2019 — Feb,2022",
      points: [
        "Launched onboarding that improved week-4 retention by 18%.",
        "Co-authored performance budget & automated CI checks.",
      ],
    },
    {
      company: "Samsung Research Institute",
      role: "Software Intern",
      period: "Jan,2019 — May,2019",
      points: [
        "Developed a wearable system using ultrasonic sensors to recognize hand gestures and convert them into audible keywords, addressing communication challenges for speech-impaired users.",
        "Designed and trained a gesture recognition model, achieving 95% accuracy in detecting essential hand movements.",
        "Enabled real-time translation of gestures into speech, significantly improving accessibility and user independence."
      ],
    }
  ];

  const skills = [
    "Java",
    "Python",
    "PyTorch",
    "TensorFlow",
    "Kotlin",
    "React",
    "TypeScript",
    "C++",
    "AWS",
    "Mobile Development",
    "TailwindCSS",
    "Git",
    "Vite",
    "Code Reviews",
    "Data Structures",
    "Unit Testing",
    "Docker",
    "CI/CD",
    "Linux",
    "Design Systems",
  ];

  /*const articles = [
    { title: "Rendering Strategies in 2025", href: "#", date: "Aug 12, 2025" },
    { title: "Playable Docs: Turning Spec into UI", href: "#", date: "Jun 03, 2025" },
    { title: "Design System Guardrails", href: "#", date: "Mar 24, 2025" },
  ];*/

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-white text-gray-900 antialiased dark:bg-[#0b0b0f] dark:text-gray-100">
        {/* Header */}
        <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/20 border-b border-gray-200/60 dark:border-white/10">
          <Container className="flex h-14 items-center justify-between">
            <a href="#home" className="font-semibold tracking-tight">
              Vibhor Sharma
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              {navItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="hover:opacity-80">
                  {item.label}
                </a>
              ))}
              <Button
                as="a"
                href="#contact"
                className="bg-gray-900 text-white dark:bg-white dark:text-black hover:opacity-90"
              >
                <Icon.Mail className="h-4 w-4" /> Contact
              </Button>
              <button
                aria-label="Toggle dark mode"
                onClick={() => setDark((d) => !d)}
                className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10"
              >
                {dark ? <span aria-hidden className="text-xs">☀️</span> : <span aria-hidden className="text-xs">🌙</span>}
              </button>
            </nav>

            {/* Mobile controls */}
            <div className="md:hidden flex items-center gap-2">
              <button
                aria-label="Toggle dark mode"
                onClick={() => setDark((d) => !d)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10"
              >
                {dark ? <span aria-hidden>☀️</span> : <span aria-hidden>🌙</span>}
              </button>
              <button
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10"
              >
                <Icon.Menu className="h-5 w-5" />
              </button>
            </div>
          </Container>

          {/* Mobile sheet */}
          {menuOpen && (
            <div
              className="md:hidden fixed inset-0 z-50 bg-black/50"
              role="dialog"
              aria-modal="true"
              onClick={() => setMenuOpen(false)}
            >
              <div
                className="absolute right-2 top-2 w-[calc(100%-1rem)] max-w-sm rounded-2xl border border-white/10 bg-[#0f0f14] p-4 text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Menu</span>
                  <button
                    aria-label="Close menu"
                    onClick={() => setMenuOpen(false)}
                    className="h-9 w-9 inline-flex items-center justify-center rounded-xl bg-white/10"
                  >
                    <Icon.X className="h-5 w-5" />
                  </button>
                </div>
                <nav className="mt-4 grid gap-2">
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-xl px-3 py-3 hover:bg-white/10"
                    >
                      {item.label}
                    </a>
                  ))}
                  <a
                    href="#contact"
                    onClick={() => setMenuOpen(false)}
                    className="mt-2 inline-flex items-center gap-2 rounded-xl bg-white text-black px-4 py-3 font-medium"
                  >
                    <Icon.Mail className="h-4 w-4" /> Contact
                  </a>
                </nav>
              </div>
            </div>
          )}
        </header>

        {/* Hero */}
        <section id="home" className="relative overflow-hidden">
          <Container className="pt-12 sm:pt-16 pb-10">
            <div className="grid items-center gap-10 sm:gap-12 md:grid-cols-2">
              <div>
                <p className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Software Engineer
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
                  Building fast, intelligent systems that people love to use.
                </h1>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  Transforming research and code into seamless, real-world solutions.
                  Experience spans AI/ML research at Bonn and software development at Samsung.
                  Available for mid and senior positions, as well as select freelance work.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button
                    as="a"
                    href="#projects"
                    className="bg-gray-900 text-white dark:bg-white dark:text-black hover:opacity-90"
                  >
                    View Projects <Icon.ArrowUpRight className="h-4 w-4" />
                  </Button>
                  <Button as="a" href="#contact" className="border border-gray-300 dark:border-white/20">
                    Get in Touch
                  </Button>
                  <a
                    href="https://github.com/s58vshar?tab=repositories"
                    className="group inline-flex items-center gap-2 text-sm hover:opacity-80"
                    aria-label="GitHub"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-white/10">
                      <Icon.Github className="h-5 w-5" />
                    </span>
                    <span className="sr-only sm:not-sr-only">GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sharma-vibhor15/"
                    className="group inline-flex items-center gap-2 text-sm hover:opacity-80"
                    aria-label="LinkedIn"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-white/10">
                      <Icon.LinkedIn className="h-5 w-5" />
                    </span>
                    <span className="sr-only sm:not-sr-only">LinkedIn</span>
                  </a>
                </div>
              </div>
              <div className="order-first md:order-none">
                <div className="mx-auto aspect-square max-w-xs sm:max-w-sm rounded-[2rem] bg-gradient-to-br from-gray-200 to-gray-50 p-1 dark:from-white/10 dark:to-white/5">
                  <div className="h-full w-full rounded-[1.75rem] bg-white dark:bg-[#0c0c11] p-6 flex items-center justify-center">
                    {}
                    <img
                      src="/headshot.png"
                      alt="Vibhor Sharma"
                      className="h-48 w-48 sm:h-80 sm:w-80 rounded-2xl object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Projects */}
        <Section id="projects" eyebrow="Selected work" title="Projects that move the needle">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <Card key={p.title} className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{p.desc}</p>
                  </div>
                  <a
                    href={p.link}
                    className="flex-none inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10"
                    aria-label={`Open ${p.title}`}
                  >
                    <Icon.External className="h-5 w-5" />
                  </a>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* Experience */}
        <Section id="experience" eyebrow="Career" title="Experience">
          <ol className="relative ml-3 border-l border-gray-200 dark:border-white/10">
            {experience.map((job) => (
              <li key={job.company} className="mb-10 ml-4">
                <span className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full border border-white bg-gray-900 dark:bg-white" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-medium">
                    {job.role} · <span className="text-gray-600 dark:text-gray-300">{job.company}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1 sm:mt-0">{job.period}</p>
                </div>
                <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 dark:text-gray-200">
                  {job.points.map((pt) => (
                    <li key={pt} className="mb-1">
                      {pt}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        {/* Skills */}
        <Section id="skills" eyebrow="Toolbox" title="Skills & Focus">
          <div className="flex flex-wrap gap-3">
            {skills.map((s) => (
              <Badge
                key={s}
                className="px-4 py-2 text-base font-semibold rounded-2xl shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 hover:-translate-y-0.5 hover:shadow-md transition"
              >
                {s}
              </Badge>
            ))}
          </div>
        </Section>

        {/*
        <Section id="writing" eyebrow="Notes" title="Recent writing">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {articles.map((a) => (
              <Card key={a.title} className="p-5 sm:p-6">
                <a href={a.href} className="group block">
                  <p className="text-xs text-gray-500">{a.date}</p>
                  <h3 className="mt-1 text-base font-semibold tracking-tight group-hover:underline">{a.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    A short summary of the post goes here. Keep it crisp and useful.
                  </p>
                </a>
              </Card>
            ))}
          </div>
        </Section>
        */}

        {/* Contact */}
        <Section id="contact" eyebrow="Say hello" title="Let’s build something great">
          <Card className="p-5 sm:p-6">
            <form
              className="grid gap-4 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const fd = new FormData(form);
                const name = String(fd.get("name") || "");
                const email = String(fd.get("email") || "");
                const msg = String(fd.get("message") || "");

                // Send via user's email client
                const to = "vibhor.sharma24.vs@gmail.com";
                const subject = `Website contact from ${name}`;
                const body = `Name: ${name}\nEmail: ${email}\n\n${msg}`;

                window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                form.reset()
              }}
            >
              <div className="sm:col-span-1">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:border-white/10 dark:bg-white/5 dark:focus:ring-white"
                  placeholder="Ada Lovelace"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:border-white/10 dark:bg-white/5 dark:focus:ring-white"
                  placeholder="you@domain.com"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:border-white/10 dark:bg-white/5 dark:focus:ring-white"
                  placeholder="What can we build together?"
                />
              </div>
              <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-3">
                <Button
                  type="submit"
                  className="bg-gray-900 text-white dark:bg-white dark:text-black hover:opacity-90"
                >
                  Send Message
                </Button>
                <a href="mailto:vibhor.sharma24.vs@gmail.com" className="text-sm underline decoration-dotted underline-offset-4">
                  or email me directly → vibhor.sharma24.vs@gmail.com
                </a>
              </div>
            </form>
          </Card>
        </Section>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-white/10">
          <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Vibhor Sharma. All rights reserved.</p>
            <div className="flex items-center gap-3">
              <a href="#" className="hover:opacity-80">
                Privacy
              </a>
              <span aria-hidden>·</span>
              <a href="#" className="hover:opacity-80">
                Imprint
              </a>
            </div>
          </Container>
        </footer>
      </div>
    </div>
  );
}
