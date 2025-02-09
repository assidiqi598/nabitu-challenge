"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { invoiceSchema } from "@/lib/schemas/invoiceSchema";
import { z } from "zod";
import { useState } from "react";
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
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import useInvoices from "@/hooks/useInvoices";
import { generateInvoiceNumber } from "@/utils/generateRandom";
import { NumericFormat } from "react-number-format";

type InvoiceFormValues = z.infer<typeof invoiceSchema>;

export default function InvoiceForm() {
  const { addInvoice, invoices } = useInvoices();
  const {
    control,
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
      status: undefined,
    },
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

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
    reset();
  };

  return (
    <div className="bg-white shadow-xl rounded-sm">
      <Typography variant="h6" sx={{ fontFamily: "Arial", fontWeight: 600, padding: "1rem" }}>
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
                  placeholder="Invoice Name"
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
                  displayEmpty
                  error={!!errors.status}
                  defaultValue=""
                >
                  <MenuItem value="" disabled>
                    Choose the status
                  </MenuItem>
                  <MenuItem value="Paid">Paid</MenuItem>
                  <MenuItem value="Unpaid">Unpaid</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                </Select>
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
                  defaultValue={requestInvoiceNumber()}
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
                      placeholder="Amount"
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
                                backgroundColor: "rgba(0, 0, 0, 0.05)", // Match input background
                                padding: "2rem 2rem", // Adjust spacing
                                borderRadius: "4px 0 0 4px", // Match input field border radius
                                "& .MuiTypography-root": {
                                  fontWeight: 500, // Make text a bit bolder
                                },
                              }}
                            >
                              Rp
                            </InputAdornment>
                          ),
                          sx: {
                            paddingLeft: 0, // Remove padding from OutlinedInput
                            "& .MuiOutlinedInput-input": {
                              paddingLeft: 0, // Remove padding from input inside
                            },
                          },
                        },
                      }}
                    />
                  )}
                />

                <FormHelperText>{errors.status?.message}</FormHelperText>
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
            <AddOutlinedIcon sx={{ fontSize: 12 }} /> Add Invoice
          </Button>
        </Stack>

        {/* Success Snackbar */}
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
              Invoice added successfully!
            </AlertTitle>
            <span style={{ color: "#637381" }}>
              You can view and manage your invoices in the 'My Invoices' section.
            </span>
          </Alert>
        </Snackbar>
      </form>
    </div>
  );
}
