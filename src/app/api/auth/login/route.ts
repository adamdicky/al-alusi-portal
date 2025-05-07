import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const { email, password } = await req.json();

		if (!email || !password) return NextResponse.json({ msg: "Email/Password missing" }, { status: 400 });

		const supabase = await createClient();

		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (error) throw error;

		console.log(new URL("/admin/dashboard/newsfeed-management", req.nextUrl));

		return NextResponse.redirect(new URL("/admin/dashboard/newsfeed-management", req.nextUrl));
	} catch (error) {
		console.error(error);
		return NextResponse.json({ msg: "Unexpected error occurred" }, { status: 500 });
	}
}
