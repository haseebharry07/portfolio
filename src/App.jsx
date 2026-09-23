import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Code,
  Database,
  GitBranch,
  GraduationCap,
  Layers,
  Link as LinkedinIcon,
  Mail,
  Menu,
  Phone,
  X,
  Zap,
} from "lucide-react";
import "./App.css";
import photo from "./assets/haseeb.png";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */
const EMAIL = "iamhaseeb01@outlook.com";
const PHONE = "0306 1909391";
const PHONE_HREF = "tel:03061909391";
const LINKEDIN_URL = "#"; // paste your LinkedIn profile URL here

const navLinks = [
  { label: "Home", id: "top" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
];

const stats = [
  { value: "4+", label: "Years Experience" },
  { value: "5", label: "Major Projects" },
  { value: "3", label: "Companies" },
  { value: "6", label: "Skill Areas" },
];

const skillGroups = [
  { label: "Languages", icon: Code, tone: "indigo", items: ["C#", "C++", "JavaScript", "TypeScript", "HTML5", "CSS3", "jQuery", "Node.js"] },
  { label: "Frameworks", icon: Layers, tone: "red", items: ["Angular", ".NET Core", "MVC", "Bootstrap", "EF Core", "Express.js", "REST APIs", "Blockchain"] },
  { label: "Data", icon: Database, tone: "yellow", items: ["MSSQL", "MySQL", "PostgreSQL", "MongoDB", "PgAdmin", "DBeaver"] },
  { label: "Cloud & DevOps", icon: Cloud, tone: "yellow", items: ["Azure", "AWS", "Docker", "CI/CD"] },
  { label: "Caching & Messaging", icon: Zap, tone: "indigo", items: ["Redis", "Elasticsearch", "Quartz.NET", "RabbitMQ", "SQS", "SNS"] },
  { label: "Practice", icon: GitBranch, tone: "red", items: ["Microservices", "Agile / Scrum", "JWT & OAuth", "Performance Tuning"] },
];

const experience = [
  {
    role: "Software Engineer",
    company: "GlitchGone",
    dates: "07/25 — Present",
    current: true,
    project: "Glitch Gone Tool Kit",
    blurb:
      "A layout and theme builder for Go High Level. Shop owners assemble funnels — static, page-builder style websites — from reusable layouts rather than code.",
    points: [
      "Designed RESTful APIs on services, entities, models, and AutoMapper, returning clean JSON",
      "Integrated those APIs directly into the HTML/CSS front end powering the builder",
    ],
    tech: ["ASP.NET Core", "EF Core", "AutoMapper", "REST APIs", "HTML/CSS"],
  },
  {
    role: "Software Engineer",
    company: "Adroit Spark LLC",
    dates: "03/25 — 07/25",
    project: "AutoFixia",
    blurb:
      "Workshop management software for a motor shop: cars and drivers are registered, tickets are opened against a vehicle, parts are logged against the ticket, and the books — trial balance, balance sheet — are kept in the same system.",
    points: [
      "Built RESTful APIs on services, entities, models, and AutoMapper, and wired them into Angular for ticket creation",
      "Rewrote slow EF Core LINQ queries — cut unnecessary joins and includes, added indexes",
      "Handled the ticket-to-part assignment flow for each vehicle",
    ],
    tech: [".NET Core", "EF Core", "Angular", "Azure Functions", "PostgreSQL"],
  },
  {
    role: "Associate Software Engineer",
    company: "Vaival Technologies",
    dates: "05/22 — 03/25",
    project: "Vulcan Forged",
    blurb:
      "A blockchain gaming and NFT ecosystem — marketplace, play-to-earn titles, wallet integration, and a token-based reward system built around the PYR token.",
    points: [
      "Built services and microservices pulling data via LINQ, wired into server-rendered HTML/CSS views",
      "Integrated blockchain APIs into the NFT marketplace to handle buying and selling on-chain",
      "Ran developer support — traced and resolved user-reported issues through the database and code",
    ],
    tech: [".NET Core", "Microservices", "Redis", "PostgreSQL", "Blockchain APIs"],
  },
  {
    role: "Associate Software Engineer",
    company: "Vaival Technologies",
    dates: "05/22 — 03/25",
    project: "Berserk",
    blurb:
      "A blockchain collectible card game inside the Vulcan Forged ecosystem — every card is an NFT, and player rankings run on live on-chain data.",
    points: [
      "Built the NFT card gallery and leaderboard as RESTful APIs, backed by ASP.NET Core",
      "Pulled real-time rankings, performance records, and NFT ownership from blockchain APIs",
      "Kept on-chain data and the off-chain database consistent; added pagination and filtering for large datasets",
    ],
    tech: ["ASP.NET Core", "EF Core", "AutoMapper", "Azure Functions", "Blockchain APIs"],
  },
  {
    role: "Associate Software Engineer",
    company: "Vaival Technologies",
    dates: "05/22 — 03/25",
    project: "Chat Agent Tool",
    blurb:
      "A campaign tool for Shopify store owners, pulling storefront data through Gadget.app to help them run product campaigns and drive sales.",
    points: ["Designed RESTful APIs in Node.js and MongoDB, synced to Shopify stores via Gadget.app"],
    tech: ["Node.js", "Express", "MongoDB", "TypeScript", "Gadget.app"],
  },
];

const education = [
  { school: "Arid Agricultural University, Rawalpindi", degree: "MCS, Computer Science", place: "Rawalpindi, Pakistan" },
  { school: "University of Central Punjab, Lahore", degree: "BSc, Computer Science (ADP)", place: "Kot Addu, Pakistan" },
];

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */
const svgProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: "false",
};

