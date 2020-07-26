import React from "react";
import DownShiftSelector from "../DownShiftSelector/DownShiftSelector";
import LeagueSelectorStyledDiv from "./LeagueSelector.style";

const leagueSelector = ({ onChange, placeholder }) => {
  const leagues = [
    { id: "Temp SC", name: "Temp SC" },
    { id: "Temp HC", name: "Temp HC" },
    { id: "Standard", name: "Standard" },
    { id: "Hardcore", name: "Hardcore" }
  ];

  return (
    <LeagueSelectorStyledDiv>
      <DownShiftSelector
        onChange={onChange}
        placeholder={placeholder || "Search leagues..."}
        items={leagues}
      />
    </LeagueSelectorStyledDiv>
  );
};

export default leagueSelector;
