import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { TOrder } from "@/types/shared";
import { makeBDPrice } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { deleteOrderAction, UpdateOrderStatus } from "./actions";
import { confirmation } from "@/components/modals/confirm-modal";
import Image from "next/image";
import { BASE_URL } from "@/config/config";

export const quoteStatuses = [
  { key: "Cancelled", name: "Cancelled" },
  { key: "Delivered", name: "Delivered" },
  { key: "QuotePlaced", name: "QuotePlaced" },
  { key: "Pending", name: "Pending" },
  // { key: "Hold", name: "Hold" },
  // { key: "InReview", name: "InReview" },
];

export const columns: ColumnDef<TOrder>[] = [
  {
    header: "SL",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Quote ID",
    accessorKey: "quoteId",
  },
  {
    header: "Prescription",
    cell: ({ row }) => {
      const prescription = row.original.prescription;

      if (!prescription) {
        return <span className="text-gray-400">No Image</span>;
      }

      return (
        <div className="w-16 h-16 relative">
          <Image
            src={`${BASE_URL}${prescription}`}
            alt="Prescription"
            fill
            className="object-cover rounded border cursor-pointer"
            onClick={() => window.open(`${BASE_URL}${prescription}`, "_blank")}
          />
        </div>

      );
    },
  },
  {
    header: "Products Info",
    cell: ({ row }) => {
      const { products } = row.original;
      return (
        <div className="w-64 flex flex-col gap-3">
          {products?.map((item, index) => (
            <div key={index} className="p-3 border rounded-md">
              <p>{item?.productRef?.name} </p>
              <p>
                <span className="font-semibold">{item?.productRef?.price}</span>{" "}
                x <span className="font-bold">{item?.quantity}</span>
              </p>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    header: "Subtotal Price",
    accessorKey: "subTotalPrice",
    cell: ({ row }) => {
      return (
        <div className="min-w-[120px]">
          {row.original.subTotalPrice &&
            makeBDPrice(row.original.subTotalPrice)}
        </div>
      );
    },
  },
  {
    header: "Shipping Cost",
    accessorKey: "shippingCost",
    cell: ({ row }) => {
      return (
        <div className="min-w-[120px]">
          {row.original.shippingCost && makeBDPrice(row.original.shippingCost)}
        </div>
      );
    },
  },
  {
    header: "Total Price",
    accessorKey: "totalPrice",
    cell: ({ row }) => {
      return (
        <div className="min-w-[120px]">
          {row.original.totalPrice && makeBDPrice(row.original.totalPrice)}
        </div>
      );
    },
  },
  // {
  //   header: "Payment Method",
  //   accessorKey: "paymentMethod",
  //   cell: ({ row }) => {
  //     const method = row.original.paymentMethod;
  //     return (
  //       <div className="flex flex-col">
  //         <span>{method}</span>
  //         {method === "MobileBanking" && (
  //           <>
  //             <span className="mt-1">
  //               Provider: {row.original.mobileBankingProvider || "N/A"}
  //             </span>
  //             <span className="mt-1">
  //               Number: {row.original.mobileNumber || "N/A"}
  //             </span>
  //           </>
  //         )}
  //       </div>
  //     );
  //   },
  // },
  {
    header: "Customer Info",
    cell: ({ row }) => {
      return (
        <div>
          <div className="flex justify-between items-center gap-2">
            <p>Name: </p>
            <p>{row.original.customerName}</p>
          </div>
          <div className="flex justify-between items-center gap-2">
            <p>Phone: </p>
            <p>{row.original.customerPhone}</p>
          </div>
          <div className="flex justify-between items-center gap-2">
            <p>Address: </p>
            <p>{row.original.customerCity},</p>
            <p>{row.original.customerAddress}</p>
          </div>
        </div>
      );
    },
  },
  {
    header: "Quote Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const rowStatus = quoteStatuses.find((r) => {
        return r.key === row?.original?.status;
      });
      return <div>{rowStatus?.name || "N/A"}</div>;
    },
  },
  {
    header: "Action",
    cell: ({ row }) => {
      const [loading, setLoading] = React.useState(false);
      const { toast } = useToast();
      const currentStatus = row.original.status;
      const quoteId = row.original._id;

      const handleStatusChange = async (newStatus: string) => {
        if (newStatus === currentStatus) return;

        setLoading(true);
        try {
          if (quoteId) {
            const res = await UpdateOrderStatus(quoteId, newStatus);
            if (res.success) {
              toast({
                title: "Success",
                description: `Quote status updated to ${newStatus}`,
              });
            }
          }
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to update quote status",
          });
        } finally {
          setLoading(false);
        }
      };

      return (
        <div>
          <Select
            disabled={loading}
            defaultValue={currentStatus}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Update status" />
            </SelectTrigger>
            <SelectContent>
              {quoteStatuses.map((status) => (
                <SelectItem key={status.key} value={String(status.key)}>
                  {status.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    },
  },
  // {
  //   header: "Invoice",
  //   cell: ({ row }) => {
  //     const orderData = row.original;

  //     const printerRef = useRef(null);

  //     const handlePrinter = useReactToPrint({
  //       content: () => printerRef.current,
  //     });
  //     return (
  //       <div>
  //         <Button onClick={handlePrinter}>
  //           {/* <PrinterCheck /> */}
  //           <Printer />
  //         </Button>
  //         {/* Print Invoice */}
  //         <div className="hidden">
  //           {orderData && (
  //             <PrintInvoice ref={printerRef} orderData={orderData} />
  //           )}
  //         </div>
  //       </div>
  //     );
  //   },
  // },
  {
    header: "Delete",
    cell: ({ row }) => {
      const [deleting, setDeleting] = React.useState(false);
      const { _id } = row.original;
      const { toast } = useToast();

      const handleDeleteClick = async () => {
        if (await confirmation("Are you sure you want to delete this quote?")) {
          setDeleting(true);
          try {
            const deleted = await deleteOrderAction(String(_id));
            if (deleted) {
              toast({
                title: "Quote deleted successfully",
                variant: "default",
              });
              window.location.reload();
            }
          } catch (error: any) {
            toast({
              title: "Cannot delete quote",
              description: error.message,
              variant: "destructive",
            });
          } finally {
            setDeleting(false);
          }
        }
      };

      return (
        <div>
          <Button
            loading={deleting}
            onClick={handleDeleteClick}
            variant="destructive"
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
