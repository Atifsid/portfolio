export const profile = {
  name: "Atif Siddiqui",
  title: "Senior Software Developer",
  subtitle: "Full-Stack — Mobile, Web & Backend",
  location: "Indirapuram, Ghaziabad, India",
  email: "heyatifsid@gmail.com",
  phone: "+91-9773916646",
  github: "https://github.com/Atifsid",
  linkedin: "https://www.linkedin.com/in/atifsid07/",
  summary:
    "Full-stack engineer with 3.5+ years shipping production systems in React Native, Next.js, Angular, Node.js, Spring Boot, and .NET. Built features across e-commerce, logistics, fleet management, ERP, and partner integration platforms, and mentored 3+ junior engineers.",
  documentNo: "SSE-2023-0135",
};

export type StampEntry = {
  id: string;
  company: string;
  role: string;
  dateRange: string;
  entryDate: string;
  city: string;
  ink: "navy" | "purple" | "green" | "red";
  current?: boolean;
  bullets: string[];
};

export const experience: StampEntry[] = [
  {
    id: "localwell",
    company: "Localwell Private Limited",
    role: "Senior Software Developer",
    dateRange: "Feb 2026 — Present",
    entryDate: "12 FEB 2026",
    city: "GHAZIABAD",
    ink: "navy",
    current: true,
    bullets: [
      "Lead full-stack development of MedCart, Localwell's medicines and OTC e-commerce platform, across mobile, web, and backend.",
      "Built a Node.js service syncing partner orders from MedCart into Localwell's order management system.",
      "Designed Integrations BE, a gateway enabling partner order creation and onboarding beyond MedCart.",
      "Manage a team of 3 engineers across 4 backend services, the mobile app, and web applications.",
    ],
  },
  {
    id: "beta-arrays-2",
    company: "Beta Arrays",
    role: "Software Developer",
    dateRange: "Aug 2025 — Jan 2026",
    entryDate: "04 AUG 2025",
    city: "GHAZIABAD",
    ink: "red",
    bullets: [
      "Migrated 150+ legacy ASPX pages to Next.js, improving page load performance by 30% and strengthening UI consistency.",
      "Developed a .NET Web API for the Job Sheet module in a Fleet Management System, supporting maintenance operations for 100+ vehicles.",
      "Integrated the Next.js frontend with .NET APIs, reducing data inconsistencies by 40% through secure, session-based request handling.",
      "Built a React Native app digitizing shop-floor and field operations for a manufacturing client, replacing manual, paper-based workflows.",
      "Implemented mobile workflows for job tracking, material requests, and production status updates, giving 100+ users real-time visibility.",
      "Automated task data capture through mobile forms and validations, cutting manual entry by 5+ hours weekly per technician.",
    ],
  },
  {
    id: "dgfc",
    company: "DGFC",
    role: "Senior Engineer",
    dateRange: "Apr 2025 — Aug 2025",
    entryDate: "07 APR 2025",
    city: "NEW DELHI",
    ink: "green",
    bullets: [
      "Introduced Git-based version control, reducing integration issues by 40% and accelerating code reviews.",
      "Refactored file storage logic by centralizing S3 directory usage with environment-based configuration, removing hardcoded paths.",
      "Deployed a facial recognition system using AWS Rekognition for automated driver identity verification.",
      "Delivered RESTful APIs using .NET Core to support real-time logistics and maintenance operations.",
      "Architected a React Native app automating field data collection, cutting entry time by 5 hours weekly for 100+ technicians.",
    ],
  },
  {
    id: "beta-arrays-1",
    company: "Beta Arrays",
    role: "Associate Software Developer",
    dateRange: "Jan 2023 — Feb 2025",
    entryDate: "16 JAN 2023",
    city: "GHAZIABAD",
    ink: "purple",
    bullets: [
      "Created Angular ERP dashboards with reusable components, controlled forms, and conditional rendering, increasing user engagement by 25%.",
      "Established 15+ frontend validation and API-driven workflows enforcing business rules, improving form submission accuracy.",
      "Optimized data-fetching and rendering pipelines across 8+ dashboards, reducing average page load times by 20%.",
      "Enabled Razorpay payment integration for NGO donation workflows, simplifying payments and increasing adoption.",
      "Improved Spring Boot REST API retrieval speed by 20% through query and endpoint optimization.",
      "Added location-based UI constraints and geofencing logic restricting user actions outside predefined zones, improving compliance tracking by 40%.",
      "Shipped a cross-platform React Native app with secure authentication, multiple REST API integrations, and Razorpay payments.",
      "Crafted reusable React Native components for an LMS mobile app, improving code reusability by 25%, and optimized the Spring Boot APIs powering it, raising retrieval speed by 20%.",
      "Mentored 3+ trainees and junior developers across Spring Boot and React Native fundamentals, accelerating module delivery by 3x.",
      "Client engagement — Webomates (Oct 2023 – Jan 2025), contracted via Beta Arrays: enhanced front-end capabilities for an AI testing platform, built reusable Angular UI components (-20% dev time), and accelerated product switching (-30% load time).",
    ],
  },
];

export type VisaEntry = {
  id: string;
  title: string;
  stack: string[];
  description: string;
  highlights?: string[];
  href?: string;
  type: "live" | "repo";
  preview?: string;
};

