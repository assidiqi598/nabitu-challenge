"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { TextField, MenuItem, Select, InputAdornment } from "@mui/material";
import { FC, useState } from "react";
import { ExpandMore, Search } from "@mui/icons-material";

const statusOptions = ["All", "Paid", "Pending", "Unpaid"];

const InvoiceFilters: FC = () => {
  const searchParams = useSearchParams();

  // Get current query params
  const currentSearch = searchParams.get("search") || "";
  const currentStatus = searchParams.get("status") || "All";

  // Local state to handle input changes
  const [search, setSearch] = useState(currentSearch);
  const [status, setStatus] = useState(currentStatus);

  const router = useRouter();

  // Function to update URL query params
  const updateQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <TextField
        size="small"
        placeholder="Search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          updateQueryParams("search", e.target.value);
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& input::placeholder": {
            fontSize: "14px",
            fontWeight: 500,
            color: "#999",
            opacity: 1,
          },
          backgroundColor: "#ffffff",
          borderRadius: "0.5rem",
          "& fieldset": { border: "none" },
        }}
      />

      <Select
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          updateQueryParams("status", e.target.value);
        }}
        IconComponent={ExpandMore}
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "0.5rem",
          width: "50%",
          paddingY: "0.2rem",
          "& .MuiSelect-select": {
            padding: "8px 16px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          fontSize: "13px",
          color: "#7E7E7E",
        }}
        renderValue={(value) => `${value} Status`}
      >
        {statusOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default InvoiceFilters;
