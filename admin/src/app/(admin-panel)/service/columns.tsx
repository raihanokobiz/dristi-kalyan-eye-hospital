
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { DetailsSheet } from "./details";
import { TService } from "./types";

export const serviceColumns: ColumnDef<TService>[] = [
  {
    header: "SL",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Image",
    accessorKey: "image",
    cell: ({ row }) => {
      const imageUrl = row.original.image;
      return (
        <div className="w-20 h-20 relative">
          <Image
            src={imageUrl || "/placeholder.png"}
            alt={row.original.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      );
    },
  },
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Description",
    accessorKey: "description",
    cell: ({ row }) => (
      <div className="max-w-xs truncate">{row.original.description}</div>
    ),
  },
  {
    header: "Price",
    accessorKey: "price",
    cell: ({ row }) => `৳${row.original.price}`,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => (
      <span className={row.original.status ? "text-green-600" : "text-red-600"}>
        {row.original.status ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    header: "Action",
    cell: ({ row }) => <DetailsSheet item={row.original} />,
  },
];
