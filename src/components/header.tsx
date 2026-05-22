import { NavLink } from "react-router";
import { Logo } from "@/components/logo";
import styles from "@/styles/components/header.module.css";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Update the scrolled state based on the scroll position
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
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
