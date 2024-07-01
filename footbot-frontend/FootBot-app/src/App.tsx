import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Home } from './components/Home';
import { LeagueFixtures } from './components/LeagueFixtures';
import { LeagueTable } from './components/LeagueTable';

const App: React.FC = () => {
  return (
    <div className="container">
      <h1 className="my-4">Football Fixtures and Tables</h1>
      <nav className="nav nav-pills nav-justified">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/league/PL">Premier League</Link>
        <Link className="nav-link" to="/league/SA">Serie A</Link>
        <Link className="nav-link" to="/league/PD">Primera Division</Link>
        <Link className="nav-link" to="/league/BL1">Bundesliga</Link>
        <Link className="nav-link" to="/league/CL">UEFA Champions League</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/league/:leagueId" element={<LeagueFixtures />} />
        <Route path="/league/:leagueId/table" element={<LeagueTable />} />
      </Routes>
    </div>
  );
};

export default App;





