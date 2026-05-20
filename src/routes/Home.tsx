import { eventAtom, projectsAtom } from "@/atoms";
import { NavButton } from "@/components/button";
import GFIcon from "@/components/GFIcon";
import { Logo } from "@/components/logo";
import Section from "@/components/section";
import landingStyles from "@/styles/routes/home/landing.module.css";
import { useAtomValue } from "jotai";
import { NavLink } from "react-router";
import { EventVariants, type EventType, type ItemType } from "@/types";
import eventStyles from "@/styles/routes/home/events.module.css";
import projectStyles from "@/styles/routes/home/projects.module.css";

export default function Home() {
  return (
    <main>
      <Landing />
      <Events />
      <Projects />
      <div style={{ height: "100vh" }}></div>
    </main>
  );
}

function Landing() {
  // Landing page content
  return (
    <Section
      id="landing"
      className={landingStyles.landing}
      container={{
        className: landingStyles.container,
      }}
    >
      <Logo.constrained className={landingStyles.logo} />
      <div className={landingStyles.line}>
        <div className={landingStyles.displayLine} />
        <span>XCW Group</span>
        <span className={landingStyles.separatorDot}>•</span>
        <span>Est. 2025</span>
      </div>
      <div className={landingStyles.links}>
        <NavButton
          text="Contact Us"
          href="/contact"
          variant="primary"
          icon="chevron_right"
        />
        <NavButton text="Learn More" href="/learn-more" icon="info" />
      </div>
      <div className={landingStyles.displayLine} />
      <NextEvent />
      <div className={landingStyles.scrollMarker}>
        <div />
        <span>Scroll</span>
      </div>
    </Section>
  );
}

function NextEvent() {
  const events = useAtomValue(eventAtom);

  const nextEvent = events.filter(
    (event) => new Date(event.value.date.end) > new Date(),
  )[0];
  const nextEventDate = nextEvent ? new Date(nextEvent.value.date.start) : null;
  const nextEventDuration = nextEventDate
    ? new Date(nextEvent.value.date.end).getTime() - nextEventDate.getTime()
    : null;
  const callToAction =
    nextEventDate && nextEventDate > new Date()
      ? nextEventDate.getTime() + 1000 < new Date().getTime()
        ? "Starting Soon"
        : "Upcoming"
      : nextEventDate && new Date(nextEvent.value.date.end) > new Date()
        ? "Join Now"
        : "Event Ended";
  const nextEventDomain = nextEvent
    ? new URL(nextEvent.value.link).hostname
    : null;

  return (
    <>
      {nextEvent && (
        <>
          <NavLink to={nextEvent.value.link} className={landingStyles.event}>
            <div className={landingStyles.content}>
              <GFIcon
                icon={EventVariants[nextEvent.value.type].icon}
                className={landingStyles.icon}
              />
              <div className={landingStyles.tags}>
                <span className={landingStyles.special}>
                  {EventVariants[nextEvent.value.type].title}
                </span>
                <span>Join Us</span>
              </div>
              <div
                className={`${landingStyles.details} ${landingStyles.desktop}`}
              >
                <div className={landingStyles.title}>
                  <span className={landingStyles.name}>
                    {nextEvent.value.title}
                  </span>
                  <span className={landingStyles.separatorDot}> • </span>
                  <span className={landingStyles.date}>
                    {nextEventDate?.toLocaleDateString()} (
                    {nextEventDuration
                      ? `${Math.floor(nextEventDuration / (1000 * 60 * 60))}h ${Math.floor((nextEventDuration % (1000 * 60 * 60)) / (1000 * 60))}m`
                      : ""}
                    )
                  </span>
                </div>
                {nextEvent.value.location !== "" && (
                  <span className={landingStyles.location}>
                    {nextEvent.value.location}
                  </span>
                )}
                {nextEvent.value.location === "" && (
                  <span className={landingStyles.domain}>
                    {nextEventDomain}
                  </span>
                )}
              </div>
              <div
                className={`${landingStyles.spacer} ${landingStyles.mobile}`}
              />
              <div className={landingStyles.callToAction}>{callToAction}</div>
              <GFIcon
                icon="chevron_right"
                className={landingStyles.iconRight}
              />
            </div>
            <div
              className={`${landingStyles.details} ${landingStyles.mobile}`}
            >
              <div className={landingStyles.title}>
                <span className={landingStyles.name}>
                  {nextEvent.value.title}
                </span>
                <span className={landingStyles.separatorDot}> • </span>
                <span className={landingStyles.date}>
                  {nextEventDate?.toLocaleDateString()} (
                  {nextEventDuration
                    ? `${Math.floor(nextEventDuration / (1000 * 60 * 60))}h ${Math.floor((nextEventDuration % (1000 * 60 * 60)) / (1000 * 60))}m`
                    : ""}
                  )
                </span>
              </div>
              {nextEvent.value.location !== "" && (
                <span className={landingStyles.location}>
                  {nextEvent.value.location}
                </span>
              )}
              {nextEvent.value.location === "" && (
                <span className={landingStyles.domain}>{nextEventDomain}</span>
              )}
            </div>
          </NavLink>
          <div className={landingStyles.displayLine} />
        </>
      )}
    </>
  );
}

