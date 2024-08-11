"use client";
import { UploadDropzone } from "@uploadthing/react";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { UploadButton } from "@/utils/uploadthing";
import useGetImage from "@/hooks/useGeteImage";

import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}
const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
  disabled,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const { image, loading, error } = useGetImage(value[0]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result[0].fileUrl);
  };

  if (!isMounted) return null;

  return (
    <div className="">
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => {
          if (loading) return <p key="key">Loading...</p>;
          if (error) return <p key="key">Error loading image</p>;

          return (
            <div
              key={url}
              className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
            >
              <div className="z-10 absolute top-2 right-2">
                <Button
                  type="button"
                  onClick={() => onRemove(url)}
                  variant="destructive"
                  size="icon"
                >
                  <Trash size={24} className="size-4" />
                </Button>
              </div>

              <Image
                src={image || ""}
                alt="Uploaded image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          );
        })}
      </div>
      <UploadButton
        disabled={disabled}
        endpoint="imageUploader"
        onClientUploadComplete={(url: any) => {
          if (url) {
            onUpload(url);
            setIsMounted(false); // Reset the mounted state to false after upload
          }
        }}
        onUploadError={(error: any) => {
          console.error(error);
          setIsMounted(false); // Reset the mounted state to false on error
        }}
      />
    </div>
  );
};

export default ImageUpload;
