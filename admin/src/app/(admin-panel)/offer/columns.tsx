import { TCategory, TCoupon } from "@/types/shared";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
// import { DetailsSheet } from "./details";
import { BASE_URL } from "@/config/config";
import { DetailsSheet } from "./details";
import { fileUrlGenerator } from "@/utils/helpers";
import { useState } from "react";
export const columns: ColumnDef<TCategory>[] = [
  {
    header: "SL",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Offer Name",
    accessorKey: "name",
  },
  {
    header: "Image",
    accessorKey: "image",
    cell: ({ row }) => {
      const { image } = row.original;
      return (
        <div className="w-20 h-20 relative">
          <Image
            src={image}
            alt="Offer"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      );
    },
  },
  {
    header: "Action",
    cell: ({ row }) => {
      return <DetailsSheet item={row.original} />;
    },
  },
 
];
