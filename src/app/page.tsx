import { profile } from "@/data/resume";
import { SiteHeader } from "@/components/site-header";
import { Exhibit } from "@/components/exhibit";
import { GatewayFlow } from "@/components/exhibits/gateway-flow";
import { JobsFlowScreens } from "@/components/exhibits/jobsflow-screens";
import { DedupModel } from "@/components/exhibits/dedup-model";
import { SlowNetworkList } from "@/components/exhibits/slow-network-list";
import { SmtpHandshake } from "@/components/exhibits/smtp-handshake";
import { WorkIndex } from "@/components/work-index";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { Footer } from "@/components/footer";

function SectionTitle({ children, aside }: { children: React.ReactNode; aside?: string }) {
  return (
    <h2 className="mb-5 text-[17px] font-medium tracking-[-0.01em]">
      {children}
      {aside && <span className="ml-2 font-normal text-faint">{aside}</span>}
    </h2>
  );
}

export default function Home() {
  return (
    <div id="top" className="mx-auto max-w-[720px] px-5">
      <SiteHeader />

      <main>
        <section className="rise mb-10 mt-14 sm:mt-20" style={{ ["--i" as string]: 1 }}>
          <h1 className="sr-only">
            {profile.name}, {profile.title}
          </h1>
          <p className="max-w-[58ch] text-muted">
            Full-stack engineer, 3.5+ years shipping production systems across{" "}
            <span className="text-ink">mobile, web and backend</span>. I lead a team of 3 at Localwell building MedCart, a medicines
            e-commerce platform, and the integrations that move partner orders into it. On the side I build JobsFlow, a job search that
            does the busywork for you.
          </p>
          <p className="mt-4 flex gap-5 text-muted">
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-ink">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink">
              LinkedIn
            </a>
            <a href={profile.twitter} target="_blank" rel="noreferrer" className="hover:text-ink">
              Twitter
            </a>
            <a href="#contact" className="hover:text-ink">
              Contact
            </a>
          </p>
        </section>

        <section id="work" aria-label="Selected work" className="scroll-mt-8 space-y-20">
          <div className="rise" style={{ ["--i" as string]: 2 }}>
            <Exhibit
              title="Integrations BE"
              meta="Localwell · 2026"
              note="illustrative · sample orders"
              description="A gateway that lets partners create orders and onboard beyond MedCart, next to a Node.js service syncing MedCart orders into Localwell’s order management system."
            >
              <GatewayFlow />
            </Exhibit>
          </div>

          <Exhibit
            title="JobsFlow"
            href="https://jobsflow.in"
            linkLabel="jobsflow.in, opens in a new tab"
            meta="Node.js · React · Playwright"
            note="real screens · sample data"
            description="Ranks today’s roles by fit with your resume, tailors the resume to each posting, finds who can refer you, and tracks follow-ups. A 2–3 hour application workflow, done in under 2 minutes."
          >
            <JobsFlowScreens />
          </Exhibit>

          <Exhibit
            title="JobsPedia"
            meta="Node.js · TypeScript · SQLite"
            note="the real merge rules · sample postings"
            description="The data engine behind JobsFlow. 18 ATS platforms, 6 job-board APIs and aggregator boards, normalized into one deduplicated dataset behind POST /jobs/search, with H-1B sponsorship cross-referenced against USCIS data."
          >
            <DedupModel />
          </Exhibit>

          <Exhibit
            title="HRMS"
            href="https://github.com/Atifsid/hrms"
            linkLabel="repository, opens in a new tab"
            meta="React Native · TanStack Query"
            note="sample records"
            description="Admin and employee roles, persistent auth, and a directory paginated over 1,000+ records that stays usable on slow networks."
          >
            <SlowNetworkList />
          </Exhibit>
          <Exhibit
            title="Email verification"
            href="https://github.com/Atifsid/email-verification"
            linkLabel="repository, opens in a new tab"
            meta="React · Node.js · Express"
            note="simulated session"
            description="Checks an address in real time through a direct SMTP handshake."
          >
            <SmtpHandshake />
          </Exhibit>
        </section>

        <section className="mt-28">
          <SectionTitle aside="live sites and repos">More work</SectionTitle>
          <WorkIndex />
        </section>

        <section id="experience" className="mt-28 scroll-mt-8">
          <SectionTitle aside="3.5+ years">Experience</SectionTitle>
          <Experience />
        </section>

        <section className="mt-28">
          <SectionTitle>Skills</SectionTitle>
          <Skills />
        </section>
      </main>

      <Footer />
    </div>
  );
}
