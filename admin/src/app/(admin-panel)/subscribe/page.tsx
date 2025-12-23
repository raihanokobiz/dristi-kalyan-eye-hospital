import { ContentLayout } from "@/components/admin-panel/content-layout";
import React from "react";
import { CustomTable } from "./table";
import { getSubscribeWithPagination } from "./subscribe";

export const revalidate = 0;

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function SubscribePage({ searchParams }: Props) {
  const page = Array.isArray(searchParams.page)
    ? searchParams.page[0]
    : searchParams.page || "1";
  const limit = Array.isArray(searchParams.limit)
    ? searchParams.limit[0]
    : searchParams.limit || "10";

  const { data } = await getSubscribeWithPagination(page, limit);

  

  return (
    <ContentLayout title="Subscribe">
      <CustomTable
        data={data.result.map((item) => ({
          ...item,
          // image: fileUrlGenerator(String(item.image)),
          // vectorImage: fileUrlGenerator(String(item.vectorImage)),
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
