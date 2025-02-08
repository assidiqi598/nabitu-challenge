"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { invoiceSchema } from "@/lib/schemas/invoiceSchema";
import { z } from "zod";
import { useCallback, useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Select,
  FormHelperText,
  FormControl,
  Typography,
  Divider,
  InputLabel,
  OutlinedInput,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";
import useInvoices from "@/hooks/useInvoices";
import { generateInvoiceNumber } from "@/utils/generateRandom";

type InvoiceFormValues = z.infer<typeof invoiceSchema>;

export default function InvoiceForm() {
  const { addInvoice, invoices } = useInvoices();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      name: "",
      dueDate: "",
      amount: 0,
    },
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const requestInvoiceNumber = (): string => {
    const invoiceNum = generateInvoiceNumber();

    if (invoices.findIndex((it) => it.invoiceNumber === invoiceNum) > -1) {
      return requestInvoiceNumber();
    }

    return invoiceNum;
  };

  const onSubmit = (data: InvoiceFormValues) => {
    addInvoice(data);
    setOpenSnackbar(true);
    reset(); // Reset form after submission
  };

  return (
    <div className="bg-white shadow-xl rounded-sm">
      <Typography variant="h5" sx={{ fontFamily: "Arial", fontWeight: 600, padding: "1rem" }}>
        Invoice Form
      </Typography>
      <Divider component="div" sx={{ borderBottomWidth: "2px" }} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("test");
          handleSubmit(onSubmit, (errors) => {
            console.log("❌ handleSubmit errors:", errors); // 🔎 Log errors explicitly
          })(e);
        }}
      >
        <div className="flex flex-wrap p-[1rem]">
          <TextField
            placeholder="Invoice Number"
            {...register("invoiceNumber")}
            error={!!errors.invoiceNumber}
            helperText={errors.invoiceNumber?.message}
            disabled
            defaultValue={requestInvoiceNumber()}
          />
          <TextField
            placeholder="Invoice Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            type="date"
            {...register("dueDate")}
            error={!!errors.dueDate}
            helperText={errors.dueDate?.message}
            sx={{ "& input": { textTransform: "uppercase" } }}
          />
          <TextField
            placeholder="Amount"
            type="number"
            {...register("amount", { valueAsNumber: true })}
            error={!!errors.amount}
            helperText={errors.amount?.message}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
              },
            }}
            sx={{
              "& input[type=number]": {
                MozAppearance: "textfield", // Firefox
              },
              "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                {
                  WebkitAppearance: "none", // Chrome, Safari
                  margin: 0,
                },
            }}
          />
          <Select {...register("status")} displayEmpty error={!!errors.status} defaultValue="">
            <MenuItem value="" disabled>
              Choose the status
            </MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Unpaid">Unpaid</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </Select>
          <FormHelperText>{errors.status?.message}</FormHelperText>
        </div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>

        {/* Success Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={() => setOpenSnackbar(false)}
          message="Invoice added successfully!"
        />
      </form>
    </div>
  );
}
