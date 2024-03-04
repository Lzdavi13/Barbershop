"use client";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
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

import { ReactNode } from "react";

interface CardLoginProps {
  button: ReactNode;
}

function CardLogin({ button }: CardLoginProps) {
  const handleLoginClick = () => signIn("google");
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>{button}</AlertDialogTrigger>

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
