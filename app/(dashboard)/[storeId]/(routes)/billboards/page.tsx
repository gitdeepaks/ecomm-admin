import React from "react";
import BillBoardClient from "./components/Client";

function BillboardsPage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardClient />
      </div>
    </div>
  );
}

export default BillboardsPage;
