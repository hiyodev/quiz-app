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

        return [...userAns];
      });
    }
  };

  console.log(`DEBUGGING: qnId:${qnId} - userAnswers:`, userAnswers);
  console.log("OriginalAns:", answers);

  return (
    <>
      {type === "checkbox" && (
        <FormGroup>
          {checkbox.map((currCheckbox, index) => {
            const checkboxProps = {
              key: index,
              label: currCheckbox.value,
              ...(reviewMode
                ? {
                    checked: reviewMode && !!userAnswers[qnId][index].selected,
                    control: (
                      <Checkbox
                        color={
                          userAnswers[qnId][index].answer ===
                          userAnswers[qnId][index].selected
                            ? "success"
                            : "error"
                        }
                        sx={{
                          "&": {
                            color: currCheckbox.answer ? "green" : "",
                          },
                        }}
                      />
                    ),
                  }
                : {
                    control: (
                      <Checkbox
                        onChange={(e) =>
                          onCheckAnswerHandler(e.target.checked, index, type)
                        }
                      />
                    ),
                  }),
            };

            return <FormControlLabel {...checkboxProps} />;
          })}
        </FormGroup>
      )}
      {type === "radio" && (
        <RadioGroup>
          <FormControl>
            {radio.map((currRadio, index) => {
              const radioProps = {
                key: index,
                label: currRadio.value,
                value: currRadio.value,
                ...(reviewMode
                  ? {
                      checked:
                        reviewMode && !!userAnswers[qnId][index].selected,
                      control: (
                        <Radio
                          color={
                            userAnswers[qnId][index].answer ===
                            userAnswers[qnId][index].selected
                              ? "success"
                              : "error"
                          }
                          sx={{
                            "&": {
                              color: currRadio.answer ? "green" : "",
                            },
                          }}
                        />
                      ),
                    }
                  : {
                      control: (
                        <Radio
                          onChange={(e) =>
                            onCheckAnswerHandler(e.target.checked, index, type)
                          }
                        />
                      ),
                    }),
              };

              return <FormControlLabel {...radioProps} />;
            })}
          </FormControl>
        </RadioGroup>
      )}
      {type === "text" && !reviewMode && (
        <TextField
          size="small"
          autoComplete="off"
          onChange={(e) => onCheckAnswerHandler(e.target.value, 0, type)}
        />
      )}
      {type === "text" && reviewMode && (
        <TextField
          size="small"
          autoComplete="off"
          value={userAnswers[qnId][0].userAns}
          color={
            answers.text.some((ans) => {
              return (
                ans.value.toLowerCase() ===
                userAnswers[qnId][0].userAns.toLowerCase()
              );
            })
              ? "success"
              : "error"
          }
          focused
          InputProps={{ readOnly: true }}
        />
      )}
    </>
  );
}

export default AnswerList;
