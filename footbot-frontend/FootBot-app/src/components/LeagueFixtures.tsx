// footbot-frontend/FootBot-app/src/components/LeagueFixtures.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getScores, CompetitionMatches } from '../services/api';
import { MatchList } from './MatchList';

export const LeagueFixtures: React.FC = () => {
  const { leagueId } = useParams<{ leagueId: string }>();
  const [matches, setMatches] = useState<CompetitionMatches | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const data = await getScores();
        const leagueData = data.find(league => league.competition === leagueId);
        setMatches(leagueData || null);
      } catch (error) {
        setError('Failed to fetch match data.');
      }
    };
    fetchScores();
  }, [leagueId]);

  return (
    <div>
      <h2>{matches?.competition} Fixtures</h2>
      {error ? <p>{error}</p> : <MatchList matches={matches?.matches || []} />}
      <Link to={`/league/${leagueId}/table`} className="btn btn-primary mt-3">View Table</Link>
    </div>
  );
};
