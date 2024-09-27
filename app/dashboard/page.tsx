import Listings from "@/components/listings";
import { createClient } from "@/utils/supabase/server";

const handleAction = async (formData: FormData) => {
  "use server";
  const supabase = createClient();
  const channel = supabase.channel("bids");

  const action = formData.get("action");

  if (!action) return;

  channel.send({
    type: "broadcast",
    event: action as string,
    payload: {
      listing: {
        name: "Steam Card",
        description: "x$ Steam Card",
        cover: "steam",
      },
    },
  });
};

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>

      <form action={handleAction}>
        <button
          type="submit"
          name="action"
          value="start"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Start
        </button>
        <button
          type="submit"
          name="action"
          value="stop"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Stop
        </button>

        <button
          type="submit"
          name="action"
          value="finish"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Finish
        </button>
      </form>

      <Listings />
    </div>
  );
}
