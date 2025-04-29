// src/app/api/newsfeed/school/create-post/route.ts

import { authorized } from "@/utils/functions/auth";
import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const user = await authorized("admin");

		if (!user) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });

		const body = await req.json();
		const { title, description, images, authorId } = body;

		if (!title || !description || !images || !authorId) {
			return NextResponse.json({ error: "Missing fields" }, { status: 400 });
		}
		const supabase = await createClient();
		const { data, error } = await supabase.from("countries").insert({ title, content: description, author_id: authorId }).select();

		if (error) throw error;
		return NextResponse.json({ message: "Post created", post: data }, { status: 201 });
	} catch (err) {
		return NextResponse.json({ error: "Unexpected Error Occured" }, { status: 500 });
	}
}
