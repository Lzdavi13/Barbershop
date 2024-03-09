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
      <div className="xl:h-[463px] lg:h-[370px] w-full relative xl:bg-zinc-950/75 lg:flex lg:max-xl:flex lg:max-xl:gap-20 2xl:gap-28 items-center">
        <div style={{ backgroundImage: "url('/homebg.svg')" }} className=" max-lg:hidden bg-cover absolute z-[-1] w-full bg-no-repeat h-full grayscale" />
        <div className="flex flex-col lg:pl-10 xl:py-16 xl:pl-14 gap-3">
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

          <div className="px-5 mt-6 lg:mt-4 xl:w-[439px] lg:w-[370px] 2xl:w-[630px]">
            <Search />
          </div>

          <div className="mt-6 lg:mt-3 xl:mt-4 xl:w-[439px] lg:w-[370px] 2xl:w-[630px]">
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

        <div className="max-lg:hidden lg:pr-10 py-16 pr-14 mx-auto">
          <h2 className="text-xs mb-3 uppercase text-gray-400 font-bold ml-1">
            Recomendados
          </h2>

          <Carousel className="w-full lg:max-w-[400px] xl:max-w-[600px] 2xl:max-w-[950px]">
            <CarouselContent className="-ml-1">
              {barbershops.map((barbershop: Barbershop) => (
                <CarouselItem key={barbershop.id} className="pl-1 lg:basis-1/2 xl:basis-1/3 2xl:basis-1/5">
                  <BarbershopItem barbershop={barbershop} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="max-lg:hidden" />
            <CarouselNext className="max-lg:hidden" />
          </Carousel>
        </div>

      </div>


      <div className="flex flex-col gap-6 items-center pb-24">
        <div className="pt-10">

          <h2 className="text-xs mb-3 uppercase text-gray-400 font-bold ml-1">
            Populares
          </h2>
          <Carousel className="w-full max-w-[330px] md:max-w-[650px] lg:max-w-[750px] xl:max-w-[1100px] 2xl:min-w-[1500px]">
            <CarouselContent className="-ml-1 xl:gap-1 gap-2">
              {barbershops.map((barbershop: Barbershop) => (
                <CarouselItem key={barbershop.id} className="pl-1 basis-[49%] md:basis-[24%] lg:basis-[24%] xl:basis-1/5 2xl:basis-[13.999999%]">
                  <BarbershopItem barbershop={barbershop} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="max-lg:hidden" />
            <CarouselNext className="max-lg:hidden" />
          </Carousel>
        </div>

        <div className="pt-10">

          <h2 className="text-xs mb-3 uppercase text-gray-400 font-bold ml-1">
            Mais visitados
          </h2>
          <Carousel className="w-full max-w-[320px] md:max-w-[650px] lg:max-w-[750px] xl:max-w-[1100px] 2xl:min-w-[1500px]">
            <CarouselContent className="-ml-1 xl:gap-1 gap-2">
              {barbershops.map((barbershop: Barbershop) => (
                <CarouselItem key={barbershop.id} className="pl-1 basis-[49%] md:basis-[24%] lg:basis-[24%] xl:basis-1/5 2xl:basis-[13.999999%]">
                  <BarbershopItem barbershop={barbershop} />
                </CarouselItem>
              ))}
            </CarouselContent >
            <CarouselPrevious className="max-lg:hidden" />
            <CarouselNext className="max-lg:hidden" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
