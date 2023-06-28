import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import noImagePlaceholder from "../../assets/images/no-image-placeholder.png";

import { useContext, useState } from "react";
import QuizModal from "./QuizModal";
import { QuizContext } from "../../App";

function QuizCard(props) {
  const { id, imgUrl, title, description, setSelectedQuiz } = props;
  const { quizArray, setQuizArray } = useContext(QuizContext);
  const [openDelModal, setOpenDelModal] = useState(false);

  const onDeleteHandler = () => {
    setQuizArray(quizArray.filter((currQuiz) => currQuiz.id !== id));
  };

  return (
    <Card variant="outlined" sx={{ minWidth: 250, maxWidth: 250 }}>
      <CardMedia
        component="img"
        sx={{ height: 250, objectFit: "contain" }}
        image={imgUrl || noImagePlaceholder}
      />
      <CardContent>
        <Typography variant="h5" fontWeight={"bold"}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          borderBottom={1}
          gutterBottom
        >
          {"Quiz Questions: " + quizArray[id].tabs.length}
        </Typography>
        {description.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            {"No description available..."}
          </Typography>
        )}
        <Typography sx={{ whiteSpace: "pre-wrap" }}>{description}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => setOpenDelModal(true)}>
          <DeleteIcon />
        </Button>
        <Dialog
          open={openDelModal}
          onClose={() => setOpenDelModal(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Deleting"} <b>{title}</b> {"Quiz"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDelModal(false)}>Cancel</Button>
            <Button onClick={onDeleteHandler} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <QuizModal
          quizCardId={id}
          btnText={"Edit"}
          modalType={"Editing"}
          imgUrl={imgUrl}
          title={title}
          description={description}
        />
        <Button onClick={() => setSelectedQuiz({ started: true, id: id })}>
          Start
        </Button>
      </CardActions>
    </Card>
  );
}

export default QuizCard;
