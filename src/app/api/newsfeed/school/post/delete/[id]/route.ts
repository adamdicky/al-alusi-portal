import { authorized } from "@/utils/functions/auth";
import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const user = await authorized("admin");

		if (!user) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });

		const { id } = await params;

		if (!id) return NextResponse.json({ msg: "ID not found" }, { status: 400 });

		const supabase = await createClient();

		const { error } = await supabase.from("school_posts").delete().eq("id", id);

		if (error) throw error;

		return new NextResponse(null, { status: 204 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ msg: "Unexpected error occurred." }, { status: 500 });
	}
}
