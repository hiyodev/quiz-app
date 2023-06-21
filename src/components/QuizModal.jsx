import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { useState, useContext } from "react";
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

  // For tabs
  const [value, setValue] = useState("1");
  const [questions, setQuestions] = useState([
    { id: 1, question: "What's your name?", answer: "hiyoshi" },
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { setQuizArray } = useContext(QuizContext);
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

  const qnTabs = questions.map((currQn) => {
    return (
      <Tab
        key={currQn.id}
        label={`Qn ${currQn.id}`}
        value={currQn.id.toString()}
      />
    );
  });

  // TODO: Each question form needs to be saved in a temporary storage when user changes tab
  // However, only when user clicks "SAVE" button then we actually save the questions from temp storage to user storage
  const qnTabPanels = questions.map((currQn) => {
    return (
      <TabPanel value={currQn.id.toString()} key={currQn.id}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="title-field"
              name="title-field"
              label="Question"
              variant="standard"
              sx={{ width: 300 }}
              inputProps={{ maxLength: 30 }}
              autoComplete="off"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description-field"
              name="description-field"
              label="Answer Explanation"
              multiline
              rows={3}
              fullWidth
            />
          </Grid>
        </Grid>
      </TabPanel>
    );
  });

  const addQuestionHandler = () => {
    let newId = 0;

    if (questions.length !== 0) {
      newId = questions[questions.length - 1].id + 1;
    }

    setQuestions([...questions, { id: newId, question: "", answer: "" }]);
    setValue(newId.toString());
  };

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

    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen} variant={btnVariant}>
        {btnText}
      </Button>
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
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Stack spacing={2} direction="row" mt display="flex">
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    variant="scrollable"
                  >
                    {qnTabs}
                  </TabList>
                  <Button onClick={addQuestionHandler}>Add</Button>
                </Stack>
              </Box>
              {qnTabPanels}
            </TabContext>
          </Box>
          <Stack
            spacing={2}
            direction="row"
            mt={4}
            display="flex"
            justifyContent="space-between"
          >
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
