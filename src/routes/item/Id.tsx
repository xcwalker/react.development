import Section from "@/components/section";
import { useOutletContext, useParams } from "react-router";
import styles from "@/styles/routes/item/id.module.css";
import { NavButton } from "@/components/button";
import Markdown from "react-markdown";
import Item_images from "./(Images)";
import remarkGfm from "remark-gfm";
import supersub from "remark-supersub";
import PageSeo from "@/components/pageSeo";
import Image from "@/components/image";
import Breadcrumbs from "@/components/breadcrumbs";
import type { ItemType } from "@/types";
import { Home_Items } from "../home/(Items)";

export default function Item_ID() {
  const { id } = useParams<{ id: string }>();
  const { itemSet, type } = useOutletContext<{
    itemSet: {
      id: string;
      value: ItemType;
    }[];
    type: "project" | "blog";
  }>();
  const item = itemSet.find((p) => p.id === id);

  if (!item) {
    return <div>Project not found</div>;
  }

  const data = item.value.data;
  const metadata = item.value.metaData;

  return (
    <>
      <PageSeo
        title={data.title ?? "Default title"}
        description={data.subTitle ?? undefined}
        image={
          metadata.thumbnail && metadata.thumbnail !== ""
            ? metadata.thumbnail
            : undefined
        }
      />
      <Section id={`project-${id}`} className={styles.section}>
        <header className={styles.header}>
          <div className={styles.thumbnail}>
            <Image
              src={metadata.thumbnail}
              className={styles.thumbnail}
              usePlaceholder
            />
          </div>
          <div className={styles.container}>
            <div className={styles.info}>
              <h1 className={styles.title}>{data.title}</h1>
              <span className={styles.subTitle}>{data.subTitle}</span>
              <Breadcrumbs />
            </div>
            <div className={styles.actions}>
              <NavButton
                href={"https://xcwalker.uk/projects/" + id}
                text="View On xcwalker.uk"
              />
            </div>
          </div>
        </header>
        <main className={styles.main}>
          <Section
            id="description"
            container={{
              className: styles.description,
            }}
          >
            <Markdown
              remarkPlugins={[[remarkGfm, { singleTilde: false }], supersub]}
            >
              {data.description}
            </Markdown>
          </Section>
          <Item_images item={item.value} slug={id} />
        </main>
        <Home_Items
          itemSet={itemSet}
          type={type}
          canSort
          title={{
            prefix: "More from " + metadata.collectionName + " collection",
            override: ""
          }}
          excludeIds={[id]}
          collection={{
            id: metadata.collection,
            exclusive: true,
          }}
        />
        <Home_Items
          itemSet={itemSet}
          type={type}
          canSort
          title={{
            prefix: "Other ",
          }}
          excludeIds={[id]}
          collection={{
            id: metadata.collection,
          }}
        />
      </Section>
    </>
  );
}
