import { FavoriteIcon } from "../components/FavoriteIcon";
import MovieGroupItem from "../components/MovieGroupItem";
import MovieGroupsPage from "../pages/MovieGroupsPage/index";
import { createSnapshot } from "./utils/index";

describe("Snapshot tests", () => {
  beforeEach(() => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
  });

  test("Snapshotting App", () => {
    const rend = createSnapshot(<MovieGroupsPage />);
    expect(rend).toMatchSnapshot();
  });

  test("Snapshotting MovieGroup", () => {
    const result = createSnapshot(<MovieGroupItem title={"test"} />);
    expect(result).toMatchSnapshot();
  });

  test("Snapshotting FavoriteIcon", () => {
    const result = createSnapshot(<FavoriteIcon width={20} isFilled={true} />);
    expect(result).toMatchSnapshot();
  });
});
