import { ErrorOutlined } from "@mui/icons-material";
import { getIcon } from "./IconLoader";

function NotFoundPage() {
  const { errors: errorList } = errors;
  const randomError = errorList[Math.floor(Math.random() * errorList.length)];

  const IconComponent =
    getIcon(randomError.icon) || ErrorOutlined;

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <IconComponent style={{ fontSize: "4rem", marginBottom: "1rem" }} />
      <h1>{randomError.header}</h1>
      <p>{randomError.message}</p>
    </div>
  );
}

const errors = {
  "errors": [
    {
      "header": "404: Rest Day Activated",
      "message": "This page skipped leg day… and every other day.",
      "icon": "FitnessCenter"
    },
    {
      "header": "Page Failed the Rep",
      "message": "It tried to lift your request but couldn't complete the rep.",
      "icon": "Warning"
    },
    {
      "header": "Still Warming Up",
      "message": "This page might take forever… better head back before it cramps.",
      "icon": "AccessTime"
    },
    {
      "header": "Page Fatigued",
      "message": "It tapped out mid-workout. Coach says return to home.",
      "icon": "SelfImprovement"
    },
    {
      "header": "Zen Mode Engaged",
      "message": "Page not found — but your calm can be. Breathe and go back.",
      "icon": "Spa"
    },
    {
      "header": "Missed the Time Cap",
      "message": "This page didn't qualify. You still can — head home.",
      "icon": "TimerOff"
    },
    {
      "header": "Broken Form Detected",
      "message": "This link needs a spotter. Try another route.",
      "icon": "ReportProblem"
    },
    {
      "header": "Page Overheated",
      "message": "Too many burpees. It's lying on the floor now.",
      "icon": "Whatshot"
    },
    {
      "header": "Gone, Not Slow",
      "message": "This page left the gym. Find one that actually shows up.",
      "icon": "DirectionsRun"
    },
    {
      "header": "Lost Like a Gym Sock",
      "message": "We don't know where it went either. Let's regroup.",
      "icon": "SearchOff"
    },
    {
      "header": "No Rep… I meant no page",
      "message": "You might wanna try that again — with better form this time.",
      "icon": "PanTool"
    }
  ]
};

export default NotFoundPage;
