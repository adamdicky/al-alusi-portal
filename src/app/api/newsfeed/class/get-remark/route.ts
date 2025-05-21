import { Tables } from "@/types/supabase/public.types";
import { authorized } from "@/utils/functions/auth";
import { createClient } from "@/utils/supabase-connection/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const user = await authorized("teacher");

		if (!user) return new NextResponse(null, { status: 401 });

		const url = new URL(req.nextUrl);
		const id = url.searchParams.get("id");

		if (!id) return NextResponse.json({ msg: "Post id not found" }, { status: 400 });

		const supabase = await createClient();

		const { data: remark, error }: PostgrestSingleResponse<Tables<"post_review">> = await supabase
			.from("post_review")
			.select()
			.eq("post_id", id)
			.limit(1)
			.single();

		if (error) throw error;

		return NextResponse.json(remark.remarks);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ msg: "Unexpected error occurred" }, { status: 500 });
	}
}
