import { Box, Card, Container, Typography, useTheme } from "@mui/material";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserSSR,
  AuthAction,
} from "next-firebase-auth";
import AppLayout from "../../layout/AppLayout";
import getAbsoluteURL from "../../utils/getAbsoluteURL";
import { fetcher } from "../../utils/axios";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "../../i18n";
import { format } from "date-fns";
import MissingPersonImage from "../../components/MissingPersonImage";
import SEO from "../../components/SEO";

interface IMissingPersonProps {
  missingPerson: any;
}

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
  const auth = useAuthUser();
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
      const description =
        pronoun +
        " was reported missing on " +
        dateInWords +
        " near " +
        missingPerson?.lastSeenLocation?.address;
      return (
        <AppLayout email={auth.email} signOut={auth.signOut}>
          <Container component="main" maxWidth="md">
            {missingPerson && (
              <SEO
                title={missingPerson.fullname}
                description={description}
                slug={`/case/${missingPerson.id}`}
                images={[missingPerson.image]}
                missingPerson={missingPerson}
              />
            )}
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
                  {missingPerson?.nickname && `(${missingPerson?.nickname})`}
                </Typography>
                <AgeComplexionWrapper>
                  <span>
                    <span style={{ fontWeight: 600 }}>
                      {t("search.age.label")}{" "}
                    </span>
                    <ColouredSpan>{missingPerson?.age}</ColouredSpan>
                  </span>
                  <span>
                    <span style={{ fontWeight: 600, marginLeft: "8px" }}>
                      {t("Gender: ")}{" "}
                    </span>
                    <ColouredSpan>{missingPerson?.gender}</ColouredSpan>
                  </span>
                  <span>
                    <span style={{ fontWeight: 600, marginLeft: "8px" }}>
                      {t("search.complexion.label")}{" "}
                    </span>
                    <ColouredSpan>{missingPerson?.complexion}</ColouredSpan>
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
                    {description}
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
                  <span>{t("Anyone with information please call")} </span>
                  &nbsp;
                  <ColouredSpan>
                    {t("Missing Child Kenya Toll free line 0800-22-33-44")}
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
                  <ColouredSpan>{t("Police Station")}&nbsp;</ColouredSpan>
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
        </AppLayout>
      );
    } else {
      return (
        <AppLayout email={auth.email} signOut={auth.signOut}>
          <Container component="main" maxWidth="md">
            <Typography textAlign="center">{t("NOT FOUND")}</Typography>
          </Container>
        </AppLayout>
      );
    }
  }
};

export const getServerSideProps = withAuthUserSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req, params }) => {
  const token = await AuthUser.getIdToken();
  const { id } = params;
  const endpoint = getAbsoluteURL(`/api/missing/${id}`, req);
  const response = await fetcher(endpoint, token);
  const data: any = await response.json();
  return {
    props: { missingPerson: data },
  };
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(MissingPerson);
