import { eventAtom } from "@/atoms";
import Section from "@/components/section";
import { useAtomValue } from "jotai";
import eventStyles from "@/styles/routes/home/events.module.css";
import { EventVariants, type EventType } from "@/types";
import GFIcon from "@/components/GFIcon";
import { NavButton } from "@/components/button";

export function Home_Events(props: {
	type: "upcoming" | "past"
}) {
  const events = useAtomValue(eventAtom);

  const filteredEvents = events.filter(
    (event) => {
      const eventEndDate = new Date(event.value.date.end);
      const now = new Date();
      if (props.type === "upcoming") {
        return eventEndDate > now;
      } else {
        return eventEndDate <= now;
      }
    }
  );

  if (filteredEvents.length === 0) {
    return null;
  }

  return (
    <Section
      id="Events"
      className={`${eventStyles.events} ${eventStyles[props.type]}`}
      container={{ className: eventStyles.container }}
    >
      <h2 className={eventStyles.heading}>{props.type} Events</h2>
      <ol className={eventStyles.list}>
        {filteredEvents.map((event) => (
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
          <span className={eventStyles.special}>
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