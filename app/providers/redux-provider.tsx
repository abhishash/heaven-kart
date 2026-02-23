"use client";
import { store } from "@/components/elements/store/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

export default function ReduxProviders({ children } : {
    children: ReactNode
}) {
  return <Provider store={store}>{children}</Provider>;
}