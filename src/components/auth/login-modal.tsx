"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function LoginModal() {
  const handleGoogleLogin = async () => {
    signIn("google", {
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
       <Button className="cursor-pointer hover:scale-105 rounded-xl">Login</Button>

      </DialogTrigger>
      <DialogContent className="max-w-md bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 animate-in fade-in-50 zoom-in-95">
        <DialogHeader className="space-y-2 text-center">
          <DialogTitle className="text-3xl font-bold tracking-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
              PodBite
            </span>
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Your audio world, all in one place. Join now and start exploring.
          </p>
        </DialogHeader>

        <div className="flex justify-center my-6">
          <Image
            src="/icon_192.png"
            alt="PodBite Logo"
            width={80}
            height={80}
            className="rounded-full shadow-lg"
          />
        </div>

        <Button
          variant="outline"
          onClick={handleGoogleLogin}
          className="w-full flex cursor-pointer hover:scale-105 items-center justify-center gap-3 rounded-full border-2 border-gray-200 bg-white hover:bg-gray-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 shadow-md transition-all duration-300"
        >
          <Image
            src="/google.png"
            width={24}
            height={24}
            alt="Google"
            className="rounded-full"
          />
          <span className="font-medium">Continue with Google</span>
        </Button>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to our{" "}
          <a href="/terms" className="underline hover:text-blue-500">
            Terms
          </a>{" "}
          &{" "}
          <a href="/privacy" className="underline hover:text-blue-500">
            Privacy Policy
          </a>.
        </div>
      </DialogContent>
    </Dialog>
  );
}
