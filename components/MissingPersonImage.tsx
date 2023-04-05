import React from "react";
import { IconButton, Box, Switch, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../styles/color-context";
import { styled } from "@mui/material";
import Fab from "@mui/material/Fab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRouter } from "next/router";
import { Check } from "@mui/icons-material";
import Image from "next/image";
import { placeholderUrl } from "../utils/constants";
import sampleMissing from "../public/missing-person.webp";
import { TPerson } from "../models/missing_person.model";

interface IReportSightingButtonProps {
  person: TPerson;
}

const StyledImageWrapper = styled("div")({
  backgroundColor: "transparent",
  margin: "5px auto",
  position: "relative",
  //display: "block",
});

const ReportLink = styled("div")({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  paddingLeft: "15px",
  paddingTop: "10px",
  cursor: "pointer",
});

const FoundText = styled("div")({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  paddingLeft: "15px",
  paddingTop: "10px",
});

const ReportButton = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: "10px",
  right: "0",
  zIndex: "1000",
  height: "40px",

  "&:after": {
    content: '" "',
    display: "inline-block",
    //background: theme.palette.primary.main,
    //color: "red",
    width: "160px",
    height: 0,
    borderStyle: "solid",
    borderWidth: "20px 0 20px 10px",
    borderColor: `${theme.palette.primary.main} ${theme.palette.primary.main} ${theme.palette.primary.main} transparent`,
  },
}));

const FoundLabel = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: "10px",
  right: "0",
  zIndex: "1000",
  height: "40px",

  "&:after": {
    content: '" "',
    display: "inline-block",
    //background: theme.palette.primary.main,
    //color: "red",
    width: "120px",
    height: 0,
    borderStyle: "solid",
    borderWidth: "20px 0 20px 10px",
    borderColor: `green green green transparent`,
  },
}));

export default function MissingPersonImage({
  person: { id, image, found, fullname },
}: IReportSightingButtonProps) {
  const theme = useTheme();
  console.log(id, fullname, "idfsfs");
  const router = useRouter();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <StyledImageWrapper>
      {found ? (
        <FoundLabel>
          <FoundText>
            <Check sx={{ mr: 1, verticalAlign: "baseline" }} fontSize="small" />
            <Typography variant="body2">Found</Typography>
          </FoundText>
        </FoundLabel>
      ) : (
        <ReportButton>
          <ReportLink
            onClick={() => {
              router.push({
                pathname: "/report/sighting/",
                query: {
                  personId: id,
                },
              });
            }}
          >
            <VisibilityIcon
              sx={{ mr: 1, verticalAlign: "baseline" }}
              fontSize="small"
            />
            <Typography variant="body2">Report sighting</Typography>
          </ReportLink>
        </ReportButton>
      )}
      <Image
        width="300px"
        height="300px"
        src={image ? image : sampleMissing}
        alt={fullname}
        objectFit="cover"
        placeholder="blur"
        blurDataURL={placeholderUrl}
      />
    </StyledImageWrapper>
  );
}
