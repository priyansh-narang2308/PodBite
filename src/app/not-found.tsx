import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="h-[90vh] flex flex-col justify-center items-center text-center px-4">
      <Image 
        src="/404.svg" 
        width={500} 
        height={500} 
        alt="404 - Page Not Found" 
        className="mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">Oops, wrong frequency!</h1>
      <p className="text-muted-foreground max-w-md mb-6">
        Looks like this episode doesn’t exist… or maybe we just haven’t summarized it yet.  
        Let’s get you back to the good stuff.
      </p>
      <Link href="/">
        <Button size="lg" className="cursor-pointer">
          🎧 Back to Home
        </Button>
      </Link>
    </div>
  );
}
