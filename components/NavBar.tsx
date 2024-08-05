import { UserButton } from "@clerk/nextjs";
import React from "react";
import MainNav from "./MainNav";
import StoreSwither from "./StoreSwither";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export default async function NavBar() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }
  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwither items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSwitchSessionUrl="/" />
        </div>
      </div>
    </div>
  );
}
