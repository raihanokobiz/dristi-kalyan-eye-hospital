
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { DetailsSheet } from "./details";
import { TDoctor } from "./types";


export const doctorColumns: ColumnDef<TDoctor>[] = [
  {
    header: "SL",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Image",
    accessorKey: "image",
    cell: ({ row }) => {
      // const imageUrl = row.original.image;
      const imageUrl = row.original.image ?? "/placeholder.png";

      return (
        <div className="w-20 h-20 relative">
          <Image
            src={imageUrl}
            alt={row.original.name}
            fill
            className="object-cover rounded-lg"
          />

        </div>
      );
    },
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Degree",
    accessorKey: "degree",
  },
  {
    header: "Visiting Time",
    accessorKey: "visitingTime",
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Available Days",
    accessorKey: "availableDays",
    cell: ({ row }) => row.original.availableDays.join(", "),
  },
  {
    header: "Consultation Fee",
    accessorKey: "consultationFee",
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
