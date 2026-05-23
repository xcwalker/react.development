
import { Home_Items } from "./(Items)";
import { Home_Events } from "./(Events)";
import { Home_About } from "./(About)";
import { Home_Landing } from "./(Landing)";
import { useAtomValue } from "jotai";
import { blogAtom, projectsAtom } from "@/atoms";

export default function Home() {
  const projects = useAtomValue(projectsAtom);
  const blog = useAtomValue(blogAtom);

  return (
    <main>
      <Home_Landing />
      <Home_Events type="upcoming" />
      <Home_Items
        itemSet={projects}
        type="project"
        limit={3}
      />
      <Home_Events type="past" />
      <Home_About />
      <Home_Items
        itemSet={blog}
        type="blog"
        limit={3}
      />
    </main>
  );
}
