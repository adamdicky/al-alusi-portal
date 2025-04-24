import { createClient } from "@/supabase-connection/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
            const {id} = await req.json();

            if (!id) return NextResponse.json({msg: "Post does not exist."}, {status: 400});

            const supabase = await createClient();

            // const { data, error } = await supabase
            //     .from('posts')
            //     .insert({author_id, title, content})

            const { error} = await supabase
                .from('posts')
                .delete()
                .eq('id', id)

            if (error) throw error;
            return NextResponse.json({msg: "Successfully deleted post."})
        } catch (error) {
        console.error(error)
        return NextResponse.json({msg: "Unexpected error occurred"}, {status: 500})
    }
}