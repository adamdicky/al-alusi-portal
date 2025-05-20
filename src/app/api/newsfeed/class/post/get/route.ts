import { authorized } from "@/utils/functions/auth";
import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const user = await authorized("teacher");

		if (!user) return NextResponse.json({ msg: "Unauthorized" }, { status: 403 });

		const supabase = await createClient();

		const { searchParams } = new URL(req.nextUrl);
		const sort = searchParams.get("sort") || "desc"; // default: latest first

		const { data, error } = await supabase
			.from("class_posts")
			.select()
			.eq("author_id", user.id)
			.order("created_at", { ascending: sort === "asc" });

		if (error) throw error;
		return NextResponse.json(data);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ msg: "Unexpected error occurred" }, { status: 500 });
	}
}
