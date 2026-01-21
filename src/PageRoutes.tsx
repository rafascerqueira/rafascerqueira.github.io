import { Contact } from "@pages/Contact";
import { Home } from "@pages/Home";
import { Portfolio } from "@pages/Portfolio";
import { Service } from "@pages/Service";
import { Skills } from "@pages/Skills";
import { Route, Routes } from "react-router-dom";

export function PageRoutes() {
  return (
    <div className="pages">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}
