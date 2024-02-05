import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SideMenu from "./side-menu";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

function Header() {
  return (
    <header>
      <Card>
        <CardContent className="flex justify-between p-5 items-center">
          <Link href="/">
            <Image src="/Logo.png" alt="fsw barber" height={18} width={120} />
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
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
