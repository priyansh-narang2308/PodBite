import prisma from "@/lib/db.config";
import { getCoinsFromAmount } from "@/lib/utils";
import { notFound } from "next/navigation";
import React from "react";
import Image from "next/image";
import { addCoins, clearCache } from "@/actions/common-actions";

export default async function SuccessTxn({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const transaction = await prisma.transactions.findUnique({
    where: {
      status: 2,
      // take that particular id only!!
      id: searchParams["txnId"],
    },
  });
  console.log("The transaction is", transaction);
  if (!transaction) {
    return notFound();
  }
  await prisma.transactions.update({
    data: {
      status: 1,
    },
    where: {
      id: searchParams["txnId"],
    },
  });
  await addCoins(transaction.user_id, getCoinsFromAmount(transaction.amount));
  clearCache("userCoins");
  // to clear the caches
  clearCache("transactions");

  return (
    <div className="h-screen flex justify-center items-center flex-col ">
      <Image src="/check.png" width={512} height={512} alt="cancel" />
      <h1 className="text-3xl font-bold text-green-400">
        Payment Processed successfully!
      </h1>
    </div>
  );
}