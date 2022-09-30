import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useFormContext, Controller } from "react-hook-form";
import _ from "lodash";
import { Typography } from "@mui/material";
export type TOption = {
  label: string;
  value?: number;
  Tel?: string;
  Tel2?: string;
  Tel3?: string;
};

interface IProps {
  name: string;
  options: TOption[];
}

export default function AutoCompleteSelect({
  name,
  options,
}: IProps) {
  const { control } = useFormContext();
  const [value, setValue] = React.useState<TOption | null>(null);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          id="police-sation-name"
          options={options}
          autoHighlight
          getOptionLabel={(option: TOption) => option?.label}
          value={value}
          onChange={(event: any, newValue: TOption | null) => {
            setValue(newValue);
            field.onChange(newValue?.label);
          }}
          renderOption={(props, option) => (
            <Typography component="li" {...props}>
              {typeof option === "string"
                ? option
                : option?.label || ""}
            </Typography>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Police Station"
              value={value?.label || ""}
              inputProps={{
                ...params.inputProps,
                autoComplete: "disabled",
              }}
              error={!!error}
            />
          )}
        />
      )}
    />
  );
}
