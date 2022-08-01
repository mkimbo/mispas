import React, { FunctionComponent, useRef } from "react";
import { Button, Box } from "@mui/material";
import {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { getGeoHash, loadScript } from "../../../src/utils/functions";
import { uploadFileToCloud } from "../../../src/utils/firebase";
import { TFormState } from "../hooks/useStepper";
import { UseFormHandleSubmit } from "react-hook-form";
import { TStep1Form, TStep2Form } from "../missing";
import { saveData } from "../missing";

interface IProps {
  state: TFormState;
  dispatch: React.Dispatch<{ type: string; payload?: any }>;
  handleSubmit: UseFormHandleSubmit<TStep1Form | TStep2Form>;
  steps: any;
}

const StepperActions: FunctionComponent<IProps> = ({
  state,
  dispatch,
  handleSubmit,
  steps,
}) => {
  const handleSaveData = async () => {
    const downloadUrl = await uploadFileToCloud(state.data.image);
    const _geoloc = await getLatLong(state.data.lastSeenLocation);
    const geohash = getGeoHash(_geoloc);
    const missingPersonData = {
      ...state.data,
      lastSeenLocation: {
        ..._geoloc,
        address: state.data.lastSeenLocation,
        geohash,
      },
      image: downloadUrl,
      _geoloc,
      sightings: [],
      found: false,
    };
    const response = await saveData(missingPersonData);
  };

  const getLatLong = async (address: string) => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    return latLng;
  };

  return (
    <Box display="flex" sx={{ marginTop: 3 }}>
      {state.activeStep !== 0 && (
        <Button
          disabled={state.activeStep === 0}
          onClick={() => dispatch({ type: "prev" })}
          variant="contained"
        >
          Prev
        </Button>
      )}
      <div style={{ flex: "1 0 0" }} />
      {state.activeStep !== steps.length - 1 && (
        <Button
          disabled={state.activeStep === steps.length - 1}
          variant="contained"
          onClick={() => {
            handleSubmit((values) => {
              console.log("values", values, state.data);
              dispatch({
                type: "setData",
                payload: values,
              });
              dispatch({ type: "next" });
            })();
          }}
        >
          Next
        </Button>
      )}
      {state.activeStep === steps.length - 1 && (
        <Button
          variant="contained"
          onClick={() => {
            handleSubmit(async (values) => {
              dispatch({
                type: "setData",
                payload: values,
              });
              await handleSaveData();
            })();
          }}
        >
          Save
        </Button>
      )}
    </Box>
  );
};

export default StepperActions;
