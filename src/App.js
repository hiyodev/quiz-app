import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { useState, createContext, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import HomePage from "./pages/HomePage";

export const QuizContext = createContext(null);

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [quizArray, setQuizArray] = useState(
    JSON.parse(localStorage.getItem("quizData")) || []
  );

  useEffect(() => {
    localStorage.setItem("quizData", JSON.stringify(quizArray));
  }, [quizArray]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <QuizContext.Provider value={{ quizArray, setQuizArray }}>
        <CssBaseline />
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <HomePage />
      </QuizContext.Provider>
    </ThemeProvider>
  );
}

export default App;
