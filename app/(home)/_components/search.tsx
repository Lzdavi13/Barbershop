import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";

function Search() {
  return (
    <div className="flex items-center gap-2">
      <Input type="text" placeholder="Buscar" />

      <Button variant="default">
        <SearchIcon size={20}></SearchIcon>
      </Button>
    </div>
  );
}

export default Search;
