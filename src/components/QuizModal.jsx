import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Grid, Stack, Typography } from "@mui/material";
import { useState, useContext, useRef } from "react";

import { QuizContext } from "../App";

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
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { quizArray, setQuizArray } = useContext(QuizContext);
  const { id, buttonText, imgUrl, imgAlt, title, description } = props;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const inputTitle = data.get("title-field");
    const inputDescription = data.get("description-field");
    const imageUrl = data.get("imgurl-field");
    const imageAlt = data.get("imgalt-field");

    setQuizArray((quizArray) => {
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
    });

    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>{buttonText}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box component="form" sx={style} onSubmit={onSubmitHandler}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            sx={{ mb: 4 }}
            gutterBottom
          >
            {"Editing"}
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
                defaultValue={title}
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
                defaultValue={imgUrl}
                sx={{ width: 370 }}
              />{" "}
              <TextField
                id="imgalt-field"
                name="imgalt-field"
                label="Image Alt"
                variant="outlined"
                defaultValue={imgAlt}
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
                defaultValue={description}
                fullWidth
              />
            </Grid>
          </Grid>
          <Stack spacing={2} direction="row" mt>
            <Button variant="outlined" onClick={handleClose}>
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
