import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './Router.tsx'
import "./styles/setup/page-setup.css";
import "./styles/setup/variables.css";
import "./styles/setup/fonts.css";
import Fetcher from './fetcher.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Fetcher />
    <Router />
  </StrictMode>,
)
