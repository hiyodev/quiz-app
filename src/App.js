import "./App.css";
import { useState, createContext } from "react";

import {
  AppBar,
  Typography,
  Button,
  Container,
  CssBaseline,
  Toolbar,
  Grid,
  Box,
} from "@mui/material";

import QuizCard from "./components/QuizCard";

export const QuizContext = createContext(null);

function App() {
  const [quizArray, setQuizArray] = useState([
    {
      id: 1,
      title: "JavaScript 101",
      description:
        "Test your JavaScript skills and add some other text that goes here",
    },
    {
      id: 2,
      title: "Web Development 101",
      description:
        "Test your Web Dev skills and add some other text that goes here",
    },
    {
      id: 3,
      title: "React Knowledge Check",
      description:
        "Test your React skills and add some other text that goes here",
    },
    {
      id: 4,
      title: "JavaScript 101",
      description:
        "Test your JavaScript skills and add some other text that goes here",
    },
    {
      id: 5,
      title: "Web Development 101",
      description:
        "Test your Web Dev skills and add some other text that goes here",
    },
    {
      id: 6,
      title: "React Knowledge Check",
      description:
        "Test your React skills and add some other text that goes here",
    },
  ]);

  const quizCards = quizArray.map((quiz) => {
    return (
      <Grid item key={quiz.id}>
        <QuizCard
          id={quiz.id}
          title={quiz.title}
          description={quiz.description}
        ></QuizCard>
      </Grid>
    );
  });

  return (
    <QuizContext.Provider value={{ quizArray, setQuizArray }}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h5">QuizApp</Typography>
        </Toolbar>
      </AppBar>

      <main>
        <Container maxWidth="sm">
          <Box mt={2} mb={2}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button variant="contained">Create Quiz</Button>
              </Grid>
              <Grid item>
                <Button variant="outlined">Edit</Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          justifyContent="center"
        >
          {quizCards}
        </Grid>
      </main>
    </QuizContext.Provider>
  );
}

export default App;
