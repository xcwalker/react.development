import Button, { NavButton } from "@/components/button";
import Image from "@/components/image";
import Section from "@/components/section";
import styles from "@/styles/routes/home/items.module.css";
import type { ItemType } from "@/types";
import itemConst from "@/routes/item/const.json";
import { useState } from "react";
import { itemSorter } from "@/functions/itemSorter";

export function Home_Items(props: {
  itemSet: { id: string; value: ItemType }[];
  type: "project" | "blog";
  canSort?: boolean;
  hideTitle?: boolean;
  limit?: number;
  excludeIds?: string[];
  title?: {
    prefix?: string;
    suffix?: string;
    override?: string;
  }
  inline?: boolean;
  collection?: {
    id: string;
    exclusive?: boolean;
  };
}) {
  const [sortMethod, setSortMethod] = useState<keyof typeof itemSorter>(
    Object.keys(itemSorter)[0] as keyof typeof itemSorter,
  );
  const filteredItems = props.excludeIds
    ? props.itemSet.filter((item) => !props.excludeIds!.includes(item.id))
    : props.itemSet;
    const collectionFilteredItems = props.collection
    ? (props.collection.exclusive
        ? filteredItems.filter((item) => item.value.metaData.collection === props.collection.id)
        : filteredItems.filter((item) => item.value.metaData.collection !== props.collection.id))
    : filteredItems;
  const sortedItems = [...collectionFilteredItems].sort(itemSorter[sortMethod].func);
  const limitedItems = props.limit
    ? sortedItems.slice(0, props.limit)
    : sortedItems;

  const methods = Object.keys(itemSorter) as (keyof typeof itemSorter)[];

  if (limitedItems.length === 0) {
    return null;
  }

  return (
    <Section
      id={props.type}
      className={styles.projects}
      container={{ className:  props.inline ? styles.containerInline : styles.container }}
    >
      <header className={styles.header}>
        {!props.hideTitle && (
          <h2>
            {props.title?.prefix ?? ""}{props.title?.override ?? itemConst[props.type].title}{props.title?.suffix ?? ""}
          </h2>
        )}
        {props.canSort && limitedItems.length > 1 && (
          <div className={styles.select}>
            {methods.map((method) => (
              <Button
                onClick={() => {
                  setSortMethod(method);
                }}
                className={styles.dropdownOption}
                title={`Sort by ${itemSorter[method].label}`}
                variant={sortMethod === method ? "primary" : "secondary"}
                text={itemSorter[method].label}
              />
            ))}
          </div>
        )}
      </header>
      <ol className={styles.list}>
        {limitedItems.map((project) => (
          <li key={project.id}>
            <Item
              id={project.id}
              value={project.value}
              hasThumbnail={itemConst[props.type].hasThumbnail}
              buttonText={itemConst[props.type].buttonText}
              href={itemConst[props.type].href}
            />
          </li>
        ))}
      </ol>
      {props.limit && props.itemSet.length > props.limit && (
        <NavButton
          href={itemConst[props.type].href}
          text={itemConst[props.type].limitButton}
        />
      )}
    </Section>
  );
}

function Item(props: {
  id: string;
  value: ItemType;
  hasThumbnail?: boolean;
  buttonText: string;
  href: string;
}) {
  const data = props.value.data;
  const metadata = props.value.metaData;
  const date = metadata ? new Date(metadata.date.modified) : null;

  return (
    <div className={styles.project}>
      {props.hasThumbnail ? (
        <Image
          src={metadata.thumbnail}
          className={styles.thumbnail}
          usePlaceholder
        />
      ) : null}
      <span className={styles.title}>{data.title}</span>
      <span className={styles.subtitle}>
        <span className={styles.date}>{date?.toLocaleDateString()}</span>
        {metadata.collectionName && (
          <>
            <span className={styles.separatorDot}> • </span>
            <span className={styles.collection}>{metadata.collectionName}</span>
          </>
        )}
      </span>
      <NavButton href={`${props.href}${props.id}`} text={props.buttonText} />
    </div>
  );
}
