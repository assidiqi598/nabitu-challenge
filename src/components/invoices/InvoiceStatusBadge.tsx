import { Chip } from "@mui/material";
import { InvoiceStatus } from "@/lib/types/invoice";

const statusColors: Record<InvoiceStatus, "success" | "error" | "warning"> = {
  Paid: "success",
  Unpaid: "error",
  Pending: "warning",
};

export default function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  return <Chip label={status} color={statusColors[status]} />;
}
