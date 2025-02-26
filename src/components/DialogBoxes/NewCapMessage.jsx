import { useState, useRef, useMemo, useEffect, useCallback } from "react";
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
  Box
} from "@mui/material";
import { useTranslation } from "react-i18next";
import JoditEditor from "jodit-react";

const NewCapMessageDialog = ({ open, handleClose }) => {
  const { t, i18n } = useTranslation(); // Get translation instance
  const editor = useRef(null);
  const messageRef = useRef(""); // Store message without triggering re-renders

  // Get current language from i18n
  const currentLang = i18n.language || "en";

  // Memoized Jodit Config with dynamic language
  const config = useMemo(() => ({
    language: currentLang, // Set Jodit's language
    uploader: { insertImageAsBase64URI: true },
    disablePlugins: "about,ai-assistant,powered-by-jodit,speech-recognize,spellcheck",
    buttons:
      "bold,italic,underline,strikethrough,eraser,ul,ol,font,fontsize,paragraph,lineHeight,superscript,subscript,cut,copy,paste,selectall,copyformat",
  }), [currentLang]); // Recalculate config when language changes

  const [receiver, setReceiver] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState(""); // Only update on blur

  // Update state only when the user leaves the editor
  const handleBlur = useCallback(() => {
    setMessage(messageRef.current);
  }, []);

  // Focus Jodit when dialog opens
  useEffect(() => {
    if (open && editor.current) {
      setTimeout(() => editor.current?.workplace?.focus(), 50);
    }
  }, [open]);

  const handleCloseDialog = useCallback(() => {
    editor.current?.editor?.blur(); // Remove focus
    handleClose(); // Close dialog
  }, [handleClose]);

  return (
    <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="md" keepMounted>
      <DialogTitle>{t("createMessage")}</DialogTitle>
      <DialogContent>
        {/* Receiver & Subject Fields */}
        <div className="flex flex-row gap-4">
          <div className="flex flex-col w-full">
            <TextField
              fullWidth
              label={t("receiver")}
              variant="outlined"
              margin="dense"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
            />
            <TextField
              fullWidth
              label={t("subject")}
              variant="outlined"
              margin="dense"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
        </div>

        {/* Radio Buttons */}
        <RadioGroup row defaultValue="standard">
          <FormControlLabel value="standard" control={<Radio />} label={t("standard")} />
          <FormControlLabel value="e-correspondence" control={<Radio />} label={t("e-correspondence")} />
        </RadioGroup>

        {/* Jodit Rich Text Editor */}
        <JoditEditor
          ref={editor}
          config={config} // Updated config with language
          onChange={(newContent) => (messageRef.current = newContent)}
          onBlur={handleBlur}
        />

        {/* Add File Button */}
        <Box mt={2}>
          <Button variant="contained" component="label">
            {t("add-file")}
            <input type="file" hidden />
          </Button>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="error" onClick={handleCloseDialog}>
          {t("give-up")}
        </Button>
        <Button variant="contained" color="success">
          {t("save-to-draft")}
        </Button>
        <Button variant="contained" disabled={!receiver || !subject || !message.trim()}>
          {t("send")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewCapMessageDialog;
