// footbot-frontend/FootBot-app/src/utils.ts
export const getSeasonForDate = (date: string): string => {
    const fixtureDate = new Date(date);
    const year = fixtureDate.getFullYear();
    const month = fixtureDate.getMonth() + 1; // JavaScript months are 0-based
  
    if (month >= 8) {
      return `${year}-${year + 1}`;
    } else {
      return `${year - 1}-${year}`;
    }
  };
  
  export const getSeasonFromStandings = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
  
    if (month >= 8) {
      return `${year}-${year + 1}`;
    } else {
      return `${year - 1}-${year}`;
    }
  };
  

  
  
  