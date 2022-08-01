import { useReducer } from "react";
import { IReportMissing } from "../missing";

export type TFormState = {
  activeStep: number;
  data: IReportMissing;
};

export const useStepper = () => {
  return useReducer(
    (state: TFormState, { type, payload }) => {
      switch (type) {
        case "next":
          return {
            ...state,
            activeStep: state.activeStep + 1,
          };
        case "prev":
          return {
            ...state,
            activeStep: state.activeStep - 1,
          };
        case "setData":
          return {
            ...state,
            data: {
              ...state.data,
              ...payload,
            },
          };
        default:
          throw new Error(`${type} action not supported`);
      }
    },
    {
      activeStep: 0,
      data: {},
    }
  );
};
