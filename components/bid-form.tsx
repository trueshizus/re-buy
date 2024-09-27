import RangeInput from "./range-input";
import { placeBid } from "@/app/actions";

type BidFormProps = {
  maxBid: number;
};

export default function BidForm({ maxBid }: BidFormProps) {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Place Your Bid</h2>
      <form action={placeBid}>
        <RangeInput min={10} max={maxBid} step={1} defaultValue={55} />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Place Bid
        </button>
      </form>
    </div>
  );
}
