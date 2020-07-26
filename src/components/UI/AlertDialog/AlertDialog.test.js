import React from "react";
import { shallow } from "enzyme";
import Dialog from "@material-ui/core/Dialog";
import AlertDialog from "./AlertDialog";

describe("<Dialog />", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<AlertDialog showDialog={false} />);
  });

  describe("when showDialog prop is false", () => {
    it("sets the open prop of the Dialog to false", () => {
      expect(wrapper.find(Dialog).props().open).toBeFalsy();
    });
  });

  describe("when showDialog prop is true", () => {
    it("sets the open prop of the Dialog to true", () => {
      wrapper.setProps({
        showDialog: true
      });
      expect(wrapper.find(Dialog).props().open).toBeTruthy();
    });
  });
});
