import { FavoriteIcon } from "../components/FavoriteIcon";
import MovieGroupItem from "../components/MovieGroupItem";
import MovieGroupsPage from "../pages/MovieGroupsPage/index";
import { createSnapshot } from "./utils/index";
import { MockedProvider } from "@apollo/client/testing";

jest.mock("../helpers/utils", () => {
  const originalModule = jest.requireActual("../helpers/utils");
  return {
    ...originalModule,
    getEnv: () => "",
  };
});

describe("Snapshot tests", () => {
  beforeEach(() => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
  });

  test("Snapshotting MovieGroupsPage", () => {
    const rend = createSnapshot(
      <MockedProvider>
        <MovieGroupsPage />
      </MockedProvider>,
    );
    expect(rend).toMatchSnapshot();
  });

  test("Snapshotting MovieGroupItem", () => {
    const result = createSnapshot(<MovieGroupItem title={"test"} />);
    expect(result).toMatchSnapshot();
  });

  test("Snapshotting FavoriteIcon", () => {
    const result = createSnapshot(<FavoriteIcon width={20} isFilled={true} />);
    expect(result).toMatchSnapshot();
  });
});
