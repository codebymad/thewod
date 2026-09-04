import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";
import { Box, type PaletteMode } from "@mui/material";
import AppRouter from "./router/AppRouter";
import TopBar from "./layouts/Topbar";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [mode, setMode] = useState<PaletteMode>("light");

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => setMode(media.matches ? "dark" : "light");
    listener();
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const theme = createTheme({ palette: { mode } });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <TopBar />

        <Box
          className="maincontent"
          sx={{
            px: { xs: 1, md: 0 }
          }}
        >
          <AppRouter />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
