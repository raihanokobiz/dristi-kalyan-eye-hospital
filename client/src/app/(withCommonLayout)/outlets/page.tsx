
import { getAllOutlet } from ".";
import { Outlet } from "./Outlet";


export default async function OutletPage() {

 const data = await getAllOutlet()

  return (
    <section className="max-w-6xl mx-auto bg-white Container mt-20">
      <div className="">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-serif italic text-gray-800 text-center mb-8">
          Our Outlets
        </h2>
      </div>
      <Outlet data={data} />
    </section>
  )
}
