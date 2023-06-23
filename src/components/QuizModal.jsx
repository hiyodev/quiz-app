import {
  Grid,
  Stack,
  Typography,
  TextField,
  Modal,
  Button,
  Box,
} from "@mui/material";

import { useState, useContext } from "react";
import { QuizContext } from "../App";
import QuestionTabs from "./Tabs/QuestionTabs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// NOTE: Use this only for
// 1. Creating quizzes
// 2. Editing Quizzes
// 3. Opening Quizzes

export default function QuizModal(props) {
  const {
    id,
    btnVariant,
    btnText,
    imgUrl,
    imgAlt,
    modalTitle,
    title,
    description,
  } = props;

  const { quizArray, setQuizArray } = useContext(QuizContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const inputTitle = data.get("title-field");
    const imageUrl = data.get("imgurl-field");
    const imageAlt = data.get("imgalt-field");
    const inputDescription = data.get("description-field");

    setQuizArray((quizArray) => {
      if (btnText === "Edit")
        return quizArray.map((currQuiz) => {
          if (currQuiz.id === id) {
            return {
              ...currQuiz,
              imgUrl: imageUrl,
              imgAlt: imageAlt,
              title: inputTitle,
              description: inputDescription,
            };
          }

          return currQuiz;
        });
      else if (btnText === "Create Quiz") {
        let newId = 0;

        if (quizArray.length !== 0) {
          newId = quizArray[quizArray.length - 1].id + 1;
        }

        return [
          ...quizArray,
          {
            id: newId,
            imgUrl: imageUrl,
            imgAlt: imageAlt,
            title: inputTitle,
            description: inputDescription,
          },
        ];
      }
    });

    handleModalClose();
  };

  return (
    <div>
      <Button onClick={handleModalOpen} variant={btnVariant}>
        {btnText}
      </Button>
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
      >
        <Box component="form" sx={style} onSubmit={onSubmitHandler}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            sx={{ mb: 4 }}
            gutterBottom
          >
            {modalTitle}
            <b> {title} </b>
            {"Quiz"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="title-field"
                name="title-field"
                label="Title"
                variant="outlined"
                value={title}
                sx={{ width: 300 }}
                inputProps={{ maxLength: 30 }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="imgurl-field"
                name="imgurl-field"
                label="Image URL"
                variant="outlined"
                value={imgUrl}
                sx={{ width: 370 }}
              />{" "}
              <TextField
                id="imgalt-field"
                name="imgalt-field"
                label="Image Alt"
                variant="outlined"
                value={imgAlt}
                sx={{ width: 155 }}
                inputProps={{ maxLength: 14 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description-field"
                name="description-field"
                label="Description"
                multiline
                rows={3}
                value={description}
                fullWidth
              />
            </Grid>
          </Grid>
          <QuestionTabs></QuestionTabs>
          <Stack
            spacing={2}
            direction="row"
            mt={4}
            display="flex"
            justifyContent="space-between"
          >
            <Button variant="outlined" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
