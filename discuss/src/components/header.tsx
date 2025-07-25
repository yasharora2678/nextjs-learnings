import React, { Suspense } from "react";
import Authheader from "./auth-header";
import SearchInput from "./SearchInput";

const HeaderPage = () => {
  return (
    <div className="grid grid-cols-3 h-14 items-center">
      <div className="flex justify-start">
        <h1 className="font-bold text-xl">Discuss</h1>
      </div>
      <div className="flex justify-center">
        <Suspense>
          <SearchInput />
        </Suspense>
      </div>
      <div className="flex justify-end gap-2">
        <Authheader />
      </div>
    </div>
  );
};

export default HeaderPage;
