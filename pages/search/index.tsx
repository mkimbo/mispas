import React from "react";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserSSR,
  AuthAction,
} from "next-firebase-auth";
import { Box, Container, Typography } from "@mui/material";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-hooks-web";
import SearchHit from "./components/SearchHit";
import { useTranslation } from "../../i18n";
import AppLayout from "../../layout/AppLayout";

const searchClient = algoliasearch(
  "CL1J39H1NX",
  "ce211c83e6d53b3d69f6520822956850"
);

function Search() {
  const auth = useAuthUser();
  const t = useTranslation();
  return (
    <AppLayout email={auth.email} signOut={auth.signOut}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "auto",
        }}
        component="main"
        maxWidth="lg"
      >
        <InstantSearch
          searchClient={searchClient}
          indexName={"reported_missing"}
        >
          <Typography component="div" color="primary">
            <SearchBox placeholder={t("search.placeholder.text")} />
          </Typography>

          <Hits hitComponent={SearchHit} />
        </InstantSearch>
      </Container>
    </AppLayout>
  );
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Search);
