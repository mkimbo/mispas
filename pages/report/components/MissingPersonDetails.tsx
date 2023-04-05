import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { FormControl, InputLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import {
  useFormContext,
  Controller,
  useWatch,
} from "react-hook-form";
import { useTranslation } from "../../../i18n";
import { MenuItem, Select } from "@mui/material";
import LocationInput, { PlaceType } from "./LocationInput";
import CircularIntegration from "./CircularIntegration";
import DateInput from "./DateInput";

export default function MissingPersonDetails() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(undefined);
  const t = useTranslation();
  const {
    control,
    setValue,
    register,
    getValues,
    formState: { errors },
  } = useFormContext();
  const handleClick = () => {
    if (!loading) {
      document?.getElementById("upload-missing-person-image").click();
    }
  };
  useEffect(() => {
    const imageFile = getValues("image");
    if (imageFile) {
      setSuccess(true);
    }
  }, []);

  return (
    <Grid container spacing={3} sx={{}}>
      <Grid item xs={12} sm={6}>
        <Controller
          name="fullname"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              required
              label={t("Full Name")}
              fullWidth
              autoComplete="full-name"
              variant="standard"
              error={!!error}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="nickname"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              required
              label={t("Nickname")}
              fullWidth
              autoComplete="nick-name"
              variant="standard"
              error={!!error}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="complexion"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl
              variant="standard"
              sx={{ minWidth: 120 }}
              fullWidth
              required
            >
              <InputLabel id="demo-simple-select-standard-label">
                Complexion
              </InputLabel>
              <Select
                {...field}
                labelId="complexion-label"
                id="complexion"
                label="Age"
                required
                error={!!error}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Light">{t("Light")}</MenuItem>
                <MenuItem value="Dark">{t("Dark")}</MenuItem>
              </Select>
            </FormControl>
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="gender"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl
              variant="standard"
              sx={{ minWidth: 120 }}
              fullWidth
              required
            >
              <InputLabel id="demo-simple-select-standard-label">
                Gender
              </InputLabel>
              <Select
                {...field}
                labelId="gender-label"
                id="gender"
                error={!!error}
                label="Gender"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Male">{t("Male")}</MenuItem>
                <MenuItem value="Female">{t("Female")}</MenuItem>
                <MenuItem value="Other">{t("Other")}</MenuItem>
              </Select>
            </FormControl>
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="age"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              required
              label={t("Age")}
              fullWidth
              autoComplete="age"
              variant="standard"
              error={!!error}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <DateInput name="lastSeenDate" label="Last seen date" />
      </Grid>
      <Grid item xs={12}>
        <LocationInput
          name="lastSeenLocation"
          label="Last seen location"
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="lastSeenWearing"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              required
              label={t("Last seen wearing")}
              fullWidth
              variant="standard"
              error={!!error}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <input
          id="upload-missing-person-image"
          style={{ display: "none" }}
          type="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLoading(true);
            const file = e.target.files?.[0];
            if (!file) {
              setLoading(false);
              setError(true);
              return;
            }
            setLoading(false);
            setSuccess(true);
            setError(false);
            console.log(file, "file");
            setValue("image", file);
          }}
        />
        <CircularIntegration
          handleClick={handleClick}
          loading={loading}
          success={success}
          error={error || errors?.image ? true : false}
        />
      </Grid>
    </Grid>
  );
}
