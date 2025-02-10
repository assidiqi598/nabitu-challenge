export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, // No decimal places for IDR
  }).format(amount);
};

export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    day: "numeric",
  }).format(new Date(date));
};
