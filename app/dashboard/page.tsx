import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

const handleAction = async (formData: FormData) => {
  "use server";

  const channel = supabase.channel("bids");

  const action = formData.get("action");

  if (!action) return;

  channel.send({
    type: "broadcast",
    event: action as string,
    payload: { message: "Hi" },
  });

  console.log(action);
};

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>

      <form action={handleAction}>
        <button type="submit" name="action" value="start">
          Start
        </button>
        <button type="submit" name="action" value="stop">
          Stop
        </button>
      </form>
    </div>
  );
}
