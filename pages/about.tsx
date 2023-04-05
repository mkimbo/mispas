import * as React from "react";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";
import { useTranslation } from "../i18n";

const AboutPage = () => {
  const t = useTranslation();
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography>{t("About Page")}</Typography>
      </Box>
    </Container>
  );
};

export default AboutPage;
