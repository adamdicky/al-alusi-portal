import { createClient } from "@/utils/supabase-connection/server";

export async function authorized(role: "admin" | "teacher" | "staff_jabatan") {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return false;
  }

  if (data.user.user_metadata.role === role) {
    return data.user;
  }
  return false;
}
