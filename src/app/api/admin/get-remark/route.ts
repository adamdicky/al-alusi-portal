import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        
        const supabase = await createClient(); //connect to supabase

        const { searchParams } = new URL(req.nextUrl); //get the url
        const postid = searchParams.get("post_id"); //get the post id from the url

        const { data, error } = await supabase
            .from("post_review") //get the post review table
            .select("*") //select all the data
            .eq("post_id", postid) //where post id from is equal to the post id from the url

        if (error) throw error;
        return NextResponse.json(data);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ msg: "Unexpected error occurred" }, { status: 500 });
    }
}