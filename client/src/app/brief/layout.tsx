"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { ReactNode } from "react";
import { store } from "@/store";

function layout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ToastContainer theme="dark" position="top-center" />
      {children}
    </Provider>
  );
}

export default layout;
