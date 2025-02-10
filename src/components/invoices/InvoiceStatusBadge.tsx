import { Chip } from "@mui/material";
import { InvoiceStatus } from "@/lib/types/invoice";

const bgColors: Record<InvoiceStatus, "#EDF7F1" | "#FBF0F1" | "#FFF8EB"> = {
  Paid: "#EDF7F1",
  Unpaid: "#FBF0F1",
  Pending: "#FFF8EB",
};

const textColors: Record<InvoiceStatus, "#219653" | "#D33F53" | "#FFA709"> = {
  Paid: "#219653",
  Unpaid: "#D33F53",
  Pending: "#FFA709",
};

export default function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  return (
    <Chip
      label={status}
      sx={{ backgroundColor: bgColors[status], color: textColors[status], fontWeight: 500 }}
    />
  );
}
