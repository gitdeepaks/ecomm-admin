"use client";

import * as React from "react";
import { Check, ChevronsUpDown, PlusCircle, Store } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useParams, useRouter } from "next/navigation";
import { useStoreModal } from "@/hooks/useStoreModal";
import { DropdownMenu } from "./ui/dropdown-menu";
import { Input } from "./ui/input";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Record<string, any>[];
}

export default function StoreSwitcher({
  className,
  items = [],
}: StoreSwitcherProps) {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const [open, setOpen] = React.useState(false);

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={`w-[200px] justify-between ${className}`}
        >
          <Store className="mr-2 h-4 w-4" />
          {currentStore?.label || "Select Store"}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Input
          placeholder="Search stores"
          className="p-2"
          aria-label="Search stores"
        />

        <DropdownMenu>
          {formattedItems.map((store) => (
            <li
              key={store.value}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onStoreSelect(store)}
            >
              {store.label}
              {store.value === currentStore?.value && (
                <Check className="ml-auto h-4 w-4 opacity-100" />
              )}
            </li>
          ))}
          <Button
            variant="outline"
            className=" flex p-4 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setOpen(false);
              storeModal.onOpen();
            }}
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Create Store
          </Button>
        </DropdownMenu>
      </PopoverContent>
    </Popover>
  );
}
