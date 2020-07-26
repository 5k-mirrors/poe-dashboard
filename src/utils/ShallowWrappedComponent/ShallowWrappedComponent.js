import { shallow } from "enzyme";

// https://github.com/airbnb/enzyme/issues/431#issuecomment-362318989
const shallowWrappedComponent = wrappedComponent =>
  shallow(shallow(wrappedComponent).get(0));

export default shallowWrappedComponent;
