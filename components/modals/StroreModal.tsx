"use client";

import React from "react";
import { Modal } from "../ui/modal";
import { useStoreModal } from "@/hooks/useStoreModal";
import axios from "axios";

import { set, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "@pheralb/toast";

const formSchema = z.object({
  name: z.string().min(1),
});

export default function StroreModal() {
  const [loading, setLoading] = React.useState(false);
  const { isOpen, onClose } = useStoreModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const resposnse = await axios.post("/api/stores", data);

      window.location.assign(`/${resposnse.data.id}`);
    } catch (error) {
      toast.error({
        text: "Error",
        description: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      title="create Store"
      description="Add a new store to manage"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-4 py-4 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="E-commerce"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.name?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button disabled={loading} variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button disabled={loading} type="submit">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}
