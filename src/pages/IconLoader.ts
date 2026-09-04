import * as Icons from "@mui/icons-material";

export function getIcon(name: string) {
  return (Icons as Record<string, React.ElementType>)[name];
}
