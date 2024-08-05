"use client";

import StroreModal from "@/components/modals/StroreModal";
import { useEffect, useState } from "react";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <StroreModal />
    </>
  );
}
