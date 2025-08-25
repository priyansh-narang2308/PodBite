
import React from "react";
import ProfileDropdown from "../common/profile-dropdown";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";

export default async function DashboardNavbar({
  user,
  userCoins,
}: {
  user: CustomUser;
  userCoins: CoinsType | null;
}) {
  return (
    <nav className="w-full border-b bg-background/80 backdrop-blur-md py-2">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/icon_192.png"
            width={36}
            height={36}
            alt="PodBite logo"
            className="rounded-md"
          />
          <h1 className="text-xl font-bold tracking-tight">PodBite</h1>
        </Link>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full">
            <span className="text-sm font-semibold">
              {userCoins?.coins ?? 0}
            </span>
            <Image
              src="/coin.png"
              width={20}
              height={20}
              alt="coin"
              className="drop-shadow-sm"
            />
          </div>

          <ModeToggle />

          <ProfileDropdown user={user} />
        </div>
      </div>
    </nav>
  );
}
