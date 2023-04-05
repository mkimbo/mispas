import React from "react";
import { Box, Container, Typography, Paper, Grid, Button } from "@mui/material";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserSSR,
  AuthAction,
} from "next-firebase-auth";
import { useTranslation } from "../../i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/router";
import LocationInput from "./components/LocationInput";
import DateInput from "./components/DateInput";
import { fetcher, saveSighting } from "../../utils/axios";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import AppLayout from "../../layout/AppLayout";
import { TReportSighting } from "../../utils/models";

interface Props {
  missingPerson: any;
}

const schema = z.object({
  sightingLocation: z.string().min(1),
  sightingDate: z.date(),
});

function ReportSighting({ missingPerson }: Props) {
  const auth = useAuthUser();
  const router = useRouter();
  const t = useTranslation();
  const id = router.query.personId as string;
  const methods = useForm<TReportSighting>({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
    defaultValues: { sightingLocation: "", sightingDate: "" },
  });

  if (!missingPerson?.id)
    return (
      <AppLayout email={auth.email} signOut={auth.signOut}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography>Error fetching data.</Typography>
        </Box>
      </AppLayout>
    );

  const { handleSubmit } = methods;
  const handleSubmitSighting = async (data: TReportSighting) => {
    const response = await saveSighting({
      ...data,
      personId: id,
      reporterID: auth.id,
    });
    if (response.status === 200) {
      router.push(`/missing/${id}`);
    }
  };
  return (
    <AppLayout email={auth.email} signOut={auth.signOut}>
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
                {t(`Please tell us where you saw ${missingPerson?.fullname}`)}
              </Typography>
              <Grid item xs={12} marginBottom="10px">
                <LocationInput
                  name="sightingLocation"
                  label="Sighting location"
                />
              </Grid>
              <Grid item xs={12} marginBottom="10px">
                <DateInput name="sightingDate" label="Sighting date & time" />
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
    </AppLayout>
  );
}

export const getServerSideProps = withAuthUserSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req, params, query }) => {
  const token = await AuthUser.getIdToken();
  const { personId } = query;
  const endpoint = getAbsoluteURL(`/api/missing/${personId}`, req);
  const response = await fetcher(endpoint, token);
  const data: any = await response.json();
  return {
    props: { missingPerson: data },
  };
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(ReportSighting);
