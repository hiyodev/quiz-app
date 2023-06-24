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
  RadioGroup,
  FormLabel,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { Clear } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

function QuestionTabs(props) {
  // For tab-switching
  const [tabValue, setTabValue] = useState("1");

  // For radio-button in Answers
  const [radioValue, setRadioValue] = useState("True");

  // Store tab data temporarily until user exits out of Modal
  const [qnFormData, setQnFormData] = useState([
    {
      id: 1,
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

  const handleTabChange = (event, newValue) => setTabValue(newValue);

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
      <TabPanel value={currQn.id.toString()} key={currQn.id}>
        <Grid container spacing={2}>
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
              label="Additional Question Explanation / Examples / Hints goes here..."
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
            <FormControl required sx={{ minWidth: 150 }}>
              <InputLabel id="demo-simple-select-required-label">
                Answer Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
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
                Answer fields depend on the type you chose
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
                      sx={{ marginTop: 1 }}
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
              <FormControl>
                <RadioGroup
                  value={radioValue}
                  onChange={(e) =>
                    e.target.value.length !== 0 && setRadioValue(e.target.value)
                  }
                >
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Select the correct answer out of the options
                  </FormLabel>
                  {currQn.radioAns.map((currRadio, radioIndex) => (
                    <FormControlLabel
                      key={radioIndex}
                      value={currRadio.value}
                      control={<Radio />}
                      label={
                        <>
                          <TextField
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
                        </>
                      }
                    ></FormControlLabel>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
            {currQn.answerType === "checkbox" && (
              <>
                <FormLabel component="legend">
                  Select one or multiple answers
                </FormLabel>
                <FormGroup>
                  {currQn.checkboxAns.map((currCheckbox, checkboxIndex) => (
                    <FormControlLabel
                      key={checkboxIndex}
                      control={<Checkbox selected={currCheckbox.selected} />}
                      label={
                        <>
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
                          />
                          {checkboxIndex > 0 && (
                            <Button
                              onClick={() =>
                                onDelAnsOptionHandler(
                                  "checkboxAns",
                                  index,
                                  checkboxIndex
                                )
                              }
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
                              }}
                              sx={{ marginTop: 0.2 }}
                            >
                              <AddIcon />
                            </Button>
                          )}
                        </>
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
