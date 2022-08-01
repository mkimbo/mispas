import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "../../src/i18n";
import { styled } from "@mui/system";
import Image from "next/image";
import { withProtected } from "../../src/hook/route";
type Props = {};

function ReportSighting({}: Props) {
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
        <Typography variant="h3">Report A Sighting</Typography>
      </Box>
    </Container>
  );
}

export default withProtected(ReportSighting);
