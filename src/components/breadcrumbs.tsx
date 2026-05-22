import { NavLink, useLocation } from "react-router";
import { Fragment } from "react/jsx-runtime";
import styles from "@/styles/components/breadcrumbs.module.css";

export default function Breadcrumbs() {
  const location = useLocation();
  const breadcrumbs = location.pathname.split("/").filter(Boolean);

  return (
    <nav className={styles.breadcrumbs}>
      <ol className={styles.list}>
        {breadcrumbs.map((crumb, index) => (
          <Fragment key={index}>
            <span className={styles.separator}>/</span>
            {crumb === location.pathname.split("/").filter(Boolean).pop() ? (
              <span className={styles.current}>{crumb}</span>
            ) : (
              <NavLink className={styles.crumb} to={`/${breadcrumbs.slice(0, index + 1).join("/")}`}>
                {crumb}
              </NavLink>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
