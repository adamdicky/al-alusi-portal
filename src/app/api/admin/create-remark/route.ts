import { authorized } from "@/utils/functions/auth";
import { createClient } from "@/utils/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const user = await authorized("admin");
        if (!user) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });

        const { remarks } = await req.json(); //extract remarks from request body

        if (!remarks) {
            return NextResponse.json({ msg: "Missing fields" }, { status: 400 });
        } // check if remarks is empty, bcs remark cannot be empty bruh

        const supabase = await createClient();
        const { data, error } = await supabase.from("post_review").insert({ remarks }).select();

        if (error) throw error;
        return NextResponse.json(data, { status: 201 });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ msg: "Unexpected error occurred" }, { status: 500 });
    }
}