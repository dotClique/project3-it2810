/**
 * Props of the Toast component.
 * @remarks
 * onYes is only used if type='confirm'.
 */
export type ToastProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  type: ToastType;
  description?: string;
  onConfirm?: () => void; // Function on "Ok" or "Yes"
  color?: ToastColor;
  disableClose?: boolean; // Disables backdrop click and x (corner close) button.
  children?: JSX.Element;
};

export type ToastType = "confirm" | "alert" | "none";

export type ToastColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | undefined;

export type ToastOptions = Omit<ToastProps, "onClose" | "open"> & {
  open?: boolean;
  onClose?: () => void;
};