/* Decorative doodles from the design */
const Zigzag = ({ className }) => (
  <svg className={`en-deco ${className || ""}`} viewBox="0 0 60 22" {...svgProps}>
    <polyline points="2,3 16,18 30,5 44,18 58,3" />
  </svg>
);
const Circles = ({ className }) => (
  <svg className={`en-deco ${className || ""}`} viewBox="0 0 44 44" {...svgProps}>
    <circle cx="17" cy="17" r="14" />
    <circle cx="27" cy="27" r="14" opacity=".7" />
  </svg>
);
const PlayTri = ({ className }) => (
  <svg className={`en-deco ${className || ""}`} viewBox="0 0 48 52" {...svgProps}>
    <polygon points="4,3 36,22 4,41" />
    <polygon points="12,13 44,32 12,51" opacity=".6" />
  </svg>
);
const Plus = ({ className }) => (
  <svg className={`en-deco ${className || ""}`} viewBox="0 0 24 24" {...svgProps}>
    <path d="M12 2v20M2 12h20" />
  </svg>
);
const Cross = ({ className }) => (
  <svg className={`en-deco ${className || ""}`} viewBox="0 0 24 24" {...svgProps}>
    <path d="M4 4l16 16M20 4L4 20" />
  </svg>
);

/* The gradient is defined once (see <LogoDefs /> in App) and shared by every logo */
function LogoDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="en-logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4fd1e8" />
          <stop offset=".55" stopColor="#8a7cf0" />
          <stop offset="1" stopColor="#f58fc8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Logo() {
  return (
    <a href="#top" className="en-brand" aria-label="Muhammad Haseeb — home">
      <svg className="en-logo" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="12.5" fill="none" stroke="url(#en-logo-grad)" strokeWidth="6" />
        <circle cx="23.5" cy="8.5" r="3.6" fill="#fff" />
      </svg>
      <span>Muhammad Haseeb</span>
    </a>
  );
}

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Projects carousel (native scroll-snap + prev/next + dots)           */
/* ------------------------------------------------------------------ */
function measure(el) {
  if (!el || !el.children.length) return null;
  const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
  const step = el.children[0].offsetWidth + gap;
  return { gap, step };
}

