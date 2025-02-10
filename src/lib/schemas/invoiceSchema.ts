import { z } from "zod";

export const invoiceSchema = z.object({
  name: z.string().min(1, "Invoice name is required"),
  invoiceNumber: z.string().regex(/^INV\d+$/, "Invoice number must start with INV"),
  dueDate: z.string().min(1, "Due date is required"),
  amount: z.number().min(1, "Amount must be greater than zero"),
  status: z.enum(["Paid", "Unpaid", "Pending", ""]).refine((value) => value !== "", {
    message: "Status is required",
  }),
});
