import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import Home from "./Home";
import { RootState } from "../store";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "../utils/theme";

const Pages = () => {
  const isDarkMode = useSelector((state: RootState) => state.app.isDarkMode);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Header />
      <Home />
    </ThemeProvider>
  );
};

export default Pages;