function Events() {
  const events = useAtomValue(eventAtom);
  const upcomingEvents = events.filter(
    (event) => new Date(event.value.date.end) > new Date(),
  );

  if (upcomingEvents.length === 0) {
    return null;
  }

  return (
    <Section
      id="Events"
      className={eventStyles.events}
      container={{ className: eventStyles.container }}
    >
      <h2>Upcoming Events</h2>
      <ol className={eventStyles.list}>
        {upcomingEvents.map((event) => (
          <li key={event.id}>
            <Event {...event.value} />
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Event(props: EventType) {
  const date = props ? new Date(props.date.start) : null;
  const duration = date
    ? new Date(props.date.end).getTime() - date.getTime()
    : null;
  const callToAction =
    date && date > new Date()
      ? date.getTime() + 1000 < new Date().getTime()
        ? "Starting Soon"
        : "Upcoming"
      : date && new Date(props.date.end) > new Date()
        ? "Join Now"
        : "Event Ended";
  const domain = props ? new URL(props.link).hostname : null;

  return (
    <div className={eventStyles.event}>
      <div className={eventStyles.row}>
        <GFIcon
          icon={EventVariants[props.type].icon}
          className={eventStyles.icon}
        />
        <div className={eventStyles.tags}>
          <span className={landingStyles.special}>
            {EventVariants[props.type].title}
          </span>
          <span>Join Us</span>
        </div>
      </div>
      <div className={eventStyles.details}>
        <span className={eventStyles.name}>{props.title}</span>
        <span>
          <span className={eventStyles.date}>
            {date?.toLocaleDateString()} (
            {duration
              ? `${Math.floor(duration / (1000 * 60 * 60))}h ${Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))}m`
              : ""}
            )
          </span>
          <span className={eventStyles.separatorDot}> • </span>
          {props.location !== "" && (
            <span className={eventStyles.location}>{props.location}</span>
          )}
          {props.location === "" && (
            <span className={eventStyles.domain}>{domain}</span>
          )}
        </span>
      </div>
      <NavButton href={props.link} text={callToAction} />
    </div>
  );
}

function Projects() {
  const projects = useAtomValue(projectsAtom);
  const sortedProjects = projects.sort(
    (a, b) =>
      new Date(b.value.metaData.date.modified).getTime() -
      new Date(a.value.metaData.date.modified).getTime(),
  );

  return (
    <Section
      id="Projects"
      className={projectStyles.projects}
      container={{ className: projectStyles.container }}
    >
      <h2>Projects</h2>
      <ol className={projectStyles.list}>
        {sortedProjects.map((project) => (
          <li key={project.id}>
            <Project id={project.id} value={project.value} />
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Project(props: { id: string; value: ItemType }) {
  const data = props.value.data;
  const metadata = props.value.metaData;
  const date = metadata ? new Date(metadata.date.modified) : null;

  return (
    <div className={projectStyles.project}>
      <img
        src={metadata.thumbnail}
        alt={""}
        className={projectStyles.thumbnail}
      />
      <span className={projectStyles.title}>{data.title}</span>
      <span className={projectStyles.subtitle}>
        <span className={projectStyles.date}>{date?.toLocaleDateString()}</span>
        {metadata.collectionName && (
          <>
            <span className={projectStyles.separatorDot}> • </span>
            <span className={projectStyles.collection}>
              {metadata.collectionName}
            </span>
          </>
        )}
      </span>
      <NavButton href={`/projects/${props.id}`} text="View Project" />
    </div>
  );
}
