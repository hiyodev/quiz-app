import { CssBaseline, Fade } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { useState, createContext, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";

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
  const [selectedQuiz, setSelectedQuiz] = useState({ started: false, id: 0 });

  const [quizArray, setQuizArray] = useState(
    () => JSON.parse(localStorage.getItem("quizData")) || []
  );

  useEffect(() => {
    localStorage.setItem("quizData", JSON.stringify(quizArray));
  }, [quizArray]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <QuizContext.Provider value={{ quizArray, setQuizArray }}>
        <CssBaseline />
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          hideThemeToggle={selectedQuiz.started}
          quizTitle={selectedQuiz.started && quizArray[selectedQuiz.id].title}
        />
        {selectedQuiz.started ? (
          <Fade in={selectedQuiz.started} style={{ transitionDelay: "50ms" }}>
            <div>
              <QuizPage
                quizData={quizArray[selectedQuiz.id]}
                setSelectedQuiz={setSelectedQuiz}
              />
            </div>
          </Fade>
        ) : (
          <HomePage setSelectedQuiz={setSelectedQuiz} />
        )}
      </QuizContext.Provider>
    </ThemeProvider>
  );
}

export default App;
