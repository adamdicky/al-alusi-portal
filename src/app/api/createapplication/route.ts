import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const form = await req.json();

    const supabase = await createClient();

    const { error } = await supabase.from("application").insert([
      {
        ...form,
        submitted_at: new Date().toISOString(),
      },
    ]);

    if (error) throw error;

    return NextResponse.json({ msg: "Application submitted successfully." });
  } catch (error) {
    console.error("Submit Error:", error);
    return NextResponse.json({ msg: "Unexpected error occurred." }, { status: 500 });
  }
}
