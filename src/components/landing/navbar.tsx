import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LoginModal from "../auth/login-modal";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";

export default function Navbar({ user }: { user?: CustomUser }) {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-border bg-background/80">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="flex items-center space-x-2 group">
          <Image
            src="/icon_192.png"
            width={40}
            height={40}
            alt="logo"
            className="transition-transform duration-300 group-hover:rotate-6"
          />
          <h1 className="text-2xl font-extrabold tracking-tight transition-colors duration-300 group-hover:text-primary">
            PodBite
          </h1>
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/pricing">
            <Button
              variant="outline"
              className=" hover:scale-105 cursor-pointer transition-all duration-300"
            >
              Pricing
            </Button>
          </Link>

          <ModeToggle />

          {user ? (
            <Link href="/dashboard">
              <Button className="rounded-full hover:scale-105 transition-transform duration-300">
                Dashboard
              </Button>
            </Link>
          ) : (
            <LoginModal />
          )}
        </div>
      </div>
    </nav>
  );
}
