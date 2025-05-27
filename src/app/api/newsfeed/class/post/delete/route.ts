import { authorized } from "@/utils/functions/auth";
import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await authorized("teacher");

    if (!user)
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });

    const { id } = await req.json();

    if (!id)
      return NextResponse.json(
        { msg: "Post does not exist." },
        { status: 400 }
      );

    const supabase = await createClient();

    const { data: post, error: fetchError } = await supabase
      .from("class_posts")
      .select("status")
      .eq("id", id)
      .single();

    if (fetchError || !post) {
      return NextResponse.json(
        {msg: "Post not found."},
        { status: 404 }
      )
    };

    if (post.status === "remark") {
      const { error: reviewError } = await supabase
      .from("post_review")
      .delete()
      .eq("post_id", id);
    
    if (reviewError) throw reviewError;
    }
  
    const { error: postError } = await supabase
      .from("class_posts")
      .delete()
      .eq("id", id);

    if (postError) throw postError;

    // const { error } = await supabase.from("class_posts").delete().eq("id", id);
    // if (error) throw error;

    return NextResponse.json({ msg: "Successfully deleted post." });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { msg: "Unexpected error occurred" },
      { status: 500 }
    );
  }
}
