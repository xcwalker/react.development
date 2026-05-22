
import { Home_Projects } from "./(Projects)";
import { Home_Events } from "./(Events)";
import { Home_About } from "./(About)";
import { Home_Landing } from "./(Landing)";

export default function Home() {
  return (
    <main>
      <Home_Landing />
      <Home_Events type="upcoming" />
      <Home_Projects />
      <Home_Events type="past" />
      <Home_About />
    </main>
  );
}
