import { authorized } from "@/utils/functions/auth";
import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    
    const user = await authorized("staff_jabatan");
    if (!user) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    
    const { application_id, testiv_date, interview_date } = await req.json();
    if (!application_id || !testiv_date) {
      return NextResponse.json({ msg: "Missing fields" }, { status: 400 });
    }

   
    const supabase = await createClient();
    const now = new Date().toISOString();

    const updates: any = {
      testiv_date,
      phase_status: "4",
      last_updated: now,
    };
    if (interview_date) {
      updates.interview_date = interview_date;
    }

    const { error } = await supabase
      .from("application")
      .update(updates)
      .eq("id", application_id);

    if (error) throw error;
    return NextResponse.json(
      { msg: "Phase 3 schedule set (moved to Phase 4)" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { msg: "Unable to set schedule" },
      { status: 500 }
    );
  }
}
