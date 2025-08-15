import React from "react";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <header className="relative overflow-hidden py-28 text-center bg-gradient-to-b from-background via-background/95 to-background">
  

      <div className="container mx-auto px-6 relative z-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient-x">
          Summarize Any Podcast Instantly
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          Turn hours of audio into minutes of insights. Get concise AI-powered summaries, key takeaways, and top questions — instantly.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Button className="px-8 py-6 text-lg font-semibold rounded-full hover:scale-105 transition-transform shadow-lg hover:shadow-xl cursor-pointer">
            Try it Now
          </Button>
      
        </div>
      </div>
    </header>
  );
}
