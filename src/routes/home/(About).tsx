import Section from "@/components/section";
import aboutStyles from "@/styles/routes/home/about.module.css";

export function Home_About() {
  return (
    <Section
      id="About"
      className={aboutStyles.about}
      container={{ className: aboutStyles.container }}
    >
      <p className={aboutStyles.text}>
        <span>Doing amazing things.</span>
        <span>Mainly just to prove we can.</span>
        <span>And sharing it with you.</span>
      </p>
    </Section>
  );
}
