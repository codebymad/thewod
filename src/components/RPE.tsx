import { Box, Slider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const rpeDescriptions: Record<number, string> = {
  1: "Barely trying. Honestly, did you even start?",
  2: "Easy breezy. Could do this while texting.",
  3: "Comfortable. You're warming up… mentally.",
  4: "Light effort. Heart rate says hi.",
  5: "Moderate. You're working, but still cute.",
  6: "Kinda tough. Sweat is thinking about showing up.",
  7: "Hard. You're questioning your life choices.",
  8: "Very hard. This is now a character-building moment.",
  9: "Extremely hard. You're speaking in grunts only.",
  10: "Max effort. You saw the universe for a second.",
};

const rpeColors: Record<number, string> = {
  1: "#4caf50",
  2: "#66bb6a",
  3: "#8bc34a",
  4: "#cddc39",
  5: "#ffeb3b",
  6: "#ffc107",
  7: "#ff9800",
  8: "#ff5722",
  9: "#f44336",
  10: "#b71c1c",
};

const StyledSlider = styled(Slider)({});

// ⭐ ADD PROPS HERE
interface RPEProps {
  value: number;
  onChange: (val: number) => void;
}

function RPE({ value, onChange }: RPEProps) {
  const rounded = Math.ceil(value);
  const color = rpeColors[rounded];
  const description = rpeDescriptions[rounded];

  return (
    <Box>
      <StyledSlider
        value={value}
        min={1}
        max={10}
        step={1}
        valueLabelDisplay="auto"
        onChange={(_, newValue) => onChange(newValue as number)}
        sx={{ color }}
        marks
      />

      <Typography
        variant="body2"
        sx={{ mt: 1, fontWeight: 500, color: "#666" }}
      >
        <strong>
          RPE {value} — {description}
        </strong>
      </Typography>
    </Box>
  );
}

export default RPE;
