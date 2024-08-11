import prismadb from "@/lib/prismadb";
import React from "react";
import { BillBoardForm } from "./components/BillBoardForm";

interface BillboardsPageFormProps {
  params: {
    billboardId: string;
  };
}

async function BillboardsPageForm({ params }: BillboardsPageFormProps) {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardForm initialData={billboard} />
      </div>
    </div>
  );
}

export default BillboardsPageForm;
