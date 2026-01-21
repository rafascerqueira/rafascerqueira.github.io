import { Aside } from "@components/Aside";
import { PageRoutes } from "PageRoutes";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <HashRouter>
          <div className="page-layout">
            <Aside />
            <PageRoutes />
          </div>
        </HashRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
