import { useOutletContext } from "react-router";
import { Home_Items } from "../home/(Items)";
import type { ItemType } from "@/types";

export default function Item_Index() {
  const { itemSet, type } = useOutletContext<{
    itemSet: {
      id: string;
      value: ItemType;
    }[];
    type: "project" | "blog";
  }>();

  return (
    <>
    <div className="headerSpacer" />
      <Home_Items itemSet={itemSet} type={type} canSort hideTitle />
    </>
  );
}
