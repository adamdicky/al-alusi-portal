"use client";

import React, { useEffect, useState } from "react";
import { User } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Tables } from "@/types/supabase/public.types";
import { Dialog } from "@headlessui/react";
import { createClient } from "@/utils/supabase-connection/client";

export default function Post({ post }: { post: Tables<"school_posts"> }) {
	
	//modal for view selected image
	const [isOpen, setIsOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);

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

	const [authorName, setAuthorName] = useState<string>("");
	
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
		<div className=" flex flex-col bg-white p-3 gap-3 rounded-2xl border border-gray-200 w-full">
			
			<div className="flex flex-row items-center gap-2">
				<User size={32} />
				<div>
					<h6 className="font-bold">{authorName}</h6>
					<div>
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
				<h6><b>{post.title}</b></h6>
				<p>{post.content}</p>
			</div>

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
								alt={`Post image ${index+1}`}
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
	);
}
