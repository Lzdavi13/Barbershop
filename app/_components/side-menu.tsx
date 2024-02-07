"use client";

import { CalendarIcon, HomeIcon, UserIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import CardLogin from "./card-login";
import CardLougout from "./card-logout";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { SheetHeader, SheetTitle } from "./ui/sheet";

function SideMenu() {
  const { data } = useSession();

  return (
    <>
      <SheetHeader className="text-left border-b border-solid border-secondary p-5">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>
      {data?.user ? (
        <div className="flex justify-between px-5 py-6 items-center">
          <div className="flex gap-3 items-center">
            <Avatar>
              <AvatarImage src={data.user.image ?? ""} />
            </Avatar>
            <h2 className="text-base font-bold">{data.user.name}</h2>
          </div>
          <CardLougout />
        </div>
      ) : (
        <div className="flex flex-col px-5 py-6 gap-3">
          <div className="flex gap-3 items-center">
            <UserIcon size={30} />
            <h2 className="text-base font-bold">Olá, faça seu login!</h2>
          </div>
          <CardLogin />
        </div>
      )}
      <div className="flex flex-col gap-3 px-5">
        <Button variant="outline" className="justify-start" asChild>
          <Link href="/">
            <HomeIcon size={18} className="mr-2" />
            Início
          </Link>
        </Button>

        {data?.user && (
          <Button variant="outline" className="justify-start" asChild>
            <Link href="/bookings">
              <CalendarIcon size={18} className="mr-2" />
              Agendamentos
            </Link>
          </Button>
        )}
      </div>
    </>
  );
}
export default SideMenu;
