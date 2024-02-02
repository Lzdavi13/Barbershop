"use client";

import {
  Calendar,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

function Header() {
  const { data } = useSession();

  const handleLoginClick = () => signIn("google");

  const handleLogoutClick = () => signOut();

  return (
    <Card>
      <CardContent className="flex justify-between p-5 items-center">
        <Image src="/Logo.png" alt="fsw barber" height={18} width={120} />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon size={16} />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
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
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleLogoutClick}
                >
                  <LogOutIcon />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col px-5 py-6 gap-3">
                <div className="flex gap-3 items-center">
                  <UserIcon size={30} />
                  <h2 className="text-base font-bold">Olá, faça seu login!</h2>
                </div>
                <Button
                  variant="secondary"
                  onClick={handleLoginClick}
                  className="w-full justify-start"
                >
                  <LogInIcon className="mr-2" size={18} />
                  Fazer login
                </Button>
              </div>
            )}

            <div className="flex flex-col gap-3 px-5">
              <Button variant="outline" className="w-full justify-start">
                <HomeIcon className="mr-2" size={18} />
                Início
              </Button>

              {data?.user && (
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2" size={18} />
                  Agendamentos
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
}

export default Header;
