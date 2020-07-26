import React from "react";
import { mount } from "enzyme";
import Footer from "./Footer";
import FooterContainer from "./Footer.style";
import FooterButton from "./FooterButton/FooterButton";

describe("<Footer />", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<Footer />);
  });

  it("renders a FooterContainer", () => {
    expect(wrapper.find(FooterContainer)).toHaveLength(1);
  });

  it("renders 3 FooterButtons", () => {
    expect(wrapper.find(FooterButton)).toHaveLength(3);
  });
});
