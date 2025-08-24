import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import React from "react";
import {
  authOptions,
  CustomSession,
  CustomUser,
} from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { getUserCoins } from "@/actions/fetchAction";
import UrlInput from "@/components/dashboard/url-input";

const Dashboard = async () => {
  const session: CustomSession | null = await getServerSession(authOptions);
  const userCoins = await getUserCoins(session?.user?.id ?? "");

  return (
    <div>
      <DashboardNavbar
        user={session?.user as CustomUser}
        userCoins={userCoins}
      />
      {session?.user && <UrlInput user={session.user} />}
    </div>
  );
};

export default Dashboard;
