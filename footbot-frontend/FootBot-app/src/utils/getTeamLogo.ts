// footbot-frontend/FootBot-app/src/utils/getTeamLogo.ts
export const getTeamLogo = (leagueId: string, teamName: string | null | undefined): string => {
  if (!teamName) {
    console.log(`Missing team name for league ${leagueId}`);
    return '/logos/default-team.png'; // Return a default logo path
  }

  const normalizedTeamName = teamName
    .toLowerCase()
    .replace(/\b(fc|sc|cf|rc|ca|cd|de|rcd|ud|club|ssc|cfc|acf|us|as|ss|bc|calcio|vfl|sv|vfb|tsg|wanderers|afc|&|hove|albion|fk|sk)\b/gi, '')
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
    .replace(/-+$/g, '') // Remove trailing hyphens
    .replace(/^-+/g, ''); // Remove leading hyphens

  const logoPath = `/logos/${leagueId}/${normalizedTeamName}.png`;
  console.log(`Logo path for ${teamName} in ${leagueId}: ${logoPath}`); // Debugging log
  return logoPath;
};
