"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import useGetImage from "@/hooks/useGeteImage";

import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
import { constants } from "buffer";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string;
}
const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
  disabled,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result[0].fileUrl);
  };

  if (!isMounted) return null;

  const fileType = value ? value.split(".").pop() : null;

  return (
    <div
      className="flex flex-col gap-4 p-4 rounded-lgbg-gray-50
    "
    >
      <div className="mb-4 flex items-center gap-4">
        <Image src={value} width={100} height={100} alt="uploaded image" />
      </div>
      <UploadDropzone
        disabled={disabled}
        endpoint="imageUploader"
        onClientUploadComplete={(url: any) => {
          if (url) {
            onUpload(url);
            setIsMounted(false); // Reset the mounted state to false after upload
          }
        }}
        onUploadError={(error: Error) => {
          console.error(error);
          setIsMounted(false); // Reset the mounted state to false on error
        }}
      />
    </div>
  );
};

export default ImageUpload;
