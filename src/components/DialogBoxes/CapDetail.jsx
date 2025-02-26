import {
  Dialog,
  DialogTitle,
  DialogContent,
  // DialogActions,
  // Typography,
  Button,
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TableRow,
  // Paper,
  IconButton,
} from "@mui/material";
import { Download, Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line react/prop-types
const CapDetailModal = ({ open, handleClose }) => {
  const {t} = useTranslation();

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong className="text-3xl">{t("cap-detail")}</strong>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className="my-4">
          <div className="border rounded-md relative">
            <div className="text-lg bg-white font-semibold px-4 py-2 absolute -top-6 left-4">{t("message-information")}</div>
            <div className="flex flex-row p-8">
              <div className="flex flex-col mr-10">
                <div className="my-2">{t("from-whom")}</div>
                <div className="my-2">{t("team")}</div>
                <div className="my-2">{t("subject")}</div>
                <div className="my-2">{t("history")}</div>
              </div>
              <div className="flex flex-col">
                <div className="my-2">kepservisi@hs06.kep.tr</div>
                <div className="my-2">ilayda.kuran@hs06.kep.tr</div>
                <div className="my-2">[KEP Evidence: Delivered to çigdem.yilmaz@hs06.kep.tr] [KEP Message] ahhahah</div>
                <div className="my-2">2025-02-11 14:53:36</div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-6">
          <div className="border rounded-md relative">
            <div className="text-lg bg-white font-semibold px-4 py-2 absolute -top-6 left-4">{t("contents")}</div>
            <div className="flex flex-row p-8">
              <div className="flex flex-col mr-16">
                <div className="my-2">{t("content")}</div>
              </div>
              <div className="flex flex-col">
                <div className="my-2">
                  Proof of Delivery to the Recipient: <b>ILAYDA KURAN</b> by the user
                  ilayda.kuran@hs06.kep.tr on
                </div>
                <div className="my-1">
                  <b>2025-02-11T14:53:36+03:00</b>
                </div>
                <div className="my-1">• cigdem.yilmaz@hs06.kep.tr</div>
                <div className="my-2">
                  The message with the number <b>cekpur.remmd.8be1da12...</b> was delivered.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4">
          <div className="border rounded-md relative">
            {/* Title with absolute positioning */}
            <div className="text-lg bg-white font-semibold px-4 py-2 absolute -top-6 left-4">
              {t("details")}
            </div>

            <div className="p-8 flex flex-col">
              {/* Attachments section with limited-width border */}
              <div className="relative mb-4">
                <div className="font-semibold inline-block border-b-4 border-blue-600">{t("attachments")}</div>
              </div>

              {/* File info row */}
              <div className="flex flex-col border">
                <div className="border p-2">{t("file-name")}</div>
                <div className="border p-2 flex items-center justify-between">
                  <div className="mt-1">DeliveryNonDeliveryToRecipient.xml</div>
                  <Button variant="contained" color="success" sx={{ marginRight: 20 }} startIcon={<Download />}>
                    {t("download")}
                  </Button>
                </div>
              </div>

              {/* Right-aligned Download Button */}
              <div className="flex justify-end mt-4">
                <Button variant="contained" color="primary" startIcon={<Download />}>
                  {t("download")}
                </Button>
              </div>
            </div>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default CapDetailModal;

