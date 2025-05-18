"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import CreatePost from "@/components/CreatePost";
import { Tables } from "@/types/supabase/public.types";
import { apiFetch } from "@/utils/functions/fetch";
import DeletePost from "@/components/DeletePost";

function PostListItem({
	post,
	showPost,
}: {
	post: Tables<"school_posts" | "class_posts">;
	showPost: (x: null | Tables<"school_posts" | "class_posts">) => void;
}) {
	return (
		<div className="flex flex-row items-center justify-between bg-white border border-gray-200 px-3 py-1.5 rounded-md w-full">
			<h6 className="font-medium w-44 overflow-hidden text-ellipsis whitespace-nowrap">{post.title}</h6>
			<div className="flex flex-row items-center gap-1.5 text-gray-500 text-sm">
				<p>{new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(new Date(post.created_at))}</p>
				<p className="w-16 line-clamp-1">{post.author_id}</p>
				<button type="button" onClick={() => showPost(post)} className="underline font-semibold ml-3">
					view
				</button>
			</div>
		</div>
	);
}

export default function page() {
	const [showPost, setShowPost] = useState<Tables<"school_posts" | "class_posts"> | null>(null);
	const [showCreatePost, setShowCreatePost] = useState<boolean>(false);
	const [schoolNewsfeed, setSchoolNewsfeed] = useState<Tables<"school_posts">[]>();

	useEffect(() => {
		async function getPosts() {
			try {
				const posts: Tables<"class_posts">[] = await apiFetch("/api/newsfeed/school/get-newsfeed?sort=desc", {
					method: "GET",
				});

				setSchoolNewsfeed(posts);
			} catch (error) {
				console.error(error);
			}
		}

		getPosts();
	}, []);

	return (
		<main className="col-span-4 grid grid-cols-2 grid-rows-2 grid-flow-row gap-4 p-4 bg-white border border-gray-200 rounded-lg">
			<div className="flex flex-col justify-between w-full space-y-2">
				<h5 className="font-semibold">Pending Newsfeed Approvals</h5>
				<div className="flex flex-col items-center gap-3 h-64 bg-off-white border border-gray-200 p-2 rounded-lg overflow-y-auto">
					<div className="flex flex-row items-center justify-between bg-white border border-gray-200 px-3 py-1.5 rounded-md w-full">
						<h6 className="font-medium">Class 1-USM</h6>
						<div className="flex flex-row items-center gap-1.5 text-gray-500 text-sm">
							<p>Feb 06</p>
							<p>Mr. Fairous</p>
							<button type="button" className="underline font-semibold ml-3">
								view
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col justify-between w-full space-y-2">
				<div className="flex flex-row items-center justify-between">
					<h5 className="font-semibold">Published School Newsfeed</h5>
					<Button
						onClick={() => setShowCreatePost(true)}
						color="dark-blue"
						text="Create Post"
						iconName="Plus"
						iconSide="right"
						iconWeight="bold"
					/>
				</div>
				<div className="flex flex-col items-center gap-3 h-64 bg-off-white border border-gray-200 p-2 rounded-lg overflow-y-auto">
					{schoolNewsfeed && schoolNewsfeed?.map((post) => <PostListItem key={post.id} post={post} showPost={setShowPost} />)}
				</div>
			</div>
			<div className="col-span-2 space-y-2">
				<h5 className="font-semibold">Recently Approved Newsfeed</h5>
				<div className="flex flex-col items-center gap-3 h-64 bg-off-white border border-gray-200 p-2 rounded-lg overflow-y-auto">
					<div className="flex flex-row items-center justify-between bg-white border border-gray-200 px-3 py-1.5 rounded-md w-full">
						<h6 className="font-medium">Show & tell on 16 March</h6>
						<div className="flex flex-row items-center gap-1.5 text-gray-500 text-sm">
							<p>Feb 06</p>
							<p>Mr. Fairous</p>
							<p>1-USM</p>
							<button type="button" className="underline font-semibold ml-3">
								view
							</button>
						</div>
					</div>
				</div>
			</div>
			{showCreatePost && <CreatePost close={() => setShowCreatePost(false)} />}
			{showPost !== null && <DeletePost post={showPost} close={() => setShowPost(null)} />}
		</main>
	);
}
