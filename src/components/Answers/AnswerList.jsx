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
  const { qnId, userAnswers, setUserAnswers, answers } = props;
  const { type, checkbox, radio, text } = answers;

  const onCheckAnswerHandler = (value, index, type) => {
    if (type === "checkbox") {
      setUserAnswers((userAns) => {
        userAns[qnId][index].selected = value;

        return [...userAns];
      });
    } else if (type === "radio") {
      setUserAnswers((userAns) => {
        userAns[qnId].map((currRadio) => (currRadio.selected = false));
        userAns[qnId][index].selected = value;

        return [...userAns];
      });
    }
  };

  console.log(`DEBUGGING: qnId:${qnId} - userAnswers:`, userAnswers);

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
                  onChange={(e) =>
                    onCheckAnswerHandler(e.target.checked, index, type)
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
                    onChange={(e) =>
                      onCheckAnswerHandler(e.target.checked, index, type)
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
