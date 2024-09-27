"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const supabase = createClient();

export const getProfile = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  let { data: profiles, error } = await supabase
    .from("profiles")
    .select("user_name, credits");

  return profiles;
};
