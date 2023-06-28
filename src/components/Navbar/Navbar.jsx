import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";
import ThemeToggleSwitch from "../Buttons/ThemeToggleSwitch";

function Navbar(props) {
  const { darkMode, setDarkMode, hideThemeToggle, quizTitle } = props;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" sx={{ flex: 1 }}>
          {quizTitle ? quizTitle + " Quiz" : "QuizApp"}
        </Typography>
        {!hideThemeToggle && (
          <ThemeToggleSwitch darkMode={darkMode} setDarkMode={setDarkMode} />
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
