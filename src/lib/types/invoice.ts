export type InvoiceStatus = "Paid" | "Unpaid" | "Pending";

export interface Invoice {
  name: string;
  invoiceNumber: string;
  dueDate: string;
  amount: number;
  status: InvoiceStatus;
}
