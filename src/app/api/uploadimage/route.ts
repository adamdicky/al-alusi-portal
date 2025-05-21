import { createClient } from "@/utils/supabase-connection/server";
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const supabase = await createClient();

        const formData = await req.formData();
        const files = formData.getAll("files") as File[];
        const postType = formData.get("postType") as string; //school_posts or class_posts

        if (!postType || typeof postType !== "string") {
            return NextResponse.json({error: "Mising or invalid postType"}, {status: 400});

        }

        const bucket = "al-alusi-portal-file-storage";
        const images_id: string[] = [];
        const images_path: string[]= [];

        for (const file of files) {
            const ext = file.name.split(".").pop() || "jpeg"; //just in case filename no extension
            const id = uuidv4();
            const path = `${postType}/${id}.${ext}`;

            const { error } = await supabase
                .storage
                .from(bucket)
                .upload(path, file, {
                    contentType: file.type,
                    upsert: false,
                });

                if (error) {
                    console.error("Upload error:", error.message);
                    continue; //skip the file
                }

                images_id.push(id);
                images_path.push(path);
        }

        return NextResponse.json({
            images_id,
            images_path,
            bucket_id: bucket,
        });

    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({msg: "Unexpected error occured"}, {status: 500});
    }
}