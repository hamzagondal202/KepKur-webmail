import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

// eslint-disable-next-line react/prop-types
const NewCapMessageDialog = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Olustur Island</DialogTitle>
      <DialogContent>
        {/* Receiver & Subject */}
        <TextField
          fullWidth
          label="Receiver"
          variant="outlined"
          margin="dense"
        />
        <TextField
          fullWidth
          label="Subject"
          variant="outlined"
          margin="dense"
        />

        {/* Radio Buttons */}
        <RadioGroup row defaultValue="standard">
          <FormControlLabel value="standard" control={<Radio />} label="Standard" />
          <FormControlLabel value="e-correspondence" control={<Radio />} label="e-Correspondence" />
        </RadioGroup>

        {/* Rich Text Editor Placeholder (Replace with an editor library later) */}
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          placeholder="Type your message..."
          margin="dense"
        />
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="secondary" onClick={handleClose}>
          Give Up
        </Button>
        <Button variant="contained" color="success">
          Save to Draft
        </Button>
        <Button variant="contained" disabled>
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default NewCapMessageDialog;
