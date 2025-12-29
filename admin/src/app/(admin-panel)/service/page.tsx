import { ContentLayout } from "@/components/admin-panel/content-layout";
import React from "react";
import { CustomTable } from "./table";
import { CreateForm } from "./form";
import { getServiceWithPagination } from "./service";


export const revalidate = 0;

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function DoctorPage({ searchParams }: Props) {
  const page = Array.isArray(searchParams.page)
    ? searchParams.page[0]
    : searchParams.page || "1";
  const limit = Array.isArray(searchParams.limit)
    ? searchParams.limit[0]
    : searchParams.limit || "10";

  const { data } = await getServiceWithPagination(page, limit);

  return (
    <ContentLayout title="Service">
      <CreateForm />
      <CustomTable
        data={data.result.map((item: any) => ({
          ...item,
        }))}
        pagination={{
          page: parseInt(page),
          limit: parseInt(limit),
          total: data.pagination.total,
        }}
      />
    </ContentLayout>
  );
}
