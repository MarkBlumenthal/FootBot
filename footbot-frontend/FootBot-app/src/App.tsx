// footbot-frontend/FootBot-app/src/App.tsx
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Home } from './components/Home';
import { LeagueFixtures } from './components/LeagueFixtures';
import { LeagueTable } from './components/LeagueTable';
import styles from './components/Home.module.css'; // Import the CSS module

// Import the images
import homeIcon from './assets/FootBot.png';
import premierLeagueIcon from './assets/premier-l.jpg';
import serieAIcon from './assets/series-a.png';
import laLigaIcon from './assets/laliga.png';
import bundesligaIcon from './assets/budesliga.png';
import championsLeagueIcon from './assets/champions-league.jpeg';

const App: React.FC = () => {
  return (
    <div className="container">
      <h1 className={`my-4 ${styles.heading}`}>FootBot</h1> {/* Apply the heading class */}
      <nav className="nav nav-pills nav-justified">
        <Link className="nav-link" to="/">
          <img src={homeIcon} alt="Home" style={{ width: '64px', height: '64px' }} />
        </Link>
        <Link className="nav-link" to="/league/PL">
          <img src={premierLeagueIcon} alt="Premier League" style={{ width: '64px', height: '64px' }} />
        </Link>
        <Link className="nav-link" to="/league/SA">
          <img src={serieAIcon} alt="Serie A" style={{ width: '134px', height: '64px' }} />
        </Link>
        <Link className="nav-link" to="/league/PD">
          <img src={laLigaIcon} alt="La Liga" style={{ width: '84px', height: '64px' }} />
        </Link>
        <Link className="nav-link" to="/league/BL1">
          <img src={bundesligaIcon} alt="Bundesliga" style={{ width: '64px', height: '64px' }} />
        </Link>
        <Link className="nav-link" to="/league/CL">
          <img src={championsLeagueIcon} alt="UEFA Champions League" style={{ width: '104px', height: '64px' }} />
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/league/:leagueId" element={<LeagueFixtures />} />
        <Route path="/league/:leagueId/table/:season" element={<LeagueTable />} />
      </Routes>
    </div>
  );
};

export default App;













