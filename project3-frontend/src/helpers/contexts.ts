import { createContext, Dispatch, SetStateAction } from "react";
import { ToastProps } from "../components/Toast/types";

type ToastContext = {
  toastData: ToastProps;
  setToastData: Dispatch<SetStateAction<ToastProps>>;
};

export const ToastContext = createContext<ToastContext>({
  toastData: { open: false, type: "none", title: "", onClose: () => {} },
  setToastData: () => {},
});
