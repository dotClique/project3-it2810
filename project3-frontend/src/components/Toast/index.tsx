import { ReactNode, useState } from "react";
import { ToastContext } from "../../helpers/contexts";
import Toast from "./Toast";
import { ToastProps } from "./types";

type ToastProviderProps = {
  children: ReactNode;
};

/**
 * Component to handle the providing of the ToastContext and setting the Toast component up.
 */
export default function ToastProvider(props: ToastProviderProps) {
  const [toastData, setToastData] = useState<ToastProps>({
    open: false,
    title: "",
    onClose: () => {},
    type: "none",
  });
  return (
    <ToastContext.Provider value={{ toastData, setToastData }}>
      <Toast
        open={toastData.open}
        onClose={toastData.onClose}
        onConfirm={toastData.onConfirm}
        title={toastData.title}
        description={toastData.description}
        type={toastData.type}
        disableClose={toastData.disableClose}
        color={toastData.color}
      >
        {toastData.children}
      </Toast>
      {props.children}
    </ToastContext.Provider>
  );
}
