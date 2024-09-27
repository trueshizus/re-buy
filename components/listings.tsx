import { createClient } from "@/utils/supabase/server";
import ListingCard from "./listing-card";
import { revalidatePath } from "next/cache";

const createListings = async (formData: FormData) => {
  "use server";
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    return;
  }

  const { data, error } = await supabase
    .from("listings")
    .insert([
      {
        name: formData.get("name"),
        code: formData.get("code"),
        description: formData.get("description"),
        cover: formData.get("cover"),
        publisher_id: user.data.user.id,
      },
    ])
    .select();

  revalidatePath("/listings");
};

const getListings = async () => {
  const supabase = createClient();
  let { data: listings, error } = await supabase.from("listings").select("*");

  return listings;
};

export default async function Listings() {
  const listings = await getListings();

  return (
    <div>
      <h2>Listings</h2>

      {listings?.length === 0 ? (
        <p>No listings found</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {listings?.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}

      <details>
        <summary>Create Listing</summary>
        <form action={createListings} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="code"
            placeholder="Code"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="cover"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a company</option>
            <option value="Apple">Apple</option>
            <option value="Amazon">Amazon</option>
            <option value="Google">Google</option>
            <option value="Steam">Steam</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
          >
            Create Listings
          </button>
        </form>
      </details>
    </div>
  );
}
