import { authorized } from "@/utils/functions/auth";
import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
	try {
		const user = await authorized("teacher");
		if (!user) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });

		const supabase = await createClient();

		const { searchParams } = new URL(req.nextUrl);
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json({ msg: "Missing parameters" }, { status: 400 });
		}

		const { title, content } = await req.json();
		if (!title || !content) {
			return NextResponse.json({ msg: "Content cannot be empty." }, { status: 400 });
		}

		const { data: post, error } = await supabase.from("class_posts").update({ title, content, status: "pending" }).eq("id", id).select();

		if (error) throw error;
		return NextResponse.json(post);
	} catch (err) {
		console.error(err);
		return NextResponse.json({ msg: "Unexpected error occurred." }, { status: 500 });
	}
}
