import exaltIcon from "exaltIcon";
import ImageDisplayer from "./ImageDisplayer";

describe("ImageDisplayer", () => {
  it("returns with the appropriate icon", () => {
    const exaltImg = ImageDisplayer(exaltIcon, "Chaos");
    expect(exaltImg.props.alt).toEqual("Chaos");
  });
});
