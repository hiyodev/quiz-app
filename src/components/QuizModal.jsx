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
  width: "90vw",
  "@media (min-width: 900px)": {
    width: "50vw",
  },

  height: "90vh",
  "@media (min-height: 1000px)": {
    height: "80vh",
  },
  overflow: "hidden",
  overflowY: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function QuizModal(props) {
  const {
    quizCardId,
    btnVariant,
    btnText,
    imgUrl,
    modalType,
    title,
    description,
  } = props;

  const { quizArray, setQuizArray } = useContext(QuizContext);

  const [qnFormData, setQnFormData] = useState(
    quizCardId !== undefined
      ? JSON.parse(JSON.stringify(quizArray[quizCardId].tabs))
      : [
          {
            id: 1,
            question: "",
            explanation: "",
            answerType: "",
            checkboxAns: [
              { value: "A", answer: false },
              { value: "B", answer: false },
            ],
            radioAns: [
              { value: "True", answer: false },
              { value: "False", answer: false },
            ],
            textAns: [{ value: "", answer: false }],
          },
        ]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalState = (state) => {
    // Discard any changes in Modal that is not saved
    if (state === false) {
      if (quizCardId !== undefined)
        setQnFormData(JSON.parse(JSON.stringify(quizArray[quizCardId].tabs)));
      else
        setQnFormData([
          {
            id: 1,
            question: "",
            explanation: "",
            answerType: "",
            checkboxAns: [
              { value: "A", answer: false },
              { value: "B", answer: false },
            ],
            radioAns: [
              { value: "True", answer: false },
              { value: "False", answer: false },
            ],
            textAns: [{ value: "", answer: false }],
          },
        ]);
    }

    setIsModalOpen(state);
  };

  const onSubmitHandler = (e) => {
    console.log("Saving");

    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const inputTitle = data.get("title-field");
    const imageUrl = data.get("imgurl-field");
    const inputDescription = data.get("description-field");

    setQuizArray((quizArray) => {
      if (btnText === "Edit")
        return quizArray.map((currQuiz) => {
          if (currQuiz.id === quizCardId) {
            return {
              ...currQuiz,
              imgUrl: imageUrl,
              title: inputTitle,
              description: inputDescription,
              tabs: qnFormData,
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
            title: inputTitle,
            description: inputDescription,
            tabs: qnFormData,
          },
        ];
      }
    });

    setIsModalOpen(false);
  };

  return (
    <div>
      <Button onClick={() => handleModalState(true)} variant={btnVariant}>
        {btnText}
      </Button>
      <Modal
        open={isModalOpen}
        onClose={() => handleModalState(false)}
        aria-labelledby="modal-modal-title"
      >
        <Box component="form" sx={style} onSubmit={onSubmitHandler}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            sx={{ mb: 4 }}
            gutterBottom
          >
            {modalType}
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
                inputProps={{ maxLength: 30 }}
                required
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="imgurl-field"
                name="imgurl-field"
                label="Image URL"
                variant="outlined"
                defaultValue={imgUrl}
                fullWidth
                autoComplete="off"
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
                autoComplete="off"
              />
            </Grid>
          </Grid>
          <QuestionTabs
            qnFormData={qnFormData}
            setQnFormData={setQnFormData}
          ></QuestionTabs>
          <Stack
            spacing={2}
            direction="row"
            mt={4}
            display="flex"
            justifyContent="space-between"
          >
            <Button variant="outlined" onClick={() => handleModalState(false)}>
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
