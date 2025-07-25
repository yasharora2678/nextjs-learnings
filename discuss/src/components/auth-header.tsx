"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";
import { signIn } from "@/actions/sign-in";
import { signOut } from "@/actions/sign-out";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverTrigger } from "./ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { LogOut } from "lucide-react";
import { Separator } from "./ui/separator";

const Authheader = () => {
  const session = useSession();

  if (session.status === "loading") {
    return null;
  }

  let authContent: React.ReactNode;

  if (session.data?.user) {
    authContent = (
      <Popover>
        <PopoverTrigger asChild>
          <Avatar>
            <AvatarImage src={session.data?.user?.image || ""} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <h1>{session.data.user.name}</h1>
          <Separator className="my-2" />
          <Button onClick={signOut}>
            <LogOut /> Sign Out
          </Button>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <Button variant={"outline"} onClick={signIn}>
          Sign In
        </Button>
        <Button variant={"outline"} onClick={signIn}>
          Sign Up
        </Button>
      </>
    );
  }

  return authContent;
};

export default Authheader;
