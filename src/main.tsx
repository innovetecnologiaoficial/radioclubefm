import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import AnunciePage from './AnunciePage.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/anuncie" element={<AnunciePage />} />
        <Route path="/comercial" element={<AnunciePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
