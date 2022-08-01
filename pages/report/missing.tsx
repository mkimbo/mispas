import React from "react";
import {
  Box,
  Container,
  Typography,
  Step,
  Paper,
  Stepper,
  StepLabel,
  Hidden,
  Button,
} from "@mui/material";
import { useTranslation } from "../../src/i18n";
//import { styled } from "@mui/system";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useForm,
  FormProvider,
  SubmitHandler,
} from "react-hook-form";
import { TLastSighting } from "../missing/[id]";
import MissingPersonDetails from "./components/MissingPersonDetails";
import { merge } from "lodash";
import { useStepper } from "./hooks/useStepper";
import StepperActions from "./components/StepperActions";
import OtherDetails from "./components/OtherDetails";
import axios, { AxiosResponse } from "axios";
import { withProtected } from "../../src/hook/route";
type Props = {};

export interface IReportMissing {
  fullname: string;
  age: number;
  gender: string;
  complexion: string;
  image: File;
  lastSeenLocation: string;
  lastSeenDate: string;
  lastWearing: string;
  nickname: string;
  obNumber: string;
  phoneContact1: string;
  phoneContact2: string;
  policeStationName: string;
  relationToReported: string;
}

export const saveData = async (data: any) => {
  const response = await axios.post("/api/report/missing", data);
  return response;
};

export const updateData = async (data: any) => {
  const response = await axios.put("/api/report/missing", data);
  return response;
};

const locationScema = z.object({
  lng: z.string(),
  lat: z.string(),
  address: z.string(),
});

const MAX_FILE_SIZE = 200000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const policeStations = [
  {
    value: "1",
    label: "Kona Mbaya Police Statio",
  },
  {
    value: "2",
    label: "Central Police Station",
  },
];

const policeStationValues: string[] = policeStations.map(
  (item) => item.value
);
console.log(policeStationValues, "policeStationValues");

export type TStep1Form = {
  fullname: string;
  age: string;
  gender: string;
  complexion: string;
  lastSeenDate: string;
  lastSeenLocation: string;
  lastSeenWearing: string;
  nickname: string;
  image: File;
};

export type TStep2Form = {
  phoneContact1: string;
  phoneContact2: string;
  obNumber: string;
  policeStationName: string;
  relationToReported?: string;
};

const Step1 = {
  label: "Step 1",
  validationSchema: z.object({
    fullname: z.string().min(2).max(36),
    nickname: z.string().max(36).optional(),
    gender: z.enum(["Male", "Female", "Other"]),
    age: z.string().min(1),
    complexion: z.enum(["Light", "Dark"]),
    image: z.any().refine((file) => !!file, "Image is required."),
    lastSeenDate: z.date(),
    lastSeenLocation: z.string().min(1),
    lastSeenWearing: z.string().min(50).max(200),
  }),
  defaultValues: {
    fullname: "James Howie",
    gender: "Male",
    complexion: "Light",
    lastSeenDate: new Date(),
    lastSeenLocation: "dksjfsk",
    lastSeenWearing:
      "fhg hfhhfhfh jhfghgfhfhf gjhgjhgjhfhj jhgghhf hfhfhfhff",
    nickname: "Jamie",
  },
};

const Step2 = {
  label: "Step 2",
  validationSchema: z.object({
    phoneContact1: z.string().min(10).max(13),
    phoneContact2: z.string().min(10).max(13),
    obNumber: z.string().min(8).max(18),
    policeStationName: z.string(),
    relationToReported: z.string(),
  }),
  defaultValues: {
    phoneContact1: "7989799879",
    phoneContact2: "8090980986",
    obNumber: "879797997",
    policeStationName: "",
    relationToReported: "Close Friend",
  },
};

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <MissingPersonDetails />;
    case 1:
      return <OtherDetails />;
    case 2:
      return "<Review />";
    default:
      throw new Error("Unknown step");
  }
}

function ReportMissing({}: Props) {
  const t = useTranslation();
  const steps = [Step1, Step2];
  //const [activeStep, setActiveStep] = React.useState(0);
  const [state, dispatch] = useStepper();

  const getDefaultValues = (steps) => {
    let defaultValues = {};
    steps.forEach((step) => {
      defaultValues = merge(defaultValues, step.defaultValues);
    });

    return { ...defaultValues };
  };
  const methods = useForm<TStep1Form | TStep2Form>({
    resolver: zodResolver(steps[state.activeStep].validationSchema),
    reValidateMode: "onChange",
    defaultValues: getDefaultValues(steps),
  });

  const { register, handleSubmit, control } = methods;

  const onSubmit: SubmitHandler<TStep1Form | TStep2Form> = async (
    data
  ) => console.log(data);
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <FormProvider {...methods}>
        <form>
          <Paper
            variant="outlined"
            sx={{
              my: { xs: 3, md: 2 },
              p: { xs: 2, md: 2 },
              backgroundColor: "transparent",
            }}
          >
            <Typography component="h1" variant="h4" align="center">
              Report A Missing Person
            </Typography>
            <Stepper
              activeStep={state.activeStep}
              alternativeLabel
              sx={{ pt: 3, pb: 3 }}
            >
              {steps.map((step) => (
                <Step key={step.label}>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {state.activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed
                    your order confirmation, and will send you an
                    update when your order has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(state.activeStep)}
                  <StepperActions
                    dispatch={dispatch}
                    steps={steps}
                    state={state}
                    handleSubmit={handleSubmit}
                  />
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </form>
      </FormProvider>
    </Container>
  );
}

export default withProtected(ReportMissing);

/* email: z
      .string()
      .nonempty("The email is required.")
      .email({ message: "The email is invalid." }),
    confirmEmail: z.string(),
    // interesting case : at first, no option radio are checked so this is null. So the error is "Expected string, received null".
    // So we need to accept first string or null, in order to apply refine to set a custom message.
    isDeveloper: z
      .string()
      .or(z.null())
      .refine((val) => Boolean(val), {
        message: "Please, make a choice!",
      }),
    //title: z.union([z.literal("Mr"), z.literal("Mrs"), z.literal("Miss"), z.literal("Dr")]),
    title: z.enum(["Mr", "Mrs", "Miss", "Dr"]), */ // For educationnal purpose (it's overkill here, as the UI constrains it already with a select).

// The refine method is used to add custom rules or rules over multiple fields.
/* .refine((data) => data.email === data.confirmEmail, {
    message: "Emails don't match.",
    path: ["confirmEmail"], // Set the path of this error on the confirmEmail field.
  }) */
