"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { invoiceSchema } from "@/lib/schemas/invoiceSchema";
import { z } from "zod";
import { ReactNode, useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Select,
  FormHelperText,
  Typography,
  Divider,
  InputAdornment,
  Grid2,
  Stack,
  SnackbarCloseReason,
  Alert,
  AlertTitle,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import useInvoices from "@/hooks/useInvoices";
import { generateInvoiceNumber } from "@/utils/generateRandom";
import { NumericFormat } from "react-number-format";
import { usePathname } from "next/navigation";
import { Invoice } from "@/lib/types/invoice";

type InvoiceFormValues = z.infer<typeof invoiceSchema>;

export default function InvoiceForm() {
  const { addInvoice, updateInvoice, invoices } = useInvoices();

  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const slug = segments.at(-1);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [invoice, setInvoice] = useState<Invoice>();

  useEffect(() => {
    if (slug?.includes("INV")) {
      setInvoice(
        invoices
          .filter((it) => {
            return it.invoiceNumber === slug;
          })
          .shift()
      );
    }
  }, [slug, invoices]);

  const requestInvoiceNumber = (): string => {
    const invoiceNum = generateInvoiceNumber();

    if (invoices.findIndex((it) => it.invoiceNumber === invoiceNum) > -1) {
      return requestInvoiceNumber();
    }

    return invoiceNum;
  };

  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      name: "",
      dueDate: "",
      invoiceNumber: requestInvoiceNumber(),
    },
  });

  useEffect(() => {
    if (invoice) {
      setValue("name", invoice.name);
      setValue("dueDate", invoice.dueDate);
      setValue("amount", invoice.amount);
      setValue("invoiceNumber", invoice.invoiceNumber);
      setValue("status", invoice.status);
    }
  }, [invoice, setValue]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const onSubmit = (data: InvoiceFormValues) => {
    if (invoices.findIndex((it) => it.invoiceNumber === data.invoiceNumber) > -1) {
      data.invoiceNumber = requestInvoiceNumber();
    }

    if (invoice) {
      updateInvoice(data.invoiceNumber, data);
    } else {
      addInvoice(data);
    }
    setOpenSnackbar(true);
    reset({
      name: "",
      dueDate: "",
      invoiceNumber: requestInvoiceNumber(),
    });
  };

  return (
    <>
      <div className="bg-white shadow-xl rounded-sm">
        <Typography variant="h6" sx={{ fontFamily: "Arial", fontWeight: 600, padding: "1rem" }}>
          Invoice Form
        </Typography>
        <Divider component="div" sx={{ borderBottomWidth: "2px" }} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit, (errors) => {
              console.log("❌ handleSubmit errors:", errors);
            })(e);
          }}
          className="p-4"
        >
          <Grid2 container spacing={2}>
            <Grid2 size={6}>
              <Stack spacing={2}>
                <Stack spacing={2}>
                  <Typography variant="subtitle1">
                    Invoice Name <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <TextField
                    placeholder="Enter your invoice name"
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                </Stack>
                <Stack spacing={2}>
                  <Typography variant="subtitle1">
                    Due Date <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <TextField
                    type="date"
                    {...register("dueDate")}
                    error={!!errors.dueDate}
                    helperText={errors.dueDate?.message}
                    sx={{ "& input": { textTransform: "uppercase" } }}
                  />
                </Stack>
                <Stack spacing={2}>
                  <Typography variant="subtitle1">
                    Status <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Select
                    {...register("status")}
                    value={watch("status") || ""}
                    displayEmpty
                    error={!!errors.status}
                    renderValue={(selected): ReactNode => {
                      if (!selected) {
                        return <span style={{ color: "#aaa" }}>Choose the status</span>;
                      }
                      return <span>{`${selected}`}</span>;
                    }}
                  >
                    <MenuItem value="Paid">Paid</MenuItem>
                    <MenuItem value="Unpaid">Unpaid</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                  </Select>
                  <FormHelperText>
                    {errors.status?.message && "Please select one of the available status"}
                  </FormHelperText>
                </Stack>
              </Stack>
            </Grid2>
            <Grid2 size={6}>
              <Stack spacing={2}>
                <Stack spacing={2}>
                  <Typography variant="subtitle1">
                    Number <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <TextField
                    placeholder="Invoice Number"
                    {...register("invoiceNumber")}
                    error={!!errors.invoiceNumber}
                    helperText={errors.invoiceNumber?.message}
                    disabled
                  />
                </Stack>
                <Stack spacing={2}>
                  <Typography variant="subtitle1">
                    Amount <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Controller
                    name="amount"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <NumericFormat
                        customInput={TextField}
                        placeholder="Enter your invoice amount"
                        thousandSeparator="."
                        decimalSeparator=","
                        allowNegative={false}
                        allowLeadingZeros={false}
                        value={value ?? ""}
                        onValueChange={(values) => {
                          onChange(values.floatValue ?? "");
                        }}
                        inputRef={ref}
                        valueIsNumericString={true}
                        fullWidth
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                sx={{
                                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                                  padding: "1.7rem 2rem",
                                  borderRadius: "4px 0 0 4px",
                                  "& .MuiTypography-root": {
                                    fontWeight: 500,
                                  },
                                }}
                              >
                                Rp
                              </InputAdornment>
                            ),
                            sx: {
                              paddingLeft: 0,
                              "& .MuiOutlinedInput-input": {
                                paddingLeft: 0,
                              },
                            },
                          },
                        }}
                      />
                    )}
                  />

                  <FormHelperText>{errors.amount?.message}</FormHelperText>
                </Stack>
              </Stack>
            </Grid2>
          </Grid2>
          <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                textTransform: "none",
                padding: ".5rem 3rem",
                backgroundColor: "#3C50E0",
                color: "white",
                "&:hover": { backgroundColor: "#1932e3" },
              }}
            >
              {invoice ? (
                <>
                  <EditNoteIcon /> Update
                </>
              ) : (
                <>
                  <AddOutlinedIcon sx={{ fontSize: 12 }} /> Add
                </>
              )}{" "}
              Invoice
            </Button>
          </Stack>
        </form>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ position: "relative", marginTop: "3rem" }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
            backgroundColor: "#E1F9F0",
            borderLeftWidth: "5px",
            borderLeftColor: "#35D399",
          }}
          icon={<CheckBoxRoundedIcon sx={{ color: "#35D399" }} />}
        >
          <AlertTitle color="#004434" sx={{ fontWeight: "bold" }}>
            Invoice {invoice ? "updated" : "added"} successfully!
          </AlertTitle>
          <span style={{ color: "#637381" }}>
            You can view and manage your invoices in the &apos;My Invoices&apos; section.
          </span>
        </Alert>
      </Snackbar>
    </>
  );
}