export const projects: VisaEntry[] = [
  {
    id: "jobspedia",
    title: "JobsPedia",
    stack: ["Node.js", "TypeScript", "SQLite", "REST API"],
    description:
      "A job-aggregation service unifying 16+ ATS platforms (Greenhouse, Lever, Ashby, and others) and 6 job-board APIs into one normalized, deduplicated dataset exposed via a REST search API.",
    highlights: [
      "Cross-source fuzzy deduplication",
      "H-1B visa-sponsorship cross-referencing against USCIS data",
    ],
    href: "https://github.com/Atifsid",
    type: "repo",
  },
  {
    id: "jobflowai",
    title: "JobFlowAI",
    stack: ["Node.js", "TypeScript", "React", "Express", "Playwright"],
    description:
      "An AI career-automation platform that tailors a resume per job description, verifies ATS keyword coverage and work-history integrity deterministically in code, and drafts personalized LinkedIn referral outreach — cutting a 2–3 hour manual application workflow to under 2 minutes.",
    highlights: [
      "Provider-agnostic AI pipeline behind a strict layered backend",
      "290+ automated tests",
    ],
    href: "https://github.com/Atifsid",
    type: "repo",
  },
  {
    id: "tms",
    title: "Enterprise Fleet Management System",
    stack: ["React", "TypeScript"],
    description:
      "Frontend-only enterprise portal with complex forms, large data tables, and theme switching, built for internal fleet operations.",
    href: "https://tms-frontend-neon.vercel.app/",
    type: "live",
    preview: "/images/previews/tms.png",
  },
  {
    id: "apple-clone",
    title: "Apple iPhone Website Clone",
    stack: ["Next.js", "GSAP", "Three.js"],
    description:
      "High-fidelity clone of Apple's iPhone product page featuring smooth GSAP-based animations and an interactive 3D model, increasing user retention by 20%.",
    href: "https://apple-clone-lilac.vercel.app/",
    type: "live",
    preview: "/images/previews/apple.png",
  },
  {
    id: "wong",
    title: "Wong — Serverless Text Platform",
    stack: ["Next.js", "Tailwind CSS", "Cloudflare Workers", "D1", "Hono"],
    description:
      "Lightweight, Notion-style platform to create, share, and view text content without authentication. Serverless backend on Cloudflare Workers cut response time and server costs by 30%.",
    href: "https://wong-rho.vercel.app/da3064cb-e037-45cd-a893-d0a1f09601c6",
    type: "live",
    preview: "/images/previews/wong.png",
  },
  {
    id: "email-verify",
    title: "Email Verification Service",
    stack: ["React", "Vite", "Node.js", "Express"],
    description:
      "Full-stack SMTP-based email verification tool validating addresses in real time via direct SMTP handshakes, similar to Hunter.io.",
    href: "https://github.com/Atifsid/email-verification",
    type: "repo",
    preview: "/images/previews/email-verify.png",
  },
  {
    id: "hrms",
    title: "HRMS",
    stack: ["React Native", "MMKV", "TanStack Query"],
    description:
      "Modular HRMS app supporting Admin and Employee roles with persistent auth, an employee directory paginated for 1,000+ records, dark/light themes, and resilience under simulated slow networks.",
    href: "https://github.com/Atifsid",
    type: "repo",
  },
  {
    id: "shopit",
    title: "Shopit — E-Commerce Web App",
    stack: ["Next.js", "Redux", "Tailwind CSS"],
    description:
      "Scalable e-commerce application with product listings and a real-time cart system. Reusable Redux actions and reducers cut code redundancy by 30%.",
    href: "https://shopit-drab.vercel.app/",
    type: "live",
    preview: "/images/previews/shopit.png",
  },
  {
    id: "jetaway",
    title: "JetAway",
    stack: ["React Native", "RapidAPI"],
    description:
      "Mobile flight booking app integrating real-time flight data, processing 100+ itineraries per query across sign-up, search, filtering, and itinerary screens.",
    href: "https://github.com/Atifsid",
    type: "repo",
  },
  {
    id: "streamanime",
    title: "StreamAnime",
    stack: ["React Native"],
    description:
      "Full-featured anime streaming app supporting 5,000+ episodes with real-time search, HD playback, animated transitions, and dual themes.",
    href: "https://github.com/Atifsid",
    type: "repo",
  },
  {
    id: "greenbank",
    title: "GreenBank Landing Page",
    stack: ["React", "Tailwind CSS"],
    description:
      "Pixel-perfect, fully responsive landing page developed from a Figma prototype, focused on performance and modern web best practices.",
    href: "https://greenbankx.netlify.app/",
    type: "live",
    preview: "/images/previews/greenbank.png",
  },
  {
    id: "buildverse",
    title: "Buildverse Landing Page",
    stack: ["React", "Tailwind CSS"],
    description:
      "Pixel-perfect, fully responsive landing page built with a focus on performance.",
    href: "https://www.buildverse.co.in/",
    type: "live",
    preview: "/images/previews/buildverse.png",
  },
];

export type SkillGroup = {
  id: string;
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages",
    items: ["JavaScript", "TypeScript", "Java", "Kotlin", "C#", "SQL"],
  },
  {
    id: "frontend",
    label: "Frontend & Mobile",
    items: [
      "React",
      "Next.js",
      "React Native",
      "Angular",
      "HTML5",
      "CSS3",
      "Redux",
      "Zustand",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: ["Node.js", "Spring Boot", ".NET / ASP.NET", "REST API design", "Hono"],
  },
  {
    id: "databases",
    label: "Databases",
    items: ["MySQL", "PostgreSQL", "MSSQL"],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    items: [
      "AWS (EC2, S3, Rekognition)",
      "Cloudflare Workers/D1",
      "Git",
      "Jenkins",
      "CI/CD pipelines",
    ],
  },
  {
    id: "domain",
    label: "Domain Expertise",
    items: [
      "Payment Gateway Integration (Razorpay)",
      "Facial Recognition (AWS Rekognition)",
      "Geofencing",
      "Partner Order Integrations",
    ],
  },
];

export const education = {
  degree: "B.Tech, Computer Science Engineering",
  school: "Inderprastha Engineering College, Ghaziabad",
  dateRange: "2019 — 2023",
};
