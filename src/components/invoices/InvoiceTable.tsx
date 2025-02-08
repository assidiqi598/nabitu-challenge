"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import InvoiceStatusBadge from "./InvoiceStatusBadge";
import useInvoices from "@/hooks/useInvoices";
import { formatCurrency, formatDate } from "@/utils/format";

export default function InvoiceTable() {
  const { invoices, deleteInvoice } = useInvoices();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Invoice Name</TableCell>
          <TableCell>Invoice Number</TableCell>
          <TableCell>Due Date</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoiceNumber}>
            <TableCell>{invoice.name}</TableCell>
            <TableCell>{invoice.invoiceNumber}</TableCell>
            <TableCell>
              {formatDate(invoice.dueDate)}
            </TableCell>
            <TableCell>
              <InvoiceStatusBadge status={invoice.status} />
            </TableCell>
            <TableCell>
              {formatCurrency(invoice.amount)}
            </TableCell>
            <TableCell>
              <Button
                onClick={() => deleteInvoice(invoice.invoiceNumber)}
                color="error"
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
