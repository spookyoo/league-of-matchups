import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import beaufortRegular from './assets/fonts/BeaufortforLOL-Regular.otf';
import beaufortBold from './assets/fonts/BeaufortforLOL-Bold.otf';

import LandingPage from "./pages/DatabasePage";
import ChampionMatchupPage from "./pages/ChampionMatchupPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/matchups" element={<LandingPage />} />
        <Route path="/matchups/:name" element={<ChampionMatchupPage />}  />
      </Routes>
    </Router>
  );
}

export default App;
