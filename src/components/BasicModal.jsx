import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Grid, Stack } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { buttonText, modalTitle, modalDescription } = props;

  return (
    <div>
      <Button onClick={handleOpen}>{buttonText}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} onSubmit={() => console.log("HI")}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                defaultValue={modalTitle}
                sx={{ width: 300 }}
                inputProps={{ maxLength: 30 }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                required
                multiline
                rows={3}
                defaultValue={modalDescription}
                sx={{ width: 300 }}
              />
            </Grid>
          </Grid>
          <Stack spacing={2} direction="row" mt>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
