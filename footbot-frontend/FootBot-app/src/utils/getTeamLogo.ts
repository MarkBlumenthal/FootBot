// footbot-frontend/FootBot-app/src/utils/getTeamLogo.ts
export const getTeamLogo = (leagueId: string, teamName: string): string => {
    const normalizedTeamName = teamName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_'); // Replace non-alphanumeric characters with underscores
  
    return `/logos/${leagueId}/${normalizedTeamName}.png`; // Adjust the path according to your structure
  };
  
  