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
  const { type, checkbox, radio, text } = props.answers;

  return (
    <>
      {type === "checkbox" && (
        <FormGroup>
          {checkbox.map((currCheckbox, checkboxIndex) => (
            <FormControlLabel
              key={checkboxIndex}
              label={currCheckbox.value}
              control={
                <Checkbox onChange={() => console.log(currCheckbox.value)} />
              }
            />
          ))}
        </FormGroup>
      )}
      {type === "radio" && (
        <RadioGroup>
          <FormControl>
            {radio.map((currRadio, radioIndex) => (
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
      {type === "text" && (
        <TextField size="small" autoComplete="off"></TextField>
      )}
    </>
  );
}

export default AnswerList;
