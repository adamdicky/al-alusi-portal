"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import CreatePost from "@/components/CreatePost";
import { Tables } from "@/types/supabase/public.types";
import { apiFetch } from "@/utils/functions/fetch";
import DeletePost from "@/components/DeletePost";
import OpenPost from "@/components/OpenPost";
import RemarkedPost from "@/components/RemarkedPost";

function PostListItem({
	post,
	showPost,
	setPost,
}: {
	post: Tables<"class_posts">;
	showPost: (x: boolean) => void;
	setPost: (x: Tables<"class_posts">) => void;
}) {
	return (
		<div className="flex flex-row items-center justify-between bg-white border border-gray-200 px-3 py-1.5 rounded-md w-full">
			<h6 className="font-medium w-44 overflow-hidden text-ellipsis whitespace-nowrap">{post.title}</h6>
			<div className="flex flex-row items-center gap-1.5 text-gray-500 text-sm">
				<p>{new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(new Date(post.created_at))}</p>
				<p className="w-16 line-clamp-1">{post.author_id}</p>
				<strong
					className={`capitalize ${
						post.status === "pending"
							? "text-amber-400"
							: post.status === "remark"
							? "text-blue-500"
							: post.status === "rejected"
							? "text-danger"
							: post.status === "approved"
							? "text-emerald-600"
							: ""
					}`}
				>
					{post.status}
				</strong>
				<button
					type="button"
					onClick={() => {
						setPost(post);
						showPost(true);
					}}
					className="underline font-semibold ml-3"
				>
					view
				</button>
			</div>
		</div>
	);
}

export default function page() {
	const [post, setPost] = useState<Tables<"class_posts">>();
	const [showPost, setShowPost] = useState<boolean>(false);
	const [teacherPosts, setTeacherPosts] = useState<Tables<"class_posts">[]>([]);
	const [showCreatePost, setShowCreatePost] = useState<boolean>(false);

	useEffect(() => {
		async function getTeacherPosts() {
			try {
				const posts: Tables<"class_posts">[] = await apiFetch("/api/newsfeed/class/post/get?sort=desc", {
					method: "GET",
				});
				setTeacherPosts(posts);
			} catch (error) {
				console.error(error);
			}
		}

		getTeacherPosts();
	}, [post]);

	return (
		<main className="col-span-4 p-4 bg-white border border-gray-200 rounded-lg w-full">
			<div className="flex flex-col justify-between w-full h-full space-y-2">
				<div className="flex flex-row items-center justify-between w-full">
					<h5 className="font-semibold">Pending Newsfeed Approvals</h5>
					<Button
						onClick={() => setShowCreatePost(true)}
						color="dark-blue"
						text="Create Post"
						iconName="Plus"
						iconSide="right"
						iconWeight="bold"
					/>
				</div>
				<div className="flex flex-col items-center gap-3 h-full bg-off-white border border-gray-200 p-2 rounded-lg overflow-y-auto">
					{teacherPosts.length > 0 &&
						teacherPosts.map((post) => <PostListItem key={post.id} post={post} setPost={setPost} showPost={setShowPost} />)}
				</div>
			</div>

			{showPost && post ? (
				post?.status === "remark" ? (
					<RemarkedPost close={() => setShowPost(false)} post={post} setPost={setPost} />
				) : (
					<DeletePost type="class" close={() => setShowPost(false)} post={post} />
				)
			) : null}
		</main>
	);
}
