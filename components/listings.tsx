import { createClient } from "@/utils/supabase/server";
const supabase = createClient();

const createListings = async (formData: FormData) => {
  "use server";
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

  console.log(data);
  console.log(error);
};

export default function Listings() {
  return (
    <div>
      <h2>Listings</h2>

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
        <input
          type="text"
          name="cover"
          placeholder="Cover"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
        >
          Create Listings
        </button>
      </form>
    </div>
  );
}
