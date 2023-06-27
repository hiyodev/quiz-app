import { Box, Container, Grid } from "@mui/material";
import QuizModal from "../components/Quiz/QuizModal";
import QuizCard from "../components/Quiz/QuizCard";
import { QuizContext } from "../App";
import { useContext } from "react";

function HomePage(props) {
  const { quizArray, setQuizArray } = useContext(QuizContext);

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
  );
}

export default HomePage;
