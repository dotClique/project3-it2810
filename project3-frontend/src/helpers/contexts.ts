import { createContext, Dispatch, SetStateAction } from "react";
import { ToastProps } from "../components/Toast/types";

type ToastContextType = {
  toastData: ToastProps;
  setToastData: Dispatch<SetStateAction<ToastProps>>;
};

export const ToastContext = createContext<ToastContextType>({
  toastData: { open: false, type: "none", title: "", onClose: () => {} },
  setToastData: () => {},
});
