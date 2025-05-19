import { authorized } from "@/utils/functions/auth";
import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    try {

        const user = await authorized("admin");
        if (!user) return NextResponse.json({msg: "Unauthorized"}, {status: 401});
        
        const supabase = await createClient();

        const { searchParams } = new URL(req.nextUrl);
        const postId = searchParams.get("postId");
        const action = searchParams.get("action"); //Should be changemade

        if (!postId || !action) {
            return NextResponse.json({msg: "Missing parameters"}, {status: 400});
        }

        const { content } = await req.json();
        if (!content) {
            return NextResponse.json({msg: "Content cannot be empty."}, {status: 400});
        }

        const {data, error} = await supabase
            .from("class_posts")
            .update({content, status: "pending"})
            .eq("post_id", postId)
            .select();
        
        if (error) throw error;
        return NextResponse.json({msg: 'Post updated and status set to Pending.'})

    } catch (err) {
        console.error(err);
        return NextResponse.json({msg: "Unexpected error occurred."}, {status: 500});
    }
}
