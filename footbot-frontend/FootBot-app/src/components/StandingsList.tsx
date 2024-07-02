// // footbot-frontend/FootBot-app/src/components/StandingsList.tsx
// import React from 'react';
// import { Standing } from '../services/api';

// interface StandingsListProps {
//   standings: Standing[];
// }

// export const StandingsList: React.FC<StandingsListProps> = ({ standings }) => {
//   if (!standings || standings.length === 0) {
//     return <p>No standings available.</p>;
//   }

//   return (
//     <div className="table-responsive">
//       {standings.map((standing, index) => (
//         <div key={index} className="my-3">
//           <h4>{standing.group}</h4>
//           <table className="table table-striped">
//             <thead>
//               <tr>
//                 <th scope="col">Position</th>
//                 <th scope="col">Team</th>
//                 <th scope="col">Played</th>
//                 <th scope="col">Won</th>
//                 <th scope="col">Draw</th>
//                 <th scope="col">Lost</th>
//                 <th scope="col">Goals For</th>
//                 <th scope="col">Goals Against</th>
//                 <th scope="col">Goal Difference</th>
//                 <th scope="col">Points</th>
//               </tr>
//             </thead>
//             <tbody>
//               {standing.table.map((team, idx) => (
//                 <tr key={`${team.position}-${idx}`}>
//                   <th scope="row">{team.position}</th>
//                   <td>{team.team.name}</td>
//                   <td>{team.playedGames}</td>
//                   <td>{team.won}</td>
//                   <td>{team.draw}</td>
//                   <td>{team.lost}</td>
//                   <td>{team.goalsFor}</td>
//                   <td>{team.goalsAgainst}</td>
//                   <td>{team.goalDifference}</td>
//                   <td>{team.points}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ))}
//     </div>
//   );
// };







import React from 'react';
import { Standing, KnockoutRound } from '../services/api';

interface StandingsListProps {
  standings: Standing[];
}

const renderKnockoutRounds = (knockoutRounds: KnockoutRound[]) => (
  <div className="knockout-rounds">
    {knockoutRounds.map((round, index) => (
      <div key={index} className="knockout-round my-3">
        <h4>{round.stage}</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Home Team</th>
              <th scope="col">Away Team</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            {round.ties.map((tie, idx) => (
              <tr key={idx}>
                <td>{tie.homeTeam.name}</td>
                <td>{tie.awayTeam.name}</td>
                <td>{tie.score.home} - {tie.score.away}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
  </div>
);

export const StandingsList: React.FC<StandingsListProps> = ({ standings }) => {
  if (!standings || standings.length === 0) {
    return <p>No standings available.</p>;
  }

  return (
    <div className="table-responsive">
      {standings.map((standing, index) => (
        <div key={index} className="my-3">
          <h4>{standing.group}</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Position</th>
                <th scope="col">Team</th>
                <th scope="col">Played</th>
                <th scope="col">Won</th>
                <th scope="col">Draw</th>
                <th scope="col">Lost</th>
                <th scope="col">Goals For</th>
                <th scope="col">Goals Against</th>
                <th scope="col">Goal Difference</th>
                <th scope="col">Points</th>
              </tr>
            </thead>
            <tbody>
              {standing.table.map((team, idx) => (
                <tr key={`${team.position}-${idx}`}>
                  <th scope="row">{team.position}</th>
                  <td>{team.team.name}</td>
                  <td>{team.playedGames}</td>
                  <td>{team.won}</td>
                  <td>{team.draw}</td>
                  <td>{team.lost}</td>
                  <td>{team.goalsFor}</td>
                  <td>{team.goalsAgainst}</td>
                  <td>{team.goalDifference}</td>
                  <td>{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {standing.knockoutRounds && renderKnockoutRounds(standing.knockoutRounds)}
        </div>
      ))}
    </div>
  );
};
