import BidForm from "@/components/bid-form";
import LiveBids from "@/components/live-bids";

export default function Page() {
  return (
    <main>
      <h1>Bids</h1>
      <LiveBids />
      <BidForm />
    </main>
  );
}
