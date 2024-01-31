import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

function Header() {
  return (
    <Card>
      <CardContent className="flex justify-between p-5 items-center">
        <Image src="/Logo.png" alt="fsw barber" height={18} width={120} />
        <Button variant="outline" size="icon">
          <MenuIcon size={16} />
        </Button>
      </CardContent>
    </Card>
  );
}

export default Header;
