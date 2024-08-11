"use client";
import React from "react";
import { HeaDing } from "../../settings/components/HeaDing";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";

export default function BillBoardClient() {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <HeaDing
          title="Billboards (0)"
          description="Manage billboards for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus size={16} className="size-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
    </>
  );
}
