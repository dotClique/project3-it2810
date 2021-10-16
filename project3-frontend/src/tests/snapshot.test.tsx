import Enzyme, { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import MovieGroups from "../components/MovieGroup";

Enzyme.configure({ adapter: new Adapter() });

describe("Snapshot tests", () => {
  // Snapshotting some components that many other components rely on and therefore should not be changed.
  test("Snapshotting MovieGroups", () => {
    const result = toJson(shallow(<MovieGroups />));
    expect(result).toMatchSnapshot();
  });
});
