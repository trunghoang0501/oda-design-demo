export const formatCurrency = (value: number, short = false): string => {
  if (short) {
    if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(0)}M`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
    return value.toString();
  }
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("vi-VN").format(value);
};

export const formatPercent = (value: number): string => {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
};

export const getTrendColor = (value: number): string => {
  if (value > 0) return "#4CAF50";
  if (value < 0) return "#F44336";
  return "#9E9E9E";
};

export const getTrendIcon = (value: number): "▲" | "▼" | "—" => {
  if (value > 0) return "▲";
  if (value < 0) return "▼";
  return "—";
};
