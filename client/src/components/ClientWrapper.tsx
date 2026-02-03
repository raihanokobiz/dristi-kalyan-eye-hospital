"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MessengerBtn from "@/shared/MessengerBtn/MessengerBtn";
import { useChunkErrorHandler } from "@/hooks/useChunkErrorHandler";

export default function ClientWrapper() {
  // Handle chunk loading errors automatically
  useChunkErrorHandler();

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-11 md:mt-18"
      />
      <MessengerBtn />
    </>
  );
}