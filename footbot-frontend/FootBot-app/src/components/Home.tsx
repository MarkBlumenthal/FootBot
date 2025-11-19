// footbot-frontend/FootBot-app/src/components/Home.tsx
import React, { useState, useEffect } from 'react';
import { getTeamFixtures, Match } from '../services/api';
import LoadingModal from './LoadingModal';
import { normalizeTeamName } from '../utils/normalizeTeamName';
import styles from './Home.module.css';

export const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentFixture, setRecentFixture] = useState<Match | null>(null);
  const [nextFixture, setNextFixture] = useState<Match | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchConducted, setSearchConducted] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    setShowModal(false);
    setSearchConducted(true);

    try {
      const data = await getTeamFixtures(searchTerm.trim());
      if (data.length > 0) {
        const sortedFixtures = data.sort(
          (a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime()
        );
        const now = new Date().getTime();
        const recent =
          sortedFixtures.filter((match) => new Date(match.utcDate).getTime() < now).pop() ||
          null;
        const upcoming =
          sortedFixtures.find((match) => new Date(match.utcDate).getTime() > now) || null;

        setRecentFixture(recent);
        setNextFixture(upcoming);
      } else {
        setRecentFixture(null);
        setNextFixture(null);
        setError('We have no information on that team.');
      }
    } catch (err) {
      console.error('Error fetching fixtures:', err);
      setError('Failed to fetch data.');
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

  // Button turns green when there is text in the input
  const isSearchReady = searchTerm.trim().length > 0;

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // Helper to render a team name with its crest/logo when available
  const renderTeamWithLogo = (team: any) => {
    if (!team) return null;

    const crest = team.crest as string | undefined;
    const name = normalizeTeamName(team.name);

    return (
      <span className={styles.teamWithLogo}>
        {crest && (
          <img
            src={crest}
            alt={`${name} logo`}
            className={styles.teamLogo}
          />
        )}
        <span>{name}</span>
      </span>
    );
  };

  return (
    <div className={styles.homeBackground}>
      <div className={styles.contentContainer}>
        <div className={styles.searchContainer}>
          {/* Hero + search inside a gold bordered card */}
          <div className={styles.heroCard}>
            <div className={styles.hero}>
              <div className={styles.heroIcon}>🏆</div>
              <h1 className={styles.heroTitle}>Search Your Favorite Team</h1>
              <p className={styles.heroSubtitle}>
                Get the latest fixtures, results, and league standings across Europe&apos;s
                top 5 leagues
              </p>
            </div>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (e.target.value === '') {
                  setSearchConducted(false);
                  setRecentFixture(null);
                  setNextFixture(null);
                  setError(null);
                }
              }}
              onKeyPress={handleKeyPress}
              placeholder="Search for a team (e.g., Manchester United, Barcelona, Juventus)"
              className={styles.searchBar}
            />
            <button
              onClick={handleSearch}
              className={`btn ${styles.searchButton} ${
                isSearchReady ? styles.searchButtonReady : styles.searchButtonIdle
              }`}
            >
              Search Team
            </button>
          </div>

          {/* Results card (popup-style) */}
          {searchConducted && (
            <div className={styles.resultsCard}>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <div>
                  <h4 className={styles.fixtureHeading}>Recent Fixture</h4>
                  {recentFixture ? (
                    <div className={styles.fixtureBlock}>
                      <div className={styles.fixtureRow}>
                        {renderTeamWithLogo((recentFixture as any).homeTeam)}
                        <span className={styles.vsText}>vs</span>
                        {renderTeamWithLogo((recentFixture as any).awayTeam)}
                      </div>
                      <div className={styles.scoreLine}>
                        Full Time: {recentFixture.score.fullTime.home} -{' '}
                        {recentFixture.score.fullTime.away}
                      </div>
                      <div className={styles.dateLine}>
                        {new Date(recentFixture.utcDate).toLocaleDateString()}
                      </div>
                    </div>
                  ) : (
                    <p>No recent fixtures available.</p>
                  )}

                  <h4 className={`${styles.fixtureHeading} mt-3`}>Next Fixture</h4>
                  {nextFixture ? (
                    <div className={styles.fixtureBlock}>
                      <div className={styles.fixtureRow}>
                        {renderTeamWithLogo((nextFixture as any).homeTeam)}
                        <span className={styles.vsText}>vs</span>
                        {renderTeamWithLogo((nextFixture as any).awayTeam)}
                      </div>
                      <div className={styles.scoreLine}>
                        Full Time: {nextFixture.score.fullTime.home} -{' '}
                        {nextFixture.score.fullTime.away}
                      </div>
                      <div className={styles.dateLine}>
                        {new Date(nextFixture.utcDate).toLocaleDateString()}
                      </div>
                    </div>
                  ) : (
                    <p>No upcoming fixtures available.</p>
                  )}
                </div>
              )}
            </div>
          )}

          <LoadingModal show={showModal} handleClose={() => setShowModal(false)} />
        </div>
      </div>
    </div>
  );
};
