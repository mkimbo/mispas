import {
  Box,
  Card,
  Container,
  Typography,
  useTheme,
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
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "../../src/i18n";
import { format } from "date-fns";
import MissingPersonImage from "../../src/components/MissingPersonImage";
interface IMissingPersonProps {
  missingPerson: TPerson;
}

export type TLocation = {
  lng: number;
  lat: number;
  address: string;
  geohash: string;
};

export type TGeoLoc = {
  lng: number;
  lat: number;
};

export type TPerson = {
  id: string;
  fullname: string;
  age: number;
  complexion: string;
  found?: boolean;
  gender: string;
  image: string;
  lastSeenDate: string;
  lastSeenWearing: string;
  nickname?: string;
  obNumber: string;
  phoneContact1: number;
  phoneContact2: number;
  policeStationName: string;
  relationToReported: string;
  reporterID?: string;
  lastSeenLocation: TLocation;
};

const AgeComplexionWrapper = styled("div")({
  width: "100%",
  display: "inline",
  textAlign: "center",
});

const InlineTypography = styled("div")({
  width: "100%",
  display: "inline",
  textAlign: "center",
});

const ColouredSpan = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const MissingPerson = ({ missingPerson }: IMissingPersonProps) => {
  const t = useTranslation();
  const router = useRouter();
  const theme = useTheme();

  if (router.isFallback) {
    return <div>loading</div>;
  } else {
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
                  <ColouredSpan>{missingPerson?.age}</ColouredSpan>
                </span>
                <span>
                  <span
                    style={{ fontWeight: 600, marginLeft: "8px" }}
                  >
                    {t("Gender: ")}{" "}
                  </span>
                  <ColouredSpan>{missingPerson?.gender}</ColouredSpan>
                </span>
                <span>
                  <span
                    style={{ fontWeight: 600, marginLeft: "8px" }}
                  >
                    {t("search.complexion.label")}{" "}
                  </span>
                  <ColouredSpan>
                    {missingPerson?.complexion}
                  </ColouredSpan>
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
              <Typography
                sx={{
                  textAlign: "center",
                }}
              >
                {t("The matter has been reported to the police.")}
              </Typography>
              <InlineTypography>
                <span>
                  {t("Anyone with information please call")}{" "}
                </span>
                &nbsp;
                <ColouredSpan>
                  {t(
                    "Missing Child Kenya Toll free line 0800-22-33-44"
                  )}
                </ColouredSpan>
              </InlineTypography>
              <InlineTypography>
                <ColouredSpan>{t("(NO CHARGE)")}</ColouredSpan>&nbsp;
                <span>{t("send a message to their")}</span>&nbsp;
                <ColouredSpan>
                  {t("WHATSAPP MESSAGE ONLY LINE 0704-447-417")}
                </ColouredSpan>
              </InlineTypography>
              <InlineTypography>
                <span>{t("or contact your nearest")}</span>&nbsp;
                <ColouredSpan>
                  {t("Police Station")}&nbsp;
                </ColouredSpan>
                <span>{t("or")}&nbsp;</span>
                <ColouredSpan>
                  {t(
                    "Directorate of Children's Services (DCS) Sub County Children's Office."
                  )}
                </ColouredSpan>
              </InlineTypography>
            </Box>
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
  }
};
export const getStaticPaths = async () => {
  const q = query(
    collection(db, "reported_missing"),
    where("found", "==", false)
  );

  const querySnapshot = await getDocs(q);
  const paths = querySnapshot.docs.map((doc) => ({
    params: {
      id: doc.id,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const missingDoc = doc(db, `reported_missing/${id}`);
  if (missingDoc) {
    const snapShot = await getDoc(missingDoc);
    return {
      props: {
        missingPerson: {
          id: snapShot.id,
          ...snapShot.data(),
        },
      },
    };
  } else {
    return {
      props: {
        missingPerson: null,
      },
    };
  }
};

export default MissingPerson;
