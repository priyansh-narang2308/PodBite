/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getCoinsSpend, getUserCoins } from "@/actions/fetchAction";
import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import Link from "next/link";
import { Coins } from "lucide-react";

export default async function CoinsSpend() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const userCoins = await getUserCoins(session?.user?.id ?? "");
  const coinsSpends = await getCoinsSpend(session?.user?.id ?? "");

  return (
    <div className="container mx-auto px-4 py-8">
      {session?.user && (
        <DashboardNavbar user={session.user} userCoins={userCoins} />
      )}

      <div className="text-center w-full">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Coins Spend History
        </h1>

        <div className="flex flex-col items-center space-y-6">
          {coinsSpends && coinsSpends.length > 0 ? (
            coinsSpends.map((item, index) => (
              <div
                key={index}
                className="w-full md:w-[550px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
              >
                {/* Header */}
                <div className="flex justify-between items-center">
                  <Link
                    href={`/summary?id=${item.summary_id}`}
                    className="text-lg font-semibold text-blue-700 hover:underline truncate"
                  >
                    {item.summary?.title}
                  </Link>
                  <div className="flex items-center gap-1 text-yellow-600 font-bold text-sm">
                    <Coins className="w-5 h-5" />
                    {/* Replace with a valid property or remove if not available */}
                    <span>-{("coins_spent" in item ? (item as any).coins_spent : 1)}</span>
                  </div>
                </div>

                {/* Body */}
                <p className="mt-3 text-gray-600 text-sm break-words">
                  <strong className="text-gray-800">URL:</strong>{" "}
                  {item.summary.url}
                </p>

                {/* Footer */}
                <div className="mt-4 flex justify-between text-sm text-gray-500">
                  <p>📅 {new Date(item.created_at).toDateString()}</p>
                  <Link
                    href={`/summary?id=${item.summary_id}`}
                    className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-medium transition-colors"
                  >
                    View Summary
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-lg">No coins spent yet 🚀</p>
          )}
        </div>
      </div>
    </div>
  );
}
