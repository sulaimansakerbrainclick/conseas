import { createTheme, PaletteColorOptions, ThemeProvider } from "@mui/material";
import useIsRtl from "../hooks/useIsRtl";

declare module "@mui/material" {
  interface ButtonPropsColorOverrides {
    white: true;
  }
}

declare module "@mui/material/styles" {
  interface PaletteOptions {
    white?: PaletteColorOptions;
  }
}

const getTheme = (isRtl: boolean) =>
  createTheme({
    palette: {
      primary: {
        main: "#6bb1fc",
        light: "#94c7fe",
        dark: "#50a0fb",
        contrastText: "#ffffff",
      },
      white: {
        main: "#ffffff",
        light: "#ffffff",
        dark: "#ffffff",
        contrastText: "#6bb1fc",
      },
    },
    components: {
      MuiFormControl: {
        styleOverrides: {
          root: {
            width: "100%",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { fontWeight: "500", textTransform: "capitalize", fontSize: "1rem" },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: { paddingTop: 0, paddingBottom: 0 },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: { paddingTop: 0, paddingBottom: 0 },
        },
      },
    },
  });

const MuiThemeProvider = ({ children }: any) => {
  const isRtl = useIsRtl();

  return <ThemeProvider theme={getTheme(isRtl)}>{children}</ThemeProvider>;
};

export default MuiThemeProvider;
