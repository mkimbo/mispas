import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
  ListItemText,
  ListItem,
  List,
  Switch,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "../i18n";
import { styled } from "@mui/material";
import { useAppContext, useAppDispatch } from "../context/GlobalContext";
import AllowNotifications from "../components/AllowNotifications";
import GetLocation from "../components/GetLocation";
import ToggleTheme from "../components/ToggleTheme";
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserSSR,
} from "next-firebase-auth";
import AppLayout from "../layout/AppLayout";

const SettingCard = styled(Card)({
  width: "100%",
  backgroundColor: "transparent",
  marginBottom: "15px",
}) as typeof Card;

const ThemeCard = styled("div")({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "center",
  justifyContent: "space-between",
});

const CardButtons = styled(CardActions)({
  display: "flex",
  justifyContent: "flex-end",
  padding: "0px 16px 16px",
}) as typeof CardActions;

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.primary.main,
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

function Settings() {
  const authUser = useAuthUser();
  const dispatch = useAppDispatch();
  const state = useAppContext();
  const t = useTranslation();
  return (
    <AppLayout email={authUser.email} signOut={authUser.signOut}>
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            {t("Settings")}
          </Typography>
          <SettingCard>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Location
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This will allow the system to filter alerts and only send you
                those near your current location. We will not disclose your
                location to any third party. This setting is required for the
                basic functionality of the app.
              </Typography>
            </CardContent>
            <CardButtons>
              <GetLocation />
            </CardButtons>
          </SettingCard>
          <SettingCard>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Notifications
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This will allow you to receive a notification whenever someone
                near your current location creates a missing person alert. We
                will not spam you with needless notifications of cases far from
                you. This setting is required for the basic functionality of the
                app.
              </Typography>
            </CardContent>
            <CardButtons>
              <AllowNotifications />
            </CardButtons>
          </SettingCard>
          <SettingCard>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {t("Language")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "Choose your prefered language. This will change the language of the app."
                )}
              </Typography>
            </CardContent>
            <CardButtons>
              <Button
                startIcon={state.langCode === "en" && <CheckIcon />}
                variant={state.langCode === "en" ? "contained" : "outlined"}
                size="large"
                onClick={() =>
                  dispatch({ type: "SET_LANG_CODE", payload: "en" })
                }
              >
                {t("English")}
              </Button>
              <Button
                startIcon={state.langCode === "sw" && <CheckIcon />}
                variant={state.langCode === "sw" ? "contained" : "outlined"}
                size="large"
                onClick={() =>
                  dispatch({ type: "SET_LANG_CODE", payload: "sw" })
                }
              >
                {t("Swahili")}
              </Button>
            </CardButtons>
          </SettingCard>
          <SettingCard>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {t("Theme")}
              </Typography>
              <ThemeCard>
                <Typography variant="body2" color="text.secondary">
                  {t("Switch between light and dark theme.")}
                </Typography>
                <ToggleTheme />
              </ThemeCard>
            </CardContent>
          </SettingCard>
        </Box>
      </Container>
    </AppLayout>
  );
}

export const getServerSideProps = withAuthUserSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req }) => {
  const token = await AuthUser.getIdToken();
  /*   const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: token || "unauthenticated",
    },
  });
  //const data: DataType = await response.json();
  if (!response.ok) {
    throw new Error(
      `Data fetching failed with status ${response.status}: ${JSON.stringify(
        data
      )}`
    );
  } */
  return {
    props: {},
  };
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Settings);
