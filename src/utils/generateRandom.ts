export const generateInvoiceNumber = (): string => {
  return `INV${Math.floor(Math.random() * 10000)}`;
};
