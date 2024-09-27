import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getProfile } from "../data";
import { revalidatePath } from "next/cache";

const supabase = createClient();

const createProfile = async (formData: FormData) => {
  "use server";

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data, error } = await supabase
    .from("profiles")
    .insert([
      {
        user_name: formData.get("user_name"),
        credits: 1000,
      },
    ])
    .select();

  if (error) {
    console.error(error);
  }

  revalidatePath("/profile");
};

export default async function Page() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const profile = await getProfile();

  const createProfileForm = () => {
    return (
      <form action={createProfile} className="space-y-4">
        <input
          required
          type="text"
          name="user_name"
          placeholder="Username"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
        >
          Create Profile
        </button>
      </form>
    );
  };

  return (
    <main>
      <h1>Profile</h1>

      {profile ? (
        <div>Welcome to ReBuy, {profile.user_name}</div>
      ) : (
        createProfileForm()
      )}
    </main>
  );
}
