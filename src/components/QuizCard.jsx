import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import noImagePlaceholder from "../assets/images/no-image-placeholder.png";

import { useContext } from "react";
import QuizModal from "./QuizModal";
import { QuizContext } from "../App";

function QuizCard(props) {
  const { id, imgUrl, title, description } = props;
  const { quizArray, setQuizArray } = useContext(QuizContext);

  const onDeleteHandler = () => {
    setQuizArray(quizArray.filter((currQuiz) => currQuiz.id !== id));
  };

  if (id === 0) console.log(quizArray[id].tabs);

  return (
    <Card variant="outlined" sx={{ minWidth: 250, maxWidth: 250 }}>
      <CardMedia
        component="img"
        sx={{ height: 250, objectFit: "contain" }}
        image={imgUrl || noImagePlaceholder}
      />
      <CardContent>
        <Typography variant="h5" component="div">
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
        <Typography color="text.primary">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={onDeleteHandler}>
          <DeleteIcon />
        </Button>
        <QuizModal
          quizCardId={id}
          btnText={"Edit"}
          modalType={"Editing"}
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
