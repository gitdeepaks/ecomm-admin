"use client";
import React, { useEffect } from "react";
import { useStoreModal } from "@/hooks/useStoreModal";

function SetUpPage() {
  const { isOpen, onOpen } = useStoreModal((state) => {
    return {
      isOpen: state.isOpen,
      onOpen: state.onOpen,
    };
  });

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}

export default SetUpPage;
