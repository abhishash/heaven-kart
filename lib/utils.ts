import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number, currencyCode = "USD", locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
}


import crypto from "crypto";

const algorithm = "aes-256-cbc";
const secretKey = process.env.ENCRYPTION_KEY as string; // 32 chars
const iv = crypto.randomBytes(16);

export const encodeId = (id: number) => {
  return btoa(id.toString());
};


export const decodeId = (encodedId : string) => {
  return atob(encodedId);
};