import {
  Grid,
  Stack,
  Tab,
  IconButton,
  TextField,
  Button,
  Box,
  FormHelperText,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Radio,
  FormLabel,
  FormControlLabel,
  FormGroup,
  Checkbox,
  RadioGroup,
  Switch,
  Typography,
} from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { Clear } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

import { useState, useEffect } from "react";

function QuestionTabs(props) {
  const { qnFormData, setQnFormData } = props;

  // For tab-switching
  const [tabValue, setTabValue] = useState("1");

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  // For checkbox ans, check if at least one is checked
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const onCheckboxStatusHandler = (currQn) => {
    for (let i = 0; i < currQn.checkboxAns.length; ++i) {
      if (currQn.checkboxAns[i].answer) {
        setCheckboxChecked(true);
        break;
      } else setCheckboxChecked(false);
    }
  };

  // Only runs when a quiz modal is open and when tabs change
  useEffect(() => {
    onCheckboxStatusHandler(qnFormData[tabValue - 1]);
  }, [tabValue]);

  const onAddAnsOptionHandler = (key, index, text) => {
    setQnFormData((prevData) => {
      prevData[index][key].push({ value: "", answer: false });
      return [...prevData];
    });
  };

  const onDelAnsOptionHandler = (key, index, selectIndex) => {
    setQnFormData((prevData) => {
      prevData[index][key].splice(selectIndex, 1);
      return [...prevData];
    });
  };

  const onAddTabHandler = () => {
    let newId = qnFormData.length + 1;

    setQnFormData([
      ...qnFormData,
      {
        id: newId,
        timeLimit: false,
        minDuration: 0,
        secDuration: 0,
        question: "",
        explanation: "",
        answerType: "",
        checkboxAns: [
          { value: "A", answer: false },
          { value: "B", answer: false },
        ],
        radioAns: [
          { value: "True", answer: false },
          { value: "False", answer: false },
        ],
        textAns: [{ value: "", answer: false }],
      },
    ]);
    setTabValue(newId.toString());
  };

  const onTabDeleteHandler = (id) => {
    // Remove the deleted tab and re-index the tabs to maintain ascending order
    const deletedTabQnData = qnFormData.filter((currQn) => currQn.id !== id);
    const updatedIndexQnData = deletedTabQnData.map((currQn, index) => ({
      ...currQn,
      id: index + 1,
    }));

    setQnFormData(updatedIndexQnData);
    const newTabListSize = deletedTabQnData.length;

    // Handle tab state that depends on index and update accordingly to the new indices
    if (id > newTabListSize && Number(tabValue) === id) {
      setTabValue(newTabListSize.toString());
    } else if (id < tabValue) {
      setTabValue((tabValue - 1).toString());
    }
  };

  const onTabDataChangeHandler = (key, index, value) => {
    setQnFormData((prevData) => {
      prevData[index][key] = value;
      return [...prevData];
    });
  };

  const onAnsSelectHandler = (key, index, selectIndex, selected) => {
    setQnFormData((prevData) => {
      if (key === "checkboxAns")
        prevData[index][key][selectIndex].answer = selected;
      else if (key === "radioAns") {
        prevData[index][key].map((currRadio) => (currRadio.answer = false));
        prevData[index][key][selectIndex].answer = selected;
      }
      return [...prevData];
    });
  };

  const onAnsChangeHandler = (key, index, selectIndex, value) => {
    setQnFormData((prevData) => {
      prevData[index][key][selectIndex].value = value;
      return [...prevData];
    });
  };

  const qnTabs = qnFormData.map((currQn) => {
    return (
      <Tab
        key={currQn.id}
        label={
          <span>
            {`Qn ${currQn.id}`}
            <IconButton
              size="small"
              component="span"
              disabled={qnFormData.length === 1}
              onClick={(e) => {
                e.stopPropagation();
                onTabDeleteHandler(currQn.id);
              }}
            >
              <Clear />
            </IconButton>
          </span>
        }
        value={currQn.id.toString()}
      ></Tab>
    );
  });

  // TODO: Each question form needs to be saved in a temporary storage when user changes tab
  // However, only when user clicks "SAVE" button then we actually save the questions from temp storage to user storage
  const qnTabPanels = qnFormData.map((currQn, index) => {
    return (
      <TabPanel
        value={currQn.id.toString()}
        key={currQn.id}
        sx={{ padding: 0 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Switch
                    checked={currQn.timeLimit}
                    onChange={(e) =>
                      onTabDataChangeHandler(
                        "timeLimit",
                        index,
                        e.target.checked
                      )
                    }
                  />
                }
                label={
                  currQn.timeLimit ? (
                    <Box sx={{ display: "flex" }} columnGap={1}>
                      <TextField
                        size="small"
                        type="number"
                        label="minutes"
                        value={currQn.minDuration}
                        onChange={(e) =>
                          onTabDataChangeHandler(
                            "minDuration",
                            index,
                            e.target.value < 0 ? 0 : e.target.value
                          )
                        }
                        sx={{
                          width: "50%",
                          "@media (min-width: 400px)": {
                            width: "25%",
                          },
                        }}
                      ></TextField>
                      <TextField
                        size="small"
                        type="number"
                        label="seconds"
                        value={currQn.secDuration}
                        sx={{
                          width: "50%",
                          "@media (min-width: 400px)": {
                            width: "25%",
                          },
                        }}
                        onChange={(e) =>
                          onTabDataChangeHandler(
                            "secDuration",
                            index,
                            e.target.value < 0 ? 0 : e.target.value
                          )
                        }
                      ></TextField>
                    </Box>
                  ) : (
                    <Typography color={"text.secondary"}>
                      No Time Limits
                    </Typography>
                  )
                }
                sx={{ paddingTop: 1 }}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="qns-field"
              name="qns-field"
              label="Question Title"
              variant="standard"
              autoComplete="off"
              value={currQn.question}
              onChange={(e) =>
                onTabDataChangeHandler("question", index, e.target.value)
              }
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="qns-explanation-field"
              name="qns-explanation-field"
              label="Additional Hints / Explanations / etc..."
              value={currQn.explanation}
              onChange={(e) =>
                onTabDataChangeHandler("explanation", index, e.target.value)
              }
              multiline
              rows={3}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl required fullWidth>
              <InputLabel id="simple-select-required-label">
                Answer Type
              </InputLabel>
              <Select
                labelId="simple-select-required-label"
                id="simple-select-required"
                value={currQn.answerType}
                label="Answer Type *"
                onChange={(e) =>
                  onTabDataChangeHandler("answerType", index, e.target.value)
                }
              >
                <MenuItem value={"text"}>Text (Keyword Matching)</MenuItem>
                <MenuItem value={"radio"}>Radio (Single Answer Only)</MenuItem>
                <MenuItem value={"checkbox"}>
                  Checkbox (Multiple Answers)
                </MenuItem>
              </Select>
              <FormHelperText>
                {currQn.answerType === "" &&
                  "Answer fields depend on the type you chose"}
                {currQn.answerType === "radio" &&
                  "At least one answer must be selected"}
                {currQn.answerType === "text" &&
                  "Keywords are NOT case sensitive"}
                {currQn.answerType === "checkbox" &&
                  "Points gained or lost per answer can be adjusted"}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {currQn.answerType === "text" && (
              <>
                {currQn.textAns.map((currText, textIndex) => (
                  <Box sx={{ display: "flex" }} key={textIndex}>
                    <TextField
                      size="small"
                      id="keyword-field"
                      name="keyword-field"
                      label={`#${textIndex + 1} Keyword`}
                      variant="outlined"
                      autoComplete="off"
                      value={currText.value}
                      onChange={(e) =>
                        onAnsChangeHandler(
                          "textAns",
                          index,
                          textIndex,
                          e.target.value
                        )
                      }
                      required
                      sx={{ margin: 0.5, flex: 1 }}
                    />

                    {textIndex > 0 && (
                      <Button
                        onClick={() =>
                          onDelAnsOptionHandler("textAns", index, textIndex)
                        }
                      >
                        <Clear />
                      </Button>
                    )}
                    {textIndex === currQn.textAns.length - 1 && (
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          onAddAnsOptionHandler("textAns", index);
                        }}
                        sx={{ marginTop: 0.2 }}
                      >
                        <AddIcon />
                      </Button>
                    )}
                  </Box>
                ))}
              </>
            )}
            {currQn.answerType === "radio" && (
              <RadioGroup>
                <FormControl>
                  <FormLabel id="controlled-radio-buttons-group">
                    Select the correct answer out of the options
                  </FormLabel>
                  {currQn.radioAns.map((currRadio, radioIndex) => (
                    <FormControlLabel
                      required
                      sx={{
                        ".MuiFormControlLabel-asterisk": {
                          visibility: "hidden",
                        },
                      }}
                      key={radioIndex}
                      value={currRadio.value}
                      control={
                        <Radio
                          checked={currRadio.answer}
                          onChange={(e) =>
                            onAnsSelectHandler(
                              "radioAns",
                              index,
                              radioIndex,
                              e.target.checked
                            )
                          }
                        />
                      }
                      label={
                        <Box sx={{ display: "flex" }} key={radioIndex}>
                          <TextField
                            fullWidth
                            size="small"
                            value={currRadio.value}
                            onChange={(e) =>
                              onAnsChangeHandler(
                                "radioAns",
                                index,
                                radioIndex,
                                e.target.value
                              )
                            }
                            required
                            sx={{ margin: 0.5 }}
                          ></TextField>
                          {radioIndex > 1 && (
                            <Button
                              onClick={() =>
                                onDelAnsOptionHandler(
                                  "radioAns",
                                  index,
                                  radioIndex
                                )
                              }
                              sx={{ marginTop: 0.2 }}
                            >
                              <Clear />
                            </Button>
                          )}
                          {radioIndex === currQn.radioAns.length - 1 && (
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                onAddAnsOptionHandler("radioAns", index);
                              }}
                              sx={{ marginTop: 0.2 }}
                            >
                              <AddIcon />
                            </Button>
                          )}
                        </Box>
                      }
                    ></FormControlLabel>
                  ))}
                </FormControl>
              </RadioGroup>
            )}
            {currQn.answerType === "checkbox" && (
              <>
                <FormLabel component="legend">
                  Select one or multiple answers
                </FormLabel>
                <FormGroup>
                  {currQn.checkboxAns.map((currCheckbox, checkboxIndex) => (
                    <FormControlLabel
                      sx={{
                        ".MuiFormControlLabel-asterisk": {
                          visibility: "hidden",
                        },
                      }}
                      required={!checkboxChecked}
                      key={checkboxIndex}
                      control={
                        <Checkbox
                          onChange={(e) => {
                            onAnsSelectHandler(
                              "checkboxAns",
                              index,
                              checkboxIndex,
                              e.target.checked
                            );

                            onCheckboxStatusHandler(currQn);
                          }}
                          checked={currCheckbox.answer}
                        />
                      }
                      label={
                        <Box sx={{ display: "flex" }} key={checkboxIndex}>
                          <TextField
                            size="small"
                            autoComplete="off"
                            value={currCheckbox.value}
                            onChange={(e) =>
                              onAnsChangeHandler(
                                "checkboxAns",
                                index,
                                checkboxIndex,
                                e.target.value
                              )
                            }
                            required
                            sx={{ margin: 0.5 }}
                          />
                          {checkboxIndex > 0 && (
                            <Button
                              onClick={() => {
                                onDelAnsOptionHandler(
                                  "checkboxAns",
                                  index,
                                  checkboxIndex
                                );
                                onCheckboxStatusHandler(currQn);
                              }}
                              sx={{ marginTop: 0.2 }}
                            >
                              <Clear />
                            </Button>
                          )}
                          {checkboxIndex === currQn.checkboxAns.length - 1 && (
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                onAddAnsOptionHandler("checkboxAns", index);
                                onCheckboxStatusHandler(currQn);
                              }}
                              sx={{ marginTop: 0.2 }}
                            >
                              <AddIcon />
                            </Button>
                          )}
                        </Box>
                      }
                    />
                  ))}
                </FormGroup>
              </>
            )}
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </TabPanel>
    );
  });

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Stack spacing={0} direction="row" mt display="flex">
            <TabList
              onChange={handleTabChange}
              aria-label="lab API tabs example"
              variant="scrollable"
              scrollButtons
            >
              {qnTabs}
            </TabList>
            <Button onClick={onAddTabHandler}>Add</Button>
          </Stack>
        </Box>
        {qnTabPanels}
      </TabContext>
    </Box>
  );
}

export default QuestionTabs;
