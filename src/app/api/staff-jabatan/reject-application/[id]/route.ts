import { authorized } from "@/utils/functions/auth";
import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const user = await authorized("staff_jabatan");
		if (!user) {
			return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
		}

		const { id } = await params;

		if (!id) {
			return NextResponse.json({ msg: "Missing fields" }, { status: 400 });
		}

		const supabase = await createClient();
		const now = new Date().toISOString();

		const { error } = await supabase
			.from("application")
			.update({
				is_reviewed: true,
				reviewed_by: user.id,
				reviewed_at: now,
				phase_status: "rejected",
				last_updated: now,
			})
			.eq("id", id);

		if (error) throw error;
		return NextResponse.json({ msg: "Application rejected" }, { status: 200 });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ msg: "Unable to reject application" }, { status: 500 });
	}
}
