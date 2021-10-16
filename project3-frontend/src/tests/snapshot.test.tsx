import Enzyme, { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import MovieGroups from "../components/MovieGroup";
import { FavoriteIcon } from "../components/FavoriteIcon";
import MovieGroup from "../components/MovieGroup";

Enzyme.configure({ adapter: new Adapter() });

describe("Snapshot tests", () => {
  test("Snapshotting MovieGroups", () => {
    const result = toJson(shallow(<MovieGroups />));
    expect(result).toMatchSnapshot();
  });

  test("Snapshotting MovieGroup", () => {
    const result = toJson(shallow(<MovieGroup title={"test"}/>));
    expect(result).toMatchSnapshot();
  });

  test("Snapshotting FavoriteIcon", () => {
    const result = toJson(shallow(<FavoriteIcon width={20} isFilled={true}/>));
    expect(result).toMatchSnapshot();
  });
});
