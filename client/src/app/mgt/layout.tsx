"use client";
import { store } from "@/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ToastContainer position="top-right" theme="dark" />
      {children}
    </Provider>
  );
}
