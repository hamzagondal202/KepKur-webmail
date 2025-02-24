import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from "@mui/material";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const undoChange = () => {
  const editor = document.querySelector(".ql-editor");
  if (editor) {
    editor.dispatchEvent(new KeyboardEvent("keydown", { key: "z", ctrlKey: true }));
  }
};

const redoChange = () => {
  const editor = document.querySelector(".ql-editor");
  if (editor) {
    editor.dispatchEvent(new KeyboardEvent("keydown", { key: "y", ctrlKey: true }));
  }
};

const modules = {
  toolbar: {

    container: [
      // [{ undo: "custom" }, { redo: "custom" }], // Custom Undo/Redo
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ script: "sub" }, { script: "super" }],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
      [{ font: [] }],
      [{ size: [] }],
      ["clean"],
    ],
    handlers: {
      undo: undoChange,
      redo: redoChange,
    },
  },
};


// eslint-disable-next-line react/prop-types
const NewCapMessageDialog = ({ open, handleClose }) => {
  const { t } = useTranslation();

  const [message, setMessage] = useState("");
  const [receiver, setReceiver] = useState("");
  const [subject, setSubject] = useState("");

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Olustur Island</DialogTitle>
      <DialogContent>
        {/* Receiver & Subject Section */}

        <div className="flex flex-row gap-4">
          <div className="flex flex-col w-full">
            <TextField
              fullWidth
              label={t("receiver")}
              variant="outlined"
              margin="dense"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              className="text-sm h-10"
              InputProps={{
                style: { fontSize: '0.875rem', height: '36px' }, // Tailwind equivalent of text-sm, h-9
              }}
              InputLabelProps={{
                style: { fontSize: '0.75rem' }, // Label smaller
              }}
            />
            <TextField
              fullWidth
              label={t("subject")}
              variant="outlined"
              margin="dense"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="text-sm h-10"
              InputProps={{
                style: { fontSize: '0.875rem', height: '36px' },
              }}
              InputLabelProps={{
                style: { fontSize: '0.75rem' },
              }}
            />
          </div>
          <div className="mt-1.5">
            <button
              className="h-9 w-28 text-sm px-2 border rounded-md bg-orange-500 text-white hover:bg-orange-600"
            >
              {t("select-address")}
            </button>
          </div>
        </div>


        {/* Radio Buttons */}
        <RadioGroup row defaultValue="standard">
          <FormControlLabel value="standard" control={<Radio />} label={t("standard")} />
          <FormControlLabel value="e-correspondence" control={<Radio />} label={t("e-correspondence")} />
        </RadioGroup>

        {/* Rich Text Editor */}
        <ReactQuill
          value={message}
          onChange={setMessage}
          theme="snow"
          modules={modules}
          style={{ height: "200px" }}
        />

        {/* Add File Button */}
        <Box mt={8}>
          <Button variant="contained" component="label" sx={{ backgroundColor: "#E0E0E0", color: "black" }}>
            {t("add-file")}
            <input type="file" hidden />
          </Button>
        </Box>
      </DialogContent>

      <DialogActions sx={{ padding: "16px" }}>
        <Button variant="contained" color="error" onClick={handleClose}>
          {t("give-up")}
        </Button>
        <Button variant="contained" color="success">
          {t("save-to-draft")}
        </Button>
        <Button
          variant="contained"
          disabled={!receiver || !subject || !message.trim()}
          sx={{ backgroundColor: "#BDBDBD" }}
        >
          {t("send")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewCapMessageDialog;
