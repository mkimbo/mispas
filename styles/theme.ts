import {
  amber,
  deepOrange,
  grey,
  blue,
  common,
} from "@mui/material/colors";
const palette = {
  light: {
    primary: {
      main: "#fc7914",
      light: "rgba(252, 121, 20, 0.4)",
      dark: "#ff6f00",
    },
  },
  dark: {
    primary: {
      main: "#fc7914",
      light: "rgba(252, 121, 20, 0.4)",
      dark: "#ff6f00",
    },
  },
};

export type ThemeMode = "light" | "dark";

export const getDesignTokens = (mode: ThemeMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: palette.light.primary.main,
            light: palette.light.primary.light,
            dark: palette.light.primary.dark,
          },

          divider: "transparent",
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          primary: {
            main: palette.dark.primary.main,
            light: palette.dark.primary.light,
            dark: palette.dark.primary.dark,
          },
          divider: "transparent",
          background: {
            //default: palette.dark.primary.dark,
            paper: palette.dark.primary.dark,
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
  typography: {
    fontFamily: [
      "Oswald",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    body1: {
      fontFamily: "Poppins, Arial, sans-serif",
    },
  },
});

export const getThemedComponents = (mode: ThemeMode) => ({
  components: {
    /*  ...(mode === "light"
      ? {
          MuiAppBar: {
            styleOverrides: {
              colorPrimary: {
                backgroundColor: grey[800],
              },
            },
          },
          MuiLink: {
            variant: "h3",
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                color: common.white,
                fontFamily:
                  "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                fontSize: 20,
                borderWidth: 2,
                "&:hover": {
                  borderWidth: 2,
                },
              },
            },
            variants: [
              {
                props: { variant: "contained" },
                style: {
                  fontFamily:
                    "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                },
              },
              {
                props: { variant: "outlined" },
                style: {
                  color: palette.light.primary.main,
                },
              },
              {
                props: { variant: "primary", color: "primary" },
                style: {
                  border: "4px dashed blue",
                },
              },
            ],
          },
          MuiList: {
            styleOverrides: {
              root: {},
            },
          },
          MuiMenuItem: {
            styleOverrides: {
              root: {
                color: common.white,
                alignItems: "stretch",
                fontFamily:
                  "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
              },
            },
          },
          MuiAccordion: {
            styleOverrides: {
              root: {
                color: common.white,
                fontFamily:
                  "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
              },
            },
          },
        }
      : {
          MuiAppBar: {
            styleOverrides: {
              colorPrimary: {
                backgroundColor: blue[800],
              },
            },
          },
        }), */
  },
});
