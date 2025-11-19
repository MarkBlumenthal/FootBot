// footbot-frontend/FootBot-app/src/App.tsx
import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Home } from './components/Home';
import { LeagueFixtures } from './components/LeagueFixtures';
import { LeagueTable } from './components/LeagueTable';
import styles from './components/Home.module.css';

// Images
import homeIcon from './assets/FootBot.png';
import premierLeagueIcon from './assets/premier-l.jpg';
import serieAIcon from './assets/series-a.png';
import laLigaIcon from './assets/laliga.png';
import bundesligaIcon from './assets/budesliga.png';
import championsLeagueIcon from './assets/champions-league.jpeg';

const App: React.FC = () => {
  return (
    <div className={styles.appWrapper}>
      {/* Top green header */}
      <header className={styles.header}>
        {/* Centered gold FootBot title */}
        <div className={styles.brandTitle}>FOOTBOT</div>

        {/* League buttons */}
        <nav className={styles.leagueNav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.leagueButton} ${isActive ? styles.leagueButtonActive : ''}`
            }
          >
            <img src={homeIcon} alt="Home" className={styles.leagueIcon} />
            <span className={styles.leagueLabel}>Home</span>
          </NavLink>

          <NavLink
            to="/league/PL"
            className={({ isActive }) =>
              `${styles.leagueButton} ${isActive ? styles.leagueButtonActive : ''}`
            }
          >
            <img
              src={premierLeagueIcon}
              alt="Premier League"
              className={styles.leagueIcon}
            />
            <span className={styles.leagueLabel}>Premier League</span>
          </NavLink>

          <NavLink
            to="/league/SA"
            className={({ isActive }) =>
              `${styles.leagueButton} ${isActive ? styles.leagueButtonActive : ''}`
            }
          >
            <img src={serieAIcon} alt="Serie A" className={styles.leagueIcon} />
            <span className={styles.leagueLabel}>Serie A</span>
          </NavLink>

          <NavLink
            to="/league/PD"
            className={({ isActive }) =>
              `${styles.leagueButton} ${isActive ? styles.leagueButtonActive : ''}`
            }
          >
            <img src={laLigaIcon} alt="La Liga" className={styles.leagueIcon} />
            <span className={styles.leagueLabel}>La Liga</span>
          </NavLink>

          <NavLink
            to="/league/BL1"
            className={({ isActive }) =>
              `${styles.leagueButton} ${isActive ? styles.leagueButtonActive : ''}`
            }
          >
            <img
              src={bundesligaIcon}
              alt="Bundesliga"
              className={styles.leagueIcon}
            />
            <span className={styles.leagueLabel}>Bundesliga</span>
          </NavLink>

          <NavLink
            to="/league/CL"
            className={({ isActive }) =>
              `${styles.leagueButton} ${isActive ? styles.leagueButtonActive : ''}`
            }
          >
            <img
              src={championsLeagueIcon}
              alt="UEFA Champions League"
              className={styles.leagueIcon}
            />
            <span className={styles.leagueLabel}>Champions League</span>
          </NavLink>
        </nav>
      </header>

      {/* Main content below fixed header */}
      <main className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/league/:leagueId" element={<LeagueFixtures />} />
          <Route path="/league/:leagueId/table/:season" element={<LeagueTable />} />
        </Routes>
      </main>
       <footer className={styles.footer}>
      <p className={styles.footerText}>
        FootBot - Your Football Companion | Search teams, view fixtures &amp; standings
      </p>
    </footer>
    </div>
  );
};

export default App;
