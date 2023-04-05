import { Card, CardActionArea, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { styled } from "@mui/system";
import Image from "next/image";
import sampleMissing from "../../../public/missing-person.webp";
import { useTranslation } from "../../../i18n";
import Link from "next/link";

function SearchHit({ hit }) {
  const t = useTranslation();
  const truncateText = (str: string, n: number, b?: boolean) => {
    if (str.length <= n) {
      return str;
    }
    const useWordBoundary = b || true;
    const subString = str.substr(0, n - 1); // the original check
    return useWordBoundary
      ? subString.substr(0, subString.lastIndexOf(" "))
      : subString;
  };

  const StyledCard = styled(Card)({
    backgroundColor: "transparent",
  }) as typeof Card;

  const StyledImageWrapper = styled("div")({
    display: "block",
    width: "100%",
    backgroundColor: "transparent",
  });

  const StyledContentWrapper = styled("div")({
    padding: "5px",
  });

  return (
    <StyledCard elevation={0} key={hit?.objectID}>
      <Link href={`/missing/${hit?.objectID}`}>
        <CardActionArea>
          <StyledImageWrapper>
            <Image
              src={hit?.image ? hit?.image : sampleMissing}
              alt={hit?.fullname}
              width="250px"
              height="200px"
            />
          </StyledImageWrapper>
          <StyledContentWrapper>
            <Typography
              color="primary"
              sx={{ fontWeight: 700 }}
              variant="subtitle1"
            >
              {hit?.fullname}
            </Typography>
            <Typography variant="body1" color="textPrimary">
              <span>
                <span style={{ fontWeight: 600 }}>
                  {t("search.age.label")}{" "}
                </span>
                12
              </span>{" "}
              <span>
                <span style={{ fontWeight: 600 }}>
                  {t("search.complexion.label")}{" "}
                </span>
                dark
              </span>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: "inline-flex",
                alignItems: "baseline",
                marginTop: "5px",
              }}
            >
              <span>
                <LocationOnIcon
                  sx={{ verticalAlign: "middle" }}
                  fontSize="small"
                />
              </span>{" "}
              <span>
                {truncateText(
                  "Fairfield Academy - Kiembeni, Kiembeni Road, Kiembeni, Mombasa",
                  35
                )}
              </span>
            </Typography>
          </StyledContentWrapper>
        </CardActionArea>
      </Link>
    </StyledCard>
  );
}

export default SearchHit;
