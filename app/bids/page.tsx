import BidForm from "@/components/bid-form";
import LiveBids from "@/components/live-bids";
import { getProfile } from "../data";

export default async function Page() {
  const profile = await getProfile();
  if (!profile) {
    return <div>Loading...</div>;
  }
  const maxBid = "credits" in profile ? profile.credits : 0;
  const user_name = "user_name" in profile ? profile.user_name : "";
  return (
    <main>
      <LiveBids maxBid={maxBid} user_name={user_name} />
    </main>
  );
}
