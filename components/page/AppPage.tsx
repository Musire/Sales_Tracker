import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children?: React.ReactNode;
  className?: string
}
    
export default function AppPage ({ children, className }: Props) {
    return (
        <section className={cn("my-6 flex flex-1 overflow-hidden", className)}>
            {children}
        </section>
    );
}