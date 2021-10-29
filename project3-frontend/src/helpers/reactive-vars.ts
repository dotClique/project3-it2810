import { makeVar } from "@apollo/client";
import { ToastProps } from "../components/Toast/types";

export const toastDataVar = makeVar<ToastProps>({
  open: false,
  type: "none",
  title: "",
  onClose: () => {},
});
