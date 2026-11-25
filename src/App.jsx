import { Routes, Route } from "react-router-dom";

import MusicaGlobal from "./MusicaGlobal";
import MainPage from "./MainPage";
import MainPageDos from "./mainpagedos";
import Contact from "./Contact";
import Socials from "./Socials";
import QuienesSomos from "./QuienesSomos";

export default function App() {
  return (
    <>
      <MusicaGlobal />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/mainpagedos" element={<MainPageDos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/socials" element={<Socials />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
      </Routes>
    </>
  );
}