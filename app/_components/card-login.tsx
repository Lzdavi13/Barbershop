"use client";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { LogInIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

function CardLogin() {
  const handleLoginClick = () => signIn("google");
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="secondary" className="w-full justify-start">
            <LogInIcon className="mr-2" size={18} />
            Fazer login
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="w-[90%] rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Faça login na plataforma</AlertDialogTitle>
            <AlertDialogDescription>
              Conecte-se usando sua conta do Google
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-3">
            <Button
              variant="outline"
              className="w-full flex gap-2"
              onClick={handleLoginClick}
            >
              <Image src="/google.svg" alt="google" width={15} height={15} />
              Google
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default CardLogin;
