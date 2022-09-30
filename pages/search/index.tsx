import React from "react";
import { Box, Container, Typography } from "@mui/material";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
} from "react-instantsearch-hooks-web";
import SearchHit from "../../src/components/search/SearchHit";
import { useTranslation } from "../../src/i18n";
import { withProtected } from "../../src/hook/route";

const searchClient = algoliasearch(
  "CL1J39H1NX",
  "ce211c83e6d53b3d69f6520822956850"
);

function Search() {
  const t = useTranslation();
  return (
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
  );
}

export default withProtected(Search);
