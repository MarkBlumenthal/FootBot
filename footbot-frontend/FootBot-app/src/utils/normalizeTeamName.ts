// footbot-frontend/FootBot-app/src/utils/normalizeTeamName.ts
export const normalizeTeamName = (name: string | null | undefined): string => {
  if (!name) return '';
  
  return name
    .replace(/\b(fc|sc|cf|rc|ca|cd|de|rcd|ud|club|ssc|cfc|acf|us|as|ss|bc|calcio|vfl|sv|vfb|tsg|wanderers|afc|&|hove|albion|fk|sk|)\b/gi, '')  // Remove 'FC' and 'SC'
    .replace(/[0-9]/g, '')         // Remove numbers
    .replace(/\s+/g, ' ')          // Remove extra spaces
    .trim();                       // Trim leading and trailing spaces
};
  
  
  