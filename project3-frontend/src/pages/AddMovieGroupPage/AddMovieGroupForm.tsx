import { TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import yup from "yup";
import PageContainer from "../../components/PageContainer";

const formNames = {
  name: "name",
  description: "description",
};

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
    values;
  };
  return (
    <PageContainer title="Add Movie Group">
      <Formik
        initialValues={formInitialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors }) => {
          <Form>
            <Field name={formNames.name} as={TextField} label="Name of group" />
            <Field
              name={formNames.description}
              as={TextField}
              multiline
              label="Description of group"
            />
          </Form>;
        }}
      </Formik>
    </PageContainer>
  );
}
