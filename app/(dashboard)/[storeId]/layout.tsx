import NavBar from "@/components/NavBar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

interface DashBoardLayoutProps {
  children: React.ReactNode;
  params: { storeId: string };
}

async function DashBoardLayout({ children, params }: DashBoardLayoutProps) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: { id: params.storeId, userId: userId },
  });
  if (!store) redirect("/");

  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export default DashBoardLayout;
