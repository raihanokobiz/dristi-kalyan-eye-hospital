import { ContentLayout } from "@/components/admin-panel/content-layout";
import CreateForm from "./form"
import { CustomTable } from "./table";
import { getOutletWithPagination } from "@/services/outlet";

interface Props {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

export default async function OutletPage({ searchParams }: Props) {


    const page = Array.isArray(searchParams.page)
        ? searchParams.page[0]
        : searchParams.page || "1";
    const limit = Array.isArray(searchParams.limit)
        ? searchParams.limit[0]
        : searchParams.limit || "10";

    const { data } = await getOutletWithPagination(page, limit);

    console.log(data, "ok");
    


    return (
        <ContentLayout title="Outlet" >
            <CreateForm />
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
    )
}
