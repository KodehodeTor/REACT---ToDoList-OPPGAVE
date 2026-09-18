import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useState } from "react";

export const DarkModeToggle = () => {
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  return (
    <DarkModeSwitch
      style={{ marginBottom: "2rem" }}
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={50}
    />
  );
};

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Unable to find root element");
}
