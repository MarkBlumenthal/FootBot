// footbot-frontend/FootBot-app/src/components/LeagueTable.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTables, CompetitionStandings } from '../services/api';
import { StandingsList } from './StandingsList';

export const LeagueTable: React.FC = () => {
  const { leagueId } = useParams<{ leagueId: string }>();
  const [standings, setStandings] = useState<CompetitionStandings | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const data = await getTables();
        const leagueData = data.find(league => league.competition === leagueId);
        setStandings(leagueData || null);
      } catch (error) {
        setError('Failed to fetch table data.');
      }
    };
    fetchTables();
  }, [leagueId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!standings) {
    return <p>Loading...</p>;
  }

  if (standings.standings.length === 0) {
    return <p>No standings available.</p>;
  }

  return (
    <div>
      <h2>{standings.competition} Table</h2>
      <StandingsList standings={standings.standings} />
      <Link to={`/league/${leagueId}`} className="btn btn-primary mt-3">View Fixtures</Link>
    </div>
  );
};

