"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const logout = () => {
    signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="rounded-xl shadow-xl border border-border/50 bg-popover">
        <AlertDialogHeader className="flex flex-col items-center text-center gap-2">
          <div className="p-3 rounded-full bg-red-500/10 text-red-600">
            <LogOut className="w-6 h-6" />
          </div>

          <AlertDialogTitle className="text-lg font-semibold">
            Are you sure you want to logout?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-sm text-muted-foreground">
            This will end your current session.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel className="rounded-md px-4 py-2 cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 cursor-pointer text-white rounded-md px-4 py-2 transition-colors"
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
