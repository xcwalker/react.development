import { NavLink } from "react-router";
import { Logo } from "@/components/logo";
import styles from "@/styles/components/header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo.horizontal className={styles.logo} />
        <ul className={styles.nav}>
          <NavLink to="/" className={styles.link}>
            Home
          </NavLink>
          <NavLink to="/projects" className={styles.link}>
            Projects
          </NavLink>
        </ul>
      </div>
    </header>
  );
}
