"use client";

import { useState, useEffect } from "react";
import { Invoice } from "@/lib/types/invoice";

// Local Storage Key
const STORAGE_KEY = "invoices_data";

export default function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  // Load invoices from localStorage on mount
  useEffect(() => {
    const storedInvoices =
      localStorage.getItem(STORAGE_KEY);
    if (storedInvoices) {
      setInvoices(JSON.parse(storedInvoices));
    }
  }, []);

  // Save invoices to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(invoices)
    );
  }, [invoices]);

  // Function to add an invoice
  const addInvoice = (newInvoice: Invoice) => {
    setInvoices((prev) => [...prev, newInvoice]);
  };

  // Function to delete an invoice
  const deleteInvoice = (invoiceNumber: string) => {
    setInvoices((prev) =>
      prev.filter(
        (invoice) => invoice.invoiceNumber !== invoiceNumber
      )
    );
  };

  // Function to edit/update an invoice
  const updateInvoice = (
    invoiceNumber: string,
    updatedInvoice: Partial<Invoice>
  ) => {
    setInvoices((prev) =>
      prev.map((invoice) =>
        invoice.invoiceNumber === invoiceNumber
          ? { ...invoice, ...updatedInvoice }
          : invoice
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
