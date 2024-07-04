// footbot-frontend/FootBot-app/src/components/MatchList.tsx
// import React from 'react';
// import { Match } from '../services/api';
// import { normalizeTeamName } from '../utils/normalizeTeamName';

// interface MatchListProps {
//   matches: Match[];
// }

// export const MatchList: React.FC<MatchListProps> = ({ matches }) => {
//   if (!matches || matches.length === 0) {
//     return <p>No matches available.</p>;
//   }

//   return (
//     <div className="list-group">
//       {matches.map((match, index) => {
//         const matchDate = new Date(match.utcDate).toLocaleDateString(); // Format the date
//         return (
//           <div key={index} className="list-group-item list-group-item-action">
//             <div>
//               {normalizeTeamName(match.homeTeam.name)} vs {normalizeTeamName(match.awayTeam.name)}
//             </div>
//             <div>
//               Full Time: {match.score.fullTime.home} - {match.score.fullTime.away}
//             </div>
//             <div>{matchDate}</div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };





import React from 'react';
import { Match } from '../services/api';
import { normalizeTeamName } from '../utils/normalizeTeamName';
import { getTeamLogo } from '../utils/getTeamLogo'; // Import the utility function

interface MatchListProps {
  matches: Match[];
  leagueId: string; // Add leagueId prop
}

export const MatchList: React.FC<MatchListProps> = ({ matches, leagueId }) => {
  if (!matches || matches.length === 0) {
    return <p>No matches available.</p>;
  }

  return (
    <div className="list-group">
      {matches.map((match, index) => {
        const matchDate = new Date(match.utcDate).toLocaleDateString(); // Format the date
        return (
          <div key={index} className="list-group-item list-group-item-action">
            <div>
              {normalizeTeamName(match.homeTeam.name)} 
              <img src={getTeamLogo(leagueId, match.homeTeam.name)} alt={match.homeTeam.name} /> {/* Logo */}
            </div>
            <div>
              vs
            </div>
            <div>
              {normalizeTeamName(match.awayTeam.name)}
              <img src={getTeamLogo(leagueId, match.awayTeam.name)} alt={match.awayTeam.name} /> {/* Logo */}
            </div>
            <div>
              Full Time: {match.score.fullTime.home} - {match.score.fullTime.away}
            </div>
            <div>{matchDate}</div>
          </div>
        );
      })}
    </div>
  );
};

