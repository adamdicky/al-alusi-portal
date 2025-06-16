import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const supabase = await createClient();

		await supabase.auth.signOut();

		return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
	} catch (error) {
		console.error(error);
		return NextResponse.json({ msg: "Unexpected error occurred" }, { status: 500 });
	}
}
