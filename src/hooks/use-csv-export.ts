import { useCallback } from "react";

export type CSVExportOptions<T> = {
  filename?: string;
  headers?: (keyof T)[];
};

function exportToCSV<T extends Record<string, any>>(
  data: T[],
  options: CSVExportOptions<T> = {}
): void {
  const {
    filename = `export-${new Date().toISOString().split("T")[0]}.csv`,
    headers,
  } = options;

  if (data.length === 0) {
    return;
  }

  const csvHeaders = headers || (Object.keys(data[0]) as (keyof T)[]);

  const headerRow = csvHeaders.join(",");

  const dataRows = data.map((item) => {
    return csvHeaders.map((header) => String(item[header])).join(",");
  });

  const csvContent = [headerRow, ...dataRows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function useCsvExport<T extends Record<string, any>>() {
  const exportData = useCallback((data: T[], options?: CSVExportOptions<T>) => {
    if (data.length === 0) {
      return;
    }

    exportToCSV(data, options);
  }, []);

  return { exportData };
}
