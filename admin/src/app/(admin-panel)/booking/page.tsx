import { ContentLayout } from "@/components/admin-panel/content-layout";
import { getAllBookings, getBookingWithPagination } from "@/services/booking";
import { CustomTable } from "../doctor/table";
import { OrderTable } from "../order-list/table";
export const revalidate = 0;
interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const BookingPage = async ({ searchParams }: Props) => {
   const page = Array.isArray(searchParams.page)
    ? searchParams.page[0]
    : searchParams.page || "1";
  const limit = Array.isArray(searchParams.limit)
    ? searchParams.limit[0]
    : searchParams.limit || "10";

  const {data} = await getBookingWithPagination(page,limit);
  console.log("hello",data);
  return (
     <ContentLayout title="Bookings">
          <OrderTable
            data={data.result.map((item:any) => item)}
            pagination={{
              page: parseInt(page),
              limit: parseInt(limit),
              total: data.pagination.total,
            }}
          />
        </ContentLayout>
  );
};

export default BookingPage; 
