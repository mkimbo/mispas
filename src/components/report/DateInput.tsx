import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  useFormContext,
  Controller,
  useWatch,
} from "react-hook-form";
import TextField from "@mui/material/TextField";

interface IDateInput {
  name: string;
  label: string;
}

export default function DateInput({ name, label }: IDateInput) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [ampm, setAmpm] = React.useState<boolean | undefined>(
    undefined
  );
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({
          field: { onChange, value },
          fieldState: { error },
        }) => (
          <DateTimePicker
            label={label}
            value={value}
            disableFuture
            ampm={ampm}
            onChange={(value) => onChange(value)}
            renderInput={(params) => (
              <TextField
                helperText={error ? error?.message : null}
                id="date-input"
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
  );
}
