// footbot-frontend/FootBot-app/src/components/Home.tsx
import React, { useState } from 'react';
import { getTeamFixtures, Match } from '../services/api';

export const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentFixture, setRecentFixture] = useState<Match | null>(null);
  const [nextFixture, setNextFixture] = useState<Match | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm) return;

    setLoading(true);
    setError(null);

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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <h2>Welcome to the Football Fixtures and Tables</h2>
      <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div>
            <h4>Recent Fixture</h4>
            {recentFixture ? (
              <div>
                <div>{recentFixture.homeTeam.name} vs {recentFixture.awayTeam.name}</div>
                <div>Full Time: {recentFixture.score.fullTime.home} - {recentFixture.score.fullTime.away}</div>
                <div>Half Time: {recentFixture.score.halfTime.home} - {recentFixture.score.halfTime.away}</div>
                <div>{new Date(recentFixture.utcDate).toLocaleString()}</div>
              </div>
            ) : (
              <p>No recent fixtures available.</p>
            )}
            <h4>Next Fixture</h4>
            {nextFixture ? (
              <div>
                <div>{nextFixture.homeTeam.name} vs {nextFixture.awayTeam.name}</div>
                <div>Full Time: {nextFixture.score.fullTime.home} - {nextFixture.score.fullTime.away}</div>
                <div>Half Time: {nextFixture.score.halfTime.home} - {nextFixture.score.halfTime.away}</div>
                <div>{new Date(nextFixture.utcDate).toLocaleString()}</div>
              </div>
            ) : (
              <p>No upcoming fixtures available.</p>
            )}
          </div>
        )}
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search for a team"
        style={{ marginBottom: '10px', width: '100%', padding: '10px' }}
      />
      <button onClick={handleSearch} className="btn btn-primary">
        Search
      </button>
    </div>
  );
};
