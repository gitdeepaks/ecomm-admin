import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
interface LayoutProps {
  children: React.ReactNode;
}

export default async function layout({ children }: LayoutProps) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: { userId: userId },
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
}
