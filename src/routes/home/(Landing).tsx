import { eventAtom } from "@/atoms";
import { NavButton } from "@/components/button";
import GFIcon from "@/components/GFIcon";
import { Logo } from "@/components/logo";
import Section from "@/components/section";
import landingStyles from "@/styles/routes/home/landing.module.css";
import { useAtomValue } from "jotai";
import { NavLink } from "react-router";
import { EventVariants } from "@/types";

export function Home_Landing() {
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
        <span>scroll for amazing</span>
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
            <div className={`${landingStyles.details} ${landingStyles.mobile}`}>
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
