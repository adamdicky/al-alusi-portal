import { authorized } from "@/utils/functions/auth";
import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

//CONTAINS UPDATE: approved, rejected

export async function PATCH(req: NextRequest) {
    try {

        const user = await authorized("admin");
        if (!user) return NextResponse.json({msg: "Unauthorized"}, {status: 401});

        const supabase = await createClient();

        //get params from url
        const { searchParams } = new URL(req.nextUrl);
        const postId = searchParams.get("postId");
        const action = searchParams.get("action"); //Either approved or rejected

        //validate params
        if (!postId || !action) {
            return NextResponse.json({msg: "Missing parameters"}, {status: 400});
        }

        if (action !== "approved" && action !== "rejected") {
            return NextResponse.json({ msg: "Invalid status" }, { status: 400 });
        }

        const { data, error } = await supabase
            .from("class_posts")
            .update({status: action})
            .eq("post_id", postId) 
            .select();
        
        if (error) throw error;
         
        return NextResponse.json({msg: "Post status updated to ${action}", data}, {status: 200});
        

    } catch (err) {
        console.error(err);
        return NextResponse.json({msg: "Unexpected error occurred."}, {status: 500});
    }
}