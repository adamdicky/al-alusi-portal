"use client";

import Button from "@/components/Button";
import Post from "@/components/Post";
import { Tables } from "@/types/supabase/public.types";
import { apiFetch } from "@/utils/functions/fetch";
import { useEffect, useState } from "react";

export default function Home() {
	const [posts, setPosts] = useState<Tables<"school_posts">[]>();
	const [filteredPosts, setFilteredPosts] = useState<Tables<"school_posts">[]>([]);
	const [selectedDate, setSelectedDate] = useState<string>("All Dates");

	useEffect(() => {
		async function getPosts() {
			try {
				const posts: Tables<"school_posts">[] = await apiFetch("/api/newsfeed/school/post/get-newsfeed?sort=desc", {
					method: "GET",
				});

				setPosts(posts);
			} catch (error) {
				console.error(error);
			}
		}

		getPosts();
	}, []);

	useEffect(() => {
		const filtered = posts?.filter((post) =>
			selectedDate === "All Dates" || post.created_at.startsWith(selectedDate)
		) ?? [];
		setFilteredPosts(filtered);
	}, [selectedDate, posts]);

	// Extract unique available dates
	const availableDates = Array.from(
		new Set(posts?.map((post) => post.created_at.split("T")[0]))
	).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

	return (
		<>
			<div className="flex flex-col min-h-screen">
				<main className="flex-grow">
					<div className="flex flex-col bg-white p-4 my-10 sm:mx-12 md:mx-20 lg:mx-40 xl:mx-60 2xl:mx-88 rounded-2xl border border-gray-200 ">
						<div className="flex flex-row items-center justify-between w-full">
							<h5 className="font-bold text-nowrap">General School Newsfeed</h5>
							<select
								className="text-gray-700 rounded-full py-1 px-3 border-gray-200 border font-semibold"
								value={selectedDate}
								onChange={(e) => setSelectedDate(e.target.value)}
							>
								<option value="All Dates">All Dates</option>
								{availableDates.map((date) => (
									<option key={date} value={date}>
										{new Date(date).toLocaleDateString("en-GB", {
											day: "2-digit",
											month: "short",
											year: "numeric",
										})}
									</option>
								))}
							</select>
							
							{/* <Button
								type="button"
								color="border-white"
								text="Date:"
								iconName="CaretDown"
								iconWeight="bold"
								iconSide="right"
								className="text-gray-700 rounded-full py-1 px-3 border-gray-200 border"
							/> */}
						</div>

						<div className="flex flex-col items-center py-4 gap-7">
							{filteredPosts.length > 0 ? (
								filteredPosts.map((post) => <Post key={post.id} post={post} />)
							) : (
								<p className="py-2 font-bold">No posts available.</p>
							)}
							{/* {posts ? posts.map((post) => <Post key={post.id} post={post} />) : ""} */}
						</div>
					</div>
				</main>
			</div>
		</>
	);
}
