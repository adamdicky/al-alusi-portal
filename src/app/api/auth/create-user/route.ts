import { authorized } from "@/utils/functions/auth";
import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

import { randomBytes } from "crypto";

export function generatePassword(): string {
	const lowercase = "abcdefghijklmnopqrstuvwxyz";
	const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const digits = "0123456789";
	const all = lowercase + uppercase + digits;

	let password = [
		lowercase[Math.floor(Math.random() * lowercase.length)],
		uppercase[Math.floor(Math.random() * uppercase.length)],
		digits[Math.floor(Math.random() * digits.length)],
	];

	while (password.length < 8) {
		const char = all[Math.floor((randomBytes(1)[0] / 256) * all.length)];
		password.push(char);
	}

	return password.sort(() => 0.5 - Math.random()).join("");
}

export async function POST(req: NextRequest) {
	try {
		const user = await authorized("admin");

		if (!user) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });

		const { email, fullname, role } = await req.json();

		if (!email || !fullname || !role) return NextResponse.json({ msg: "Email/Password/Role missing" }, { status: 404 });

		const supabase = await createClient();

		const password = generatePassword();

		console.log(password);

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${process.env.NEXT_PUBLIC_URL}/api/auth/confirm-email`,
				data: {
					full_name: fullname,
					temp_password: password,
					role: role.name
						? {
								name: role.name,
								class: role.class,
						  }
						: role,
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
