import { authorized } from "@/utils/functions/auth";
import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const user = await authorized("teacher");

		if (!user) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });

		const { author_id, title, content } = await req.json();

		if (!author_id || !title || !content) return NextResponse.json({ msg: "Some fields are missing" }, { status: 400 });

		const supabase = await createClient();

		const { data, error } = await supabase.from("posts").insert({ author_id, title, content }).select();

		if (error) throw error;
		return NextResponse.json(data);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ msg: "Unexpected error occurred" }, { status: 500 });
	}
}
