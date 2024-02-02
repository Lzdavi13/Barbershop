"use client";

import {
  Calendar,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { SheetHeader, SheetTitle } from "./ui/sheet";

function SideMenu() {
  const { data } = useSession();

  const handleLoginClick = () => signIn("google");

  const handleLogoutClick = () => signOut();

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
          <Button variant="secondary" size="icon" onClick={handleLogoutClick}>
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
    </>
  );
}
export default SideMenu;
