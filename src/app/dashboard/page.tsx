import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import React from "react";
import {
  authOptions,
  CustomSession,
  CustomUser,
} from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { getUserCoins, getUserOldSummaries } from "@/actions/fetchAction";
import UrlInput from "@/components/dashboard/url-input";
import OldSummaryCard from "@/components/dashboard/old-summary-card";

const Dashboard = async () => {
  const session: CustomSession | null = await getServerSession(authOptions);
  const userCoins = await getUserCoins(session?.user?.id ?? "");
  const oldSummaries = await getUserOldSummaries(
    Number(session?.user?.id ?? "")
  );

  return (
    <div>
      <DashboardNavbar
        user={session?.user as CustomUser}
        userCoins={userCoins}
      />
      {session?.user && <UrlInput user={session.user} />}

      <div className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {oldSummaries.length > 0 &&
            oldSummaries.map((item, index) => (
              <OldSummaryCard key={index} summary={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
