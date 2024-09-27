import BidForm from "@/components/bid-form";
import LiveBids from "@/components/live-bids";
import { getProfile } from "../data";

export default async function Page() {
  const profile = await getProfile();
  if (!profile) {
    return <div>Loading...</div>;
  }
  const maxBid = "credits" in profile ? profile.credits : 0;
  return (
    <main>
      <h1>Bids</h1>
      <LiveBids maxBid={maxBid} />
    </main>
  );
}
