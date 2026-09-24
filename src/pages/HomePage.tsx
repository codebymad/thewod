import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WorkoutSection from "../components/WorkoutSection";
import LogScore from "../components/LogScore";
import ScoreHistory from "../components/ScoreHistory";
import QuoteOfTheDay from "../components/Quote";
import { useEffect, useState } from "react";
import { getDailyWodDB_HOME } from "../libs/SupabaseEdge";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import type { WorkoutObject } from "../components/WorkoutSection";

// ── Raw shape returned by getDailyWodDB_HOME() ────────────────────────────────
interface ApiSection {
  section_name: string;
  section_content: string;
  section_notes?: string[];
}

interface ApiWorkout {
  wod_id: string;
  wod_name: string;
  tags: string[];
  content: ApiSection[];
}

interface ApiRecord {
  workout_date: string; // "YYYY-MM-DD"
  workout: ApiWorkout;
}

/** Map the API record into the shape WorkoutSection expects. */
function toWorkoutObject(api: ApiWorkout): WorkoutObject {
  return {
    wod_id: api.wod_id,
    wod_name: api.wod_name,
    sections: api.content,
    metadata: { tags: api.tags ?? [] },
  };
}

function HomePage() {
  const [records, setRecords] = useState<ApiRecord[]>([]);
  const [dateIndex, setDateIndex] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // ── Load all records once ──────────────────────────────────────────────────
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data: ApiRecord[] = await getDailyWodDB_HOME();
        if (!data || data.length === 0) {
          setRecords([]);
          return;
        }

        // Sort ascending so index 0 = earliest date
        const sorted = [...data].sort((a, b) =>
          a.workout_date.localeCompare(b.workout_date)
        );
        setRecords(sorted);

        // Land on the record closest to today (prefer today, else nearest past)
        const todayStr = todayIso();
        let best = sorted.findIndex((r) => r.workout_date >= todayStr);
        if (best === -1) best = sorted.length - 1;
        setDateIndex(best);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // ── Helpers ────────────────────────────────────────────────────────────────

  function todayIso(): string {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${mm}-${dd}`;
  }

  function parseLocalDate(iso: string): Date {
    const [y, m, day] = iso.split("-").map(Number);
    return new Date(y, m - 1, day);
  }

  function formatUiDate(iso: string): string {
    return parseLocalDate(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function getHeaderLabel(iso: string): string {
    const today = todayIso();
    if (iso === today) return "Today's Workout";
    const diff =
      (parseLocalDate(iso).getTime() - parseLocalDate(today).getTime()) /
      86_400_000;
    if (diff === 1) return "Tomorrow's Workout";
    if (diff === -1) return "Yesterday's Workout";
    return `${formatUiDate(iso)} Workout`;
  }

  // ── Navigation ─────────────────────────────────────────────────────────────
  const hasPrev = dateIndex > 0;
  const hasNext = dateIndex < records.length - 1;

  function goPrev() {
    if (hasPrev) setDateIndex((i) => i - 1);
  }

  function goNext() {
    if (hasNext) setDateIndex((i) => i + 1);
  }

  // ── Current record ─────────────────────────────────────────────────────────
  const current = records[dateIndex];
  const workout: WorkoutObject | null = current
    ? toWorkoutObject(current.workout)
    : null;

  // ── Loading UI ─────────────────────────────────────────────────────────────
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

  // ── Empty state ─────────────────────────────────────────────────────────────
  if (records.length === 0) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 6 }}>
        No workouts found.
      </Typography>
    );
  }

  // ── Main UI ─────────────────────────────────────────────────────────────────
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
          {current ? getHeaderLabel(current.workout_date) : ""}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "6fr 4fr" },
          gap: 3,
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        <Box sx={{ minWidth: 0, overflow: "hidden" }}>
          {/* ── Date Navigation ── */}
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
              disabled={!hasPrev}
              onClick={goPrev}
              sx={{
                minWidth: { xs: "auto" },
                "& .MuiButton-startIcon": { mr: { xs: 0, sm: 1 } },
              }}
            >
              <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                Prev
              </Box>
            </Button>

            <Typography variant="h6">
              {current ? formatUiDate(current.workout_date) : ""}
            </Typography>

            <Button
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
              disabled={!hasNext}
              onClick={goNext}
              sx={{
                minWidth: { xs: "auto" },
                "& .MuiButton-endIcon": { ml: { xs: 0, sm: 1 } },
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
              overflow: "hidden",
              minWidth: 0,
            }}
          >
            <WorkoutSection workout={workout} />
          </Paper>
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