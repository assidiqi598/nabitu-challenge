export const generateInvoiceNumber = (): string => {
  return `INV${Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0")}`;
};
