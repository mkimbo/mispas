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
import { useTranslation } from "../../../src/i18n";
import { MenuItem, Select } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import LocationInput, { PlaceType } from "./LocationInput";
import CircularIntegration from "./CircularIntegration";

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
                //value={age}
                //onChange={handleChange}

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
                //value={age}
                //onChange={handleChange}
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name="lastSeenDate"
            control={control}
            defaultValue={null}
            render={({
              field: { onChange, value },
              fieldState: { error },
            }) => (
              <DatePicker
                label="Last seen date"
                value={value}
                disableFuture
                onChange={(value) => onChange(value)}
                renderInput={(params) => (
                  <TextField
                    helperText={error ? error?.message : null}
                    id="dateOfBirth"
                    variant="standard"
                    margin="dense"
                    fullWidth
                    color="primary"
                    required
                    {...params}
                    error={!!error}
                  />
                )}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12}>
        <LocationInput />
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
              multiline
              //rows={4}
              variant="standard"
              error={!!error}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <input
          //{...register("image")}
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
        {/*  <Controller
          name="image"
          control={control}
          render={({ field, fieldState: { error: imageError } }) => (
            <>
              <TextField
                {...field}
                id="upload-missing-person-image"
                sx={{ display: "none" }}
                type="file"
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement>
                ) => {
                  setLoading(true);
                  const file = e.target.files[0];
                  if (!file) {
                    setLoading(false);
                    setError(true);
                    return;
                  }
                  setLoading(false);
                  setSuccess(true);
                  setError(false);
                  console.log(file, "file");
                  //setValue("image", file);
                }}
                fullWidth
              />
              <CircularIntegration
                handleClick={handleClick}
                loading={loading}
                success={success}
                error={error || !!imageError}
              />
            </>
          )}
        /> */}
      </Grid>
    </Grid>
  );
}
