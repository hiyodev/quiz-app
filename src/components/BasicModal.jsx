import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Grid, Stack } from "@mui/material";
import { useState, useContext } from "react";

import { QuizContext } from "../App";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { quizArray, setQuizArray } = useContext(QuizContext);
  const { id, buttonText, modalTitle, modalDescription } = props;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    setQuizArray((quizArray) => {
      return quizArray.map((currQuiz) => {
        if (currQuiz.id === id) {
          return {
            ...currQuiz,
            title: data.get("title-field"),
            description: data.get("description-field"),
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
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} onSubmit={onSubmitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="title-field"
                name="title-field"
                label="Title"
                variant="outlined"
                defaultValue={modalTitle}
                sx={{ width: 300 }}
                inputProps={{ maxLength: 30 }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description-field"
                name="description-field"
                label="Description"
                required
                multiline
                rows={3}
                defaultValue={modalDescription}
                sx={{ width: 300 }}
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
