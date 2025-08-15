"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { Check } from "lucide-react"; // Icon for features

export default function Pricing({ user }: { user?: CustomUser }) {
  const [loading, setLoading] = useState(false);

  const initiatePayment = async (plan: string) => {
    // Payment logic placeholder (unchanged)
  };

  const plans = [
    {
      name: "Starter",
      coins: "100 Coins",
      desc: "Perfect for individuals.",
      features: ["10 Podcast Summaries", "Top Questions Highlight", "AI-Powered Insights"],
      highlight: false,
    },
    {
      name: "Pro",
      coins: "500 Coins",
      desc: "Best for professionals.",
      features: [
        "51 Podcast Summaries",
        "Top Questions Highlight",
        "AI-Powered Insights",
        "Priority Support",
        "1 Podcast Summary Free 🚀",
      ],
      highlight: true,
    },
    {
      name: "Pro Plus",
      coins: "1000 Coins",
      desc: "Ideal for teams.",
      features: [
        "102 Podcast Summaries",
        "Top Questions Highlight",
        "AI-Powered Insights",
        "Dedicated Support",
        "2 Podcast Summaries Free 🚀",
      ],
      highlight: false,
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto">
        <h2 className="text-4xl font-extrabold text-center tracking-tight">
          Simple, Transparent Pricing
        </h2>
        <p className="text-lg text-primary font-semibold text-center mb-12">
          1 coin = ₹1
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "relative rounded-2xl border border-border shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
                plan.highlight
                  ? "bg-gradient-to-b from-primary/10 via-background to-background border-primary"
                  : "bg-background"
              )}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  Most Popular
                </span>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{plan.desc}</p>
              </CardHeader>

              <CardContent className="flex flex-col items-center">
                <p className="text-3xl font-extrabold text-primary">{plan.coins}</p>

                <ul className="mt-6 space-y-3 text-sm">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="mt-8 w-full cursor-pointer rounded-full hover:scale-105 transition-transform duration-300"
                  onClick={() => initiatePayment(plan.name)}
                  disabled={loading}
                >
                  Buy Coins
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
