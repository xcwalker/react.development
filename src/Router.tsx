import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import Home from "@/routes/home/Index";
import Item_Layout from "./routes/item/Layout";
import Item_Index from "./routes/item/Index";
import Item_ID from "./routes/item/Id";
import { blogAtom, projectsAtom } from "./atoms";
import { useAtomValue } from "jotai";
import { useEffect } from "react";

export default function Router() {
  const projects = useAtomValue(projectsAtom);
  const blog = useAtomValue(blogAtom);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/projects"
          element={<Item_Layout itemSet={projects} type="project" />}
        >
          <Route index element={<Item_Index />} />
          <Route path=":id" element={<Item_ID />} />
        </Route>

        <Route
          path="/blog"
          element={<Item_Layout itemSet={blog} type="blog" />}
        >
          <Route index element={<Item_Index />} />
          <Route path=":id" element={<Item_ID />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // window.scrollTo(0,0);
    setTimeout(() => window.scrollTo(0, 0), 10);
  }, [pathname]);

  return null;
}