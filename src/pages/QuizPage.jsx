import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import AnswerList from "../components/Answers/AnswerList";

function QuizPage(props) {
  const { quizData, setSelectedQuiz } = props;
  const { imgUrl, description, tabs } = quizData;

  // 3 states: stop, start, end
  const [quizStatus, setQuizStatus] = useState("stop");
  const [qnId, setQnId] = useState(0);

  const [userAnswers, setUserAnswers] = useState(() =>
    JSON.parse(JSON.stringify([tabs[qnId].answers[tabs[qnId].answers.type]]))
  );

  const onNextHandler = () => {
    if (qnId < tabs.length - 1) {
      const key = tabs[qnId + 1].answers.type;
      setUserAnswers((currAns) => {
        return [
          ...currAns,
          JSON.parse(JSON.stringify(tabs[qnId + 1].answers[key])),
        ];
      });
      setQnId((prevId) => prevId + 1);
    } else {
      console.log("Quiz ended");
      setQnId(0);
      setQuizStatus("end");
    }
  };

  return (
    <main>
      <Container maxWidth="md">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="90vh"
          flexDirection="column"
          textAlign="center"
        >
          {quizStatus === "end" && (
            <>
              <h1>End Of Quiz</h1>
            </>
          )}
          {quizStatus === "start" && (
            <>
              <Typography color="text.secondary" gutterBottom>
                {`${qnId + 1} / ${tabs.length} Questions`}
              </Typography>
              <Typography variant="h3" gutterBottom>
                {tabs[qnId].question}
              </Typography>
              <Typography variant="h6" gutterBottom color="text.secondary">
                {tabs[qnId].explanation}
              </Typography>
              <AnswerList
                qnId={qnId}
                answers={tabs[qnId].answers}
                userAnswers={userAnswers}
                setUserAnswers={setUserAnswers}
              />

              <Stack
                spacing={2}
                direction="row"
                justifyContent="space-between"
                mt={2}
              >
                <Button
                  onClick={() => setSelectedQuiz({ started: false, id: 0 })}
                >
                  Quit
                </Button>
                <Button variant="contained" onClick={onNextHandler}>
                  Next
                </Button>
              </Stack>
            </>
          )}
          {quizStatus === "stop" && (
            <>
              <Typography variant="h4" gutterBottom>
                Are you ready?
              </Typography>

              {imgUrl && (
                <Box
                  component="img"
                  src={imgUrl}
                  sx={{ marginBottom: 2 }}
                  maxWidth="75%"
                />
              )}
              <Typography color="text.secondary" gutterBottom>
                {description !== undefined && description}
              </Typography>
              <Typography>
                There are {tabs.length} questions in total.
              </Typography>
              <Stack
                spacing={2}
                direction="row"
                justifyContent="space-between"
                mt={2}
              >
                <Button
                  onClick={() => setSelectedQuiz({ started: false, id: 0 })}
                >
                  Go Back
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setQuizStatus("start")}
                >
                  Start Quiz
                </Button>
              </Stack>
            </>
          )}
        </Box>
      </Container>
    </main>
  );
}

export default QuizPage;
