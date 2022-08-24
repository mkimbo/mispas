import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import AllowNotifications from "../src/components/AllowNotifications";
import GetLocation from "../src/components/GetLocation";
import {
  useAppContext,
  useAppDispatch,
} from "../src/context/GlobalContext";

import { useTranslation } from "../src/i18n";
export default function Home() {
  const dispatch = useAppDispatch();
  const state = useAppContext();
  const t = useTranslation();
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {t("WELCOME TO MISPAS")}
        </Typography>
      </Box>
    </Container>
  );
}
