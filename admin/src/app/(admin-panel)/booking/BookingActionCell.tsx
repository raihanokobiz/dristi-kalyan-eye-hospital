"use client";

import React from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { confirmation } from "@/components/modals/confirm-modal";
import { deleteBookingAction, updateBookingStatusAction } from "./actions";

export const bookingStatuses = [
    { key: "pending", name: "Pending" },
    { key: "approved", name: "Approved" },
    { key: "cancelled", name: "Cancelled" },
    { key: "completed", name: "Completed" },
];



interface Props {
    bookingId: string;
    currentStatus?: string;
}

const BookingActionCell: React.FC<Props> = ({ bookingId, currentStatus }) => {
    const { toast } = useToast();
    const [loading, setLoading] = React.useState(false);
    const [deleting, setDeleting] = React.useState(false);

    const handleStatusChange = async (newStatus: string) => {
        if (newStatus === currentStatus) return;
        setLoading(true);
        try {
            const res = await updateBookingStatusAction(bookingId, newStatus);
            if (res.success) {
                toast({ title: "Success", description: `Booking status updated to ${newStatus}` });
            }
        } catch {
            toast({ variant: "destructive", title: "Error", description: "Failed to update status" });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!(await confirmation("Are you sure you want to delete this booking?"))) return;
        setDeleting(true);
        try {
            await deleteBookingAction(bookingId);
            toast({ title: "Booking deleted successfully" });
            window.location.reload();
        } catch (error: any) {
            toast({ variant: "destructive", title: "Delete failed", description: error.message });
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="flex flex-col gap-2 min-w-[160px]">
            <Select disabled={loading} defaultValue={currentStatus} onValueChange={handleStatusChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Update status" />
                </SelectTrigger>
                <SelectContent>
                    {bookingStatuses.map((status) => (
                        <SelectItem key={status.key} value={status.key}>
                            {status.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Button size="sm" variant="destructive" loading={deleting} onClick={handleDelete}>
                Delete
            </Button>
        </div>
    );
};

export default BookingActionCell;
