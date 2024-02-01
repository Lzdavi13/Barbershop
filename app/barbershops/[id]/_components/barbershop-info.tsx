"use client";
import { Button } from "@/app/_components/ui/button";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopInfoProps {
  barbershop: Barbershop;
}

function BarbershopInfo({ barbershop }: BarbershopInfoProps) {
  const router = useRouter();

  const handleBackClick = () => {
    router.replace("/");
  };

  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Button
          size="icon"
          variant="outline"
          className="z-50 absolute top-4 left-4"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon size={20} />
        </Button>

        <Button
          size="icon"
          variant="outline"
          className="z-50 absolute top-4 right-4"
        >
          <MenuIcon size={20} />
        </Button>

        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          style={{
            objectFit: "cover",
          }}
          className="opacity-75"
        />
      </div>
    </div>
  );
}

export default BarbershopInfo;
