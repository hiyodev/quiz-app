import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";

function StartQuizPage(props) {
  const { quizData, setSelectedQuiz } = props;
  const { imgUrl, description, tabs } = quizData;

  console.log(quizData);

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
          <Typography>There are {tabs.length} questions in total.</Typography>

          <Stack
            spacing={2}
            direction="row"
            justifyContent="space-between"
            mt={2}
          >
            <Button onClick={() => setSelectedQuiz({ started: false, id: 0 })}>
              Go Back
            </Button>
            <Button variant="contained">Start Quiz</Button>
          </Stack>
        </Box>
      </Container>
    </main>
  );
}

export default StartQuizPage;
