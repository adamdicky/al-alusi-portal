import { authorized } from "@/utils/functions/auth";
import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		// const user = await authorized("admin");

		// if (!user) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });

		const { email, password, role } = await req.json();

		if (!email || !password || !role) return NextResponse.json({ msg: "Email/Password/Role missing" }, { status: 404 });

		const supabase = await createClient();

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${process.env.NEXT_PUBLIC_URL}/api/auth/confirm-email`,
				data:
					role === "teacher"
						? {
								role: role.name,
								class: role.class,
						  }
						: {
								role,
						  },
			},
		});

		if (error) throw error;

		return NextResponse.json({ msg: "Success" });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ msg: "Unexpected error occurred" }, { status: 500 });
	}
}
