import { authorized } from "@/utils/functions/auth";
import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await authorized("admin");

    if (!user)
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });

        const { id } = await req.json();

    if (!id)
      return NextResponse.json(
        { msg: "User ID is not found." },{ status: 400 }
      );

    const supabase = await createClient();

    const { error } = await supabase.from("users").delete().eq("id", id);

    if (error) throw error;

    return NextResponse.json({ msg: "User deleted successfully." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Unexpected error occurred" },{ status: 500 });
  }
}
