import { Loader2 } from "lucide-react";

function Loader() {
  return (
    <>
      <div className="inset-0 fixed">
        <div className="flex items-center justify-center fixed inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
          <div className="flex items-center">
            <Loader2 className="h-10 w-10 animate-spin" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Loader;
