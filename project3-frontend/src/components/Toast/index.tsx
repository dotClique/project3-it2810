import { useReactiveVar } from "@apollo/client";
import { toastDataVar } from "../../helpers/reactive-vars";
import Toast from "./Toast";

/**
 * Component to handle the providing and setting the Toast component up.
 */
export default function ToastProvider() {
  const toastData = useReactiveVar(toastDataVar);
  return (
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
  );
}
