import * as React from "react";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

interface DarkModeSwitchProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "60%",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#FFD700" // Bright Yellow Sun Icon
        )}" d="M10 5.139a4.872 4.872 0 00-4.86 4.86A4.872 4.872 0 0010 14.86 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zM9.305 1.667V3.75h1.389V1.667h-1.39zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473z"/></svg>')`, // Sun Icon (☀️)
      },
      "& + .MuiSwitch-track": {
        backgroundColor: "lightgrey"
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "60%",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff" // White Moon Icon
      )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`, // Moon Icon (🌙)
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "lightgrey",
    borderRadius: 20 / 2,
  },
}));

export default function DarkModeSwitch({ isDarkMode, toggleDarkMode }: DarkModeSwitchProps) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <StyledSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />
        }
        label=""
      />
    </FormGroup>
  );
}
