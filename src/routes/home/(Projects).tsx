import { projectsAtom } from "@/atoms";
import { NavButton } from "@/components/button";
import Image from "@/components/image";
import Section from "@/components/section";
import projectStyles from "@/styles/routes/home/projects.module.css";
import type { ItemType } from "@/types";
import { useAtomValue } from "jotai";

export function Home_Projects() {
  const projects = useAtomValue(projectsAtom);
  const sortedProjects = projects.sort(
    (a, b) =>
      new Date(b.value.metaData.date.modified).getTime() -
      new Date(a.value.metaData.date.modified).getTime(),
  );

  return (
    <Section
      id="Projects"
      className={projectStyles.projects}
      container={{ className: projectStyles.container }}
    >
      <h2>Projects</h2>
      <ol className={projectStyles.list}>
        {sortedProjects.map((project) => (
          <li key={project.id}>
            <Project id={project.id} value={project.value} />
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Project(props: { id: string; value: ItemType }) {
  const data = props.value.data;
  const metadata = props.value.metaData;
  const date = metadata ? new Date(metadata.date.modified) : null;

  return (
    <div className={projectStyles.project}>
      <Image
        src={metadata.thumbnail}
        className={projectStyles.thumbnail}
				usePlaceholder
      />

      <span className={projectStyles.title}>{data.title}</span>
      <span className={projectStyles.subtitle}>
        <span className={projectStyles.date}>{date?.toLocaleDateString()}</span>
        {metadata.collectionName && (
          <>
            <span className={projectStyles.separatorDot}> • </span>
            <span className={projectStyles.collection}>
              {metadata.collectionName}
            </span>
          </>
        )}
      </span>
      <NavButton href={`/projects/${props.id}`} text="View Project" />
    </div>
  );
}
