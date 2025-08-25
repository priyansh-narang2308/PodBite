"use client";
import Link from "next/link";
import React from "react";

export default function OldSummaryCard({
  summary,
}: {
  summary: UserSummaries;
}) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
        <h1 className="text-xl font-bold text-gray-900 truncate">
          {summary.title}
        </h1>

        <Link
          href={`/summary?id=${summary.id}`}
          className="block mt-2 text-blue-600 hover:text-blue-800 underline truncate"
        >
          {summary.url}
        </Link>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <p>📅 {new Date(summary.created_at).toDateString()}</p>
          <Link
            href={`/summary?id=${summary.id}`}
            className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-medium transition-colors"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
