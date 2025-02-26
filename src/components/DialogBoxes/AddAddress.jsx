import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    TextField,
    Button,
    Grid,
    Typography,
} from "@mui/material";
import { Save, Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line react/prop-types
const AddAddressDialog = ({ open, handleClose }) => {
      const { t } = useTranslation();
    const [formData, setFormData] = useState({
        kepAddress: "hivin.polat@hs06.kep.tr",
        name: "hivin",
        lastName: "polat",
        email: "demo@email.com",
        telephone: "+0123456789",
        address: "Planet Earth",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        console.log("Saved Data:", formData);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            {/* Dialog Header with Close Button */}
            <DialogTitle sx={{ fontSize: "1.25rem", fontWeight: "bold", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {t("my-address-book")}
                <IconButton onClick={handleClose} sx={{ color: "gray" }}>
                    <Close />
                </IconButton>
            </DialogTitle>

            {/* Dialog Content */}
            <DialogContent>
                {[{ label: t("kepAddress"), name: "kepAddress" },
                { label: t("name"), name: "name" },
                { label: t("last-name"), name: "lastName" },
                { label: t("email-addresses"), name: "email" },
                { label: t("telephone"), name: "telephone" },
                { label: t("address"), name: "address" }].map((field) => (
                    <Grid container spacing={2} alignItems="center" key={field.name} sx={{ marginBottom: 1 }}>
                        <Grid item xs={4}>
                            <Typography sx={{ fontWeight: 500 }}>{field.label}</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                name={field.name}
                                fullWidth
                                size="small"
                                value={formData[field.name]}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                ))}

                {/* Buttons Row - Aligned with Input Fields */}
                <Grid container spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
                    <Grid item xs={4} /> {/* Empty space for alignment */}
                    <Grid item xs={8} sx={{ display: "flex", gap: 1 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Save />}
                            onClick={handleSubmit}
                            sx={{ textTransform: "none" }}
                        >
                            {t("save")}
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleClose}
                            sx={{ backgroundColor: "#E0E0E0", color: "#000", textTransform: "none" }}
                        >
                            {t("cancel")}
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default AddAddressDialog;
