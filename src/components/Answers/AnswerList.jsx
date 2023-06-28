import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

function AnswerList(props) {
  const { userAnswers, setUserAnswers, answers } = props;
  const { type, checkbox, radio, text } = answers;

  const onCheckAnswerHandler = (value, index) => {
    console.log(value, index, answers[type]);
  };

  return (
    <>
      {type === "checkbox" && (
        <FormGroup>
          {checkbox.map((currCheckbox, index) => (
            <FormControlLabel
              key={index}
              label={currCheckbox.value}
              control={
                <Checkbox
                  onChange={() =>
                    onCheckAnswerHandler(currCheckbox.value, index)
                  }
                />
              }
            />
          ))}
        </FormGroup>
      )}
      {type === "radio" && (
        <RadioGroup>
          <FormControl>
            {radio.map((currRadio, index) => (
              <FormControlLabel
                key={index}
                value={currRadio.value}
                label={currRadio.value}
                control={
                  <Radio
                    onChange={() =>
                      onCheckAnswerHandler(currRadio.value, index)
                    }
                  />
                }
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
