import { createRoot } from 'react-dom/client';
import App from './components/App';
import {
      BrowserRouter,
      Routes,
      Route,
    } from "react-router-dom"
import AboutBook from './components/AboutBook';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
      <BrowserRouter>
      <Routes>
      <Route >
            <Route path="/" element={<App />}></Route>
            <Route path="/:bookTitle" element={<AboutBook />}/>
      </Route>
      </Routes>
      </BrowserRouter>
);

