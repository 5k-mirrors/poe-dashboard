import React from "react";
import { shallow } from "enzyme";
import LeagueInfoBar from "./LeagueInfoBar";
import {
  LeagueInfoBarDiv,
  UpdateImg,
  LoadingUpdateImg
} from "./LeagueInfoBar.style";

describe("<LeagueInfoBar />", () => {
  let leagueInfoBarWrapper;

  describe("when `leagues` length is not zero and `updatingLeagues` is false", () => {
    const updatingLeagues = false;
    const leaguesWithTempSC = [
      {
        id: "Betrayal",
        name: "Temp SC"
      }
    ];

    beforeEach(() => {
      leagueInfoBarWrapper = shallow(
        <LeagueInfoBar
          leagues={leaguesWithTempSC}
          updatingLeagues={updatingLeagues}
        />
      );
    });

    it("renders LeagueInfoBarDiv", () => {
      expect(leagueInfoBarWrapper.find(LeagueInfoBarDiv)).toHaveLength(1);
    });

    it("renders UpdateImg", () => {
      expect(leagueInfoBarWrapper.find(UpdateImg)).toHaveLength(1);
    });

    describe("when `disableUpdateButton` is true", () => {
      it("disables the update button", () => {
        const disableUpdateButton = true;
        leagueInfoBarWrapper.setProps({
          disableUpdateButton
        });

        expect(
          leagueInfoBarWrapper.find("button").props().disabled
        ).toBeTruthy();
      });
    });

    describe("when `disableUpdateButton` is false", () => {
      it("does not disable the update button", () => {
        const disableUpdateButton = false;
        leagueInfoBarWrapper.setProps({
          disableUpdateButton
        });

        expect(
          leagueInfoBarWrapper.find("button").props().disabled
        ).toBeFalsy();
      });
    });

    describe("when the temporary league is defined", () => {
      it("renders the id of the league", () => {
        const expectedText = `Temp league: ${leaguesWithTempSC[0].id}`;

        expect(leagueInfoBarWrapper.find(LeagueInfoBarDiv).text()).toEqual(
          expectedText
        );
      });
    });

    describe("when the temporary league is not defined", () => {
      const leaguesWithoutTempSC = [
        {
          name: "Temp SC"
        }
      ];

      beforeEach(() => {
        leagueInfoBarWrapper = shallow(
          <LeagueInfoBar leagues={leaguesWithoutTempSC} />
        );
      });

      it("renders the error message", () => {
        const expectedText = "Temp leagues are not available.";

        expect(leagueInfoBarWrapper.find(LeagueInfoBarDiv).text()).toEqual(
          expectedText
        );
      });
    });
  });

  describe("when `leagues` length is zero or `updatingLeagues` is true", () => {
    const updatingLeagues = true;
    const leagues = [];

    beforeEach(() => {
      leagueInfoBarWrapper = shallow(
        <LeagueInfoBar leagues={leagues} updatingLeagues={updatingLeagues} />
      );
    });

    it("renders LoadingUpdateImg", () => {
      expect(leagueInfoBarWrapper.find(LoadingUpdateImg)).toHaveLength(1);
    });
  });

  describe("Update button click", () => {
    const updateLeagues = jest.fn();

    const leagues = [
      {
        id: "Betrayal",
        name: "Temp SC"
      }
    ];

    beforeEach(() => {
      leagueInfoBarWrapper = shallow(
        <LeagueInfoBar leagues={leagues} updateLeagues={updateLeagues} />
      );
    });

    it("calls `updateLeagues` props function", () => {
      leagueInfoBarWrapper.find("button").simulate("click");

      expect(updateLeagues).toHaveBeenCalled();
    });
  });
});
