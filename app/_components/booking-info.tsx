import { Booking, Service } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent } from "./ui/card";

interface BookingInfoProps {
  booking: Partial<Pick<Booking, "date">> & {
    service: Pick<Service, "name" | "price">;
    barbershop: Pick<Booking, "name">;
  };
}

function BookingInfo({ booking }: BookingInfoProps) {
  return (
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

        {booking.date && (
          <>
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
          </>
        )}

        <div className="flex justify-between">
          <h3 className="text-gray-400">Barbearia</h3>
          <p className="text-sm">{booking.barbershop.name}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default BookingInfo;
