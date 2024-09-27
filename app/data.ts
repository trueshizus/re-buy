"use server";

import { createClient } from "@/utils/supabase/server";

export const getProfile = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  let { data: profiles, error } = await supabase
    .from("profiles")
    .select("user_name, credits")
    .single();

  return profiles;
};
