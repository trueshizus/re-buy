import { useState } from "react";
import ListingCard from "./listing-card";
import RangeInput from "./range-input";
import { placeBid } from "@/app/actions";

type Listing = {
  name: string;
  description: string;
  cover: string;
};

type BidFormProps = {
  maxBid: number;
  listing: Listing;
};

export default function BidForm({ maxBid, listing }: BidFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bidAmount, setBidAmount] = useState(0);
  const handleSubmit = async (formData: FormData) => {
    const bidAmount = formData.get("bidAmount");
    setBidAmount(Number(bidAmount));
    await placeBid(formData);
    setIsSubmitted(true);
  };

  return (
    <div>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col gap-4">
          <ListingCard listing={listing} />
        </div>
      </div>

      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Place Your Bid!</h2>
        {isSubmitted ? (
          <div>
            <p>Thank you for your bid. Waiting for results...</p>
            <p>Your bid: $ {bidAmount.toLocaleString()}</p>
          </div>
        ) : (
          <form action={handleSubmit}>
            <RangeInput min={10} max={maxBid} step={1} defaultValue={55} />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Place Bid
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
