"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TBooking } from "./type";
import BookingActionCell from "./BookingActionCell";


export const columns: ColumnDef<TBooking>[] = [
  { header: "SL", cell: ({ row }) => row.index + 1 },
  {
    accessorKey: "createdAt", header: "Created", cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString()
  },
  { accessorKey: "patientName", header: "Patient Name" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "appointmentDate", header: "Date" },
  { accessorKey: "appointmentDay", header: "Day" },
  { accessorKey: "age", header: "Age" },
  {
    accessorKey: "problem", header: "Problem", cell: ({ row }) => (
      <span className="line-clamp-2 max-w-[200px] block">{row.original.problem}</span>
    )
  },
  {
    accessorKey: "status", header: "Status", cell: ({ row }) => (
      <span className="rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-700">
        {row.original.status?.[0] || "Pending"}
      </span>
    )
  },
  {
    header: "Action", cell: ({ row }) => (
      <BookingActionCell bookingId={row.original._id} currentStatus={row.original.status?.[0]} />
    )
  }
];
