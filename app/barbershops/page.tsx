import { Barbershop } from "@prisma/client";
import { redirect } from "next/navigation";
import BarbershopItem from "../(home)/_components/barbershop-item";
import Search from "../(home)/_components/search";
import Header from "../_components/header";
import { db } from "../_lib/prisma";

interface BarbershosPageProps {
  searchParams: {
    search?: string;
  };
}

async function BarbershopsPage({ searchParams }: BarbershosPageProps) {
  if (!searchParams.search) {
    return redirect("/");
  }

  const barbershops: Barbershop[] = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
  });

  return (
    <>
      <Header />

      <div className="px-5 py-6 flex flex-col gap-6">
        <Search defaultValues={{ search: searchParams.search }} />

        <h1 className="font-bold text-sm uppercase text-gray-400">
          Resultados para &quot;{searchParams.search}&quot;
        </h1>

        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="w-full">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BarbershopsPage;
