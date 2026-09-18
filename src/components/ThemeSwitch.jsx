import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useState } from "react";
import "./ThemeSwitch.css";

export default function DarkModeToggle() {
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);

    document.body.classList.toggle("dark", checked);
    document.body.classList.toggle("light", !checked);
  };

  return (
    <DarkModeSwitch
      style={{ marginBottom: "2rem" }}
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={50}
    />
  );
}
