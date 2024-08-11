"use client";

import { Billboard, Store } from "@prisma/client";

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
import { HeaDing } from "../../../settings/components/HeaDing";
import ImageUpload from "@/components/ui/image-upload";

const BillBoardFormSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

type BillBoardFormValue = z.infer<typeof BillBoardFormSchema>;

interface BillBoardFormProps {
  initialData: Billboard | null;
}
export const BillBoardForm: React.FC<BillBoardFormProps> = ({
  initialData,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const title = initialData ? "Edit Billboard" : "Create Billboard";
  const description = initialData ? "Edit a Billboard" : "Add a new Billboard";
  const toastMessage = initialData
    ? "Billboard updated successfully"
    : "Billboard created successfully";

  const action = initialData ? "Save Changes" : "Create Billboard";

  const form = useForm<BillBoardFormValue>({
    resolver: zodResolver(BillBoardFormSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (values: BillBoardFormValue) => {
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
        <HeaDing title={title} description={description} />

        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="size-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    disabled={loading}
                    value=""
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>

                <FormMessage>
                  {form.formState.errors.label?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      {...field}
                      placeholder="Billboard label"
                    />
                  </FormControl>

                  <FormMessage>
                    {form.formState.errors.label?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};
