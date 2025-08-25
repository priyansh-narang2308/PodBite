"use client"

import React, { useEffect, useState } from "react";
import SummarizeLoader from "./summarize-loader";
import Markdown from "react-markdown";
import axios, { AxiosError } from "axios";
import { clearCache } from "@/actions/common-actions";
import { toast } from "sonner";

const SummaryBase = ({ summary }: { summary: ChatType | null }) => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (summary?.response) {
      setResponse(summary?.response ?? "");
      setLoading(false);
    } else {
      summarize();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summary]);

  const summarize = async () => {
    try {
      if (response.length > 0) {
        setLoading(false);
        return true;
      }
      const { data } = await axios.post("/api/summary", {
        url: summary?.url,
        id: summary?.id,
      });
      setLoading(false);
      const res = data?.data;
      if (res) {
        setResponse(res);
        clearCache("userCoins");
        clearCache("coinsSpend");
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        if ([500, 401, 400].includes(error.response?.status ?? 0)) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("Something went wrong!");
        }
      }
    }
  };

  return (
    <div className="flex items-center flex-col w-full">
      <h1 className="text-2xl font-bold my-4">{summary?.title}</h1>
      {loading && <SummarizeLoader />}
      {response && (
        <div className="w-full md:w-[700px] rounded-lg bg-slate-100 shadow-md p-8">
          <Markdown>{response}</Markdown>
        </div>
      )}
    </div>
  );
};

export default SummaryBase;
