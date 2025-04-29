import { createClient } from "@/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
            const {author_id, title, content} = await req.json();

            if (!author_id || !title || !content) return NextResponse.json({msg: "Some fields are missing"}, {status: 400});

            const supabase = await createClient();

            // const { data, error } = await supabase.auth.signInWithPassword({
            //     email: 'example@email.com',
            //     password: 'example-password',
            //   })

            const { data, error } = await supabase
                .from('posts')
                .insert({author_id, title, content})
                .select()

            if (error) throw error;
            return NextResponse.json(data)
        } catch (error) {
        console.error(error)
        return NextResponse.json({msg: "Unexpected error occurred"}, {status: 500})
    }
}