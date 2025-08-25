"use client";
import React, { Suspense, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./user-avatar";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import LogoutModal from "../auth/logout-modal";
import { useRouter } from "next/navigation";
import { LogOut, Receipt, Coins } from "lucide-react";

export default function ProfileDropdown({ user }: { user: CustomUser | null }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {open && (
        <Suspense fallback={<p>Loading...</p>}>
          <LogoutModal open={open} setOpen={setOpen} />
        </Suspense>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer focus:outline-none">
          <UserAvatar image={user?.image ?? ""} name={user?.name ?? ""} />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-56 rounded-xl shadow-lg border border-border/50 p-2 bg-popover"
          align="end"
          sideOffset={6}
        >
          <div className="flex items-center gap-3 px-3 py-2">
            <UserAvatar image={user?.image ?? ""} name={user?.name ?? ""} />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.name}</span>
            </div>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => router.push("/transactions")}
            className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
          >
            <Receipt className="w-4 h-4 text-muted-foreground" />
            Transactions
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => router.push("/coins-spend")}
            className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
          >
            <Coins className="w-4 h-4 text-yellow-500" />
            Coins Spend
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors !text-red-500 hover:bg-transparent hover:!text-red-500 cursor-pointer"
          >
            <LogOut className="w-4 h-4 !text-red-500" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
