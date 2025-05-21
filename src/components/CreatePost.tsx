"use client";

import { useState, useRef, useEffect } from "react";
import { UploadSimple, X } from "@phosphor-icons/react";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Button from "@/components/Button";
import Image from "next/image";
import { apiFetch } from "@/utils/functions/fetch";
import { createClient } from "@/utils/supabase-connection/client";
import { create } from "domain";

const supabase = createClient();

interface CreatePostProps {
	close: () => void;
	postType: "school_posts" | "class_posts";
}

export default function CreatePost({ close, postType }: CreatePostProps) {
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [images, setImages] = useState<File[]>([]);
	const [userId, setUserId] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			const { data: { user } } = await supabase.auth.getUser();
			setUserId(user?.id ?? "Unknown");
		};

		fetchUser();
	}, []);

	const now = new Date();
	const date = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(now);
	const time = new Intl.DateTimeFormat("en-GB", { hour: "numeric", minute: "2-digit", hour12: true })
		.format(now)
		.toLowerCase();


	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const selectedFiles = Array.from(e.target.files);

			if (selectedFiles.length + images.length > 4) {
				alert("You can only upload a maximum of 4 images.");
				return;
			}

			setImages((prevImages) => [...prevImages, ...selectedFiles]);
		}
	};

	const removeImage = (index: number) => {
		setImages((prevImages) => prevImages.filter((_, i) => i !== index));
	};

	async function createPost() {
		try {
			const formData = new FormData();
			formData.append("postType", postType);

			images.forEach((image) => {
				formData.append("files", image);
			});

			const uploadResponse = await fetch("/api/uploadimage", {
				method: "POST",
				body: formData,
			});

			if (!uploadResponse.ok) {
				throw new Error("Image upload failed.");
			}

			const uploadedData = await uploadResponse.json();
			const { images_path, images_id, bucket_id } = uploadedData;

			console.log({
				title,
				description,
				images_path,
				images_id,
				bucket_id,
			});

			await apiFetch(postType === "school_posts" ? "/api/newsfeed/school/post/create" : "/api/newsfeed/class/post/create", {
				method: "POST",
				body: JSON.stringify({
					title,
					description,
					images_path,
					images_id,
					bucket_id,
				}),
			});

			close();
		} catch (error) {
			console.error("Failed to create post:", error);
			alert("Failed to create post. Check console for details.");
		}
	}

	return (
		<div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
			<div className="bg-white w-full max-w-2xl max-h-11/12 rounded-xl p-6 relative space-y-2 overflow-y-scroll">
				<button type="button" onClick={close} className="block ml-auto cursor-pointer">
					<X size="18" weight="bold" className="text-black" />
				</button>
				<div className="p-4 rounded-lg border border-gray-200">
					<div className="flex flex-col mb-6">
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 rounded-full bg-gray-300" />
							<div>
								<p className="font-semibold text-black">{userId ?? "Unkown User"}</p>
								<p className="text-sm text-gray-500">{date} &nbsp; {time}</p>
							</div>
						</div>
					</div>

					<div className="mb-4">
						<label className="block text-sm font font-medium text-black mb-1">Title</label>
						<Input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter title"
							className="w-full px-3 py-2 rounded-md"
						/>
					</div>

					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
						<Textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Enter description"
							rows={4}
							className="w-full px-3 py-2 border rounded-md resize-none"
						/>
					</div>

					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 mb-2">Attach Images</label>
						<div
							onClick={handleUploadClick}
							className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-md cursor-pointer hover:border-gray-400 focus:border-gray-400"
						>
							<UploadSimple size={60} weight="bold" className="text-gray-500" />
							<p className="text-gray-500 mt-2 text-sm">Click to upload images.</p>
							<Input
								ref={fileInputRef}
								id="image-upload"
								type="file"
								accept="image/*"
								multiple
								className="hidden"
								onChange={handleImageChange}
							/>
						</div>

						{/* Image Preview */}
						<div className="mt-4 flex gap-4 flex-wrap">
							{images.map((image, index) => (
								<div key={index} className="relative">
									<Image
										src={URL.createObjectURL(image)}
										alt={`Preview ${index}`}
										width={100}
										height={100}
										className="rounded-md object-cover"
									/>
									<X
										size={16}
										weight="bold"
										className="absolute top-1 right-1 cursor-pointer text-red-500 bg-white rounded-full"
										onClick={() => removeImage(index)}
									/>
								</div>
							))}
						</div>
					</div>

					<Button text="Post" onClick={createPost} color="dark-blue" className="block ml-auto" />
				</div>
			</div>
		</div>
	);
}
