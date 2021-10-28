import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material";
import { Field, FieldProps } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { CREATE_MOVIE_EVENT, GET_MOVIES } from "../../helpers/graphql-queries";
import CreationForm from "../CreationForm";
import styles from "./styles";
import { useQuery } from "@apollo/client";

// The names of the form fields.
enum FormNames {
  title = "title",
  name = "name",
  description = "description",
  location = "location",
  date = "date",
  imageUrl = "imageUrl",
}

const formInitialValues = {
  title: "",
  description: "",
  location: "",
  date: "",
  imageUrl: "",
};

// Schema used to validate the form.
const validationSchema = yup.object({
  title: yup.string().min(3, "Min 3 characters").required("Required"),
  description: yup.string().notRequired(),
  location: yup.string().min(5, "Minimum 5 characters").required("Required"),
  date: yup.date().required("Required"),
  imageUrl: yup.string().notRequired(),
});

type CreateMovieEventFormProps = {
  movieGroupId: string;
};

/**
 * Component to handle the form to create a movie event..
 */
export default function CreateMovieEventForm(props: CreateMovieEventFormProps) {
  const history = useHistory();
  const pageSize = 20;
  const [searchString, setSearchString] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const { data, refetch } = useQuery(GET_MOVIES, {
    variables: { pageSize, searchString },
  });

  useEffect(() => {
    if (data) {
      const mapped = data?.movies.map((item: { primarytitle: string }) => item.primarytitle);
      setOptions(
        mapped.filter((mov: string, index: number) => {
          return mapped.indexOf(mov) === index;
        }),
      );
    }
  }, [data]);
  useEffect(() => {
    refetch({ pageSize, searchString });
  }, [searchString]);
  return (
    <CreationForm
      formInitialValues={formInitialValues}
      onCompleted={() => history.goBack()}
      mutationCall={CREATE_MOVIE_EVENT}
      validationSchema={validationSchema}
      additionalRequestVaraibles={{ movieGroupId: props.movieGroupId }}
    >
      {(errors) => (
        <>
          <Box>
            <Field name={FormNames.title} id={FormNames.title} type={"string"} as={TextField}>
              {({ form }: FieldProps) => {
                return (
                  <Autocomplete
                    freeSolo
                    filterOptions={(x) => x}
                    onInputChange={(e, v) => {
                      {
                        setSearchString(v || searchString);
                        form.setFieldValue(FormNames.title, v);
                      }
                    }}
                    value={searchString}
                    onChange={(e, v) => form.setFieldValue(FormNames.title, v)}
                    renderInput={(params) => (
                      <TextField
                        label="Title"
                        helperText={errors[FormNames.title]}
                        sx={styles.field}
                        error={errors[FormNames.title] !== undefined}
                        {...params}
                      />
                    )}
                    options={options}
                  />
                );
              }}
            </Field>
          </Box>
          <Box>
            <Field
              name={FormNames.description}
              as={TextField}
              label="Description of the movie event"
              error={errors[FormNames.description] !== undefined}
              helperText={errors[FormNames.description]}
              sx={styles.field}
            />
          </Box>
          <Box>
            <Field
              name={FormNames.location}
              as={TextField}
              label="Location"
              error={errors[FormNames.location] !== undefined}
              helperText={errors[FormNames.location]}
              sx={styles.field}
            />
          </Box>
          <Box>
            <Field
              name={FormNames.date}
              as={TextField}
              label="Date and Time"
              InputLabelProps={{ shrink: true }}
              error={errors[FormNames.date] !== undefined}
              helperText={errors[FormNames.date]}
              type="datetime-local"
              sx={styles.field}
            />
          </Box>
        </>
      )}
    </CreationForm>
  );
}
