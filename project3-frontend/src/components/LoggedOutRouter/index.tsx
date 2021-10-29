import { useLocation } from "react-router-dom";
import { Paths } from "../../helpers/constants";
import { useHistory } from "react-router";

/**
 * Redirects the user if not logged in and on any other page than home
 * @constructor
 */
export default function LoggedOutRouter() {
  const location = useLocation();
  const history = useHistory();

  // Must be updated when the ROM changes
  const alias = localStorage.getItem("alias");

  if (!alias) {
    if (location.pathname !== Paths.HOME) {
      history.push(Paths.HOME);
    }
  }
  return <></>;
}
