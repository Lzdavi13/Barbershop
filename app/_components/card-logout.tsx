"use client";
import { signOut } from "next-auth/react";
import { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface CardLogoutProps {
  button: ReactNode
}

function CardLougout({ button }: CardLogoutProps) {
  const handleLogoutClick = () => signOut();
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {button}
        </AlertDialogTrigger>

        <AlertDialogContent className="w-[90%] rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Sair</AlertDialogTitle>
            <AlertDialogDescription>
              Deseja mesmo sair da plataforma?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-3 mt-3">
            <AlertDialogCancel className="w-full mt-0">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleLogoutClick} className="w-full">
              Sair
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default CardLougout;
