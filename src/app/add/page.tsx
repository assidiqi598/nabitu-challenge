import InvoiceForm from "@/components/invoices/InvoiceForm";
import { Container, Typography } from "@mui/material";

export default function AddInvoicePage() {
  return (
    <Container maxWidth="sm" className="bg-gray-200">
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontFamily: "Arial", marginTop: "2rem", marginBottom: "2rem" }}
      >
        Add Invoice
      </Typography>
      <InvoiceForm />
    </Container>
  );
}
