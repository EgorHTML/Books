import { createRoot } from 'react-dom/client';
import App from './components/App';
import {
      BrowserRouter,
      Routes,
      Route,
    } from "react-router-dom"
import AboutBook from './components/AboutBook';
import React from 'react';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
      <BrowserRouter>
      <Routes>
      <Route >
            <Route path="/" element={<App />}/>
            <Route path="/:id" element={<AboutBook />}/>
      </Route>
      </Routes>
      </BrowserRouter>
);

