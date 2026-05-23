import { Logo } from "@/components/logo";
import styles from "@/styles/components/header.module.css";
import { useEffect, useState } from "react";
import Nav from "./nav";

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
        <Nav
          links={[
            {
              label: "Home",
              href: "/"
            },
            {
              label: "Projects",
              href: "/projects"
            },
            {
              label: "Blog",
              href: "/blog"
            }
          ]}
        />
      </div>
    </header>
  );
}
