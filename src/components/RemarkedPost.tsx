"use client";

import React, { useEffect, useState } from "react";
import { UploadSimple, User, X } from "@phosphor-icons/react";
import Button from "@/components/Button";
import { Tables } from "@/types/supabase/public.types";
import Image from "next/image";
import { apiFetch } from "@/utils/functions/fetch";
import Textarea from "./ui/textarea";
import Input from "./ui/input";

export default function RemarkedPost({
	post,
	close,
	setPost,
}: {
	post: Tables<"class_posts">;
	close: () => void;
	setPost: (x: Tables<"class_posts">) => void;
}) {
	const [title, setTitle] = useState<string>(post.title);
	const [description, setDescription] = useState<string>(post.content);
	const [images, setImages] = useState<FileList | null>();
	const [remarkText, setRemarkText] = useState<string>("");

	useEffect(() => {
		async function getRemarkData() {
			try {
				const remark = await apiFetch(`/api/newsfeed/class/get-remark?id=${post.id}`, {
					method: "GET",
				});

				setRemarkText(remark);
			} catch (error) {
				console.error(error);
			}
		}

		getRemarkData();
	}, []);

	async function updatePost() {
		try {
			const p = await apiFetch(`/api/newsfeed/class/post/update?id=${post.id}`, {
				method: "PATCH",
				body: JSON.stringify({
					title,
					content: description,
				}),
			});

			console.log(p);

			setPost(p);

			close();
		} catch (error) {
			console.error(error);
		}
	}

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setImages(e.target.files);
	};

	return (
		<div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
			<div className="relative bg-white w-full max-w-3xl rounded-xl p-2 space-y-2">
				<button type="button" onClick={close} className="block ml-auto cursor-pointer">
					<X size="18" weight="bold" className="text-black" />
				</button>

				<div className="flex flex-row border border-gray-200 rounded-md p-4 space-y-6">
					<div className="flex flex-col gap-4 p-3 w-full">
						<div className="flex flex-row items-center gap-2 w-full">
							<User size={32} />
							<div>
								<h6 className="font-semibold w-44 overflow-hidden text-ellipsis whitespace-nowrap">Mr. Fairouz</h6>
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

						<div className="">
							<label className="block text-sm font font-medium text-black mb-1">Title</label>
							<Input
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Enter title"
								className="w-full px-3 py-2 rounded-md"
							/>
						</div>

						<div className="">
							<label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
							<Textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								placeholder="Enter description"
								rows={4}
								className="w-full px-3 py-2 border rounded-md resize-none"
							/>
						</div>

						<div className="">
							<label className="block text-sm font-medium text-gray-700 mb-2">Attach Images</label>
							<div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-md cursor-pointer hover:border-gray-400 focus:border-gray-400">
								<UploadSimple size={60} weight="bold" className="text-gray-500" />
								<p className="text-gray-500 mt-2 text-sm">Click to upload images</p>
								<Input id="image-upload" type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
							</div>
						</div>
					</div>

					<Textarea placeholder="Type your remark here..." value={remarkText} className="w-44 text-black resize-none" disabled />
				</div>

				{/* Action Buttons */}
				<div className="flex justify-end gap-2">
					<Button text="Update Post" color="dark-blue" onClick={updatePost} className="font-semibold text-sm" />
				</div>
			</div>
		</div>
	);
}
