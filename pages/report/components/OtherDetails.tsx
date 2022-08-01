import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Typography,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  InputLabel,
  InputAdornment,
  Input,
  Button,
  TextField,
} from "@mui/material";
import {
  useFormContext,
  Controller,
  useWatch,
} from "react-hook-form";
import { useTranslation } from "../../../src/i18n";
import { MenuItem, Select } from "@mui/material";

export default function OtherDetails() {
  const t = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid container spacing={3} sx={{}}>
      <Grid item xs={12} sm={6}>
        <Controller
          name="phoneContact1"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              required
              label={t("Phone Contact 1")}
              fullWidth
              variant="standard"
              error={!!error}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="phoneContact2"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              required
              label={t("Phone Contact 2")}
              fullWidth
              variant="standard"
              error={!!error}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="policeStationName"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl variant="standard" fullWidth required>
              <InputLabel id="police-station">
                Police Station Name
              </InputLabel>
              <Select
                {...field}
                labelId="station-name"
                id="police-station"
                label="Police Station Name"
                required
                error={!!error}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="101">
                  {t("Kona Mbaya Police Station")}
                </MenuItem>
                <MenuItem value="102">
                  {t("Central Police Station")}
                </MenuItem>
              </Select>
            </FormControl>
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="obNumber"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              required
              label={t("OB Number")}
              fullWidth
              variant="standard"
              error={!!error}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
