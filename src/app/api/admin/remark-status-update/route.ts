import { authorized } from "@/utils/functions/auth";
import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

//CONTAINS UPDATE: remark
//checks if there is review for the post, if exists = set status to remark

export async function PATCH(req: NextRequest) {
    try {

        const user = await authorized("admin");
        if (!user) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
        
        const supabase = await createClient();

        const { searchParams } = new URL(req.nextUrl);
        const postId = searchParams.get("postId");

        if (!postId) {
            return NextResponse.json({ msg: "Missing parameters" }, { status: 400 });
        }

        const { data: reviewData, error: reviewError } = await supabase
            .from("class_posts")
            .select("review")
            .eq("post_id", postId)
            .single(); //retrieve review if there exists same postID until last row 

        if (reviewError && reviewError.code !== "PGRST116") throw reviewError; //if error is anything else other than row not found, throw error

        // if there is review for that postID, do this (set status to remark)
        if (reviewData) {
            const { data, error } = await supabase
                .from("class_posts")
                .update({ status: "remark" })
                .eq("post_id", postId)
                .select();

                if (error) throw error;
                return NextResponse.json({ msg: "Post status updated to remark", data }, { status: 200 });
        } else {
            return NextResponse.json({ msg: "No review found for this post" }, { status: 404 });
        }
    } catch (err) {
        console.error(err);
        return NextResponse.json({ msg: "Unexpected error occurred." }, { status: 500 });
    }
}