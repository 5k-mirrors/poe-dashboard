import LeaguesTransformer from "./LeaguesTransformer";

describe("LeaguesTransformer", () => {
  const leagues = [
    { id: "Standard" },
    { id: "Hardcore" },
    { id: "SSF Standard" },
    { id: "SSF Hardcore" },
    { id: "Betrayal" },
    { id: "Hardcore Betrayal" },
    { id: "SSF Betrayal" },
    { id: "SSF Betrayal HC" }
  ];
  it("returns with the proper transformed leagues", () => {
    const transformedLeagues = LeaguesTransformer(leagues);
    const expectedValue = [
      {
        id: "Betrayal",
        name: "Temp SC"
      },
      {
        id: "Hardcore Betrayal",
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
    expect(transformedLeagues).toEqual(expectedValue);
  });
});
