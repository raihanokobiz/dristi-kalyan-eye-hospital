import { ColumnDef } from "@tanstack/react-table";
import { DetailsSheet } from "./details";
import { Outlet } from "./type";

export const columns: ColumnDef<Outlet>[] = [
  {
    id: "sl",
    header: "SL",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Outlet Name",
    accessorKey: "title",
  },
  {
    header: "City",
    accessorKey: "city",
  },
  {
    header: "Area",
    accessorKey: "area",
  },
  {
    header: "Address",
    accessorKey: "address",
  },
  {
    header: "Mobile",
    cell: ({ row }) => <span>{row.original.mobile}</span>,
  },
  {
    header: "Map",
    cell: ({ row }) => (
      row.original.mapLink ? (
        <div className="w-[200px] h-[100px] overflow-hidden rounded-md border">
          <div
            dangerouslySetInnerHTML={{ __html: row.original.mapLink }}
            className="w-full h-full"
          />
        </div>
      ) : (
        <span className="text-gray-400">No map</span>
      )
    ),
  },
  {
    header: "Action",
    cell: ({ row }) => {
      return <DetailsSheet item={row.original} />;
    },
  },

];
