import React from "react";
import { Box, Container, Typography } from "@mui/material";
import {
  where,
  getDocs,
  query,
  collection,
} from "firebase/firestore";
import { db } from "../../src/utils/firebase";
import { useTranslation } from "../../src/i18n";
import { styled } from "@mui/material";
import Image from "next/image";
import axios from "axios";
import MissingCard from "../../src/components/missing/MissingCard";

const MissingPeople = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, 250px)",
  gap: "10px",
  justifyContent: "center",
  width: "100%",
});

function Missing(props) {
  const { missingPeople } = props;
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
        <h6>Missing people</h6>
        <MissingPeople>
          {missingPeople.map((missingPerson) => {
            return (
              <MissingCard
                key={missingPerson.id}
                item={missingPerson}
              />
            );
          })}
        </MissingPeople>
      </Box>
    </Container>
  );
}

export default Missing;

export const getStaticProps = async () => {
  const q = query(
    collection(db, "reported_missing"),
    where("found", "==", false)
  );

  const querySnapshot = await getDocs(q);
  const missingPeople = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return {
    props: { missingPeople },
    revalidate: 10,
  };
};
