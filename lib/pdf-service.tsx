import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { InvoicePDF, type InvoicePDFProps } from "@/lib/invoice-pdf";

/**
 * Generates a PDF Buffer from the Invoice data.
 * * @param data - The invoice data matching the InvoicePDF component props
 * @returns A Promise that resolves to a Buffer (Node.js) containing the PDF
 */
export async function generateInvoiceBuffer(data: InvoicePDFProps): Promise<Buffer> {
  // We use the spread operator {...data} to pass all props down efficiently
  return await renderToBuffer(<InvoicePDF {...data} />);
}