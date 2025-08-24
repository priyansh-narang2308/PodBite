"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import Loading from "../common/loading";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { useRouter } from "next/navigation";

const UrlInput = ({ user }: { user: CustomUser }) => {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<AddUrlErrorType>({});

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      setLoading(true);

      const { data } = await axios.post("/api/add-url", {
        // har ek video ka url lena hai
        url: url,
        user_id: user.id,
      });

      // output aate hi new chat
      // backend say data main payload dia to dusra waalaa data vo hai
      const newChat: ChatType = data?.data;

      if (newChat) {
        toast.success("Correct URL, redirecting you to the summary page");
        router.push(`/summary/?id=${newChat.id}`);
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          setErrors(error.response?.data?.errors);
        } else {
          toast.error(error.response?.data?.message);
        }
      }
    }
  };
  return (
    <div className="flex justify-center items-center mt-10 w-full">
      <form onSubmit={handleSubmit} className="relative w-full md:w-[500px]">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full md:w-[500px] h-12 rounded-lg bg-muted border border-blue-500 p-2  outline-none border-dashed"
          type="url"
          placeholder="Enter your podcast URL..."
          disabled={loading}
        />
        {loading && (
          <div className="absolute right-2 top-2.5">
            <Loading />
          </div>
        )}
      </form>
      <span className="text-red-500">{errors?.url}</span>
    </div>
  );
};

export default UrlInput;
