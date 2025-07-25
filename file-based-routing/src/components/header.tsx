import Link from "next/link";
import React from "react";

const HeaderPage = () => {
  return (
    <div className="absolute z-10 text-white w-full">
      <nav className="container flex items-center justify-between bg-black text-white h-15">
        <Link className="font-bold text-xl" href="/">Home</Link>
        <Link className="font-bold text-xl" href="/performance" replace={true}>Performance</Link>
        <Link className="font-bold text-xl" href="/reliability" >Reliability</Link>
      </nav>
    </div>
  );
};

export default HeaderPage;
