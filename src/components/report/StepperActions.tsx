import React, { FunctionComponent, useRef } from "react";
import { Button, Box } from "@mui/material";
import {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { getGeoHash, loadScript } from "../../../src/utils/functions";
import { uploadFileToCloud } from "../../../src/utils/firebase";
//import { TFormState, TStep2Form  } from "../hook/useStepper";
import { UseFormHandleSubmit } from "react-hook-form";
//import { TStep1Form, TStep2Form } from "../missing";
//import { saveData } from "../missing";
import useAuth from "../../../src/hook/auth";
import { useRouter } from "next/router";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import {
  TStep1Form,
  TStep2Form,
  saveData,
} from "../../../pages/report/missing";
import { TFormState } from "../../hook/report/useStepper";

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
  const { user } = useAuth();
  const router = useRouter();
  const handleSaveData = async () => {
    dispatch({
      type: "loading",
      payload: true,
    });
    const downloadUrl = await uploadFileToCloud(state.data.image);
    const _geoloc = await getLatLong(state.data.lastSeenLocation);
    const geohash = getGeoHash(_geoloc);
    const reporterId = user?.uid;
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
      reporterId,
    };
    const response = await saveData(missingPersonData);

    if (response?.status == 200) {
      // dispatch({ type: "next" });
      dispatch({
        type: "success",
        payload: { loading: false, newCaseID: response?.data?.id },
      });
      //router.push(`/case/${response?.data?.id}`);
    }
  };

  const getLatLong = async (address: string) => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    return latLng;
  };
  console.log(state.activeStep, "activeStep");
  return (
    <Box display="flex" sx={{ marginTop: 3 }}>
      {state.activeStep !== 0 && state.activeStep !== 2 && (
        <Button
          disabled={state.loading}
          onClick={() => dispatch({ type: "prev" })}
          variant="outlined"
        >
          Prev
        </Button>
      )}
      <div style={{ flex: "1 0 0" }} />
      {state.activeStep == 0 && (
        <Button
          disabled={state.activeStep === steps.length - 1}
          variant="outlined"
          onClick={() => {
            handleSubmit((values) => {
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
      {state.activeStep == 1 && (
        <LoadingButton
          loading={state.loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="outlined"
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
        </LoadingButton>
      )}
    </Box>
  );
};

export default StepperActions;
{
  /* <Button
          variant="contained"
          disabled={state.loading}
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
        </Button> */
}
