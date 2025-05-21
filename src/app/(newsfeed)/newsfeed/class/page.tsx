"use client";

import Button from "@/components/Button";
import Post from "@/components/Post";
import { Tables } from "@/types/supabase/public.types";
import React, { useEffect, useState } from "react";
import { apiFetch } from "@/utils/functions/fetch";
// import { User  } from "@phosphor-icons/react";

const class_options = ["All Classes", "1UKM", "1USM", "1UPM", "2UKM", "2USM", "2UPM", "3UKM", "3USM", "3UPM", "4UKM", "4USM", "4UPM", "5UKM", "5USM", "5UPM", "6UKM", "6USM", "6UPM"];

export default function Home() {
	const [posts, setPosts] = useState<Tables<"class_posts">[]>();
	const [selectedClass, setSelectedClass] = useState<string>("All Classes");

	useEffect(() => {
		async function getPosts() {
			try {
				const queryParam = selectedClass === "All Classes" ? "" : `?class=${encodeURIComponent(selectedClass)}`
				const posts: Tables<"class_posts">[] = await apiFetch(`/api/newsfeed/class/post/get${queryParam}`, {
					method: "GET",
				});

				console.log("Posts fethced: ", posts);

				setPosts(posts);
			} catch (error) {
				console.error(error);
			}
		}

		getPosts();
	}, [selectedClass]);

	const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedClass(e.target.value);
	}

	return (
		<>
			<div className="flex flex-col min-h-screen">
				<main className="flex-grow">
					<div className="flex flex-col bg-white p-4 my-10 sm:mx-12 md:mx-20 lg:mx-40 xl:mx-60 2xl:mx-88 rounded-2xl border border-gray-200 ">
						<div className="flex flex-row items-center gap-8">
							<h5 className="font-bold text-nowrap">1USM Newsfeed</h5>
							<div className="flex flex-row items-center justify-between w-full">
								<select 
									className="text-gray-700 rounded-full py-1 px-3 border-gray-200 border font-semibold"
									value={selectedClass}
									onChange={(e) => setSelectedClass(e.target.value)}
								>
									{class_options.map((className) => (
										<option key={className} value={className}>
											{className}
										</option>
									))}
								</select>

								{/* <Button
									type="button"
									color="border-white"
									text="Class:"
									iconName="CaretDown"
									iconWeight="bold"
									iconSide="right"
									className="text-gray-700 rounded-full py-1 px-3 border-gray-200 border"
								/> */}

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
							{posts && posts.length > 0 ? (
								posts.map((post) => <Post key={post.id} post={post} />)
							) : (<p>No posts available.</p>)}
							{/* {posts ? posts.map((post) => <Post key={post.id} post={post} />) : "No posts available."} */}
						</div>
					</div>
				</main>
			</div>
		</>
	);
}
