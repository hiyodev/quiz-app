import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import QuizModal from "./QuizModal";

function QuizCard(props) {
  const { id, imgUrl, imgAlt, title, description } = props;
  return (
    <Card variant="outlined" sx={{ maxWidth: 250 }}>
      <CardMedia
        component="img"
        sx={{ height: 200, objectFit: "contain" }}
        image={imgUrl}
        title={imgAlt}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <QuizModal
          id={id}
          buttonText={"Edit"}
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
