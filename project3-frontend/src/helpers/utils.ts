import { useCallback, useContext } from "react";
import { ToastOptions, ToastProps } from "../components/Toast/types";
import { ToastContext } from "./contexts";

/**
 * Gets the environmental variable with envName and throws error if not found.
 * @param envName The envinmental varaible to get.
 * @returns The value of the environmental varaible.
 * @throws Error if the environmental variable is not found.
 */
export const getEnv = (envName: string): string => {
  const variable = process.env[envName];
  if (!variable) throw new Error(`Environmental variable ${envName} not found`);
  return variable;
};

export const useToast = () => {
  const { toastData, setToastData } = useContext(ToastContext);

  return useCallback(
    ({
      title,
      onClose,
      open,
      type,
      description,
      onConfirm,
      color,
      disableClose,
      children,
    }: ToastOptions) => {
      const newToastData: ToastProps = {
        open: open === undefined ? true : open,
        title,
        onClose: onClose ?? (() => setToastData({ ...newToastData, open: false })),
        type,
        description,
        onConfirm,
        color,
        disableClose,
        children,
      };
      return setToastData(newToastData);
    },
    [toastData, setToastData],
  );
};
