import React from "react";

import prismadb from "@/lib/prismadb";



async function DashBoardPage({params}: {params: {storeId: string}}):React.FC<{params: {storeId: string}}> {

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId
        }
    })
  return <div>Active Store: {store?.name}</div>;
}

export default DashBoardPage;
