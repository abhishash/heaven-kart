"use client";

import { fetchHandler } from "@/lib/fetch-handler";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { InvoiceResponse } from "../types";
import { useSession } from "next-auth/react";
import html2pdf from "html2pdf.js";

type Props = {
  orderId: number;
  open: boolean;
  setOpen: (v: boolean) => void;
};

export default function InvoiceModal({ orderId, open, setOpen }: Props) {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  const { data, isPending } = useQuery<InvoiceResponse>({
    queryKey: ["invoice", orderId],
    enabled: !!orderId && open,
    queryFn: () =>
      fetchHandler({
        endpoint: `orders/${orderId}/invoice`,
        method: "GET",
        token: session?.user?.accessToken,
      }),
  });

  const invoice = data?.data;

  const downloadPDF = () => {
    if (!invoiceRef.current) return;

    const element = invoiceRef.current;

    const opt = {
      margin: 10,
      filename: `invoice-${invoice?.order?.order_no}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };

    html2pdf().set(opt).from(element).save();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[900px] max-h-[90vh] overflow-auto p-6 rounded-lg">

        {/* Header Buttons */}
        <div className="flex justify-end gap-3 mb-4">
          <button
            onClick={downloadPDF}
            className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
          >
            Download PDF
          </button>

          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Close
          </button>
        </div>

        {/* Invoice */}
        <div ref={invoiceRef} >

         <h1>pring incocd</h1>

        </div>
      </div>
    </div>
  );
}