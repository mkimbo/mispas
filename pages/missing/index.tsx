import React from "react";
import { Box, Container } from "@mui/material";
import { useTranslation } from "../../i18n";
import { styled } from "@mui/material";
import MissingCard from "./components/MissingCard";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserSSR,
  AuthAction,
} from "next-firebase-auth";
import AppLayout from "../../layout/AppLayout";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import { fetcher } from "../../utils/axios";

const MissingPeople = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, 250px)",
  gap: "10px",
  justifyContent: "center",
  width: "100%",
});

function Missing(props: any) {
  const authUser = useAuthUser();
  const { missingPeople } = props;
  const t = useTranslation();
  return (
    <AppLayout email={authUser.email} signOut={authUser.signOut}>
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h6>Missing people</h6>
          <MissingPeople>
            {missingPeople.map((missingPerson) => {
              return (
                <MissingCard key={missingPerson.id} item={missingPerson} />
              );
            })}
          </MissingPeople>
        </Box>
      </Container>
    </AppLayout>
  );
}

export const getServerSideProps = withAuthUserSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req }) => {
  const token = await AuthUser.getIdToken();
  const endpoint = getAbsoluteURL("/api/missing", req);
  const response = await fetcher(endpoint, token);
  const data: any[] = await response.json();
  return {
    props: { missingPeople: data },
  };
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Missing);
