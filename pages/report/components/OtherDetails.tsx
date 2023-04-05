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
import { useFormContext, Controller, useWatch } from "react-hook-form";
import { useTranslation } from "../../../i18n";
import { MenuItem, Select } from "@mui/material";
import policeStations from "../../../assets/pStations.json";
import _ from "lodash";
import AutoCompleteSelect, { TOption } from "./AutoCompleteSelect";

export default function OtherDetails() {
  const t = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const stations: TOption[] = _.cloneDeep(policeStations).filter((item) =>
    item.label.includes("Police Station")
  );
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
        <AutoCompleteSelect name="policeStationName" options={stations} />
        {/*  <Controller
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
                {stations.map((station) => (
                  <MenuItem value={station?.value}>
                    {station?.name}
                  </MenuItem>
                ))}

              </Select>
            </FormControl>
          )}
        /> */}
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
