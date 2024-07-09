// footbot-frontend/FootBot-app/src/components/LeagueFixtures.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getScores, CompetitionMatches } from '../services/api';
import { getSeasonForDate } from '../utils';
import { groupByDate } from '../utils/groupByDate';
import LoadingModal from './LoadingModal';
import { normalizeTeamName } from '../utils/normalizeTeamName';
import { getTeamLogo } from '../utils/getTeamLogo'; // Import the utility function
import styles from './fixtures.module.css'; 

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
  const groupedMatches = matches ? groupByDate(matches.matches) : {};

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2>{matches?.competition} Fixtures - Season {currentSeason}</h2>
        <Link to={`/league/${leagueId}/table/${currentSeason}`} className="btn btn-primary">
          View Table
        </Link>
      </div>
      {error ? <p>{error}</p> : (
        Object.keys(groupedMatches).map((date, index) => (
          <div key={index} className="mb-4">
            <h3>{date}</h3>
            <div className="d-flex flex-wrap"> {/* Use flexbox to wrap boxes */}
              {groupedMatches[date].map((match, idx) => (
                <div key={idx} className="p-2"> {/* Add padding for spacing */}
                  <div className={styles.fixtureBox}>
                    <div className={styles.teams}>
                      <div className={styles.team}>
                        <span>{normalizeTeamName(match.homeTeam.name)}</span>
                        <img src={getTeamLogo(leagueId!, match.homeTeam.name)} alt={match.homeTeam.name} /> {/* Logo */}
                      </div>
                      <img src="/images/vs.png" alt="vs" className={styles.vs} /> {/* VS Image */}
                      <div className={styles.team}>
                        <span>{normalizeTeamName(match.awayTeam.name)}</span>
                        <img src={getTeamLogo(leagueId!, match.awayTeam.name)} alt={match.awayTeam.name} /> {/* Logo */}
                      </div>
                    </div>
                    <div className={styles.score}>
                      Full Time: {match.score.fullTime.home} - {match.score.fullTime.away}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
      <Link to={`/league/${leagueId}/table/${currentSeason}`} className="btn btn-primary mt-3">
        View Table
      </Link>
      <LoadingModal show={showModal} handleClose={() => setShowModal(false)} />
    </div>
  );
};
