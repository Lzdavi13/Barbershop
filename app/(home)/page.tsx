import { Barbershop, Booking } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getServerSession } from "next-auth";
import BookingItem from "../_components/booking-item";
import Header from "../_components/header";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../_components/ui/carousel";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import Search from "./_components/search";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops, recommendedBookings, confirmedBookings] =
    await Promise.all([
      db.barbershop.findMany({}),
      db.barbershop.findMany({
        orderBy: {
          id: "asc",
        },
      }),
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
      <div className="xl:h-[463px] xl:w-full xl:relative xl:bg-zinc-950/75 xl:flex xl:gap-20 2xl:gap-28">
        <div style={{ backgroundImage: "url('/homebg.svg')" }} className=" max-xl:hidden bg-cover absolute z-[-1] w-full bg-no-repeat h-full grayscale" />
        <div className="flex flex-col xl:py-16 xl:pl-14 gap-3">
          <div className="px-5 pt-5 xl:pt-0">
            <h2 className="text-xl font-normal xl:text-2xl">
              Olá,{" "}
              {session?.user ? (
                <span className="font-bold ">
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

          <div className="px-5 mt-6 xl:w-[439px] 2xl:w-[630px]">
            <Search />
          </div>

          <div className="mt-6 xl:mt-4 xl:w-[439px] 2xl:w-[630px]">
            {confirmedBookings.length > 0 && (
              <>
                <h2 className="pl-5 text-xs mb-3 uppercase text-gray-400 font-bold">
                  Agendamentos
                </h2>
                <div className="px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                  {confirmedBookings.map((booking: Booking) => (
                    <BookingItem key={booking.id} booking={booking} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="max-xl:hidden py-16 pr-14">
          <h2 className="text-xs mb-3 uppercase text-gray-400 font-bold ml-1">
            Recomendados
          </h2>

          <Carousel className="w-full xl:max-w-[600px] 2xl:max-w-[950px]">
            <CarouselContent className="-ml-1">
              {barbershops.map((barbershop: Barbershop) => (
                <CarouselItem key={barbershop.id} className="pl-1 xl:basis-1/3 2xl:basis-1/5">
                  <BarbershopItem barbershop={barbershop} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

      </div>

      <div className="mt-6">
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

      <div className="mt-6 mb-[4.5rem]">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">
          Mais Visitados
        </h2>

        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {recommendedBookings.map((barbershop: Barbershop) => (
            <div key={barbershop.id} className="min-w-[167px] min-h-[167px]">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
