import { ThemeProvider } from "@mui/material/styles"
import { useMemo, useState } from "react"
import { buildAppTheme, type themeMode, getInitialThemeMode } from "./mytheme"
import CssBaseline from "@mui/material/CssBaseline"
import TopAppBar from "./layouts/TopAppBar"
import WodAppRouter from "./WodAppRouter"
import { Box } from "@mui/material"

function App() {
  const [mode, setMode] = useState<themeMode>(getInitialThemeMode());

  const theme = useMemo(() => buildAppTheme(mode), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box

        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
          backgroundImage:
            mode === 'dark'
              ? 'radial-gradient(circle at top, rgba(255, 107, 53, 0.18), transparent 38%), linear-gradient(100deg, #0d1117 0%, #111827 100%)'
              : 'radial-gradient(circle at top, rgba(255, 107, 53, 0.20), transparent 38%), linear-gradient(100deg, #f5f1eb 0%, #fefaf6 100%)',
        }}
      >



        <TopAppBar
          mode={mode}
          onToggleMode={() => setMode(prev => prev === 'dark' ? 'light' : 'dark')}
        />

        <WodAppRouter />
      </Box>


    </ThemeProvider>
  )
}

export default App