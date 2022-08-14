import {
  Box,
  Card,
  Container,
  Typography,
  useTheme,
  CircularProgress,
} from "@mui/material";
import {
  where,
  getDocs,
  query,
  collection,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../src/utils/firebase";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Check } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import sampleMissing from "../../public/missing-person.webp";
import { useTranslation } from "../../src/i18n";
import useSWR from "swr";
import { fetcher } from "../../src/utils/axios";
import { format } from "date-fns";
import { placeholderUrl } from "../../src/utils/constants";
import { TPerson } from "../missing/[id]";
import ReportSightingButton from "../../src/components/MissingPersonImage";
import MissingPersonImage from "../../src/components/MissingPersonImage";
//interface MissingPerson {}

const AgeComplexionWrapper = styled("div")({
  display: "inline-flex",
  alignItems: "center",
  width: "fit-content",
  margin: "0 auto",
});

const MissingCase = () => {
  const theme = useTheme();
  const t = useTranslation();
  const router = useRouter();
  const id = router.query.id as string;
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
  if (missingPerson) {
    const pronoun =
      missingPerson.gender === "Male"
        ? "He"
        : missingPerson.gender === "Female"
        ? "She"
        : missingPerson.fullname;

    const dateInWords = format(
      new Date(missingPerson.lastSeenDate),
      "do MMM yyyy"
    );
    return (
      <Container component="main" maxWidth="md">
        {missingPerson && (
          <>
            <div
              style={{
                position: "fixed",
                bottom: "15px",
                right: 0,
              }}
            >
              {/*  <ReportSightingButton personId={missingPerson?.id} /> */}
            </div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyItems: "center",
              }}
            >
              <MissingPersonImage person={missingPerson} />
              <Typography
                sx={{
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
                component="div"
                color="primary"
              >
                {missingPerson?.fullname}
                {missingPerson?.nickname &&
                  `(${missingPerson?.nickname})`}
              </Typography>
              <AgeComplexionWrapper>
                <span>
                  <span style={{ fontWeight: 600 }}>
                    {t("search.age.label")}{" "}
                  </span>
                  <Typography color="primary" display="inline-flex">
                    {missingPerson?.age}
                  </Typography>
                </span>
                <span>
                  <span
                    style={{ fontWeight: 600, marginLeft: "8px" }}
                  >
                    {t("Gender: ")}{" "}
                  </span>
                  <Typography color="primary" display="inline-flex">
                    {missingPerson?.gender}
                  </Typography>
                </span>
                <span>
                  <span
                    style={{ fontWeight: 600, marginLeft: "8px" }}
                  >
                    {t("search.complexion.label")}{" "}
                  </span>
                  <Typography color="primary" display="inline-flex">
                    {missingPerson?.complexion}
                  </Typography>
                </span>
              </AgeComplexionWrapper>
              <span
                style={{
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                {t("Last Seen Wearing")}
              </span>
              <Typography
                sx={{
                  textAlign: "center",
                }}
                component="div"
                color="primary"
              >
                {missingPerson?.lastSeenWearing}
              </Typography>
              <Card
                sx={{
                  alignItems: "center",
                  width: "fit-content",
                  margin: "5px auto",
                  background: theme.palette.primary.light,
                  padding: "12px",
                }}
                elevation={0}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {pronoun +
                    " was last seen on " +
                    dateInWords +
                    " near " +
                    missingPerson?.lastSeenLocation?.address}
                </Typography>
              </Card>
            </Box>
          </>
        )}
      </Container>
    );
  } else {
    return (
      <Container component="main" maxWidth="md">
        <Typography textAlign="center">{t("NOT FOUND")}</Typography>
      </Container>
    );
  }
};

export default MissingCase;
