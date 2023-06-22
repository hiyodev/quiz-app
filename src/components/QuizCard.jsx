import { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";

import QuizModal from "./QuizModal";
import { QuizContext } from "../App";

function QuizCard(props) {
  const { id, imgUrl, imgAlt, title, description } = props;
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
          title={imgAlt}
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
        <Button>
          <DeleteIcon onClick={onDeleteHandler} />
        </Button>
        <QuizModal
          id={id}
          btnText={"Edit"}
          modalTitle={"Editing"}
          imgUrl={imgUrl}
          imgAlt={imgAlt}
          title={title}
          description={description}
        />
        <Button>Open</Button>
      </CardActions>
    </Card>
  );
}

export default QuizCard;
