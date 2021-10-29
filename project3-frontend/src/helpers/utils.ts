import { useMutation, useReactiveVar } from "@apollo/client";
import { DocumentNode } from "graphql";
import { useCallback } from "react";
import { ToastOptions, ToastProps } from "../components/Toast/types";
import { toastDataVar } from "./reactive-vars";

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
  const toastData = useReactiveVar(toastDataVar);

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
        onClose: onClose ?? (() => toastDataVar({ ...newToastData, open: false })),
        type,
        description,
        onConfirm,
        color,
        disableClose,
        children,
      };
      return toastDataVar(newToastData);
    },
    [toastData, toastDataVar],
  );
};

export function useCreationForm<FormValues>(
  MUTATION_CALL: DocumentNode,
  onCompleted: () => void,
  additionalRequestVariables?: { [key: string]: string | number },
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
        variables: { ...values, ...additionalRequestVariables },
      });
    },
    [performMutation],
  );
  return [handleSubmit, loading];
}
