"use client";

import InvoiceFilters from "@/components/invoices/InvoiceFilters";
import InvoiceTable from "@/components/invoices/InvoiceTable";
import { Container, Stack, Typography } from "@mui/material";
import { Suspense } from "react";

export default function InvoiceListPage() {
  return (
    <Container maxWidth="md" sx={{ paddingTop: "10%" }}>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" component="h1">
          My Invoices
        </Typography>
        <Suspense fallback={<div>Loading...</div>}>
          <InvoiceFilters />
        </Suspense>
      </Stack>
      <Suspense fallback={<div>Loading...</div>}>
        <InvoiceTable />
      </Suspense>
    </Container>
  );
}
