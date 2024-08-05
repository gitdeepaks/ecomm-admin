import React from "react";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SetingsForm } from "./components/SetingsForm";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

const SettigsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SetingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettigsPage;
