const GetFilteredLeagues = leagues =>
  !["ssf", "hardcore", "standard"].some(prohibitedWord =>
    leagues.toLowerCase().includes(prohibitedWord)
  );

const GetSecondTempLeague = (filteredLeagues, leaguesArray) => {
  const filteredSingleLeague = filteredLeagues[0];
  const temporaryLeague = leaguesArray.filter(
    league =>
      league.includes(filteredSingleLeague) &&
      !league.includes("SSF") &&
      league !== filteredSingleLeague
  );
  return temporaryLeague[0];
};

const leaguesTransformer = leagues => {
  const leaguesArray = Object.keys(leagues).map(
    leagueIndex => leagues[leagueIndex].id
  );
  const filteredLeagues = leaguesArray.filter(GetFilteredLeagues);
  if (filteredLeagues.length === 1) {
    filteredLeagues.push(GetSecondTempLeague(filteredLeagues, leaguesArray));
  }
  const transformedLeagues = [
    {
      id: filteredLeagues[0],
      name: "Temp SC"
    },
    {
      id: filteredLeagues[1],
      name: "Temp HC"
    },
    {
      id: "Standard",
      name: "Standard"
    },
    {
      id: "Hardcore",
      name: "Hardcore"
    }
  ];
  return transformedLeagues;
};

export default leaguesTransformer;
