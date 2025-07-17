import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import beaufortRegular from './assets/fonts/BeaufortforLOL-Regular.otf';
import beaufortBold from './assets/fonts/BeaufortforLOL-Bold.otf';

import LandingPage from "./pages/DatabasePage";
import MatchupsChampionPage from "./pages/DatabasePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/matchups/:name" element={<MatchupsChampionPage />}  />
      </Routes>
    </Router>
  );
}

export default App;
