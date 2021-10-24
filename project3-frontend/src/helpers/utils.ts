import { useMutation } from "@apollo/client";
import { DocumentNode } from "graphql";
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

/**
 * Hook to handle the usage of a Toast.
 * @returns A function to show the toast.
 */
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

export function useCreationForm<FormValues>(
  MUTATION_CALL: DocumentNode,
  onCompleted: () => void,
): [(values: FormValues) => void, boolean] {
  const toast = useToast();
  const [performMutation, { loading }] = useMutation(MUTATION_CALL, {
    onCompleted,
    onError: (error) => {
      toast({
        title: "An error occured.",
        type: "alert",
        color: "error",
        description: error.message,
      });
    },
  });

  const handleSubmit = useCallback(
    (values: FormValues) => {
      performMutation({
        variables: values,
      });
    },
    [performMutation],
  );
  return [handleSubmit, loading];
}
