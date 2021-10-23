import { Box, TextField } from "@mui/material";
import { Field } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { Paths } from "../../helpers/constants";
import { CREATE_MOVIE_GROUP } from "../../helpers/graphql-queries";
import CreationForm from "../CreationForm";
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

export default function CreateMovieGroupForm() {
  const history = useHistory();
  return (
    <CreationForm
      formInitialValues={formInitialValues}
      mutationCall={CREATE_MOVIE_GROUP}
      validationSchema={validationSchema}
      onCompleted={() => history.push(Paths.MOVIE_GROUPS)}
    >
      {(errors) => (
        <>
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
        </>
      )}
    </CreationForm>
  );
}
