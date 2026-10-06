import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowUp, FiExternalLink,
  FiCode, FiCpu, FiDatabase, FiTool, FiLayers, FiMonitor, FiMenu, FiX,
  FiMapPin, FiSend, FiAward, FiBriefcase, FiBookOpen, FiZap,
} from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import profileImg from "@/assets/profile.jpeg";
import resumePdf from "../assets/RS.pdf";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Portfolio — CS Student & Passionate AI Engineer" },
      { name: "description", content: "Passionate AI Engineer portfolio showcasing projects in Python, Machine Learning, React, Django, Java, and Full Stack Development." },
    ],
  }),
  component: Portfolio,
});

// ----- Placeholders (replace with your own links) -----
const LINKS = {
  resume: resumePdf,
  github: "https://github.com/gnanasree1621",
  linkedin: "https://www.linkedin.com/in/gnana-sree-vittanala-b89748386/",
  email: "vittanalagnanasree@gmail.com",
  leetcode: "https://leetcode.com/u/_vitttanalagnanasree/",
  location: "India",
};

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

function Portfolio() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
      <ScrollProgress />
      <FloatingShapes />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

// -------------------- Loader --------------------
function Loader() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
          <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin" />
        </div>
        <p className="font-mono text-xs text-muted-foreground tracking-widest">LOADING PORTFOLIO</p>
      </div>
    </motion.div>
  );
}

// -------------------- Scroll progress --------------------
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left gradient-brand-bg"
    />
  );
}

// -------------------- Floating shapes bg --------------------
function FloatingShapes() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-brand-purple/25 blur-3xl animate-float-slow" />
      <div className="absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full bg-brand-blue/25 blur-3xl animate-float-slower" />
      <div className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-brand-cyan/15 blur-3xl animate-float-slow" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 0.4) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 75%)",
        }}
      />
    </div>
  );
}

// -------------------- Navbar --------------------
function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return active;
}

function Navbar() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <nav className={`glass-strong flex items-center justify-between rounded-2xl px-4 py-3 ${scrolled ? "shadow-lg" : ""}`}>
          <a href="#home" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg gradient-brand-bg text-primary-foreground shadow-md">{"<>"}</span>
            <span className="gradient-text">Portfolio</span>
          </a>
          <ul className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className={`relative rounded-lg px-3 py-2 text-sm transition-colors ${
                    active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active === n.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-white/5"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{n.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href={LINKS.resume}
            className="hidden items-center gap-2 rounded-xl gradient-brand-bg px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg transition-transform hover:scale-105 md:inline-flex"
          >
            <FiDownload /> Resume
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg glass md:hidden"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </nav>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="glass-strong mt-2 overflow-hidden rounded-2xl md:hidden"
            >
              <ul className="flex flex-col p-2">
                {NAV.map((n) => (
                  <li key={n.id}>
                    <a
                      href={`#${n.id}`}
                      onClick={() => setOpen(false)}
                      className={`block rounded-lg px-3 py-2 text-sm ${
                        active === n.id ? "bg-white/5 text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
                <li className="p-2">
                  <a href={LINKS.resume} className="flex items-center justify-center gap-2 rounded-xl gradient-brand-bg px-4 py-2 text-sm font-medium text-primary-foreground">
                    <FiDownload /> Resume
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

// -------------------- Section wrapper --------------------
function Section({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:py-28 ${className}`}>
      {children}
    </section>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mb-14 text-center"
    >
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
      <h2 className="text-4xl font-bold sm:text-5xl">
        <span className="gradient-text">{title}</span>
      </h2>
      {description && <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{description}</p>}
    </motion.div>
  );
}

// -------------------- Hero --------------------
const TYPING_TEXTS = [
  "Turning Ideas into AI Solutions.",
  "Building Intelligent Web Applications.",
  "Learning, Building, and Innovating.",
  "Passionate About AI & Machine Learning.",
  "Future AI Engineer.",
];

function useTyping(texts: string[]) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const current = texts[i];
    const speed = del ? 40 : 75;
    const t = setTimeout(() => {
      if (!del && text === current) {
        setTimeout(() => setDel(true), 1600);
        return;
      }
      if (del && text === "") {
        setDel(false);
        setI((v) => (v + 1) % texts.length);
        return;
      }
      setText(del ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i, texts]);
  return text;
}

