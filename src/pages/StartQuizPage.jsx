import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";

function StartQuizPage(props) {
  const { quizData, setSelectedQuiz } = props;
  const { imgUrl, description, tabs } = quizData;
  const [startQuiz, setStartQuiz] = useState(false);
  const [qnId, setQnId] = useState(0);

  console.log(quizData.tabs[qnId]);

  const onNextHandler = () => {
    if (qnId < tabs.length - 1) {
      setQnId((prevId) => prevId + 1);
    } else {
      setQnId(-1);
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
        >
          {startQuiz && qnId !== -1 && (
            <>
              <Typography variant="h3">{tabs[qnId].question}</Typography>
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
          {!startQuiz && (
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
                <Button variant="contained" onClick={() => setStartQuiz(true)}>
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

export default StartQuizPage;
