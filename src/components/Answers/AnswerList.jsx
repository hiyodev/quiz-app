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
  const { qnId, userAnswers, setUserAnswers, answers, reviewMode } = props;
  const { type, checkbox, radio } = answers;

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
    } else {
      setUserAnswers((userAns) => {
        userAns[qnId][0].userAns = value;
        console.log(userAns[qnId][0]);

        return [...userAns];
      });
    }
  };

  console.log(`DEBUGGING: qnId:${qnId} - userAnswers:`, userAnswers);

  return (
    <>
      {type === "checkbox" && (
        <FormGroup>
          {checkbox.map((currCheckbox, index) => {
            const answerState = currCheckbox.answer == currCheckbox.selected;
            const selectedState =
              currCheckbox.selected === undefined
                ? false
                : currCheckbox.selected;

            return reviewMode ? (
              <FormControlLabel
                checked={reviewMode && selectedState}
                key={index}
                label={currCheckbox.value}
                control={
                  <Checkbox
                    sx={{
                      "&": {
                        color: currCheckbox.answer ? "green" : "",
                      },
                    }}
                  />
                }
              />
            ) : (
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
            );
          })}
        </FormGroup>
      )}
      {type === "radio" && (
        <RadioGroup>
          <FormControl>
            {radio.map((currRadio, index) => {
              const answerState = currRadio.answer == currRadio.selected;
              const selectedState =
                currRadio.selected === undefined ? false : currRadio.selected;

              console.log(currRadio);

              return reviewMode ? (
                <FormControlLabel
                  checked={reviewMode && selectedState}
                  key={index}
                  label={currRadio.value}
                  control={
                    <Radio
                      color={answerState ? "error" : "success"}
                      sx={{
                        "&": {
                          color: currRadio.answer ? "green" : "",
                        },
                      }}
                    />
                  }
                />
              ) : (
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
                />
              );
            })}
          </FormControl>
        </RadioGroup>
      )}
      {type === "text" && (
        <TextField
          size="small"
          autoComplete="off"
          onChange={(e) => onCheckAnswerHandler(e.target.value, 0, type)}
        ></TextField>
      )}
    </>
  );
}

export default AnswerList;
