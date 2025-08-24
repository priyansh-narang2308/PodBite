import { getSummary, getUserCoins } from "@/actions/fetchAction";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import { notFound } from "next/navigation";
import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const Summary = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;

  if (!params?.id) {
    return notFound();
  }

  const summary = await getSummary(params.id);
  if (!summary) {
    return notFound();
  }

  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session?.user) {
    return notFound();
  }

  const userCoins = await getUserCoins(session.user.id ?? "");

  return (
    <div className="container">
      <DashboardNavbar user={session.user} userCoins={userCoins} />
    </div>
  );
};

export default Summary;
