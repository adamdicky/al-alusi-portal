import { authorized } from "@/utils/functions/auth";
import { createAdminClient } from "@/utils/supabase-connection/admin";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const user = await authorized("admin");

		if (!user) return new NextResponse(null, { status: 401 });

		const supabase = await createAdminClient();

		const { data, error } = await supabase.auth.admin.listUsers();

		if (error) throw error;

		return NextResponse.json(
			data.users.map((user) => ({
				id: user.id,
				full_name: user.user_metadata.full_name || "N/A",
				created_at: user.created_at,
				role: user.user_metadata.role.name || user.user_metadata.role,
			}))
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ msg: "Unexpected error occurred" }, { status: 500 });
	}
}
