"use client"
import { Provider } from "react-redux";
import { ReactNode } from "react";
import { store } from "@/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ToastContainer theme="dark" position="top-center" />
      {children}
    </Provider>
  );
}
