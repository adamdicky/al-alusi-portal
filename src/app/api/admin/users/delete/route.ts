import { authorized } from "@/utils/functions/auth";
import { createAdminClient } from "@/utils/supabase-connection/admin";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
	try {
		const user = await authorized("admin");

		if (!user) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });

		const url = new URL(req.nextUrl);
		const id = url.searchParams.get("id");

		if (!id) return NextResponse.json({ msg: "User ID is not found." }, { status: 400 });

		const supabase = await createAdminClient();

		const { error } = await supabase.auth.admin.deleteUser(id);

		if (error) throw error;

		return NextResponse.json({ msg: "User deleted successfully." });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ msg: "Unexpected error occurred" }, { status: 500 });
	}
}
