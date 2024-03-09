"use client";
import { CalendarIcon, MenuIcon, UserIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import CardLogin from "./card-login";
import CardLougout from "./card-logout";
import SideMenu from "./side-menu";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

function Header() {
  const { data } = useSession();

  return (
    <header>
      <Card>
        <CardContent className="flex justify-between p-5 items-center xl:py-8 xl:px-32">
          <Link href="/">
            <Image src="/Logo.png" alt="fsw barber" height={18} width={120} />
          </Link>
          <div className="max-xl:hidden flex items-center gap-6">
            <Button variant="outline" className="justify-start" asChild>
              <Link href="/bookings">
                <CalendarIcon size={18} className="mr-2" />
                Agendamentos
              </Link>
            </Button>
            {data?.user ?
              <CardLougout button={
                <div className="flex justify-between items-center cursor-pointer">
                  <div className="flex gap-2 items-center">
                    <Avatar>
                      <AvatarImage src={data?.user?.image ?? ""} className="size-9" />
                    </Avatar>
                    <h2 className="text-base font-bold">{data?.user?.name}</h2>
                  </div>
                </div>} /> :
              <CardLogin
                button={
                  <Button
                    variant="default"
                    className="w-full justify-start font-bold"
                  >
                    <UserIcon size={17} className="mr-2" />
                    Perfil
                  </Button>
                } />
            }

          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="xl:hidden">
                <MenuIcon size={16} />
              </Button>
            </SheetTrigger>

            <SheetContent className="p-0">
              <SideMenu />
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </header>
  );
}

export default Header;
