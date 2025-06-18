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

type PostWithTableName =
  | (ClassPostWithAuthor & { table_name: "class_posts" })
  | (SchoolPostWithAuthor & { table_name: "school_posts" });


type ClassPostWithAuthor = Tables<"class_posts"> & {
  profiles: {
	full_name: string;
  } | null;
};

type SchoolPostWithAuthor = Tables<"school_posts"> & {
  profiles: {
	full_name: string;
  } | null;
};


function PostListItem({
	post,
	showPost,
	tableName,
}: {
	post: ClassPostWithAuthor | SchoolPostWithAuthor;
	showPost: (x: null | PostWithTableName) => void;
	tableName: "school_posts" | "class_posts";
}) {
	const iamgeUrl = post.images_path && post.images_path.length > 0 && post.bucket_id 
	? `https://apkeqsxxyrlsariwtaow.supabase.co/storage/v1/object/public/${post.bucket_id}/${post.images_path[0]}`
	: "/example pic siraj al alusi.jpg";
	
	return (
		<div className="flex flex-row items-center justify-between bg-white border border-gray-200 px-3 py-1.5 rounded-md w-full">
			<h6 className="font-medium w-60 overflow-hidden text-ellipsis whitespace-nowrap">{post.title}</h6>
			<div className="flex flex-row justify-center items-center gap-1.5 text-gray-500 text-sm">
				<p>{new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(new Date(post.created_at))}</p>
				<p className="w-40 flex flex-row justify-center">{post.profiles?.full_name ?? "Unknown"}</p>
				<button
					type="button"
					onClick={() =>
						showPost({
							...post as ClassPostWithAuthor,
							table_name: tableName,
						})
					}
					className="underline font-semibold ml-3"
				>
					view
				</button>
			</div>
		</div>
	);
}

export default function page() {
	// const [showPost, setShowPost] = useState<null | (Tables<"school_posts" | "class_posts"> & { table_name: "class_posts" | "school_posts" })>(null);
	const [showPost, setShowPost] = useState<null | PostWithTableName>(null);
	const [showCreatePost, setShowCreatePost] = useState<boolean>(false);
	const [schoolNewsfeed, setSchoolNewsfeed] = useState<SchoolPostWithAuthor[]>();
	const [pendingPosts, setPendingPosts] = useState<ClassPostWithAuthor[]>();
	const [approvedPosts, setApprovedPosts] = useState<ClassPostWithAuthor[]>();
	// const [schoolNewsfeed, setSchoolNewsfeed] = useState<Tables<"school_posts">[]>();
	// const [pendingPosts, setPendingPosts] = useState<Tables<"class_posts">[]>([]); //for pending posts
	// const [approvedPosts, setApprovedPosts] = useState<Tables<"class_posts">[]>([]); //for approved posts

	useEffect(() => {
		async function getPosts() {
			try {
				const posts: SchoolPostWithAuthor[] = await apiFetch("/api/newsfeed/school/post/get-newsfeed?sort=desc", {
					method: "GET",
				});

				setSchoolNewsfeed(posts);
			} catch (error) {
				console.error(error);
			}
		}

		async function getPendingPosts() {
			try {
				const data: ClassPostWithAuthor[] = await apiFetch("/api/admin/get-pending-posts", {
					method: "GET",
				});
				setPendingPosts(data);
			} catch (error) {
				console.error(error);
			}
		}

		async function getApprovedPosts() {
			try {
				const data: ClassPostWithAuthor[] = await apiFetch("/api/admin/get-latest-approved-posts", {
					method: "GET",
				});
				setApprovedPosts(data);
			} catch (error) {
				console.error(error);
			}
		}

		console.log("Pending Posts Data:", pendingPosts);

		getApprovedPosts();
		getPendingPosts();
		getPosts();
	}, [showPost, showCreatePost]);

	return (
		<main className="bg-white col-span-4 grid grid-cols-2 grid-rows-2 grid-flow-row gap-4 p-4 border border-gray-200 rounded-lg">
			<div className="flex flex-col w-full space-y-2 my-3">
				<div className="flex flex-row items-center justify-between">
					<h5 className="font-semibold">Pending Class Newsfeed</h5>
				</div>
				<div className="flex flex-col  items-center gap-3 h-77 bg-off-white border border-gray-200 p-2 rounded-lg overflow-y-scroll">
					{pendingPosts &&
						pendingPosts?.map((post) => <PostListItem key={post.id} post={post} showPost={setShowPost} tableName="class_posts" />)}
				</div>
			</div>
			{/* COMMENT */}
			<div className="flex flex-col w-full space-y-2">
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
				<div className="flex flex-col items-center gap-3 h-77 bg-off-white border border-gray-200 p-2 rounded-lg overflow-y-scroll">
					{schoolNewsfeed &&
						schoolNewsfeed?.map((post) => <PostListItem key={post.id} post={post} showPost={setShowPost} tableName="school_posts" />)}
				</div>
			</div>
			{/* COMMENT */}
			<div className="col-span-2 space-y-2">
				<h5 className="font-semibold">Recently Approved Newsfeed</h5>
				<div className="flex flex-col items-center gap-3 h-77 bg-off-white border border-gray-200 p-2 rounded-lg overflow-y-scroll">
					{approvedPosts &&
						approvedPosts?.map((post) => <PostListItem key={post.id} post={post} showPost={setShowPost} tableName="class_posts" />)}
				</div>
			</div>
			{showCreatePost && <CreatePost close={() => setShowCreatePost(false)} postType="school_posts" />}
			{showPost !== null && showPost.table_name === "school_posts" && (
				<DeletePost type="school" post={showPost} close={() => setShowPost(null)} />
			)}
			{showPost !== null && showPost.table_name === "class_posts" && <OpenPost post={showPost} close={() => setShowPost(null)} />}
		</main>
	);
}
