// footbot-frontend/FootBot-app/src/components/Home.tsx
import React, { useState, useEffect } from 'react';
import { getTeamFixtures, Match } from '../services/api';
import LoadingModal from './LoadingModal';
import { normalizeTeamName } from '../utils/normalizeTeamName';
import styles from './Home.module.css'; // Import the CSS module

export const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentFixture, setRecentFixture] = useState<Match | null>(null);
  const [nextFixture, setNextFixture] = useState<Match | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchConducted, setSearchConducted] = useState(false); // New state to track if a search has been conducted

  const handleSearch = async () => {
    if (!searchTerm) return;

    setLoading(true);
    setError(null);
    setShowModal(false);
    setSearchConducted(true); // Set to true when a search is conducted

    try {
      const data = await getTeamFixtures(searchTerm);
      if (data.length > 0) {
        const sortedFixtures = data.sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime());
        const now = new Date().getTime();
        const recent = sortedFixtures.filter(match => new Date(match.utcDate).getTime() < now).pop() || null;
        const upcoming = sortedFixtures.find(match => new Date(match.utcDate).getTime() > now) || null;

        setRecentFixture(recent);
        setNextFixture(upcoming);
      } else {
        setRecentFixture(null);
        setNextFixture(null);
        setError('We have no information on that team');
      }
    } catch (err) {
      console.error('Error fetching fixtures:', err);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setShowModal(true), 3000);
      return () => clearTimeout(timer);
    } else {
      setShowModal(false);
    }
  }, [loading]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.homeBackground}>
      <div className={styles.contentContainer}> {/* Wrap content in contentContainer */}
        <div className={styles.searchContainer}>
          <div className={styles.container}>
            {searchConducted && (loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div>
                <h4>Recent Fixture</h4>
                {recentFixture ? (
                  <div>
                    <div>{normalizeTeamName(recentFixture.homeTeam.name)} vs {normalizeTeamName(recentFixture.awayTeam.name)}</div>
                    <div>Full Time: {recentFixture.score.fullTime.home} - {recentFixture.score.fullTime.away}</div>
                    <div>{new Date(recentFixture.utcDate).toLocaleDateString()}</div>
                  </div>
                ) : (
                  <p>No recent fixtures available.</p>
                )}
                <h4>Next Fixture</h4>
                {nextFixture ? (
                  <div>
                    <div>{normalizeTeamName(nextFixture.homeTeam.name)} vs {normalizeTeamName(nextFixture.awayTeam.name)}</div>
                    <div>Full Time: {nextFixture.score.fullTime.home} - {nextFixture.score.fullTime.away}</div>
                    <div>{new Date(nextFixture.utcDate).toLocaleDateString()}</div>
                  </div>
                ) : (
                  <p>No upcoming fixtures available.</p>
                )}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for a team"
            className={styles.searchBar}
          />
          <button onClick={handleSearch} className={`btn btn-primary ${styles.searchButton}`}>
            Search
          </button>
          <LoadingModal show={showModal} handleClose={() => setShowModal(false)} />
        </div>
      </div>
    </div>
  );
};


