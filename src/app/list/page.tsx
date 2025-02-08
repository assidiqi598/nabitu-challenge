"use client"

import InvoiceTable from "@/components/invoices/InvoiceTable";
import { Container, Typography } from "@mui/material";

export default function InvoiceListPage() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        My Invoices
      </Typography>
      <InvoiceTable />
    </Container>
  );
}
