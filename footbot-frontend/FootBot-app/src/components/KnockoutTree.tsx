// footbot-frontend/FootBot-app/src/components/KnockoutTree.tsx
import React from 'react';
import { Match } from '../services/api';
import './KnockoutTree.css';
import { normalizeTeamName } from '../utils/normalizeTeamName';

interface KnockoutTreeProps {
  matches: Match[];
}

const KnockoutTree: React.FC<KnockoutTreeProps> = ({ matches }) => {
  if (!matches || matches.length === 0) {
    return <p className="text-center">No knockout stage matches available.</p>;
  }

  // Group matches by stage
  const last16Matches = matches.filter(match => match.stage === 'LAST_16');
  const quarterFinalMatches = matches.filter(match => match.stage === 'QUARTER_FINALS');
  const semiFinalMatches = matches.filter(match => match.stage === 'SEMI_FINALS');
  const finalMatches = matches.filter(match => match.stage === 'FINAL');

  // Split matches into left and right sides of bracket (4 on each side)
  const last16Left = last16Matches.slice(0, 4);
  const last16Right = last16Matches.slice(4, 8);
  
  const quarterLeft = quarterFinalMatches.slice(0, 2);
  const quarterRight = quarterFinalMatches.slice(2, 4);
  
  const semiLeft = semiFinalMatches.slice(0, 1);
  const semiRight = semiFinalMatches.slice(1, 2);
  
  const finalMatch = finalMatches[0];

  return (
    <div className="knockout-container">
      <h3 className="bracket-title">UEFA Champions League</h3>
      <div className="knockout-bracket">
        <div className="location-text">Knockout Round</div>
        
        <div className="bracket-rounds">
          {/* Left side of bracket */}
          <div className="left-side">
            {/* Round of 16 - Left */}
            <div className="round round-of-16">
              <div className="round-title">ROUND 16</div>
              {last16Left.map((match, idx) => (
                <div key={`r16-left-${idx}`} className="match-pair">
                  <div className="match-box">
                    <span className="team">{normalizeTeamName(match.homeTeam?.name)}</span>
                  </div>
                  <div className="match-box">
                    <span className="team">{normalizeTeamName(match.awayTeam?.name)}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Quarter Finals - Left */}
            <div className="round quarter-finals">
              <div className="round-title">QF</div>
              {quarterLeft.map((match, idx) => (
                <div key={`qf-left-${idx}`} className="match-pair">
                  <div className="match-box">
                    <span className="team">{normalizeTeamName(match.homeTeam?.name)}</span>
                  </div>
                  <div className="match-box">
                    <span className="team">{normalizeTeamName(match.awayTeam?.name)}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Semi Finals - Left */}
            <div className="round semi-finals">
              <div className="round-title">SF</div>
              {semiLeft.map((match, idx) => (
                <div key={`sf-left-${idx}`} className="match-pair">
                  <div className="match-box">
                    <span className="team">{normalizeTeamName(match.homeTeam?.name)}</span>
                  </div>
                  <div className="match-box">
                    <span className="team">{normalizeTeamName(match.awayTeam?.name)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Center with Trophy */}
          <div className="center-section">
            <div className="trophy"></div>
            {finalMatch && (
              <div className="final-match">
                <div className="round-title">FINAL</div>
                <div className="match-box">
                  <span className="team">{normalizeTeamName(finalMatch.homeTeam?.name)}</span>
                </div>
                <div className="vs-text">VS</div>
                <div className="match-box">
                  <span className="team">{normalizeTeamName(finalMatch.awayTeam?.name)}</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Right side of bracket */}
          <div className="right-side">
            {/* Semi Finals - Right */}
            <div className="round semi-finals">
              <div className="round-title">SF</div>
              {semiRight.map((match, idx) => (
                <div key={`sf-right-${idx}`} className="match-pair">
                  <div className="match-box">
                    <span className="team">{normalizeTeamName(match.homeTeam?.name)}</span>
                  </div>
                  <div className="match-box">
                    <span className="team">{normalizeTeamName(match.awayTeam?.name)}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Quarter Finals - Right */}
            <div className="round quarter-finals">
              <div className="round-title">QF</div>
              {quarterRight.map((match, idx) => (
                <div key={`qf-right-${idx}`} className="match-pair">
                  <div className="match-box">
                    <span className="team">{normalizeTeamName(match.homeTeam?.name)}</span>
                  </div>
                  <div className="match-box">
                    <span className="team">{normalizeTeamName(match.awayTeam?.name)}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Round of 16 - Right */}
            <div className="round round-of-16">
              <div className="round-title">ROUND 16</div>
              {last16Right.map((match, idx) => (
                <div key={`r16-right-${idx}`} className="match-pair">
                  <div className="match-box">
                    <span className="team">{normalizeTeamName(match.homeTeam?.name)}</span>
                  </div>
                  <div className="match-box">
                    <span className="team">{normalizeTeamName(match.awayTeam?.name)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnockoutTree;