import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import BasicModal from "./BasicModal";

function QuizCard(props) {
  const { id, title, description } = props;
  return (
    <Card variant="outlined" sx={{ maxWidth: 250 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
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
        <BasicModal
          id={id}
          buttonText={"Edit"}
          modalTitle={title}
          modalDescription={description}
        />
        <Button>Open</Button>
      </CardActions>
    </Card>
  );
}

export default QuizCard;
