import InvoiceForm from "@/components/invoices/InvoiceForm";
import { Container, Typography } from "@mui/material";

export default function AddInvoicePage() {
  return (
    <Container maxWidth="md" sx={{ paddingTop: "10%" }}>
      <Typography
        variant="h4"
        sx={{ fontFamily: "Arial", marginBottom: "2rem", fontWeight: "bold" }}
      >
        Add Invoice
      </Typography>
      <InvoiceForm />
    </Container>
  );
}
