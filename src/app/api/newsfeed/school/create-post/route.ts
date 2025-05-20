import { authorized } from "@/utils/functions/auth";
import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const user = await authorized("admin");

		if (!user) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });

		const body = await req.json();
		console.log("Received body:", body);

		const { title, description, images_id, images_path, bucket_id } = body;
		// const { title, description, images } = await req.json();

		if (!title || !description || !images_id || !images_path || !bucket_id) {
			return NextResponse.json({ msg: "Missing fields" }, { status: 400 });
		}
		const supabase = await createClient();
		const { data, error } = await supabase.from("school_posts").insert({ title, content: description, author_id: user.id }).select();

		if (error) throw error;
		return NextResponse.json(data, { status: 201 });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ msg: "Unexpected error occurred" }, { status: 500 });
	}
}
