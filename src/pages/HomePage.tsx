import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WorkoutSection from "../components/WorkoutSection";
import LogScore from "../components/LogScore";
import ScoreHistory from "../components/ScoreHistory";
import QuoteOfTheDay from "../components/Quote";
import { useEffect, useState } from "react";
import { getDailyWod } from "../libs/SupabaseEdge";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function HomePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [wod, setWod] = useState(null);
  const [apirespmetadata, setApirespmetadata] = useState(String);
  const [loading, setLoading] = useState(true);

  // Normalize date to midnight (fixes comparison issues)
  function normalize(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  // UI date formatting
  function formatUiDate(date: Date) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  // API date formatting (DDMMYYYY)
  function formatApiDate(date: Date) {
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = String(date.getFullYear());
    return `${dd}${mm}${yyyy}`;
  }

  // Navigation limits: today ± 3 days
  const today = normalize(new Date());
  const minDate = normalize(new Date(today));
  minDate.setDate(today.getDate() - 3);

  const maxDate = normalize(new Date(today));
  maxDate.setDate(today.getDate() + 3);

  const normalizedCurrent = normalize(currentDate);

  // Navigation handlers
  function goPrev() {
    const newDate = normalize(currentDate);
    newDate.setDate(newDate.getDate() - 1);

    if (newDate >= minDate) {
      setCurrentDate(newDate);
    }
  }

  function goNext() {
    const newDate = normalize(currentDate);
    newDate.setDate(newDate.getDate() + 1);

    if (newDate <= maxDate) {
      setCurrentDate(newDate);
    }
  }

  // Fetch WOD whenever currentDate changes
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const result = await getDailyWod(formatApiDate(currentDate));

        if (!result) {
          setWod(null);
          setApirespmetadata('');
          return;
        }

        setWod(result.data);
        setApirespmetadata(result.id);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [currentDate]);

  // Loading UI
  if (loading) {
    return (
      <Backdrop
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        })}
        open={loading}
      >
        <CircularProgress color="inherit" />
        <Typography variant="body2">Fetching…</Typography>
      </Backdrop>
    );
  }

  function getHeaderLabel(date: Date) {
    const today = normalize(new Date());
    const target = normalize(date);

    const diffDays = Math.floor(
      (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "Today's Workout";
    if (diffDays === 1) return "Tomorrow's Workout";
    if (diffDays === -1) return "Yesterday's Workout";

    // For other days, show formatted date
    return `${formatUiDate(date)} Workout`;
  }


  // Main UI
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "flex-start" },
          mb: { xs: 1, md: 3 },
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.5rem", md: "3rem" },
            textAlign: "center",
          }}
        >
          {getHeaderLabel(currentDate)}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "6fr 4fr" },
          gap: 3,
          minWidth: 0,      // ← add this
          overflow: 'hidden', // ← add this
        }}
      >
        <Box sx={{ minWidth: 0, overflow: 'hidden' }}>
          {/* Date Navigation */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              disabled={normalizedCurrent <= minDate}
              onClick={goPrev}
              sx={{
                minWidth: { xs: "auto" },
                "& .MuiButton-startIcon": { mr: { xs: 0, sm: 1 } },
                "& .MuiButton-label": { display: { xs: "none", sm: "inline" } },
                "& .MuiButton-text": { display: { xs: "none", sm: "inline" } },
              }}
            >
              <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                Prev
              </Box>
            </Button>

            <Typography variant="h6">{formatUiDate(currentDate)}</Typography>

            <Button
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
              disabled={normalizedCurrent >= maxDate}
              onClick={goNext}
              sx={{
                minWidth: { xs: "auto" },
                "& .MuiButton-endIcon": { ml: { xs: 0, sm: 1 } },
                "& .MuiButton-label": { display: { xs: "none", sm: "inline" } },
                "& .MuiButton-text": { display: { xs: "none", sm: "inline" } },
              }}
            >
              <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                Next
              </Box>
            </Button>
          </Box>

          <Paper
            sx={{
              p: 2,
              backgroundColor: "background.paper",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              overflow: 'hidden',   // ← add this
              minWidth: 0,          // ← add this
            }}
          >
            <WorkoutSection workout={wod} />
          </Paper>

          <Typography
            variant="caption"
            sx={{
              fontStyle: "italic",
              fontSize: "0.75rem",
              bgcolor: "action.hover",
              px: 1,
              py: 0.2,
              borderRadius: 1,
              display: "inline-block",
            }}
          >
            {apirespmetadata}
          </Typography>


        </Box>


        <Stack spacing={2} sx={{ pointerEvents: "none", opacity: 0.5 }}>
          <QuoteOfTheDay />
          <LogScore />
          <ScoreHistory />
        </Stack>
      </Box>
    </>
  );
}

export default HomePage;
