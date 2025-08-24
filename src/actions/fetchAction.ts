import prisma from "@/lib/db.config";
import { unstable_cache } from "next/cache";

// So that we need not to fetch it again and again from the datavase
export const getUserCoins = unstable_cache(
  async (user_id: number | string) => {
    return await prisma.user.findUnique({
      select: { coins: true },
      where: { id: Number(user_id) },
    });
  },
  ["userCoins"],
  // every 1hr fetch it 
  // now its fetching from the cache
  { revalidate: 60*60 ,tags:["userCoins"]}
);

export async function getSummary(id: string): Promise<ChatType | null> {
  const summary = await prisma.summary.findUnique({
    where: {
      id: id,
    },
  });
  return summary;
}