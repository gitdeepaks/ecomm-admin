"use client";

import { Copy, ServerIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import { toast } from "@pheralb/toast";

interface AlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}
const textMap: Record<AlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};
const variantMap: Record<AlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert: React.FC<AlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      toast.success({
        text: "Copied",
        description: "API Route Copied to clipboard",
      });
    });
  }
  return (
    <Alert>
      <ServerIcon className="size-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button
          variant="outline"
          size="icon"
          onClick={() => copyToClipboard(description)}
        >
          <Copy className="size-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
