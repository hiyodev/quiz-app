import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Grid, Stack, Tab, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

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
  const { quizArray, setQuizArray } = useContext(QuizContext);
  const [open, setOpen] = useState(false);

  // For tab-switching
  const [value, setValue] = useState("1");

  // Temporary store question data
  const [qnFormData, setQnFormData] = useState([
    {
      id: 1,
      question: "",
      explanation: "",
      answerType: "text",
      checkBoxAnswers: [],
      radioAnswers: [],
      textAnswers: [],
      correctAnswer: "",
    },
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event, newValue) => {
    console.log(qnFormData);
    setValue(newValue);
  };

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

  const qnTabs = qnFormData.map((currQn) => {
    return (
      <Tab
        key={currQn.id}
        label={`Qn ${currQn.id}`}
        value={currQn.id.toString()}
      />
    );
  });

  const onQnFormDataChange = (key, index, value) => {
    setQnFormData((prevData) => {
      prevData[index][key] = value;
      return [...prevData];
    });

    console.log("form updated");
  };

  // TODO: Each question form needs to be saved in a temporary storage when user changes tab
  // However, only when user clicks "SAVE" button then we actually save the questions from temp storage to user storage
  const qnTabPanels = qnFormData.map((currQn, index) => {
    return (
      <TabPanel value={currQn.id.toString()} key={currQn.id}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="qns-field"
              name="qns-field"
              label="Question Title"
              variant="standard"
              autoComplete="off"
              value={currQn.question}
              onChange={(e) =>
                onQnFormDataChange("question", index, e.target.value)
              }
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="qns-explanation-field"
              name="qns-explanation-field"
              label="Additional Question Explanation / Examples / Hints goes here..."
              value={currQn.explanation}
              onChange={(e) =>
                onQnFormDataChange("explanation", index, e.target.value)
              }
              multiline
              rows={3}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl required sx={{ minWidth: 150 }}>
              <InputLabel id="demo-simple-select-required-label">
                Answer Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={currQn.answerType}
                label="Answer Type *"
                onChange={(e) =>
                  onQnFormDataChange("answerType", index, e.target.value)
                }
              >
                <MenuItem value={"text"}>Text (Keyword Matching)</MenuItem>
                <MenuItem value={"radio"}>Radio (Single Answer Only)</MenuItem>
                <MenuItem value={"checkbox"}>
                  Checkbox (Multiple Answers)
                </MenuItem>
              </Select>
              <FormHelperText>
                Answer fields depend on the type you chose
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {" "}
            {currQn.answerType === "text" && (
              <TextField
                id="answer-field"
                name="answer-field"
                label="Answer"
                variant="standard"
                autoComplete="off"
                defaultValue={currQn.question}
                onChange={(e) =>
                  onQnFormDataChange("question", index, e.target.value)
                }
                required
                fullWidth
              />
            )}
          </Grid>
        </Grid>
      </TabPanel>
    );
  });

  const addQuestionHandler = () => {
    let newId = 0;

    if (qnFormData.length !== 0) {
      newId = qnFormData[qnFormData.length - 1].id + 1;
    }

    setQnFormData([
      ...qnFormData,
      {
        id: newId,
        question: "",
        explanation: "",
        answerType: "",
        correctAnswer: "",
      },
    ]);
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
