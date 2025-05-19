import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";
import { authorized } from "@/utils/functions/auth";


export async function GET(req: NextRequest) {
    try {

        const user = await authorized("admin");
        if (!user) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
        
        const supabase = await createClient();
        
        const { data, error } = await supabase
            .from("class_posts")
            .select("class, created_at, author_id")
            .eq("status", "approved")
            .order("created_at", { ascending: false })

        if (error) throw error;

        return NextResponse.json(data, { status: 200 });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ msg: "Unexpected error occurred." }, { status: 500 });
    }
}