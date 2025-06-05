import { authorized } from "@/utils/functions/auth";
import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    
    const user = await authorized("staff_jabatan");
    if (!user) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    
    const { application_id, invitation_date } = await req.json();
    if (!application_id || !invitation_date) {
      return NextResponse.json({ msg: "Missing fields" }, { status: 400 });
    }

    
    const supabase = await createClient();
    const now = new Date().toISOString();

    const { error } = await supabase
      .from("application")
      .update({
        invitation_date,
        status: "accepted",     //  keep “accepted” since... it should technically be accepted to approve application.. man..
        last_updated: now,
      })
      .eq("id", application_id);

    if (error) throw error;
    return NextResponse.json(
      { msg: "Student approved (invitation date set)" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { msg: "Unable to approve student" },
      { status: 500 }
    );
  }
}
