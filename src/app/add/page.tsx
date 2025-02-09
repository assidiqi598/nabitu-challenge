import InvoiceForm from "@/components/invoices/InvoiceForm";
import { Container, Typography } from "@mui/material";

export default function AddInvoicePage() {
  return (
    <Container maxWidth="sm" className="bg-gray-200">
      <Typography
        variant="h4"
        sx={{ fontFamily: "Arial", marginTop: "2rem", marginBottom: "2rem", fontWeight: "bold" }}
      >
        Add Invoice
      </Typography>
      <InvoiceForm />
    </Container>
  );
}
