"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import Loading from "../common/loading";

const UrlInput = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<AddUrlErrorType>({});

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
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
