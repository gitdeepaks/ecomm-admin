import React from "react";

interface HeaDingProps {
  title: string;
  description: string;
}

export const HeaDing: React.FC<HeaDingProps> = ({ title, description }) => {
  return (
    <div className="">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
