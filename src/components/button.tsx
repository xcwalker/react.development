import { NavLink } from "react-router";
import GFIcon from "@/components/GFIcon";
import styles from "@/styles/components/button.module.css"

export default function Button(props: {
  text: string;
  title?: string;
  icon?: string;
  disabled?: boolean;
  onClick: () => void;
	variant?: "primary" | "secondary";
  hidden?: boolean;
  onBlur?: () => void;
  className?: string;
}) {
  return (
    <button
      title={props.title ? props.title : props.text}
      disabled={props.disabled}
      onClick={props.onClick}
      onBlur={props.onBlur}
      className={`${styles.button} ${props.disabled ? styles.disabled : ""} ${props.variant ? styles[props.variant] : styles.secondary} ${props.hidden ? styles.hidden : ""} ${props.className ? props.className : ""}`}

    >
      {props.text}
      {props.icon && <GFIcon icon={props.icon} className={styles.icon} />}
    </button>
  );
}

export function NavButton(props: {
  text: string;
  title?: string;
  icon?: string;
  disabled?: boolean;
  href: string;
  variant?: "primary" | "secondary";
  hidden?: boolean;
}) {
  return (
    <NavLink
      to={props.href}
      title={props.title ? props.title : props.text}
      className={`${styles.button} ${props.disabled ? styles.disabled : ""} ${props.variant ? styles[props.variant] : styles.secondary} ${props.hidden ? styles.hidden : ""}`}
    >
      {props.text}
      {props.icon && <GFIcon icon={props.icon} className={styles.icon} />}
    </NavLink>
  );
}