function ProjectCarousel({ items }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(1);

  const sync = useCallback(() => {
    const el = trackRef.current;
    const m = measure(el);
    if (!m) return;
    setPerView(Math.max(1, Math.round((el.clientWidth + m.gap) / m.step)));
    setIndex(Math.round(el.scrollLeft / m.step));
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const last = Math.max(0, items.length - perView);
  const current = Math.min(index, last);

  const goTo = (i) => {
    const el = trackRef.current;
    const m = measure(el);
    if (!m) return;
    el.scrollTo({ left: Math.min(Math.max(i, 0), last) * m.step, behavior: "smooth" });
  };

  return (
    <div className="en-carousel">
      <div className="en-track" ref={trackRef} onScroll={sync}>
        {items.map((job) => (
          <article className={`en-project ${job.current ? "is-current" : ""}`} key={job.project}>
            <div className="en-project-top">
              <span className="en-pill">{job.dates}</span>
              {job.current && <span className="en-pill en-pill--live">Current</span>}
            </div>
            <h3 className="en-project-title">{job.project}</h3>
            <p className="en-project-meta">
              {job.role} · {job.company}
            </p>
            <p className="en-project-blurb">{job.blurb}</p>
            <ul className="en-project-points">
              {job.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
            <div className="en-tags">
              {job.tech.map((t) => (
                <span className="en-tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="en-carousel-ctrl">
        <button
          type="button"
          className="en-arrow"
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          aria-label="Previous project"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="en-dots" role="tablist" aria-label="Project position">
          {Array.from({ length: last + 1 }).map((_, i) => (
            <button
              type="button"
              key={i}
              className={`en-dot ${i === current ? "is-on" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to project ${i + 1}`}
              aria-current={i === current}
            />
          ))}
        </div>
        <button
          type="button"
          className="en-arrow en-arrow--next"
          onClick={() => goTo(current + 1)}
          disabled={current === last}
          aria-label="Next project"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["top", "about", "skills", "projects", "education", "contact"];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const linkedinClick = (e) => LINKEDIN_URL === "#" && e.preventDefault();

  return (
    <div className="en">
      <LogoDefs />
      {/* NAV */}
      <nav className={`en-nav ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "is-open" : ""}`}>
        <div className="en-container en-nav-inner">
          <Logo />
          <div className="en-links">
            {navLinks.map((l) => (
              <a key={l.id} href={`#${l.id}`} className={active === l.id ? "is-active" : ""}>
                {l.label}
              </a>
            ))}
          </div>
          <a href="#contact" className="en-btn-outline en-nav-cta">
            Contact me
          </a>
          <button
            type="button"
            className="en-burger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <div className={`en-menu ${menuOpen ? "is-open" : ""}`}>
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={closeMenu} className={active === l.id ? "is-active" : ""}>
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={closeMenu} className="en-btn-outline">
            Contact me
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" className="en-hero">
        <div className="en-container en-hero-grid">
          <motion.div
            className="en-hero-copy"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <h1 className="en-h1">Build Scalable APIs &amp; Services</h1>
            <p className="en-lede">
              Hi, I&apos;m Muhammad Haseeb, a software engineer with 4+ years of experience building web
              applications, RESTful APIs, and microservices — from workshop management software to
              blockchain gaming platforms.
            </p>
            <a href="#projects" className="en-btn">
              View Projects <ArrowUpRight size={18} />
            </a>
          </motion.div>

          <motion.div
            className="en-visual"
            initial={{ opacity: 0, y: 34, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className="en-frame" />
            <div className="en-sq" />
            <div className="en-person">
              <img src={photo} alt="Muhammad Haseeb" />
            </div>
            <div className="en-sq-line" />

            <Circles className="en-d-circles" />
            <Zigzag className="en-d-zigzag" />
            <PlayTri className="en-d-play" />
            <Plus className="en-d-plus" />
          </motion.div>
        </div>
      </header>

      {/* ABOUT ("Why ... Best Choice?" block) */}
      <section id="about" className="en-section en-about">
        <div className="en-container">
          <Reveal className="en-split-head">
            <h2 className="en-h2">Why Work With Me?</h2>
            <p className="en-sub">
              Comfortable across Angular, ASP.NET Core, and Node.js, with the databases, caching, and
              messaging that keep them fast under load.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="en-panel">
              <div className="en-panel-text">
                <p>
                  I work mainly on the backend: designing <strong>RESTful APIs</strong>, modelling data, and
                  building the <strong>microservices</strong> that other teams&apos; frontends call into. Most
                  of my projects share the same shape — a domain with real complexity (workshop tickets,
                  blockchain marketplaces, campaign data) that needs a clean service layer, a well-indexed
                  database, and integration.
                </p>
                <p>
                  Recent work spans a <strong>funnel and theme builder</strong> for Go High Level, a full{" "}
                  <strong>workshop management system</strong> with its own accounting module, and two{" "}
                  <strong>blockchain-backed platforms</strong> — an NFT marketplace and a collectible card game
                  — where on-chain and off-chain data had to stay in sync. I also spend time on{" "}
                  <strong>performance</strong>: rewriting LINQ queries, indexing tables, and getting API
                  response times down.
                </p>
              </div>
              <div className="en-stats">
                {stats.map((s) => (
                  <div className="en-stat" key={s.label}>
                    <div className="en-stat-value">{s.value}</div>
                    <div className="en-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SKILLS ("The Service We Provide For You" block) */}
      <section id="skills" className="en-section en-skills">
        <PlayTri className="en-s-play" />
        <Cross className="en-s-cross" />
        <div className="en-container">
          <Reveal>
            <h2 className="en-h2 en-center">The Skills I Bring To Every Project</h2>
          </Reveal>
          <div className="en-skill-grid">
            {skillGroups.map((g, i) => {
              const Icon = g.icon;
              return (
                <Reveal delay={(i % 3) * 0.08} key={g.label}>
                  <div className={`en-skill tone-${g.tone}`}>
                    <div className="en-skill-icon">
                      <Icon size={26} strokeWidth={1.6} />
                    </div>
                    <h3>{g.label}</h3>
                    <p className="en-skill-items">
                      {g.items.map((item) => (
                        <span key={item}>{item} </span>
                      ))}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECTS ("Our Awesome Portfolio" block) */}
      <section id="projects" className="en-section en-projects">
        <Cross className="en-p-cross" />
        <Circles className="en-p-circles" />
        <Zigzag className="en-p-zigzag" />
        <div className="en-container">
          <Reveal>
            <h2 className="en-h2 en-h2--body">My Awesome Projects</h2>
            <p className="en-sub en-sub--flush">Five projects across three roles, in order.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ProjectCarousel items={experience} />
          </Reveal>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="en-section en-education">
        <div className="en-container">
          <Reveal>
            <h2 className="en-h2 en-h2--body">Education</h2>
          </Reveal>
          <div className="en-edu-grid">
            {education.map((e, i) => (
              <Reveal delay={i * 0.08} key={e.school}>
                <div className="en-edu tone-indigo">
                  <div className="en-skill-icon">
                    <GraduationCap size={26} strokeWidth={1.6} />
                  </div>
                  <div>
                    <h3>{e.school}</h3>
                    <p className="en-edu-degree">{e.degree}</p>
                    <p className="en-edu-place">{e.place}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="contact" className="en-section en-cta">
        <Plus className="en-c-plus" />
        <Circles className="en-c-circles" />
        <div className="en-container">
          <Reveal className="en-cta-row">
            <h2 className="en-h2">Have a backend that needs building or fixing?</h2>
            <a href={`mailto:${EMAIL}`} className="en-btn">
              Contact me
            </a>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="en-footer">
        <div className="en-container en-footer-row">
          <Logo />
          <div className="en-footer-links">
            <a href={`mailto:${EMAIL}`}>
              <Mail size={15} /> {EMAIL}
            </a>
            <a href={PHONE_HREF}>
              <Phone size={15} /> {PHONE}
            </a>
            <a href={LINKEDIN_URL} onClick={linkedinClick}>
              <LinkedinIcon size={15} /> LinkedIn
            </a>
          </div>
          <p className="en-copy">© 2026 Muhammad Haseeb · Lahore, Pakistan</p>
        </div>
      </footer>
    </div>
  );
}