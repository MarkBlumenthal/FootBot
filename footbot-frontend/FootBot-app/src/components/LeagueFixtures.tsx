// footbot-frontend/FootBot-app/src/components/LeagueFixtures.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getScores, CompetitionMatches } from '../services/api';
import { getSeasonForDate } from '../utils';
import { groupByDate } from '../utils/groupByDate';
import LoadingModal from './LoadingModal';
import { normalizeTeamName } from '../utils/normalizeTeamName';
import { getTeamLogo } from '../utils/getTeamLogo';
import styles from './fixtures.module.css';

export const LeagueFixtures: React.FC = () => {
  const { leagueId } = useParams<{ leagueId: string }>();
  const [matches, setMatches] = useState<CompetitionMatches | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchScores = async () => {
      if (!leagueId) {
        setError('No league ID provided');
        return;
      }

      setLoading(true);
      setShowModal(false);
      try {
        const data = await getScores();
        const leagueData = data.find(league => league.competition === leagueId);
        setMatches(leagueData || null);
      } catch (error) {
        console.error('Failed to fetch match data:', error);
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

  if (error) {
    return <p className="text-center mt-5">{error}</p>;
  }

  if (!matches) {
    return (
      <div className={`${styles.fixturesPage} text-center mt-5`}>
        <p>Loading match data...</p>
        {showModal && <LoadingModal show={showModal} handleClose={() => setShowModal(false)} />}
      </div>
    );
  }

  const firstFixtureDate =
    matches.matches && matches.matches.length > 0 ? matches.matches[0]?.utcDate : null;
  const currentSeason = firstFixtureDate ? getSeasonForDate(firstFixtureDate) : 'Unknown Season';
  const groupedMatches = matches.matches ? groupByDate(matches.matches) : {};

  if (Object.keys(groupedMatches).length === 0) {
    return <p className="text-center mt-5">No matches available for this league.</p>;
  }

  return (
    <div className={styles.fixturesPage}>
      <div className={`${styles.pageHeader} d-flex justify-content-between align-items-center`}>
        <h2 className={styles.pageTitle}>
          {matches.competition} Fixtures - Season {currentSeason}
        </h2>
        <Link
          to={`/league/${leagueId}/table/${currentSeason}`}
          className={`btn ${styles.goldButton}`}
        >
          View Table
        </Link>
      </div>

      {Object.keys(groupedMatches).map((date, index) => (
        <div key={index} className="mb-4">
          <h3 className={styles.dateHeading}>{date}</h3>

          <div className="d-flex flex-wrap">
            {groupedMatches[date].map((match, idx) => (
              <div key={idx} className="p-2">
                <div className={styles.fixtureBox}>
                  <div className={styles.teams}>
                    <div className={styles.team}>
                      <span>{normalizeTeamName(match.homeTeam?.name)}</span>
                      <img
                        src={getTeamLogo(leagueId!, match.homeTeam?.name)}
                        alt={match.homeTeam?.name || 'Home Team'}
                        onError={(e) => { e.currentTarget.src = '/logos/default-team.png'; }}
                      />
                    </div>

                    <img src="/images/vs.png" alt="vs" className={styles.vs} />

                    <div className={styles.team}>
                      <span>{normalizeTeamName(match.awayTeam?.name)}</span>
                      <img
                        src={getTeamLogo(leagueId!, match.awayTeam?.name)}
                        alt={match.awayTeam?.name || 'Away Team'}
                        onError={(e) => { e.currentTarget.src = '/logos/default-team.png'; }}
                      />
                    </div>
                  </div>

                  <div className={styles.score}>
                    Full Time: {match.score?.fullTime?.home ?? '-'} -{' '}
                    {match.score?.fullTime?.away ?? '-'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <Link
        to={`/league/${leagueId}/table/${currentSeason}`}
        className={`btn ${styles.goldButton} mt-3`}
      >
        View Table
      </Link>

      <LoadingModal show={showModal} handleClose={() => setShowModal(false)} />
    </div>
  );
};
