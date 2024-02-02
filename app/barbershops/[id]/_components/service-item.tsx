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
import { Barbershop, Service } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "../_helpers/hours";

interface ServiceItemProps {
  barbershop: Barbershop;
  service: Service;
}

function ServiceItem({ barbershop, service }: ServiceItemProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>();

  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : [];
  }, [date]);

  const handleHourClick = (time: string) => {
    setHour(time);
  };

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

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

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="secondary">Reservar</Button>
                </SheetTrigger>
                <SheetContent className="p-0">
                  <SheetHeader className="px-5 py-6 text-left border-b border-solid boder-secondary">
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <Calendar
                    mode="single"
                    selected={date}
                    className="mt-6"
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

                  <div className="py-6 px-5">
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

                  <SheetFooter className="px-5">
                    <Button disabled={!hour || !date}>Confirmar</Button>
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
