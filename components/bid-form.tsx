import { revalidatePath } from "next/cache";
import RangeInput from "./range-input";
import { getProfile } from "@/app/data";

async function placeBid(formData: FormData) {
  "use server";

  const bidAmount = formData.get("bidAmount");
  // Here you would typically save the bid to your database
  console.log(`Bid placed: $${bidAmount}`);

  // Revalidate the page to show the updated bid
  revalidatePath("/");
}

export default async function BidForm() {
  const profile = await getProfile();

  if (!profile) {
    return <div>Loading...</div>;
  }

  const maxBid = "credits" in profile ? profile.credits : 0;

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
