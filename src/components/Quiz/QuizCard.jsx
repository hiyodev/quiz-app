import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import noImagePlaceholder from "../../assets/images/no-image-placeholder.png";

import { useContext, useState } from "react";
import QuizModal from "./QuizModal";
import { QuizContext } from "../../App";
import ButtonWithDialog from "../Buttons/ButtonWithDialog";

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
        <ButtonWithDialog
          dialogState={openDelModal}
          setDialogState={setOpenDelModal}
          onConfirmHandler={onDeleteHandler}
          dialogTitle={`Delete ${title}?`}
        ></ButtonWithDialog>
        <QuizModal
          quizCardId={id}
          btnText={"Edit"}
          modalType={"Editing"}
          imgUrl={imgUrl}
          title={title}
          description={description}
        />
        <Button onClick={() => setSelectedQuiz({ started: true, id: id })}>
          Open
        </Button>
      </CardActions>
    </Card>
  );
}

export default QuizCard;
