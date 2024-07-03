// footbot-frontend/FootBot-app/src/components/LeagueTable.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTables, getKnockoutStages, CompetitionStandings, Match } from '../services/api';
import { StandingsList } from './StandingsList';
import KnockoutTree from './KnockoutTree';
import LoadingModal from './LoadingModal';

export const LeagueTable: React.FC = () => {
  const { leagueId, season } = useParams<{ leagueId: string; season: string }>();
  const [standings, setStandings] = useState<CompetitionStandings | null>(null);
  const [knockoutStages, setKnockoutStages] = useState<Match[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setShowModal(false);
      try {
        const [tablesData, knockoutData] = await Promise.all([
          getTables(),
          leagueId === 'CL' ? getKnockoutStages() : Promise.resolve([])
        ]);

        const leagueData = tablesData.find(league => league.competition === leagueId);
        setStandings(leagueData || null);
        setKnockoutStages(knockoutData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [leagueId]);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => setShowModal(true), 3000);
      return () => clearTimeout(timer);
    } else {
      setShowModal(false);
    }
  }, [loading]);

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
      <h2>{standings.competition} Table - Season {season}</h2>
      <StandingsList standings={standings.standings} />
      {leagueId === 'CL' && <KnockoutTree matches={knockoutStages} />}
      <Link to={`/league/${leagueId}`} className="btn btn-primary mt-3">View Fixtures</Link>
      <LoadingModal show={showModal} handleClose={() => setShowModal(false)} />
    </div>
  );
};




