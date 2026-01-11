"use client";

import React, { useMemo } from "react";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Label } from "@radix-ui/react-label";
import { Card } from "@/components/ui/card";

import { columns } from "./columns";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { TBooking } from "./type";

interface Props {
    data: TBooking[];
    pagination: {
        page: number;
        limit: number;
        total: number;
    };
}

export const BookingTable: React.FC<Props> = ({ data, pagination }) => {
    const paginationState = useMemo(
        () => ({
            pageIndex: pagination.page - 1,
            pageSize: pagination.limit,
        }),
        [pagination.page, pagination.limit]
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount: Math.ceil(pagination.total / pagination.limit),
        state: {
            pagination: paginationState,
        },
    });

    return (
        <Card className="m-6 w-full rounded-lg">
            <div className="flex items-center justify-between p-4">
                <Label className="text-xl font-semibold">Booking List</Label>
            </div>

            <div className="mx-4 mb-4 overflow-hidden rounded-lg border">
                <div className="max-h-[1000px] overflow-auto">
                    <Table className="min-w-full">
                        <TableHeader className="sticky top-0 z-10 bg-primary">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className={
                                                (header.column.columnDef.meta as any)?.align
                                                    ? `h-10 whitespace-nowrap text-${(header.column.columnDef.meta as any)?.align} text-white`
                                                    : "h-10 whitespace-nowrap text-white"
                                            }
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>

                        <TableBody>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className={
                                                    (cell.column.columnDef.meta as any)?.align
                                                        ? `py-2 whitespace-nowrap text-${(cell.column.columnDef.meta as any)?.align}`
                                                        : "py-2 whitespace-nowrap"
                                                }
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No bookings found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <DataTablePagination table={table} />
        </Card>
    );
};
