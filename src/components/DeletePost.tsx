"use client";

import React from "react";
import { User, X } from "@phosphor-icons/react";
import Button from "@/components/Button";
import { Tables } from "@/types/supabase/public.types";
import Image from "next/image";
import { apiFetch } from "@/utils/functions/fetch";

const DeletePost = ({ post, type, close }: { post: Tables<"school_posts" | "class_posts">; type: "school" | "class"; close: () => void }) => {
	async function deletePost(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		try {
			const deletePost = await apiFetch(`/api/newsfeed/${type}/delete/${post.id}`, {
				method: "DELETE",
			});

			close();
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
			<div className="bg-white w-full max-w-2xl rounded-xl p-2 relative space-y-2">
				<button type="button" onClick={close} className="block ml-auto cursor-pointer">
					<X size="18" weight="bold" className="text-black" />
				</button>
				<div className="border border-gray-200 rounded-md p-4 space-y-6">
					<div className="flex flex-row items-center gap-2 w-full">
						<User size={32} />
						<div>
							<h6 className="font-semibold w-44 overflow-hidden text-ellipsis whitespace-nowrap">{post.author_id}</h6>
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
						<h6><b>{post.title}</b></h6>
						<p>{post.content}</p>
					</div>

					<div className="relative w-full h-60 overflow-hidden rounded-md">
						<Image
							src="/example pic siraj al alusi.jpg"
							alt="example pic"
							fill
							// width={1170}
							// height={1000}
							className="object-cover"
						/>
					</div>
				</div>
				<Button text="Delete Post" color="danger" onClick={deletePost} className="block ml-auto font-semibold text-sm" />
			</div>
		</div>
	);
};

export default DeletePost;
