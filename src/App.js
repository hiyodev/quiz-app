import {
  AppBar,
  Typography,
  Container,
  CssBaseline,
  Toolbar,
  Grid,
  Box,
} from "@mui/material";
import "./App.css";

import QuizCard from "./components/QuizCard";
import QuizModal from "./components/QuizModal";
import { useState, createContext, useEffect } from "react";

export const QuizContext = createContext(null);

function App() {
  const [quizArray, setQuizArray] = useState(
    JSON.parse(localStorage.getItem("quizData")) || []
  );

  useEffect(() => {
    localStorage.setItem("quizData", JSON.stringify(quizArray));
  }, [quizArray]);

  const quizCards = quizArray.map((quiz) => {
    return (
      <Grid item key={quiz.id}>
        <QuizCard
          id={quiz.id}
          imgUrl={quiz.imgUrl}
          imgAlt={quiz.imgAlt}
          title={quiz.title}
          description={quiz.description}
        ></QuizCard>
      </Grid>
    );
  });

  return (
    <QuizContext.Provider value={{ quizArray, setQuizArray }}>
      <CssBaseline />
      <AppBar position="relative" sx={{ bgcolor: "white" }}>
        <Toolbar>
          <Typography variant="h5" sx={{ color: "black" }}>
            QuizApp
          </Typography>
        </Toolbar>
      </AppBar>

      <main>
        <Container maxWidth="sm">
          <Box mt={2} mb={2}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <QuizModal
                  btnText="Create Quiz"
                  modalType="Create"
                  btnVariant="contained"
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          justifyContent="center"
          mb={1}
        >
          {quizCards}
        </Grid>
      </main>
    </QuizContext.Provider>
  );
}

export default App;
