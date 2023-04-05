import React, { FC } from "react";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserSSR,
  AuthAction,
} from "next-firebase-auth";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import getAbsoluteURL from "../utils/getAbsoluteURL";
import AppLayout from "../layout/AppLayout";
import {
  Grid,
  IconButton,
  OutlinedInput,
  Typography,
  FormLabel,
  TextField,
  Paper,
  Container,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { Phone } from "@mui/icons-material";
import { PhoneNumberRegex } from "../utils/constants";
import { addPhoneNumber } from "../utils/axios";

const styles = {
  content: {
    padding: 32,
  },
  infoTextContainer: {
    marginBottom: 32,
  },
};

const Stats: FC = (props) => {
  const auth = useAuthUser();
  return (
    <AppLayout email={auth.email} signOut={auth.signOut}>
      <Container
        maxWidth="md"
        sx={{
          my: { xs: 3, md: 2 },
          py: { xs: 2, md: 2 },
          backgroundColor: "transparent",
        }}
      >
        <Grid textAlign="center">
          <Typography component="h1" gutterBottom variant="h5">
            Stats will be here soon.
          </Typography>
        </Grid>
      </Container>
    </AppLayout>
  );
};

export const getServerSideProps = withAuthUserSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req }) => {
  const token = await AuthUser.getIdToken();
  /*   const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: token || "unauthenticated",
    },
  });
  //const data: DataType = await response.json();
  if (!response.ok) {
    throw new Error(
      `Data fetching failed with status ${response.status}: ${JSON.stringify(
        data
      )}`
    );
  } */
  return {
    props: {},
  };
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Stats);
