"use client";
import { Prisma } from "@prisma/client";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { cancelBooking } from "../_actions/cancel-booking";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

function BookingItem({ booking }: BookingItemProps) {
  const isBookingConfirmed = isFuture(booking.date);
  const [isDeleteLoading, SetIsDeleteLoading] = useState<boolean>(false);

  const handleCancelClick = async () => {
    try {
      SetIsDeleteLoading(true);
      await cancelBooking(booking.id);

      toast.success("Reserva cancelada com sucesso!");
    } catch (error) {
      console.log(error);
    } finally {
      SetIsDeleteLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-full">
          <CardContent className="px-0 flex justify-between py-0">
            <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
              <Badge
                variant={isBookingConfirmed ? "default" : "secondary"}
                className="w-fit"
              >
                {isBookingConfirmed ? "Confirmado" : "Finalizada"}
              </Badge>

              <h2 className="font-semibold text-base">
                {booking.service.name}
              </h2>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.barbershop.imageUrl} />
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <h3>{booking.barbershop.name}</h3>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 border-l border-solid border-secondary">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", {
                  locale: ptBR,
                })}
              </p>
              <p className="text-2xl">{format(booking.date, "dd")}</p>
              <p className="text-sm">{format(booking.date, "hh:mm")}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="px-0">
        <SheetHeader className="text-left border-b border-solid border-secondary pb-6 px-5">
          <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="px-5">
          <div className="relative h-[180px] w-full mt-6">
            <Image
              src="/barbershop-map.png"
              alt={booking.barbershop.name}
              fill
            />

            <div className="absolute left-0 w-full bottom-4 px-5">
              <Card>
                <CardContent className="p-3 flex gap-3 items-center">
                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl} />
                  </Avatar>
                  <div>
                    <h2 className="font-bold text-base">
                      {booking.barbershop.name}
                    </h2>
                    <h3 className="text-xs text-nowrap overflow-hidden text-ellipsis">
                      {booking.barbershop.address}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge
            variant={isBookingConfirmed ? "secondary" : "default"}
            className="w-fit mt-6 mb-3"
          >
            {isBookingConfirmed ? "Finalizado" : "Confirmado"}
          </Badge>

          <Card>
            <CardContent className="p-3 flex flex-col gap-3">
              <div className="flex justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <p className="font-semibol text-sm">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </p>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400">Data</h3>
                <p className="text-sm">
                  {format(booking.date, "dd 'de' MMMM", { locale: ptBR })}
                </p>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400">Horário</h3>
                <p className="text-sm">{format(booking.date, "hh:mm")}</p>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400">Barbearia</h3>
                <p className="text-sm">{booking.barbershop.name}</p>
              </div>
            </CardContent>
          </Card>

          <SheetFooter className="flex-row gap-3 mt-8">
            <SheetClose asChild>
              <Button variant="secondary" className="w-full">
                Voltar
              </Button>
            </SheetClose>
            <Button
              disabled={!isBookingConfirmed || isDeleteLoading}
              variant="destructive"
              className="w-full"
              onClick={handleCancelClick}
            >
              {isDeleteLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Cancelar Reserva
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default BookingItem;
