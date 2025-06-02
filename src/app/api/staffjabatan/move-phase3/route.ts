import { authorized } from "@/utils/functions/auth";
import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
   
    const user = await authorized("staff_jabatan");
    if (!user) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    
    const { application_id, reviewed_by } = await req.json();
    if (!application_id || !reviewed_by) {
      return NextResponse.json({ msg: "Missing fields" }, { status: 400 });
    }

    
    const supabase = await createClient();
    const now = new Date().toISOString();

    const { error } = await supabase
      .from("application")
      .update({
        is_reviewed: true,
        reviewed_by,
        reviewed_at: now,
        status: "accepted",
        phase_status: "3",
        last_updated: now,
      })
      .eq("id", application_id);

    if (error) throw error;
    return NextResponse.json(
      { msg: "Moved application to Phase 3" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { msg: "Unable to move to Phase 3" },
      { status: 500 }
    );
  }
}
