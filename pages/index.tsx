import { Button, Typography, Card } from "@mui/material";
import missingBg from "../src/assets/missing-bg.jpg";
import {
  useAppContext,
  useAppDispatch,
} from "../src/context/GlobalContext";

import { useTranslation } from "../src/i18n";
import styled from "@emotion/styled";
import {
  ArrowForward,
  BarChart,
  CrisisAlert,
  PersonPinCircle,
  PersonSearch,
} from "@mui/icons-material";
import { useMemo } from "react";
import { useRouter } from "next/router";
export default function Home() {
  const t = useTranslation();
  const router = useRouter();

  const HeroCard = styled(Card)({
    textAlign: "left",
    height: "300px",
    backgroundImage: "url(" + missingBg.src + ")",
    width: "100%",
    backgroundSize: "cover",
    position: "relative",
  }) as typeof Card;
  const HeroContent = styled("div")({
    padding: "10px",
    position: "absolute",
    bottom: 0,
    left: 0,
  });
  const LinkSection = styled("div")({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 250px)",
    gap: "10px",
    justifyContent: "space-around",
    width: "100%",
    marginTop: "20px",
  });
  const LinkCard = styled(Card)({
    background: "transparent",
    textAlign: "center",
    width: "210px",
    height: "160px",
    padding: "10px",
    margin: "auto",
  }) as typeof Card;

  const GridItem = styled("div")({
    width: "250px",
    textAlign: "center",
  });
  const data = useMemo(
    () => [
      {
        title: t("homepage.linkCard.reportCaseTitle"),
        description: t("homepage.linkCard.reportCaseText"),
        link: "/report/missing",
        icon: (
          <CrisisAlert
            color="primary"
            sx={{ height: "60px", width: "60px" }}
          />
        ),
      },
      {
        title: t("homepage.linkCard.missingPersonsTitle"),
        description: t("homepage.linkCard.missingPersonsText"),
        link: "/missing",
        icon: (
          <PersonPinCircle
            color="primary"
            sx={{ height: "60px", width: "60px" }}
          />
        ),
      },
      {
        title: t("homepage.linkCard.searchTitle"),
        description: t("homepage.linkCard.searchText"),
        link: "/search",
        icon: (
          <PersonSearch
            color="primary"
            sx={{ height: "60px", width: "60px" }}
          />
        ),
      },
      {
        title: t("homepage.linkCard.statisticsTitle"),
        description: t("homepage.linkCard.statisticsText"),
        link: "/statistics",
        icon: (
          <BarChart
            color="primary"
            sx={{ height: "60px", width: "60px" }}
          />
        ),
      },
    ],
    []
  );

  return (
    <div>
      <HeroCard>
        <HeroContent>
          <Typography variant="h2" sx={{ color: "#fff" }}>
            {t("MISPAS")}
          </Typography>
          <Typography variant="h4" sx={{ color: "#fff" }}>
            {t("Missing Person Alert System")}
          </Typography>
          <Button
            sx={{ textTransform: "none" }}
            variant="outlined"
            onClick={() => router.push("/about")}
            endIcon={<ArrowForward />}
          >
            {t("homepage.hero.aboutButton")}
          </Button>
        </HeroContent>
      </HeroCard>
      <LinkSection>
        {data.map((item) => (
          <GridItem key={item.link}>
            <LinkCard elevation={0}>
              <Typography
                component="div"
                sx={{ textAlign: "center" }}
                gutterBottom
              >
                {item.icon}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {item.description}
              </Typography>
              <Button
                size="small"
                variant="text"
                sx={{ textTransform: "none" }}
                endIcon={<ArrowForward />}
                onClick={() => router.push(item.link)}
              >
                {item.title}
              </Button>
            </LinkCard>
          </GridItem>
        ))}
      </LinkSection>
    </div>
  );
}
