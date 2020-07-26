import React from "react";
import { shallow } from "enzyme";
import FooterButton from "./FooterButton";
import { FooterLink, ButtonContainer } from "./FooterButton.style";
import AlertDialog from "../../AlertDialog/AlertDialog";

describe("<FooterButton />", () => {
  let wrapper;
  let onOpenDialogSpy;

  beforeAll(() => {
    wrapper = shallow(<FooterButton buttonText="Privacy" />);
    onOpenDialogSpy = jest.spyOn(wrapper.instance(), "onOpenDialog");
  });

  it("renders a ButtonContainer", () => {
    expect(wrapper.find(ButtonContainer)).toHaveLength(1);
  });

  it("renders a FooterLink", () => {
    expect(wrapper.find(FooterLink)).toHaveLength(1);
  });

  it("renders the AlertDialog component", () => {
    expect(wrapper.find(AlertDialog)).toHaveLength(1);
  });

  it("sets the FooterLink text based on the given props", () => {
    expect(wrapper.find(FooterLink).text()).toEqual("Privacy");
  });

  describe("FooterLink click", () => {
    it("calls onOpenDialog", () => {
      wrapper.find(FooterLink).simulate("click");
      expect(onOpenDialogSpy).toHaveBeenCalled();
    });
    it("sets showDialog state field to true", () => {
      expect(wrapper.state("showDialog")).toBeTruthy();
    });
  });
});
