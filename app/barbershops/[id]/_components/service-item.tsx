"use client";

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Barbershop, Booking, Service } from "@prisma/client";
import { format, setHours, setMinutes } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2 } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { getDayBookings } from "../_actions/get-day-bookings";
import { saveBooking } from "../_actions/save-booking";
import { generateDayTimeList } from "../_helpers/hours";

interface ServiceItemProps {
  barbershop: Barbershop;
  service: Service;
  isAuthenticated: boolean;
}

function ServiceItem({
  barbershop,
  service,
  isAuthenticated,
}: ServiceItemProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>();
  const [submitIsLoading, setSubmitIsLoading] = useState<boolean>(false);
  const [sheetIsOpen, setSheetIsOpen] = useState<boolean>(false);
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  const router = useRouter();
  const { data } = useSession();

  useEffect(() => {
    if (!date) {
      return;
    }

    const refreshAvailableHours = async () => {
      const _dayBookings = await getDayBookings(barbershop.id, date);

      setDayBookings(_dayBookings);
    };

    refreshAvailableHours();
  }, [date, barbershop.id]);

  const handleHourClick = (time: string) => {
    setHour(time);
  };

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return signIn("google");
    }
  };

  const handleBookingSubmit = async () => {
    try {
      if (!hour || !date || !data?.user) {
        return;
      }
      setSubmitIsLoading(true);

      const dateHour = Number(hour?.split(":")[0]);
      const dateMinutes = Number(hour?.split(":")[1]);

      const newDate = setMinutes(setHours(date as Date, dateHour), dateMinutes);

      await saveBooking({
        barbershopId: barbershop.id,
        serviceId: service.id,
        userId: (data.user as any).id,
        date: newDate,
      });

      setSheetIsOpen(false);

      setHour(undefined);
      setDate(undefined);

      toast("Reserva realizada com sucesso!", {
        description: format(newDate, "'Para' dd 'de' MMMM 'ás' HH':'mm'.'", {
          locale: ptBR,
        }),
        action: {
          label: "Visualizar",
          onClick: () => router.push("/bookings"),
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitIsLoading(false);
    }
  };

  const timeList = useMemo(() => {
    if (!date) {
      return [];
    }

    return generateDayTimeList(date).filter((time) => {
      const timeHour = Number(time.split(":")[0]);
      const timeMinutes = Number(time.split(":")[1]);

      const booking = dayBookings.find((booking) => {
        const bookingHour = booking.date.getHours();
        const bookingMinutes = booking.date.getMinutes();

        return bookingHour === timeHour && bookingMinutes === timeMinutes;
      });

      if (!booking) {
        return true;
      }

      return false;
    });
  }, [date, dayBookings]);

  return (
    <Card>
      <CardContent className="p-3 w-full">
        <div className="flex items-centerr gap-4 w-full">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
            <Image
              className="rounded-lg"
              src={service.imageUrl}
              alt={service.name}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="w-full">
            <h2 className="font-bold tex-sm">{service.name}</h2>
            <p className="text-sm text-gray-400 ">{service.description}</p>

            <div className="flex items-center justify-between mt-3">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>

              {/* <Button variant="outline">Reservar</Button> */}

              <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="secondary" onClick={handleBookingClick}>
                    Reservar
                  </Button>
                </SheetTrigger>
                <SheetContent className="p-0 overflow-auto">
                  <SheetHeader className="px-5 py-4 text-left border-b border-solid boder-secondary">
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <Calendar
                    mode="single"
                    selected={date}
                    className="mt-2"
                    onSelect={handleDateClick}
                    fromDate={new Date()}
                    locale={ptBR}
                    styles={{
                      head_cell: {
                        width: "100%",
                        textTransform: "capitalize",
                      },
                      cell: {
                        width: "100%",
                      },
                      button: {
                        width: "100%",
                      },
                      nav_button_previous: {
                        width: "32px",
                        height: "32px",
                      },
                      nav_button_next: {
                        width: "32px",
                        height: "32px",
                      },
                      caption: {
                        textTransform: "capitalize",
                      },
                    }}
                  />

                  {date && (
                    <div className="flex gap-3 px-5 py-6 mt-4 border-y boder-solid border-secondary overflow-x-auto [&::-webkit-scrollbar]:hidden">
                      {timeList.map((time) => (
                        <Button
                          variant={hour === time ? "default" : "outline"}
                          className="rounded-full"
                          key={time}
                          onClick={() => handleHourClick(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="py-3 px-5">
                    <Card>
                      <CardContent className="p-3 flex flex-col gap-3">
                        <div className="flex justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <p className="font-semibol text-sm">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </p>
                        </div>
                        {date && (
                          <div className="flex justify-between">
                            <h3 className="text-gray-400">Data</h3>
                            <p className="text-sm">
                              {format(date, "dd 'de' MMMM", { locale: ptBR })}
                            </p>
                          </div>
                        )}

                        {hour && (
                          <div className="flex justify-between">
                            <h3 className="text-gray-400">Horário</h3>
                            <p className="text-sm">{hour}</p>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <h3 className="text-gray-400">Barbearia</h3>
                          <p className="text-sm">{barbershop.name}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <SheetFooter className="px-5 mb-4">
                    <Button
                      disabled={!hour || !date || submitIsLoading}
                      onClick={handleBookingSubmit}
                    >
                      {submitIsLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Confirmar reserva
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ServiceItem;
