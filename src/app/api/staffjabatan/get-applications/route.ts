import { authorized } from "@/utils/functions/auth";
import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";
import type { PostgrestResponse } from "@supabase/supabase-js";
import type { Tables } from "@/types/supabase/public.types";

export async function GET(req: NextRequest) {
  try {
    const user = await authorized("staff_jabatan");
    if (!user) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createClient(); 
    

    const { searchParams } = new URL(req.nextUrl);
    const statusFilter = searchParams.get("status"); // a string or null
    const orderParam = searchParams.get("order") === "asc" ? "asc" : "desc";

    
    let query = supabase.from("application").select("*");

    if (statusFilter) {
      query = query.eq("status", statusFilter);
    }
    query = query.order("created_at", { ascending: orderParam === "asc" });

    const { data, error }: PostgrestResponse<Tables<"application">> = await query;
    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { msg: "Unable to fetch applications" },
      { status: 500 }
    );
  }
}
