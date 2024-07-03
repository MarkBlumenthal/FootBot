// footbot-frontend/FootBot-app/src/components/LeagueFixtures.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getScores, CompetitionMatches } from '../services/api';
import { getSeasonForDate } from '../utils';
import { groupByGameWeek } from '../utils/groupByGameWeek';
import LoadingModal from './LoadingModal';

export const LeagueFixtures: React.FC = () => {
  const { leagueId } = useParams<{ leagueId: string }>();
  const [matches, setMatches] = useState<CompetitionMatches | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const totalGameWeeks = leagueId === 'BL1' ? 34 : 38;

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
  const groupedMatches = matches ? groupByGameWeek(matches.matches, totalGameWeeks) : {};

  return (
    <div>
      <h2>{matches?.competition} Fixtures - Season {currentSeason}</h2>
      {error ? <p>{error}</p> : (
        Object.keys(groupedMatches).map((gameWeek, index) => (
          <div key={index} className="mb-4">
            <h3>{gameWeek}</h3>
            <div className="row">
              {groupedMatches[gameWeek].map((match, idx) => (
                <div key={idx} className="col-md-4 col-lg-2 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">{match.homeTeam.name} vs {match.awayTeam.name}</h5>
                      <p className="card-text">
                        Full Time: {match.score.fullTime.home} - {match.score.fullTime.away}
                      </p>
                      <p className="card-text">
                        {new Date(match.utcDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
      <Link to={`/league/${leagueId}/table/${currentSeason}`} className="btn btn-primary mt-3">View Table</Link>
      <LoadingModal show={showModal} handleClose={() => setShowModal(false)} />
    </div>
  );
};


