import { Stack, Card, CardContent, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";

interface WorkoutSection {
  workoutheader: string;
  workoutdetails: string;
}

interface WorkoutSectionCardsProps {
  workoutdata: WorkoutSection[];
}

export default function WorkoutSectionCards({ workoutdata }: WorkoutSectionCardsProps) {
  return (
    <Stack spacing={2}>
      {workoutdata.map((section, index) => (
        <Card key={index} variant="outlined">
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              {section.workoutheader}
            </Typography>

            <Typography variant="body2">
             <ReactMarkdown>{section.workoutdetails}</ReactMarkdown>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
