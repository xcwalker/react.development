import Header from "@/components/header";
import { Outlet } from "react-router";
import styles from "@/styles/routes/item/layout.module.css";
import type { ItemType } from "@/types";

export default function Item_Layout(props: {
  itemSet: {
    id: string;
    value: ItemType;
  }[];
  type: "project" | "blog";
}) {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet context={{ itemSet: props.itemSet, type: props.type }} />
      </main>
    </>
  );
}
