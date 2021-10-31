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

/**
 * A hook to handle the submission of creation forms, returning the handleSumit function.
 * It also handles the display of error messages, if an error during the call occurred.
 * @param mutationCall The graphql call to do when submitting.
 * @param onCompleted The function to run when the graphql mutation call is completed.
 * @param additionalRequestVariables Additional request variables to pass when the mutation call is performed.
 * @returns An array of the handleSubmit function and if the data is loading.
 */
export function useCreationForm<FormValues>(
  mutationCall: DocumentNode,
  onCompleted?: () => void,
  additionalRequestVariables?: { [key: string]: string | number },
): [(values: FormValues) => void, boolean] {
  const errToast = useErrorToast();
  const [performMutation, { loading }] = useMutation(mutationCall, {
    onCompleted,
    onError: (error) => errToast(error.message),
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

/**
 * *A hook to handle the display of error messages with a toast.
 * @returns A function to show the toast with the provided error message (errorMsg).
 */
export const useErrorToast = (): ((errorMsg: string) => void) => {
  const toast = useToast();
  return (errorMsg: string) =>
    toast({
      title: "An error occured.",
      type: "alert",
      color: "error",
      description: errorMsg,
    });
};
