import { useState } from 'react';
import { Button, Paper, Typography, TextField, Box, Alert } from "@mui/material";
import RPE from "./RPE";

function LogScore() {
  const [isLogging, setIsLogging] = useState(false);
  const [score, setScore] = useState('');
  const [rpe, setRpe] = useState(1);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const handleSave = () => {
    try {
      // Example failure condition (you can replace with real DB logic)
      if (score.trim() === "") {
        throw new Error("Score cannot be empty");
      }

      console.log("Saving Score:", { score, rpe });
      setStatus("success");

    } catch (err) {
      console.error("Failed to save:", err);
      setStatus("error");
    }

    // After 1.5 seconds, reset UI
    setTimeout(() => {
      setIsLogging(false);
      setScore("");
      setRpe(1);
      setStatus(null);
    }, 1500);
  };

  return (
    <Paper sx={{ p: 2, backgroundColor: 'background.paper' }}>
      <Typography variant="h2" color="secondary">
        Rate & Log Score
      </Typography>

      {/* If success or error is showing → show ONLY the alert */}
      {status ? (
        <Alert severity={status} sx={{ mt: 2 }}>
          {status === "success"
            ? "Score saved successfully!"
            : "Failed to save score. Try again."}
        </Alert>
      ) : !isLogging ? (
        <Button
          variant="contained"
          sx={{ width: '100%', mt: 1 }}
          onClick={() => setIsLogging(true)}
        >
          Log Score
        </Button>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Your Notes"
            variant="outlined"
            fullWidth
            multiline
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />

          <RPE value={rpe} onChange={setRpe} />

          <Button
            variant="contained"
            color="primary"
            sx={{ width: '100%' }}
            onClick={handleSave}
          >
            Save Score
          </Button>
        </Box>
      )}
    </Paper>
  );
}

export default LogScore;
