import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useContext } from "react";
import QuizModal from "./QuizModal";
import { QuizContext } from "../App";

function QuizCard(props) {
  const { id, imgUrl, title, description } = props;
  const { quizArray, setQuizArray } = useContext(QuizContext);

  const onDeleteHandler = () => {
    setQuizArray(quizArray.filter((currQuiz) => currQuiz.id !== id));
  };

  return (
    <Card variant="outlined" sx={{ maxWidth: 250 }}>
      {imgUrl.length !== 0 && (
        <CardMedia
          component="img"
          sx={{ height: 200, objectFit: "contain" }}
          image={imgUrl}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={onDeleteHandler}>
          <DeleteIcon />
        </Button>
        <QuizModal
          id={id}
          btnText={"Edit"}
          modalTitle={"Editing"}
          imgUrl={imgUrl}
          title={title}
          description={description}
        />
        <Button>Open</Button>
      </CardActions>
    </Card>
  );
}

export default QuizCard;
