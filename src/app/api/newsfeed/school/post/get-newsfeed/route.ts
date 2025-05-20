import { Tables } from "@/types/supabase/public.types";
import { createClient } from "@/utils/supabase-connection/server";
import { PostgrestResponse } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const supabase = await createClient();

		const { searchParams } = new URL(req.nextUrl);
		const sort = searchParams.get("sort") || "desc";

		const { data, error }: PostgrestResponse<Tables<"school_posts">> = await supabase
			.from("school_posts")
			.select()
			.order("created_at", { ascending: sort === "asc" });

		if (error) throw error;
		return NextResponse.json(data);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ msg: "Unexpected error occurred" }, { status: 500 });
	}
}
