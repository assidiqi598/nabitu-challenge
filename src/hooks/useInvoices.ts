"use client";

import { useState, useEffect, useRef } from "react";
import { Invoice } from "@/lib/types/invoice";

// Local Storage Key
const STORAGE_KEY = "invoices_data";

export default function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const isMounted = useRef(false);

  useEffect(() => {
    const storedInvoices = localStorage.getItem(STORAGE_KEY);
    if (storedInvoices) {
      if (!isMounted.current) setInvoices(JSON.parse(storedInvoices));
    } else {
      fetch("/api/invoices")
        .then((res) => res.json())
        .then((data: Invoice[]) => {
          setInvoices(data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        })
        .catch((err) => console.error("Failed to fetch invoices:", err));
    }
    isMounted.current = true;
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
  }, [invoices]);

  // Function to add an invoice
  const addInvoice = (newInvoice: Invoice) => {
    setInvoices((prev) => [...prev, newInvoice]);
  };

  // Function to delete an invoice
  const deleteInvoice = (invoiceNumber: string) => {
    setInvoices((prev) => prev.filter((invoice) => invoice.invoiceNumber !== invoiceNumber));
  };

  // Function to edit/update an invoice
  const updateInvoice = (invoiceNumber: string, updatedInvoice: Partial<Invoice>) => {
    setInvoices((prev) =>
      prev.map((invoice) =>
        invoice.invoiceNumber === invoiceNumber ? { ...invoice, ...updatedInvoice } : invoice
      )
    );
  };

  return {
    invoices,
    addInvoice,
    deleteInvoice,
    updateInvoice,
  };
}
