import { Box, Button, CircularProgress } from "@mui/material";
import { Form, Formik, FormikErrors } from "formik";
import { DocumentNode } from "graphql";
import { ReactNode } from "react";
import { useCreationForm } from "../../helpers/utils";
import { FormContainer } from "./styled";

type CreationFormProps<T> = {
  children: (errors: FormikErrors<T>) => ReactNode;
  formInitialValues: T;
  validationSchema?: unknown;
  mutationCall: DocumentNode;
  onCompleted: () => void;
  additionalRequestVariables?: { [key: string]: string | number };
  submitButton?: JSX.Element;
};

/**
 * Component used to handle the top level functionality of forms that create something.
 */
export default function CreationForm<T>(props: CreationFormProps<T>) {
  // Hook to handle the creation request to hte graphql api.
  const [handleSubmit, loading] = useCreationForm(
    props.mutationCall,
    props.onCompleted,
    props.additionalRequestVariables,
  );

  // Using Formik to handle form state management, errors, validation and submit.
  return (
    <div>
      <Formik
        initialValues={props.formInitialValues}
        onSubmit={handleSubmit}
        validationSchema={props.validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors }) => (
          <Form>
            <FormContainer>
              {props.children(errors)}
              <Box>
                {props.submitButton || (
                  <Button type="submit" color="primary" variant="contained" disabled={loading}>
                    Submit
                  </Button>
                )}
              </Box>
              {/* Loading icon if applicable */}
              <Box sx={{ height: 50 }}>
                {loading && <CircularProgress variant="indeterminate" color="primary" />}
              </Box>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
}
