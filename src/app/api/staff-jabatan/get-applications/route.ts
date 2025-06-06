// File: src/app/api/staff-jabatan/get-applications/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase-connection/server";
import { authorized } from "@/utils/functions/auth";

export async function GET(request: Request) {
	try {
		const user = await authorized("staff_jabatan");

		if (!user) {
			return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
		}

		const url = new URL(request.url);
		const statusFilter = url.searchParams.get("status"); // "pending" | "accepted" | "rejected" | null
		const orderParam = url.searchParams.get("order") === "asc" ? "asc" : "desc";

		const supabase = await createClient();
		let query = supabase.from("application").select();

		if (statusFilter && statusFilter !== "All") {
			query = query.eq("phase_status", statusFilter);
		}
		query = query.order("created_at", { ascending: orderParam === "asc" });

		const { data, error } = await query;
		if (error) throw error;

		// Wrap the result array in an object:
		return NextResponse.json({ applications: data });
	} catch (err) {
		console.error("get-applications error:", err);
		return NextResponse.json({ msg: "Unable to fetch applications" }, { status: 500 });
	}
}
