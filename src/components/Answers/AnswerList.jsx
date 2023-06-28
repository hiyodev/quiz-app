import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React from "react";

function AnswerList(props) {
  const { answerType, checkboxAns, radioAns, textAns } = props.quizData;
  return (
    <>
      {answerType === "checkbox" && (
        <FormGroup>
          {checkboxAns.map((currCheckbox, checkboxIndex) => (
            <FormControlLabel
              key={checkboxIndex}
              label={currCheckbox.value}
              control={<Checkbox />}
            />
          ))}
        </FormGroup>
      )}
      {answerType === "radio" && (
        <RadioGroup>
          <FormControl>
            {radioAns.map((currRadio, radioIndex) => (
              <FormControlLabel
                key={radioIndex}
                value={currRadio.value}
                label={currRadio.value}
                control={<Radio />}
              ></FormControlLabel>
            ))}
          </FormControl>
        </RadioGroup>
      )}
      {answerType === "text" && <TextField size="small"></TextField>}
    </>
  );
}

export default AnswerList;
