import styles from "../styles/components/footer.module.css";
import { Logo } from "./logo";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.about}>
          <Logo.constrained className={styles.logo} />
          <div className={styles.text}></div>
          <span>Copyright © 2026 xcwalker development.</span>
          <span>
            All rights reserved. <a href="https://xcw.one">XCW Group</a>
          </span>
        </div>
        <div className={styles.group}>
          <Logo.group className={styles.groupLogo} />
        </div>
      </div>
    </footer>
  );
}
