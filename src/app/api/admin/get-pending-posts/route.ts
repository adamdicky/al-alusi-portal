import { authorized } from "@/utils/functions/auth";
import { Tables } from "@/types/supabase/public.types";
import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";
import { PostgrestResponse } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
    try {
            const supabase = await createClient();
    
            const { searchParams } = new URL(req.nextUrl);
            const sort = searchParams.get("sort") || "desc";
    
            const { data, error }: PostgrestResponse<any> = await supabase
                .from("class_posts")
                .select("id, title, content, created_at, author_id, profiles(full_name), images_id, images_path, bucket_id")
                .eq("status", "pending")
                .order("created_at", { ascending: sort === "asc" });
    
            if (error) throw error;
            return NextResponse.json(data);
        } catch (error) {
            console.error(error);
            return NextResponse.json({ msg: "Unexpected error occurred" }, { status: 500 });
        }
}
