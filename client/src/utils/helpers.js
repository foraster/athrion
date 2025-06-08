export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("de-DE").format(date);
}; 

export function toCents(euroPrice) {
  const value = typeof euroPrice === "string" ? parseFloat(euroPrice) : euroPrice;
  return Math.round((value + Number.EPSILON) * 100);
}

export function fromCents(cents) {
  return (cents / 100).toFixed(2);
}

export function formatOrderId(orderId) {
  return "ATH-" + orderId.split('-')[0].toUpperCase() + '-' + orderId.split('-')[4].substring(0, 4).toUpperCase();
}

export const getUpdatedSortConfig = (currentConfig, key) => {
  const direction =
    currentConfig.key === key && currentConfig.direction === "asc"
      ? "desc"
      : "asc";
  return { key, direction };
};

export const renderSortArrow = (sortConfig, key) => {
  if (sortConfig.key === key) {
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  }
  return <span className="invisible">▲</span>;
};

export const sortArrayByKey = (array, key, direction) => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (typeof aVal === "string") {
      return direction === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    } else {
      return direction === "asc" ? aVal - bVal : bVal - aVal;
    }
  });
};