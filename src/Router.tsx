import { BrowserRouter, Routes, Route } from "react-router";
import Home from "@/routes/Home";
import Project_Layout from "./routes/projects/Layout";
import Project_Index from "./routes/projects/Index";
import Project_ID from "./routes/projects/id";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Project_Layout />}>
          <Route index element={<Project_Index />} />
          <Route path=":id" element={<Project_ID />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
