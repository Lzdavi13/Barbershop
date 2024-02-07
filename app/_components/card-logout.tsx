"use client";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
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
import { Button } from "./ui/button";

function CardLougout() {
  const handleLogoutClick = () => signOut();
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="icon" variant="secondary">
            <LogOutIcon size={18} />
          </Button>
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
