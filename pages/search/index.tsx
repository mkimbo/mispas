import React from "react";
import { Box, Container, Typography } from "@mui/material";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
} from "react-instantsearch-hooks-web";
import SearchHit from "./components/SearchHit";
import { useTranslation } from "../../src/i18n";
import { withProtected } from "../../src/hook/route";

const searchClient = algoliasearch(
  "CL1J39H1NX",
  "ce211c83e6d53b3d69f6520822956850"
);

function Search() {
  const t = useTranslation();
  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
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
      </Box>
    </Container>
  );
}

export default withProtected(Search);