function Hero() {
  const typed = useTyping(TYPING_TEXTS);
  const roles = ["Computer Science Student", "Passionate AI Engineer"];
  return (
    <Section id="home" className="!pt-36 sm:!pt-40">
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="min-w-0"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for Software Engineering internships
          </div>
          <h1 className="text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Hi, I'm <span className="gradient-text">Gnana Sree</span>
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {roles.map((r) => (
              <span key={r} className="rounded-full glass px-3 py-1 text-xs text-muted-foreground">
                {r}
              </span>
            ))}
          </div>
          <p className="mt-6 h-8 font-mono text-lg text-foreground/90 sm:text-xl">
            {typed}
            <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-0.5 bg-primary animate-blink" />
          </p>
          <p className="mt-4 max-w-xl text-muted-foreground">
          A Computer Science student aspiring to become an AI Engineer, with a passion for developing intelligent applications and modern web solutions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={LINKS.resume} className="inline-flex items-center gap-2 rounded-xl gradient-brand-bg px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg transition-transform hover:scale-105">
              <FiDownload /> Download Resume
            </a>
            <a href="#projects" className="inline-flex items-center gap-2 rounded-xl glass px-5 py-3 text-sm font-medium transition-colors hover:bg-white/10">
              <FiCode /> View Projects
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border border-primary/40 px-5 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/10">
              <FiMail /> Contact Me
            </a>
          </div>
          <div className="mt-8 flex items-center gap-3">
            {[
              { href: LINKS.github, icon: <FiGithub />, label: "GitHub" },
              { href: LINKS.linkedin, icon: <FiLinkedin />, label: "LinkedIn" },
              { href: `mailto:${LINKS.email}`, icon: <FiMail />, label: "Email" },
              { href: LINKS.leetcode, icon: <SiLeetcode />, label: "LeetCode" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-xl glass text-lg text-muted-foreground transition-all hover:text-primary hover:-translate-y-0.5"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-4 rounded-3xl gradient-brand-bg opacity-30 blur-3xl" />
          <div className="glass-strong relative overflow-hidden rounded-3xl p-2">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={profileImg}
                alt="Profile portrait"
                width={768}
                height={768}
                className="aspect-square w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            </div>
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="glass-strong absolute -bottom-6 -left-6 flex items-center gap-2 rounded-2xl px-4 py-3"
          >
            <FiZap className="text-primary" />
            <div>
              <div className="text-xs text-muted-foreground">Currently</div>
              <div className="text-sm font-medium">Building & Learning</div>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="glass-strong absolute -top-6 -right-6 flex items-center gap-2 rounded-2xl px-4 py-3"
          >
            <FiCode className="text-accent" />
            <div>
              <div className="text-xs text-muted-foreground">Focus</div>
              <div className="text-sm font-medium">AI Engineer</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}

// -------------------- About --------------------
function About() {
  const stats = [
    { label: "Projects Completed", value: "10+" },
    { label: "Coding Problems Solved", value: "350+" },
    { label: "Technologies Learned", value: "20+" },
    { label: "Internships Completed", value: "2" },
  ];
  const chips = ["Java", "Python", "React", "Django", "AI/ML", "Full-Stack", "Problem Solving", "DSA"];
  return (
    <Section id="about">
      <SectionHeader eyebrow="About" title="About Me" description="A quick intro into who I am and what I love building." />
      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-3xl p-8"
        >
          <h3 className="mb-4 text-2xl font-semibold">
        Passionate about AI and Software Development
        </h3>

        <p className="text-muted-foreground">
          I'm a Computer Science student passionate about Artificial Intelligence, Machine Learning, and Full-Stack Development. I enjoy building intelligent applications and modern web solutions using Python, React, Django, and Java. My goal is to become an AI Engineer by developing innovative technologies that solve real-world problems.
        </p>
          <p className="mt-4 text-muted-foreground">
          Currently focused on Artificial Intelligence, Machine Learning, React, Django, and Python. I'm passionate about building intelligent applications, writing clean code, and continuously learning new technologies.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {chips.map((c) => (
              <span key={c} className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs text-primary">
                {c}
              </span>
            ))}
          </div>
        </motion.div>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass glow-hover rounded-2xl p-6"
            >
              <div className="font-display text-4xl font-bold gradient-text">{s.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// -------------------- Skills --------------------
const SKILL_GROUPS = [
  { icon: <FiCode />, title: "Programming", items: ["Java", "Python", "JavaScript","C" , "C++"] },
  { icon: <FiMonitor />, title: "Frontend", items: ["HTML", "CSS", "React.js", "Tailwind CSS"] },
  { icon: <FiLayers />, title: "Backend", items: ["Django", "Django REST Framework"] },
  { icon: <FiDatabase />, title: "Database", items: ["MongoDB"] },
  { icon: <FiTool />, title: "Tools", items: ["GitHub", "VS Code"] },
  { icon: <FiCpu />, title: "Concepts", items: ["OOP", "DSA", "Algorithms", "REST APIs"] },
];

function Skills() {
  return (
    <Section id="skills">
      <SectionHeader eyebrow="Skills" title="Technical Skills" description="The tools & technologies I work with." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="glass glow-hover group rounded-2xl p-6"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl gradient-brand-bg text-xl text-primary-foreground shadow-lg">
                {g.icon}
              </div>
              <h3 className="text-lg font-semibold">{g.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((it) => (
                <span key={it} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/90 transition-colors group-hover:border-primary/30">
                  {it}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// -------------------- Projects --------------------
const PROJECTS = [
  {
    title: "Centralized District Progress Monitoring Dashboard",
    description:
      "Full-stack government project monitoring system with real-time tracking, budget monitoring, milestone management, role-based auth, report generation, GPS image verification, approval workflow, analytics, and delay prediction.",
    tech: ["React.js", "Django", "MongoDB", "JWT", "Cloudinary", "Tailwind CSS"],
    github: "https://github.com/LakshmiJahnavi37/Inhouse_Internship/blob/main/district-dashboard/src/App.js",
    demo: "https://centralized-district-dashboard-1.onrender.com",
    accent: "from-fuchsia-500/25 to-indigo-500/25",
  },
  {
    title: "AI Tool Guide",
    description:
      "A curated directory to discover AI tools by category with detailed descriptions, use cases, ratings, multilingual support, and a modern search experience.",
    tech: ["React.js", "Tailwind CSS", "REST APIs"],
    github: "https://github.com/your-username/ai-tool-guide",
    demo: "https://your-demo-url.com",
    accent: "from-blue-500/25 to-cyan-500/25",
  },
  {
  title: "Weather Report",
  description:
    "Developed a responsive weather application using React and a Weather API to display real-time weather information, including temperature, humidity, wind speed, and weather conditions for any searched location.",
  tech: ["React", "Weather API", "JavaScript", "CSS"],
  github: "https://github.com/gnanasree1621/weather/blob/main/weather.py",
  demo: "https://gnanasree1621-weather-weather-yvuglj.streamlit.app/",
  accent: "from-purple-500/25 to-blue-500/25",
},
  {
  title: "Sree's Chatbot",
  description:
    "An AI-powered chatbot built with Python, Streamlit, and Google's Gemini API. It provides intelligent conversational responses with a clean, responsive interface deployed on Streamlit Cloud.",
  tech: ["Python", "Streamlit", "Google Gemini API"],
  github: "https://github.com/gnanasree1621/ai-chatbot",
  demo: "https://ai-chatbot-gdgtm25ptyuauhrnhaqqdr.streamlit.app/",
  accent: "from-purple-500/25 to-blue-500/25",
},
{
  title: "Random Number Guessing Game",
  description:
    "Developed an interactive number guessing game using Python where players guess a randomly generated number with hints provided after each attempt until the correct answer is found.",
  tech: ["Python"],
  github: "https://github.com/gnanasree1621/random_number_game/blob/main/program.py",
  demo: "https://gnanasree1621-random-number-game-web-94ehn5.streamlit.app/",
  accent: "from-purple-500/25 to-blue-500/25",
},
 {
  title: "Calculator",
  description:
    "Developed a simple calculator application using Python that performs basic arithmetic operations such as addition, subtraction, multiplication, and division through an interactive user interface.",
  tech: ["Python", "Streamlit"],
  github: "https://github.com/gnanasree1621/calculator/blob/main/project.py",
  demo: "hhttps://gnanasree1621-calculator-project-jkxeel.streamlit.app/",
  accent: "from-purple-500/25 to-blue-500/25",
},
];

function Projects() {
  return (
    <Section id="projects">
      <SectionHeader eyebrow="Work" title="Featured Projects" description="A selection of things I've built recently." />
      <div className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className="glass glow-hover group relative flex flex-col overflow-hidden rounded-3xl"
          >
            <div className={`relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br ${p.accent}`}>
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage:
                  "linear-gradient(oklch(1 0 0 / 0.35) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.35) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }} />
              <FiCode className="relative text-6xl text-white/70 transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-foreground/80">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex gap-2">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm transition-colors hover:bg-white/10"
                >
                  <FiGithub /> Code
                </a>
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl gradient-brand-bg px-4 py-2 text-sm font-medium text-primary-foreground shadow"
                >
                  <FiExternalLink /> Live Demo
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

// -------------------- Timeline (Experience + Education) --------------------
function TimelineItem({
  icon, title, subtitle, meta, children, side, i,
}: { icon: ReactNode; title: string; subtitle: string; meta: string; children?: ReactNode; side: "left" | "right"; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className={`relative md:flex ${side === "right" ? "md:flex-row-reverse" : ""}`}
    >
      <div className="md:w-1/2 md:px-8">
        <div className="glass glow-hover rounded-2xl p-6">
          <div className="mb-2 flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg gradient-brand-bg text-primary-foreground">
              {icon}
            </div>
            <span className="font-mono text-xs text-muted-foreground">{meta}</span>
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-primary">{subtitle}</p>
          {children && <div className="mt-3 text-sm text-muted-foreground">{children}</div>}
        </div>
      </div>
      <div className="absolute left-1/2 top-6 hidden h-4 w-4 -translate-x-1/2 rounded-full gradient-brand-bg ring-4 ring-background md:block" />
    </motion.div>
  );
}

function Experience() {
  return (
    <Section id="experience">
      <SectionHeader eyebrow="Career" title="Experience" />
      <div className="relative">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/40 to-transparent md:block" />
        <div className="flex flex-col gap-8">
          <TimelineItem
            i={0}
            side="left"
            icon={<FiBriefcase />}
            meta="Nov 2025 — Dec 2025"
            title="Lead Generation intern"
            subtitle="InterviewGod.ai"
          >
            <ul className="list-disc space-y-1 pl-4">
              <li>Researched and identified potential professionals and recruiters through LinkedIn.</li>
  <li>Built targeted LinkedIn connections to expand the company's professional network.</li>
  <li>Sent personalized outreach messages and maintained communication with prospective clients and users.</li>
  
  
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              {["React", "Django", "PostgreSQL", "Git"].map((t) => (
                <span key={t} className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[11px]">{t}</span>
              ))}
            </div>
          </TimelineItem>
          <TimelineItem
            i={1}
            side="right"
            icon={<FiBriefcase />}
            meta="Jan 2025 — Apr 2025"
            title="Cloud Computing Intern"
            subtitle="SprintM Technologies"
          >
            <ul className="list-disc space-y-1 pl-4">
              <li>Collaborated with team members to understand cloud-based application deployment and monitoring.</li>
  <li>Participated in practical tasks related to cloud services, networking, and security fundamentals.</li>
  <li>Improved problem-solving and technical skills by working on cloud computing projects and assignments.</li>
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              {["React", "Tailwind", "Node.js", "MongoDB"].map((t) => (
                <span key={t} className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[11px]">{t}</span>
              ))}
            </div>
          </TimelineItem>
          <TimelineItem
  i={1}
  side="left"
  icon={<FiBriefcase />}
  meta="Jan 2026 — Apr 2026"
  title="Backend Developer Intern"
  subtitle="CodeTech"
>
  <ul className="list-disc space-y-1 pl-4">
    <li>Developed and maintained RESTful APIs using Node.js and Express.js for web applications.</li>
    <li>Designed and managed MongoDB databases, including schema creation, CRUD operations, and data validation.</li>
    <li>Collaborated with frontend developers to integrate APIs, debug issues, and improve application performance.</li>
  </ul>
  <div className="mt-3 flex flex-wrap gap-2">
    {["Node.js", "Express.js", "MongoDB", "REST APIs", "Git"].map((t) => (
      <span
        key={t}
        className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[11px]"
      >
        {t}
      </span>
    ))}
  </div>
</TimelineItem>
        </div>
      </div>
    </Section>
  );
}

function Education() {
  const items = [
    { title: "B.Tech in Computer Science Engineering", subtitle: "Aditya University", meta: "2024 — 2028", note: "CGPA: 8.80 / 10. Coursework: DSA, DBMS, OS, Networks, AI/ML." },
    { title: "Intermediate (12th)", subtitle: "Sri Ravi Junior College", meta: "2022 — 2024", note: "Science stream (MPC). Percentage: 96.2%." },
    { title: "SSC (10th)", subtitle: "Z.P.High School", meta: "2021 — 2020", note: "Percentage: 89%." },
  ];
  return (
    <Section id="education">
      <SectionHeader eyebrow="Education" title="Academic Journey" />
      <div className="relative">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/40 to-transparent md:block" />
        <div className="flex flex-col gap-8">
          {items.map((e, i) => (
            <TimelineItem
              key={e.title}
              i={i}
              side={i % 2 === 0 ? "left" : "right"}
              icon={<FiBookOpen />}
              meta={e.meta}
              title={e.title}
              subtitle={e.subtitle}
            >
              {e.note}
            </TimelineItem>
          ))}
        </div>
      </div>
    </Section>
  );
}

// -------------------- Certifications --------------------
function Certifications() {
  const certs = [
    { title: "Java Programming", issuer: "Coursera ", date: "2025" },
    { title: "Backend Web Developement", issuer: "CodeTech", date: "2026" },
    { title: "Python Developement", issuer: "Hackerrank", date: "2025" },
    { title: "Cloud Computing", issuer: "SprintM Technologies", date: "2025" },
    { title: "Data Structures & Algorithms", issuer: "Hackerrank", date: "2026" },
    
  ];
  return (
    <Section id="certifications">
      <SectionHeader eyebrow="Learning" title="Certifications" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certs.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="glass glow-hover rounded-2xl p-6"
          >
            <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl gradient-brand-bg text-primary-foreground shadow-lg">
              <FiAward />
            </div>
            <h3 className="font-semibold">{c.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
            <p className="mt-2 font-mono text-xs text-primary">{c.date}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// -------------------- Achievements --------------------
function Achievements() {
  const items = [
    { icon: <SiLeetcode />, title: "LeetCode Practice", desc: "Solved 350+ DSA problems across arrays, DP, graphs, and more." },
    {
  icon: <FiZap />,
  title: "Hackathons",
  desc: "Participated in hackathons to design and develop innovative software solutions, collaborating with teams to build functional prototypes under tight deadlines."
},
    { icon: <FiBookOpen />, title: "Workshops", desc: "Attended workshops on AI/ML, AI Tools, and modern web frameworks." },
    { icon: <FiAward />, title: "Coding Competitions", desc: "Competed on Codeforces & CodeChef; consistent problem-solving practice." },
    { icon: <FiBriefcase />, title: "Internships", desc: "Completed hands-on internships in full-stack development roles." },
  ];
  return (
    <Section id="achievements">
      <SectionHeader eyebrow="Highlights" title="Achievements" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="glass glow-hover rounded-2xl p-6"
          >
            <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl gradient-brand-bg text-xl text-primary-foreground shadow-lg">
              {a.icon}
            </div>
            <h3 className="font-semibold">{a.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{a.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// -------------------- Contact --------------------
function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // TODO: replace with EmailJS integration (service/template/public keys)
    // Example (uncomment after `bun add @emailjs/browser` and set keys):
    // await emailjs.send('service_id','template_id',form,'public_key')
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 900);
  };

  const info = useMemo(
    () => [
      { icon: <FiMail />, label: "Email", value: LINKS.email, href: `mailto:${LINKS.email}` },
      { icon: <FiLinkedin />, label: "LinkedIn", value: "https://www.linkedin.com/in/gnana-sree-vittanala-b89748386/", href: LINKS.linkedin },
      { icon: <FiGithub />, label: "GitHub", value: "https://github.com/gnanasree1621", href: LINKS.github },
      { icon: <SiLeetcode />, label: "LeetCode", value: "https://leetcode.com/u/_vitttanalagnanasree/", href: LINKS.leetcode },
      { icon: <FiMapPin />, label: "Location", value: LINKS.location },
    ],
    []
  );

  return (
    <Section id="contact">
      <SectionHeader eyebrow="Contact" title="Let's Work Together" description="Have a role, project, or idea in mind? Drop a message — I'll get back soon." />
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-3xl p-8"
        >
          <h3 className="text-xl font-semibold">Contact Information</h3>
          <p className="mt-2 text-sm text-muted-foreground">Feel free to reach out through any of these channels.</p>
          <ul className="mt-6 space-y-4">
            {info.map((it) => {
              const Row = (
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl gradient-brand-bg text-primary-foreground">
                    {it.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{it.label}</div>
                    <div className="truncate text-sm">{it.value}</div>
                  </div>
                </div>
              );
              return (
                <li key={it.label}>
                  {it.href ? (
                    <a href={it.href} target="_blank" rel="noreferrer" className="block rounded-xl p-2 transition-colors hover:bg-white/5">
                      {Row}
                    </a>
                  ) : (
                    <div className="p-2">{Row}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </motion.div>
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-3xl p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name">
              <input
                required maxLength={100} value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input" placeholder="Jane Doe"
              />
            </Field>
            <Field label="Email">
              <input
                required type="email" maxLength={255} value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input" placeholder="jane@example.com"
              />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Subject">
              <input
                required maxLength={150} value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="input" placeholder="Internship opportunity"
              />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Message">
              <textarea
                required maxLength={1000} rows={5} value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="input resize-none" placeholder="Tell me about your project or role..."
              />
            </Field>
          </div>
          <button
            type="submit"
            disabled={status !== "idle"}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl gradient-brand-bg px-5 py-3 font-medium text-primary-foreground shadow-lg transition-transform hover:scale-[1.01] disabled:opacity-70"
          >
            {status === "sending" ? "Sending..." : status === "sent" ? "Message sent ✓" : (<><FiSend /> Send Message</>)}
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">Wire EmailJS keys inside <code className="font-mono text-primary">Contact.onSubmit</code> to enable delivery.</p>
        </motion.form>
      </div>
      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          background: oklch(1 0 0 / 0.05);
          border: 1px solid oklch(1 0 0 / 0.1);
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          color: inherit;
          outline: none;
          transition: border-color .2s, box-shadow .2s, background .2s;
        }
        .input::placeholder { color: oklch(0.72 0.03 265); }
        .input:focus {
          border-color: oklch(0.72 0.19 295 / 0.6);
          background: oklch(1 0 0 / 0.08);
          box-shadow: 0 0 0 4px oklch(0.72 0.19 295 / 0.15);
        }
      `}</style>
    </Section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

// -------------------- Footer --------------------
function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/5">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg gradient-brand-bg text-primary-foreground">{"<>"}</span>
            <span className="gradient-text">Gnana Sree Vittanala</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Computer Science student & aspiring software engineer. Building things people enjoy using.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Quick Links</h4>
          <ul className="grid grid-cols-2 gap-y-2 text-sm text-muted-foreground">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="transition-colors hover:text-primary">{n.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Connect</h4>
          <div className="flex gap-3">
            {[
              { href: LINKS.github, icon: <FiGithub />, label: "GitHub" },
              { href: LINKS.linkedin, icon: <FiLinkedin />, label: "LinkedIn" },
              { href: `mailto:${LINKS.email}`, icon: <FiMail />, label: "Email" },
              { href: LINKS.leetcode, icon: <SiLeetcode />, label: "LeetCode" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-xl glass text-lg transition-colors hover:text-primary"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Gnana Sree. Built with React, Tailwind & Framer Motion.
      </div>
    </footer>
  );
}

// -------------------- Back to top --------------------
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-xl gradient-brand-bg text-primary-foreground shadow-lg transition-transform hover:scale-110"
        >
          <FiArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
