import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { cookies } from "next/headers";
const ranks: Record<string, string> = {
  DIAMOND: "💎",
  GOLD: "🥇",
  SILVER: "🥈",
  BRONZE: "🥉",
  IRON: "🌱",
};
export default async function UserPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  console.log(accessToken);
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/v1/users/profiles`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      mode: "cors",
    }
  );
  const { data: user } = await response.json();

  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-6">{ranks[user?.userTier]}</h3>
      <p className="text-lg font-semibold text-gray-800">{user?.userName}</p>
      <p className="text-sm text-gray-500">{user?.userEmail}</p>
    </div>
  );
}
