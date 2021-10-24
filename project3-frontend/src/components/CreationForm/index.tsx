import { Box, Button, CircularProgress } from "@mui/material";
import { Form, Formik, FormikErrors } from "formik";
import { DocumentNode } from "graphql";
import { ReactNode } from "react";
import { useCreationForm } from "../../helpers/utils";
import { FormContainer } from "./styled";

type CreationFormProps<T> = {
  children: (errors: FormikErrors<T>) => ReactNode;
  formInitialValues: T;
  validationSchema: unknown;
  mutationCall: DocumentNode;
  onCompleted: () => void;
};

export default function CreationForm<T>(props: CreationFormProps<T>) {
  const [handleSubmit, loading] = useCreationForm(props.mutationCall, props.onCompleted);

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
                <Button type="submit" color="primary" variant="contained" disabled={loading}>
                  Submit
                </Button>
              </Box>
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
