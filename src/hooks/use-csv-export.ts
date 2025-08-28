import { useCallback } from "react";

export type CSVExportOptions<T> = {
    filename?: string;
    headers?: (keyof T)[];
};

function exportToCSV<T extends Record<string, unknown>>(
    data: T[],
    options: CSVExportOptions<T> = {},
): void {
    const {
        filename = `export-${new Date().toISOString().split("T")[0]}.csv`,
        headers,
    } = options;

    if (data.length === 0) {
        return;
    }

    // Get headers or extract from first object
    const csvHeaders = headers || (Object.keys(data[0]) as (keyof T)[]);

    const headerRow = csvHeaders.join(",");

    // Create data rows by the headings
    const dataRows = data.map((item) => {
        return csvHeaders.map((header) => String(item[header])).join(",");
    });

    const csvContent = [headerRow, ...dataRows].join("\n");
    downloadFile(csvContent, filename);
}

function downloadFile(content: string, filename: string) {
    // Create the file blob
    const blob = new Blob([content], { type: "text/csv" });

    // Create a temporary download link
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    // Set up the link for download
    link.href = url;
    link.download = filename;

    // Trigger the download
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
}

export function useCsvExport<T extends Record<string, unknown>>() {
    const exportData = useCallback(
        (data: T[], options?: CSVExportOptions<T>) => {
            if (data.length === 0) {
                return;
            }

            exportToCSV(data, options);
        },
        [],
    );

    return { exportData };
}
