// // footbot-frontend/FootBot-app/src/components/LeagueTable.tsx
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
        console.log('Fetched standings data:', leagueData); // Log the data
        if (leagueData) {
          console.log('Standings:', leagueData.standings); // Log standings array
          leagueData.standings.forEach((standing, index) => {
            console.log(`Standing group ${index}:`, standing);
            standing.table.forEach((team, idx) => {
              console.log(`Team ${idx}:`, team);
            });
          });
        }
        setStandings(leagueData || null);
      } catch (error) {
        console.error('Failed to fetch table data:', error);
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

