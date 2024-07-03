// footbot-frontend/FootBot-app/src/components/LeagueFixtures.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getScores, CompetitionMatches } from '../services/api';
import { MatchList } from './MatchList';
import { getSeasonForDate } from '../utils';
import LoadingModal from './LoadingModal';

export const LeagueFixtures: React.FC = () => {
  const { leagueId } = useParams<{ leagueId: string }>();
  const [matches, setMatches] = useState<CompetitionMatches | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      setShowModal(false);
      try {
        const data = await getScores();
        const leagueData = data.find(league => league.competition === leagueId);
        setMatches(leagueData || null);
      } catch (error) {
        setError('Failed to fetch match data.');
      } finally {
        setLoading(false);
      }
    };
    fetchScores();
  }, [leagueId]);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setShowModal(true), 3000);
      return () => clearTimeout(timer);
    } else {
      setShowModal(false);
    }
  }, [loading]);

  const firstFixtureDate = matches?.matches?.[0]?.utcDate;
  const currentSeason = firstFixtureDate ? getSeasonForDate(firstFixtureDate) : 'Unknown Season';

  return (
    <div>
      <h2>{matches?.competition} Fixtures - Season {currentSeason}</h2>
      {error ? <p>{error}</p> : <MatchList matches={matches?.matches || []} />}
      <Link to={`/league/${leagueId}/table/${currentSeason}`} className="btn btn-primary mt-3">View Table</Link>
      <LoadingModal show={showModal} handleClose={() => setShowModal(false)} />
    </div>
  );
};
