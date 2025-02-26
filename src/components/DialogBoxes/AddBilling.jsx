import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line react/prop-types
const AddBillingDialog = ({ open, handleClose }) => {
  const {t} = useTranslation()
  const [formData, setFormData] = useState({
    taxNumber: "",
    title: "",
    taxOffice: "",
    country: "",
    district: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Billing Address Data:", formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle className="flex justify-between items-center">
        {t("add-billing-address")}
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <form className="space-y-4">
          <TextField
            label={t("tax-number")}
            name="taxNumber"
            value={formData.taxNumber}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            label={t("title")}
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            label={t("tax-office")}
            name="taxOffice"
            value={formData.taxOffice}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            label={t("country")}
            name="country"
            value={formData.country}
            onChange={handleChange}
            fullWidth
            select
            variant="outlined"
          >
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="Canada">Canada</MenuItem>
            <MenuItem value="UK">UK</MenuItem>
          </TextField>
          <TextField
            label={t("district")}
            name="district"
            value={formData.district}
            onChange={handleChange}
            fullWidth
            select
            variant="outlined"
          >
            <MenuItem value="District 1">District 1</MenuItem>
            <MenuItem value="District 2">District 2</MenuItem>
            <MenuItem value="District 3">District 3</MenuItem>
          </TextField>
          <TextField
            label={t("address")}
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            multiline
            rows={3}
          />
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" color="primary" startIcon={<SaveIcon />}>
          {t("save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBillingDialog;
