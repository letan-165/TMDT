export const formatVND = (value: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

export function formatTime(utcDateString: string): string {
  if (!utcDateString) return "Trống";
  const utcDate = new Date(utcDateString);
  const vnTime = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);

  const year = vnTime.getFullYear();
  const month = String(vnTime.getMonth() + 1).padStart(2, "0");
  const day = String(vnTime.getDate()).padStart(2, "0");
  const hours = String(vnTime.getHours()).padStart(2, "0");
  const minutes = String(vnTime.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
}
