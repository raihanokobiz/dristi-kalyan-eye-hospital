import { ContentLayout } from "@/components/admin-panel/content-layout";
import { getQuoteWithPagination } from "./quote";
import React from "react";
import { QuoteTable } from "./table";
import { fileUrlGenerator } from "@/utils/helpers";

export const revalidate = 0;

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function QuotesPage({ searchParams }: Props) {
  const page = Array.isArray(searchParams.page)
    ? searchParams.page[0]
    : searchParams.page || "1";
  const limit = Array.isArray(searchParams.limit)
    ? searchParams.limit[0]
    : searchParams.limit || "10";

  const { data } = await getQuoteWithPagination(page, limit);

  return (
    <ContentLayout title="Quote">
      <QuoteTable
        data={data.result.map((item) => item)}
        pagination={{
          page: parseInt(page),
          limit: parseInt(limit),
          total: data.pagination.total,
        }}
      />
    </ContentLayout>
  );
}
