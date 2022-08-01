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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import sampleMissing from "../../public/missing-person.webp";
import { useTranslation } from "../../src/i18n";

interface MissingPerson {}

export type TLastSighting = {
  lng: number;
  lat: number;
  address: string;
};

export type TGeoLoc = {
  lng: number;
  lat: number;
};

type Person = {
  fullname: string;
  age: number;
  complexion: string;
  found: boolean;
  gender: string;
  hairColor: string;
  image: string;
  lastSeen: TLastSighting;
  lastWearing: string;
  nickname: string;
  obNumber: string;
  phoneContact1: number;
  phoneContact2: number;
  policeStationName: string;
  relationToReported: string;
  reporterID: string;
  sightings: TLastSighting[];
  _geoloc: TGeoLoc;
};
const StyledImageWrapper = styled("div")({
  //display: "block",
  //border: "1px solid transparent",
  backgroundColor: "transparent",
  margin: "5px auto",
  //borderRadius: "10px",
}) as typeof Typography;

const AgeComplexionWrapper = styled("div")({
  display: "inline-flex",
  alignItems: "center",
  width: "fit-content",
  margin: "0 auto",
});

const MissingPerson = (props) => {
  const t = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const { query } = router;
  /*const [missingPerson, setMissingPerson] = useState<Person | null>(
    null
  );
  useEffect(() => {
    async function fetchData() {
      const { id } = query;
      if (id) {
        const res = await axios.get(`/api/missing/${id}`);
        setMissingPerson(res.data);
      }
    }
    fetchData();
  }, [router]); */
  const { missingPerson } = props;
  if (router.isFallback) {
    return <div>loading</div>;
  } else {
    if (missingPerson) {
      return (
        <Container component="main" maxWidth="md">
          {missingPerson && (
            <Box
              sx={{
                //marginTop: 8,
                display: "flex",
                flexDirection: "column",
                justifyItems: "center",
              }}
            >
              <StyledImageWrapper>
                <Image
                  width="300px"
                  height="300px"
                  src={missingPerson?.image}
                  alt={missingPerson?.fullname}
                  objectFit="cover"
                />
              </StyledImageWrapper>
              <Typography
                sx={{ textAlign: "center" }}
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
                </span>{" "}
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
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "fit-content",
                  margin: "5px auto",
                  background: theme.palette.primary.light,
                  padding: "12px",
                  //border: "1px solid " + theme.palette.primary.light,
                  //borderColor: theme.palette.primary.main,
                }}
                elevation={0}
              >
                <LocationOnIcon color="primary" />{" "}
                <Typography>
                  Last Seen: {missingPerson?.lastSeenDate}
                </Typography>
              </Card>
              <Typography textAlign="center">
                {/* {missingPerson?.lastWearing} */}
                The RGBA color space is a color space that includes an
                extra channel (alpha channel) for representing the
                transparency information of an image. An RGBA color is
                composed of four channels,
              </Typography>
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
        missingPerson: snapShot.data(),
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
