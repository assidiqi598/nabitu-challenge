"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  Typography,
  TableContainer,
  Paper,
} from "@mui/material";
import InvoiceStatusBadge from "./InvoiceStatusBadge";
import useInvoices from "@/hooks/useInvoices";
import { formatCurrency, formatDate } from "@/utils/format";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Invoice } from "@/lib/types/invoice";
import InvoiceActions from "./InvoiceActions";

export default function InvoiceTable() {
  const { invoices, deleteInvoice } = useInvoices();

  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>(invoices);

  const searchParams = useSearchParams();

  // Get current query params
  const currentSearch = searchParams.get("search") || "";
  const currentStatus = searchParams.get("status") || "All";

  useEffect(() => {
    setFilteredInvoices((): Invoice[] => {
      return invoices.filter((it) => {
        let matchChars = true;
        let matchStatus = true;

        if (currentSearch) {
          matchChars = it.name.toLowerCase().includes(currentSearch.toLowerCase());
        }

        if (currentStatus !== "All") {
          matchStatus = it.status === currentStatus;
        }

        return matchChars && matchStatus;
      });
    });
  }, [currentSearch, currentStatus, invoices]);

  return (
    <TableContainer
      component={Paper}
      className="bg-white mt-5 px-5 pb-5"
      sx={{ maxHeight: "40rem", overflow: "auto" }}
    >
      <Table stickyHeader className="mt-5">
        <TableHead>
          <TableRow
            sx={{
              "& th": {
                border: "none",
                fontWeight: "bold",
                backgroundColor: "#F7F9FC",
              },
              backgroundColor: "#8B8B8B",
            }}
          >
            <TableCell>Invoice</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredInvoices.map((invoice) => (
            <TableRow
              key={invoice.invoiceNumber}
              sx={{
                "& td": {
                  borderWidth: "1px 0 0 0",
                  borderColor: "#F7F9FC",
                },
              }}
            >
              <TableCell>
                <Stack>
                  <Typography>{invoice.name}</Typography>
                  <Typography variant="caption" sx={{ color: "gray", fontWeight: 800 }}>
                    {invoice.invoiceNumber}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>{formatDate(invoice.dueDate)}</TableCell>
              <TableCell>
                <InvoiceStatusBadge status={invoice.status} />
              </TableCell>
              <TableCell>{formatCurrency(invoice.amount)}</TableCell>
              <TableCell>
                <InvoiceActions onClickDelete={deleteInvoice} invoNum={invoice.invoiceNumber} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
