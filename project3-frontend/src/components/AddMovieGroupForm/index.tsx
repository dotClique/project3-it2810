import { Box, Button, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { FormContainer } from "./styled";
import styles from "./styles";

enum FormNames {
  name = "name",
  description = "description",
}

const formInitialValues = {
  name: "",
  description: "",
};

const validationSchema = yup.object({
  name: yup.string().min(3, "Min 3 characters").required("Required"),
  description: yup.string().notRequired(),
});

export default function AddMovieGroupForm() {
  const handleSubmit = (values: typeof formInitialValues) => {
    console.log(values);
  };
  return (
    <div>
      <Formik
        initialValues={formInitialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors }) => (
          <Form>
            <FormContainer>
              <Box>
                <Field
                  name={FormNames.name}
                  as={TextField}
                  label="Name of group"
                  error={errors[FormNames.name] !== undefined}
                  helperText={errors[FormNames.name]}
                  sx={styles.field}
                />
              </Box>
              <Box>
                <Field
                  name={FormNames.description}
                  as={TextField}
                  multiline
                  label="Description of group"
                  error={errors[FormNames.description] !== undefined}
                  helperText={errors[FormNames.description]}
                  rows={4}
                  sx={styles.field}
                />
              </Box>
              <Box>
                <Button type="submit" color="primary" variant="contained">
                  Submit
                </Button>
              </Box>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
}
