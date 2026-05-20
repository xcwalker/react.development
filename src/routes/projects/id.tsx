import { projectsAtom } from "@/atoms";
import Section from "@/components/section";
import { useAtomValue } from "jotai";
import { useParams } from "react-router";
import styles from "@/styles/routes/projects/id.module.css";
import { NavButton } from "@/components/button";
import Markdown from "react-markdown";
import Project_images from "./(Images)";
import remarkGfm from "remark-gfm";
import supersub from "remark-supersub";
import PageSeo from "@/components/PageSeo";

export default function Project_ID() {
  const { id } = useParams<{ id: string }>();
  const projects = useAtomValue(projectsAtom);
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return <div>Project not found</div>;
  }

  const data = project.value.data;
  const metadata = project.value.metaData;

  return (
    <>
    <PageSeo title={data.title} description={data.subTitle} image={metadata.thumbnail} /> 
      <Section id={`project-${id}`} className={styles.section}>
        <header className={styles.header}>
          <div className={styles.thumbnail}>
            <img
              src={metadata.thumbnail}
              alt={""}
              className={styles.thumbnail}
            />
          </div>
          <div className={styles.container}>
            <div className={styles.info}>
              <h1 className={styles.title}>{data.title}</h1>
              <span className={styles.subTitle}>{data.subTitle}</span>
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
          <Project_images item={project.value} slug={id} />
        </main>
      </Section>
    </>
  );
}
