import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "../../src/i18n";
import { styled } from "@mui/system";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useForm,
  FormProvider,
  SubmitHandler,
} from "react-hook-form";
import { withProtected } from "../../src/hook/route";
import { useRouter } from "next/router";
import LocationInput from "./components/LocationInput";
import DateInput from "./components/DateInput";
import { fetcher } from "../../src/utils/axios";
import useSWR from "swr";
import { TPerson } from "../missing/[id]";
import useAuth from "../../src/hook/auth";
import axios, { AxiosResponse } from "axios";
type Props = {};

export type TReportSighting = {
  sightingLocation: string;
  sightingDate: string;
};

const schema = z.object({
  sightingLocation: z.string().min(1),
  sightingDate: z.date(),
});

export const saveSighting = async (data: any) => {
  const response = await axios.put("/api/report/sighting", data);
  return response;
};

function ReportSighting({}: Props) {
  const { user } = useAuth();
  const router = useRouter();
  const t = useTranslation();
  const id = router.query.personId as string;
  const { data, error } = useSWR(`/api/case/${id}`, fetcher);
  if (error)
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography>Error fetching data.</Typography>
      </Box>
    );
  if (!data)
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  const missingPerson: TPerson = data;

  const methods = useForm<TReportSighting>({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
    defaultValues: { sightingLocation: "", sightingDate: "" },
  });
  const { handleSubmit } = methods;
  const handleSubmitSighting = async (data: TReportSighting) => {
    const response = await saveSighting({
      ...data,
      personId: id,
      reporterID: user?.uid,
    });
    if (response.status === 200) {
      router.push("/");
    }
  };
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
            <Typography variant="h6" align="center" gutterBottom>
              {t("Report a missing person sighting")}
            </Typography>
            <Grid item xs={12} marginBottom="10px">
              <LocationInput
                name="sightingLocation"
                label="Sighting location"
              />
            </Grid>
            <Grid item xs={12} marginBottom="10px">
              <DateInput
                name="sightingDate"
                label="Sighting date & time"
              />
            </Grid>
            <Grid item xs={12} textAlign="right">
              <Button
                onClick={() => {
                  handleSubmit((values) => {
                    handleSubmitSighting(values);
                  })();
                }}
                variant="contained"
              >
                Submit
              </Button>
            </Grid>
          </Paper>
        </form>
      </FormProvider>
    </Container>
  );
}

export default withProtected(ReportSighting);
