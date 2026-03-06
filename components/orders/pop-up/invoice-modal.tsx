"use client";

import { useRef } from "react";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import { InvoiceData } from "../types";

type Props = {
  invoice: InvoiceData;
  isOpen: boolean;
  onClose: () => void;
};

export default function InvoiceModal({ invoice, isOpen, onClose }: Props) {
  const invoiceRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const order = invoice?.order;
  const items = invoice?.items;
  const address = invoice?.address;
  const transaction = invoice?.transaction;

  const downloadInvoice = async () => {
    if (!invoiceRef.current) return;

    const dataUrl = await toPng(invoiceRef.current, {
      pixelRatio: 2,
      cacheBust: true,
    });

    const pdf = new jsPDF("p", "mm", "a4");

    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);

    pdf.save(`invoice-${order.order_no}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      {/* Modal Container */}
      <div className="bg-white rounded-lg w-[90%] max-w-5xl max-h-[90vh] overflow-y-auto p-6 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        {/* Invoice */}
        <div ref={invoiceRef} className="bg-white p-6">

          {/* Header */}
          <div className="flex justify-between border-b pb-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">My Company</h1>
              <p>Fast Food & Cafe</p>
            </div>

            <div className="text-right">
              <p className="font-semibold">Invoice</p>
              <p>Order No: {order.order_no}</p>
              <p>
                Date:{" "}
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Address + Payment */}
          <div className="grid grid-cols-2 gap-8 mb-6">

            <div>
              <h2 className="font-semibold mb-2">Shipping Address</h2>
              <p>{address.person}</p>
              <p>{address.address}</p>
              <p>
                {address.village}, {address.block}
              </p>
              <p>
                {address.district}, {address.state}
              </p>
              <p>{address.country}</p>
              <p>Phone: {address.contact}</p>
            </div>

            <div className="text-right">
              <h2 className="font-semibold mb-2">Payment Info</h2>
              <p>Method: {order.payment_method}</p>
              <p>Status: {order.payment_status}</p>
              <p>Transaction: {transaction.status}</p>
            </div>

          </div>

          {/* Items Table */}
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-left p-2">Product</th>
                <th className="text-center p-2">Qty</th>
                <th className="text-center p-2">Price</th>
                <th className="text-center p-2">Total</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{item.product?.name}</td>
                  <td className="text-center">{item.qty}</td>
                  <td className="text-center">₹{item.price}</td>
                  <td className="text-center">
                    ₹{parseInt(item.price) * item.qty}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Summary */}
          <div className="mt-6 flex justify-end">
            <div className="w-64 border p-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.total_amount}</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span>₹{order.total_discount}</span>
              </div>

              <div className="flex justify-between font-bold border-t pt-2 mt-2">
                <span>Total</span>
                <span>₹{order.final_amount}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6 justify-end">
          <button
            onClick={downloadInvoice}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Download
          </button>
        </div>

      </div>
    </div>
  );
}