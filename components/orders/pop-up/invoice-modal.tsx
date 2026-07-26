"use client";

import { useRef } from "react";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatIndianDateTime, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  CreditCard,
  Download,
  MapPin,
  Printer,
  ReceiptText,
  ShieldCheck,
  Truck,
  X,
} from "lucide-react";
import { useGetInvoiceDetailsQuery } from "@/redux/services/order-api";

type Props = {
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
};

const paymentLabels: Record<string, string> = {
  cod: "Cash on Delivery",
  card: "Credit / Debit Card",
  upi: "UPI",
  wallet: "Digital Wallet",
  razorpay: "Razorpay",
  stripe: "Stripe",
  payu: "PayU",
};

const currencyAmount = (value?: string | number | null) =>
  formatPrice(Number(value ?? 0), "INR", "en-IN");

export default function InvoiceModal({ isOpen, onClose, orderId }: Props) {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const { data: invoice, isLoading } = useGetInvoiceDetailsQuery(Number(orderId), {
    skip: !orderId,
  });

  if (!isOpen) return null;

  const order = invoice?.order;
  const items = invoice?.items ?? [];
  const address = invoice?.address;
  const transaction = invoice?.transaction;

  const downloadInvoice = async () => {
    if (!invoiceRef.current || !order) return;

    const dataUrl = await toPng(invoiceRef.current, {
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: "#ffffff",
    });

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(dataUrl);
    const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

    pdf.addImage(dataUrl, "PNG", 0, 0, pageWidth, imgHeight);

    pdf.setTextColor(226, 232, 240);
    pdf.setFontSize(42);
    pdf.text("HeavenKart", pageWidth / 2, pageHeight / 2, {
      align: "center",
      angle: 32,
    });

    pdf.save(`invoice-${order.order_no}.pdf`);
  };

  const printInvoice = () => {
    const printContent = invoiceRef.current?.innerHTML;
    if (!printContent) return;

    const newWindow = window.open("", "", "width=1100,height=900");
    newWindow?.document.write(`
      <html>
        <head>
          <title>Invoice ${order?.order_no ?? ""}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 24px;
              background: #f8fafc;
              color: #0f172a;
            }
            * { box-sizing: border-box; }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    newWindow?.document.close();
    newWindow?.focus();
    newWindow?.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="flex h-[92vh] min-w-[min(85vw,1020px)] max-w-none flex-col overflow-hidden border-0 bg-transparent p-0 shadow-none">
        <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-slate-50 text-slate-900 shadow-2xl ring-1 ring-black/10">
          <DialogHeader className="sticky top-0 z-20 border-b border-white/60 bg-white/90 px-6 py-5 backdrop-blur-xl">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <DialogTitle className="flex items-center gap-3 text-2xl font-black tracking-tight text-slate-900">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-green-900 via-green-700 to-green-500 text-white shadow-lg shadow-green-900/20">
                    <ReceiptText className="h-5 w-5" />
                  </span>
                  Invoice
                </DialogTitle>
                <p className="mt-1 text-sm text-slate-500">
                  Order #{order?.order_no ?? "-"} |{" "}
                  {order?.created_at ? formatIndianDateTime(order.created_at) : "Waiting for invoice data"}
                </p>
              </div>

              <div className="flex items-center gap-2">

                <Button
                  type="button"
                  className="h-11 rounded-full bg-green-700 px-4 text-white hover:bg-slate-800"
                  onClick={downloadInvoice}
                  disabled={isLoading || !order}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <DialogClose asChild>
                  <button
                    type="button"
                    aria-label="Close invoice"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    onClick={onClose}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </DialogClose>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.04),_transparent_42%)] p-4 sm:p-6">
            {isLoading ? (
              <div className="flex min-h-[55vh] items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white/90 text-sm text-slate-500">
                Loading invoice...
              </div>
            ) : !order ? (
              <div className="flex min-h-[55vh] items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white/90 text-sm text-slate-500">
                Invoice data is not available.
              </div>
            ) : (
              <div
                ref={invoiceRef}
                id="invoice"
                className="relative mx-auto max-w-5xl overflow-hidden rounded-[28px] bg-white p-5 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200 sm:p-8"
              >
                <div
                  className="pointer-events-none absolute inset-0 overflow-hidden select-none"
                  aria-hidden="true"
                >
                  <div className="absolute left-1/2 top-1/2 flex w-[140%] -translate-x-1/2 -translate-y-1/2 rotate-[-32deg] flex-wrap justify-center gap-x-12 gap-y-6 text-[clamp(2rem,6vw,5rem)] font-black uppercase tracking-[0.35em] text-slate-300/20">
                    {Array.from({ length: 14 }).map((_, index) => (
                      <span key={index}>HeavenKart</span>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 space-y-8">
                  <div className="flex flex-col gap-6 border-b border-slate-200 pb-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-4">


                      <div className="grid gap-3 sm:grid-cols-4">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                            Invoice Number
                          </p>
                          <p className="mt-1 text-lg font-bold text-slate-900">
                            #{order.order_no}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                            Order Status
                          </p>
                          <Badge className="mt-2 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                            {order.status}
                          </Badge>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                            <CalendarDays className="h-4 w-4 text-slate-500" />
                            Ordered On
                          </div>
                          <p className="mt-2 text-sm text-slate-600">
                            {order.created_at ? formatIndianDateTime(order.created_at) : "-"}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                            <ShieldCheck className="h-4 w-4 text-slate-500" />
                            Payment Status
                          </div>
                          <p className="mt-2 text-sm font-semibold capitalize text-slate-900">
                            {order.payment_status}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                      <div className="mb-4 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-slate-500" />
                        <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-slate-600">
                          Shipping Address
                        </h3>
                      </div>
                      <div className="space-y-1 text-sm leading-6 text-slate-700">
                        <p className="text-base font-semibold text-slate-900">{address?.person ?? "-"}</p>
                        <p>{address?.address ?? "-"}</p>
                        <p>
                          {address?.village ? `${address.village}, ` : ""}
                          {address?.block ?? ""}
                        </p>
                        <p>
                          {address?.district ? `${address.district}, ` : ""}
                          {address?.state ?? ""}
                        </p>
                        <p>{address?.country ?? "-"}</p>
                        <p className="pt-2 font-medium text-slate-900">
                          Phone: {address?.contact ?? "-"}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                        <div className="mb-4 flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-slate-500" />
                          <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-slate-600">
                            Payment Details
                          </h3>
                        </div>
                        <div className="space-y-3 text-sm text-slate-700">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-slate-500">Method</span>
                            <span className="font-semibold text-slate-900">
                              {paymentLabels[order.payment_method?.toLowerCase()] ?? order.payment_method}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-slate-500">Transaction</span>
                            <span className="font-semibold text-slate-900">
                              {transaction?.status ?? "-"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-slate-500">Delivery</span>
                            <span className="font-semibold text-slate-900">
                              {currencyAmount(order?.delhivery_charge)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-[24px] bg-slate-200 p-5 text-white shadow-lg shadow-slate-900/15">
                        <div className="mb-3 flex items-center gap-2 text-white/80">
                          <Truck className="h-4 w-4" />
                          <h3 className="text-sm font-bold uppercase tracking-[0.25em]">
                            Delivery Summary
                          </h3>
                        </div>
                        <div className="grid gap-3 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-white/70">Subtotal</span>
                            <span className="font-semibold">{currencyAmount(order.total_amount)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white/70">Discount</span>
                            <span className="font-semibold">
                              -{currencyAmount(order.total_discount)}
                            </span>
                          </div>
                          <div className="mt-2 border-t border-white/15 pt-3">
                            <div className="flex items-center justify-between">
                              <span className="text-base font-semibold">Total Payable</span>
                              <span className="text-2xl font-black">
                                {currencyAmount((Number(order.total_amount) + Number(order.total_discount)))}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-slate-200 bg-white">
                    <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-slate-600">
                          Order Items
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {items.length} {items.length === 1 ? "item" : "items"} in this order
                        </p>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                          <tr className="text-left text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                            <th className="px-5 py-4">Product</th>
                            <th className="px-5 py-4 text-center">Qty</th>
                            <th className="px-5 py-4 text-right">Price</th>
                            <th className="px-5 py-4 text-right">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                          {items.map((item) => {
                            const lineTotal =
                              Number(item.final_price || item.price || 0) * Number(item.qty || 0);

                            return (
                              <tr key={item.id} className="align-top">
                                <td className="px-5 py-4">
                                  <div className="space-y-1">
                                    <p className="font-semibold text-slate-900">
                                      {item.product?.name ?? "Unnamed product"}
                                    </p>
                                    <p className="text-sm text-slate-500">
                                      SKU #{item.product?.sku_code ?? "-"}
                                    </p>
                                  </div>
                                </td>
                                <td className="px-5 py-4 text-center text-sm font-medium text-slate-700">
                                  {item.qty}
                                </td>
                                <td className="px-5 py-4 text-right text-sm font-medium text-slate-700">
                                  {currencyAmount(item.price)}
                                </td>
                                <td className="px-5 py-4 text-right text-sm font-bold text-slate-900">
                                  {currencyAmount(lineTotal)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
                    <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-5">
                      <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-slate-600">
                        Notes
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        Thank you for shopping with HeavenKart. If you need help with your order,
                        keep this invoice handy for support, returns, or delivery follow-up.
                      </p>
                    </div>

                    <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Subtotal</span>
                          <span className="font-semibold text-slate-900">
                            {currencyAmount(order.total_amount)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Discount</span>
                          <span className="font-semibold text-emerald-600">
                            -{currencyAmount(order.total_discount)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Delivery Charge</span>
                          <span className="font-semibold text-slate-900">
                            {currencyAmount(order?.delhivery_charge)}
                          </span>
                        </div>
                        <div className="mt-3 border-t border-slate-200 pt-3">
                          <div className="flex items-center justify-between">
                            <span className="text-base font-bold text-slate-900">Grand Total</span>
                            <span className="text-2xl font-black text-slate-900">
                              {currencyAmount(order.final_amount)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
                    <div className="text-sm text-slate-500">
                      <p className="font-semibold text-slate-900">HeavenKart</p>
                      <p>Watermark and invoice branding applied automatically.</p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      <ShieldCheck className="h-4 w-4" />
                      Secure invoice copy
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
