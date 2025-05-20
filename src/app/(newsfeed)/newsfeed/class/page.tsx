"use client";

import Button from "@/components/Button";
import Post from "@/components/Post";
import { Tables } from "@/types/supabase/public.types";
import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/functions/fetch";
// import { User  } from "@phosphor-icons/react";

export default function Home() {
	const [posts, setPosts] = useState<Tables<"class_posts">[]>();

	useEffect(() => {
		async function getPosts() {
			try {
				const posts: Tables<"class_posts">[] = await apiFetch("/api/newsfeed/school/post/get-newsfeed?sort=desc", {
					method: "GET",
				});

				setPosts(posts);
			} catch (error) {
				console.error(error);
			}
		}

		getPosts();
	}, []);
	return (
		<>
			<div className="flex flex-col min-h-screen">
				<main className="flex-grow">
					<div className="flex flex-col bg-white p-4 my-10 sm:mx-12 md:mx-20 lg:mx-40 xl:mx-60 2xl:mx-88 rounded-2xl border border-gray-200 ">
						<div className="flex flex-row items-center gap-8">
							<h5 className="font-bold text-nowrap">1USM Newsfeed</h5>
							<div className="flex flex-row items-center justify-between w-full">
								<Button
									type="button"
									color="border-white"
									text="Class:"
									iconName="CaretDown"
									iconWeight="bold"
									iconSide="right"
									className="text-gray-700 rounded-full py-1 px-3 border-gray-200 border"
								/>
								<Button
									type="button"
									color="border-white"
									text="Date:"
									iconName="CaretDown"
									iconWeight="bold"
									iconSide="right"
									className="text-gray-700 rounded-full py-1 px-3 border-gray-200 border"
								/>
							</div>
						</div>

						<div className="flex flex-col items-center py-4 gap-7">
							{posts ? posts.map((post) => <Post key={post.id} post={post} />) : ""}
						</div>
					</div>
				</main>
			</div>
		</>
	);
}
