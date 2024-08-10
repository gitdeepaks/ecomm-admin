"use client";

import { Store } from "@prisma/client";
import { HeaDing } from "./HeaDing";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@pheralb/toast";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/AlertModal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/useOrigin";

interface SetingsFormProps {
  initialData: Store;
}

const SetingsFormSchema = z.object({
  name: z.string().min(1),
});

type SetingsFormValue = z.infer<typeof SetingsFormSchema>;

export const SetingsForm: React.FC<SetingsFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const form = useForm<SetingsFormValue>({
    resolver: zodResolver(SetingsFormSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (values: SetingsFormValue) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, values);
      router.refresh();
      toast.success({
        text: "Success",
        description: "Store updated successfully",
      });
    } catch (error) {
      toast.error({
        text: "Something went wrong",
        description: "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  async function onDelete() {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast.success({
        text: "Success",
        description: "Store deleted successfully",
      });
    } catch (error) {
      toast.error({
        text: "Something went wrong",
        description: "Please try again",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <HeaDing title="Settings" description="Manage store preference" />
        <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash className="size-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      {...field}
                      placeholder="Store name"
                    />
                  </FormControl>

                  <FormMessage>
                    {form.formState.errors.name?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save Changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  );
};
