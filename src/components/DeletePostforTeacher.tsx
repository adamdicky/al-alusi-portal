"use client";

import React, { useEffect, useState } from "react";
import { User, X } from "@phosphor-icons/react";
import Button from "@/components/Button";
import { Tables } from "@/types/supabase/public.types";
import Image from "next/image";
import { apiFetch } from "@/utils/functions/fetch";
import { Dialog } from "@headlessui/react";
import { createClient } from "@/utils/supabase-connection/client";

const DeletePostforTeacher = ({ post, type, close }: { post: Tables<"school_posts" | "class_posts">; type: "school" | "class"; close: () => void }) => {
    async function deletePost(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        try {
            await apiFetch(`/api/newsfeed/class/post/delete/`, {
                method: "POST",
                body: JSON.stringify({ id: post.id }),
            });

            close();
        } catch (error) {
            console.error(error);
        }
    };

    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [authorName, setAuthorName] = useState<string>("");


    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

    //get bucketid and imagepath frmo post
    const bucket = post.bucket_id;
    const imagePaths = post.images_path ?? [];

    //take only 3 image for preview
    const previewImages = imagePaths.slice(0, 3);

    const handleImageClick = (index: number) => {
        setSelectedIndex(index);
        setIsOpen(true);
    };

    const imageUrl =
        post.images_path && post.images_path.length > 0 && post.bucket_id
            ? `https://apkeqsxxyrlsariwtaow.supabase.co/storage/v1/object/public/${post.bucket_id}/${post.images_path[0]}`
            : "/example pic siraj al alusi.jpg";

    useEffect(() => {
        async function getAuthorName() {
            if (!post.author_id) return;

            const supabase = createClient();
            const { data, error } = await supabase
                .from("profiles")
                .select("full_name")
                .eq("id", post.author_id)
                .single();

            if (error) {
                console.error("Error fetching author name:", error);
                return;
            }

            if (data?.full_name) {
                setAuthorName(data.full_name);
            }
        }

        getAuthorName();
    }, []);

    return (
        <div className="fixed inset-0 bg-black/75 overflow-y-auto flex items-start justify-center py-10 z-50">
            <div className="bg-white w-full max-w-2xl rounded-xl p-2 relative space-y-2">
                <button type="button" onClick={close} className="block ml-auto cursor-pointer">
                    <X size="18" weight="bold" className="text-black" />
                </button>
                <div className="border border-gray-200 rounded-md p-4 space-y-6">
                    <div className="flex flex-row items-center gap-2 w-full">
                        <User size={32} />
                        <div>
                            <h6 className="font-semibold w-44 overflow-hidden text-ellipsis whitespace-nowrap">{authorName}</h6>
                            <div className="flex flex-row items-center gap-2">
                                <h6 className="text-[12px] text-[#909090]">
                                    {new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(new Date(post.created_at))}
                                </h6>
                                <h6 className="text-[12px] text-[#909090]">
                                    {new Intl.DateTimeFormat("en-GB", { hour: "numeric", minute: "2-digit", hour12: true })
                                        .format(new Date(post.created_at))
                                        .toLocaleLowerCase()}
                                </h6>
                            </div>
                        </div>
                    </div>

                    <div className="text-justify">
                        <h6>
                            <b>{post.title}</b>
                        </h6>
                        <p className="whitespace-pre-line">{post.content}</p>
                    </div>

                    <div className="relative w-full h-60 overflow-hidden rounded-md">
                        {/* <Image src={imageUrl} alt="post image" fill className="object-cover" /> */}
                        {/* IMAGE FNCTION STARTS HERE */}
                        {imagePaths.length > 0 && (
                            <div className="grid grid-cols-3 gap-2 w-full rounded-xl overflow-hidden h-60 relative">
                                {previewImages.map((path, index) => (
                                    <div key={path}
                                        className={`relative w-full h-full ${index === 2 && imagePaths.length > 3 ? "brightness-85" : ""} cursor-pointer`}
                                        onClick={() => handleImageClick(index)}
                                    >
                                        <Image
                                            //Construct full image URL from bucket + path
                                            src={`${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`}
                                            alt={`Post image ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                        {/* if 3rd image and more image exist (which cant be) show "show more" */}
                                        {index === 2 && imagePaths.length > 3 && (
                                            <div
                                                className="absolute inset-0 flex items-center justify-center text-white hover:text-2xl font-bold text-lg bg-black/60 cursor-pointer"
                                                onClick={() => handleImageClick(index)}
                                            >
                                                <p>Show more +</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                        )}
                        {/* open fullscreen modal image viewer */}
                        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                                <div className="bg-white p-4 rounded-xl max-w-3xl w-full max-h-[80vh] overflow-auto">
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="text-sm text-red-500 hover:font-bold font-medium px-2 py-1"
                                        >
                                            Close ✕
                                        </button>
                                    </div>
                                    {/* main image */}
                                    <Image
                                        src={`${supabaseUrl}/storage/v1/object/public/${bucket}/${imagePaths[selectedIndex]}`}
                                        alt={`Selected image`}
                                        width={800}
                                        height={600}
                                        className="object-contain w-full"
                                    />
                                    {/* dots to switch image display */}
                                    <div className="flex justify-center gap-2 mt-4">
                                        {imagePaths.map((_, i) => (
                                            <button
                                                key={i}
                                                className={`w-3 h-3 rounded-full ${i === selectedIndex ? "bg-black" : "bg-gray-400"}`}
                                                onClick={() => setSelectedIndex(i)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Dialog>
                    </div>
                </div>

                <Button text="Delete Post" color="danger" onClick={deletePost} className="block ml-auto font-semibold text-sm" />
            </div>
        </div>
    );
};

export default DeletePostforTeacher;
