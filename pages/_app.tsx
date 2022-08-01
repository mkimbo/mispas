import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../src/config/createEmotionCache";
import "../styles/globals.css";
import "../src/config/firebase.config";
import { AuthProvider } from "../src/hook/auth";
import {
  GlobalProvider,
  useAppDispatch,
} from "../src/context/GlobalContext";
import AuthStateChanged from "../src/layout/AuthStateChanged";
import AppLayout from "../src/layout/AppLayout";
import Dashboard from "../src/components/Dashboard";
import { deepmerge } from "@mui/utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  getDesignTokens,
  getThemedComponents,
  ThemeMode,
} from "../styles/theme";
import { ColorModeContext } from "../styles/color-context";
import { firebaseCloudMessaging } from "../src/utils/webPush";
import firebase from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
  } = props;
  const prefersDarkMode = useMediaQuery(
    "(prefers-color-scheme: dark)"
  );
  const [mode, setMode] = React.useState<ThemeMode>();

  React.useEffect(() => {
    setToken();
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
    function getMessage() {
      const messaging = getMessaging();
      console.log({ messaging });
      onMessage(messaging, (payload) => {
        console.log("Message received. ", payload);
        const body = JSON.parse(payload.notification.body);
        const title = JSON.parse(payload.notification.title);
        var options = {
          body,
        };
        //new self.registration.showNotification(title,options)
        new self.Notification(title, options);
        // ...
      });
    }
  });

  React.useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  let theme = React.useMemo(
    () =>
      createTheme(
        deepmerge(getDesignTokens(mode), getThemedComponents(mode))
      ),
    [mode]
  );

  theme = responsiveFontSizes(theme);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <AuthProvider>
            <GlobalProvider>
              <Dashboard>
                <AuthStateChanged>
                  <Component {...pageProps} />
                </AuthStateChanged>
              </Dashboard>
            </GlobalProvider>
          </AuthProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  );
}
