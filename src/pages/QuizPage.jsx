import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import AnswerList from "../components/Answers/AnswerList";

function QuizPage(props) {
  const { quizData, setSelectedQuiz } = props;
  const { imgUrl, description, tabs } = quizData;

  // 4 states: stop, start, end, review
  const [quizStatus, setQuizStatus] = useState("stop");
  const [quizScore, setQuizScore] = useState(0);
  const [qnId, setQnId] = useState(0);

  const [userAnswers, setUserAnswers] = useState(() =>
    JSON.parse(JSON.stringify([tabs[qnId].answers[tabs[qnId].answers.type]]))
  );

  const onNextHandler = () => {
    if (qnId < tabs.length - 1) {
      const key = tabs[qnId + 1].answers.type;

      if (quizStatus !== "review")
        setUserAnswers((currAns) => {
          return [
            ...currAns,
            JSON.parse(JSON.stringify(tabs[qnId + 1].answers[key])),
          ];
        });
      setQnId((prevId) => prevId + 1);
    } else {
      setQnId(0);
      setQuizStatus("end");

      if (quizStatus === "review") return;

      let totalScore = 0;
      let qnScore = 0;

      // Compute total score
      for (let i = 0; i < userAnswers.length; ++i) {
        let correctAns = 0;

        for (let j = 0; j < userAnswers[i].length; ++j) {
          if ("answer" in userAnswers[i][j]) {
            if (userAnswers[i][j].answer) ++correctAns;

            // It's checkbox or radio answer
            if (
              userAnswers[i][j].answer &&
              userAnswers[i][j].answer === userAnswers[i][j].selected
            ) {
              // Correct answer selected
              ++qnScore;
            } else if (
              !userAnswers[i][j].answer &&
              userAnswers[i][j].selected
            ) {
              --qnScore;
            }
          } else {
            if (correctAns === 0) correctAns = 1;
            // It's a text answer
            if (
              userAnswers[i][j].value.toLowerCase() ===
              userAnswers[i][0].userAns.toLowerCase()
            ) {
              ++qnScore;
              break;
            }
          }
        }

        if (qnScore < 0) qnScore = 0;

        totalScore += qnScore / correctAns;
        qnScore = 0;
      }

      setQuizScore(+((totalScore / userAnswers.length) * 100).toFixed(2));
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
              <Typography variant="h4" gutterBottom>
                Quiz Results
              </Typography>
              <Typography variant="h5" gutterBottom>
                Total Score: {quizScore} / 100
              </Typography>

              <Typography color="text.secondary" gutterBottom>
                {quizScore < 50 && "Ooof... Better luck next time!"}
                {quizScore > 50 && quizScore < 75 && "Good job!"}
                {quizScore >= 75 &&
                  quizScore !== 100 &&
                  "Damn! You're amazing!"}
                {quizScore === 100 && "You cheated, didn't you?"}
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
                  Exit
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setQuizStatus("review")}
                >
                  Review
                </Button>
              </Stack>
            </>
          )}
          {(quizStatus === "start" || quizStatus === "review") && (
            <>
              <Typography color="text.secondary" gutterBottom>
                {`${qnId + 1} / ${tabs.length} Questions`}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {tabs[qnId].question}
              </Typography>
              <Typography gutterBottom color="text.secondary">
                {tabs[qnId].explanation}
              </Typography>
              <AnswerList
                qnId={qnId}
                answers={tabs[qnId].answers}
                userAnswers={userAnswers}
                setUserAnswers={setUserAnswers}
                reviewMode={quizStatus === "review"}
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
                  {qnId + 1 === tabs.length ? "Finish" : "Next"}
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
