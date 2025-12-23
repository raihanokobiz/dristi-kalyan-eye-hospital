import { ColumnDef } from "@tanstack/react-table";
import { DetailsSheet } from "./details";
import { TSubscribe } from "./type";

export const columns: ColumnDef<TSubscribe>[] = [
  {
    header: "SL",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Action",
    cell: ({ row }) => {
      return <DetailsSheet item={row.original} />;
    },
  },
];
