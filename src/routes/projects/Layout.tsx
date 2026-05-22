import Header from "@/components/header";
import { Outlet } from "react-router";
import styles from "@/styles/routes/projects/layout.module.css"

export default function Project_Layout() {
  return (
    <>
			<Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}
