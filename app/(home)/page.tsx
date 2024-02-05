import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getServerSession } from "next-auth";
import BookingItem from "../_components/booking-item";
import Header from "../_components/header";
import { db } from "../_lib/prisma";

import { Barbershop, Booking } from "@prisma/client";
import { authOptions } from "../_lib/auth";
import BarbershopItem from "./_components/barbershop-item";
import Search from "./_components/search";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({}),
    session?.user
      ? db.booking.findMany({
          where: {
            userId: (session.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          include: {
            barbershop: true,
            service: true,
          },
        })
      : Promise.resolve([]),
  ]);

  return (
    <div>
      <Header />
      <div className="px-5 pt-5">
        <h2 className="text-xl font-normal">
          Olá,{" "}
          {session?.user ? (
            <span className="font-bold">
              {session?.user.name?.split(" ")[0]}
            </span>
          ) : (
            "vamos agendar um corte hoje?"
          )}
        </h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>

      <div className="mt-6">
        <h2 className="pl-5 text-xs mb-3 font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        <div className="flex gap-3 px-5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {confirmedBookings.map((booking: Booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">
          Recomandados
        </h2>

        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop: Barbershop) => (
            <div key={barbershop.id} className="min-w-[167px] min-h-[167px]">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 mb-[4.5rem]">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">
          Populares
        </h2>

        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop: Barbershop) => (
            <div key={barbershop.id} className="min-w-[167px] min-h-[167px]">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
