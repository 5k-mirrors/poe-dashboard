import React from "react";
import {
  LeagueInfoBarDiv,
  UpdateImg,
  LoadingUpdateImg
} from "./LeagueInfoBar.style";
import UpdateIcon from "../../../resources/assets/SVGIcons/Update/Update.svg";

const leagueInfoBar = ({
  leagues,
  updateLeagues,
  disableUpdateButton,
  updatingLeagues
}) => {
  if (leagues.length !== 0 && !updatingLeagues) {
    const tempSCLeague = leagues.find(
      leagueKey => leagueKey.name === "Temp SC"
    );

    return (
      <LeagueInfoBarDiv>
        {!tempSCLeague.id
          ? "Temp leagues are not available."
          : `Temp league: ${tempSCLeague.id}`}
        <button
          type="button"
          disabled={disableUpdateButton}
          onClick={() => updateLeagues()}
        >
          <UpdateImg src={UpdateIcon} alt="Update leagues" />
        </button>
      </LeagueInfoBarDiv>
    );
  }

  return (
    <LeagueInfoBarDiv>
      <LoadingUpdateImg loading src={UpdateIcon} alt="Update leagues" />
    </LeagueInfoBarDiv>
  );
};

export default leagueInfoBar;
