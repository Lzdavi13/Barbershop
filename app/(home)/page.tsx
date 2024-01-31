import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Search } from "lucide-react";
import Header from "../_components/header";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="px-5 pt-5">
        <h2 className="text-xl font-normal">
          Olá, <span className="font-bold">Luiz!</span>
        </h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>
    </div>
  );
}
