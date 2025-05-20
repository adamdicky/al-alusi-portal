"use client";

import { useState } from "react";

import { UploadSimple, X } from "@phosphor-icons/react";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Button from "@/components/Button";

import { apiFetch } from "@/utils/functions/fetch";

export default function CreatePost({ type, close }: { type: "class_post" | "school_post"; close: () => void }) {
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [images, setImages] = useState<FileList | null>(null);

	async function createPost() {
		try {
			await apiFetch(`/api/newsfeed/${type === "school_post" ? "school" : "class"}/create-post`, {
				method: "POST",
				body: JSON.stringify({ title, description, images: images ? images : "none" }),
			});

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
			<div className="bg-white w-full max-w-2xl rounded-xl p-6 relative space-y-2">
				<button type="button" onClick={close} className="block ml-auto cursor-pointer">
					<X size="18" weight="bold" className="text-black" />
				</button>
				<div className="p-4 rounded-lg border border-gray-200">
					<div className="flex flex-col mb-6">
						<div className="flex items-center space-x-3">
							<div className="w-10 h-10 rounded-full bg-gray-300" />
							<div>
								<p className="font-semibold text-black">Mr. Fairouz</p>
								<p className="text-sm text-gray-500">15 Mar &nbsp; 03:30pm</p>
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
						<div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-md cursor-pointer hover:border-gray-400 focus:border-gray-400">
							<UploadSimple size={60} weight="bold" className="text-gray-500" />
							<p className="text-gray-500 mt-2 text-sm">Click to upload images</p>
							<Input id="image-upload" type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
						</div>
					</div>

					<Button text="Post" onClick={createPost} color="dark-blue" className="block ml-auto" />
				</div>
			</div>
		</div>
	);
}
