"use client";

import Button from "@/components/Button";
import Post from "@/components/Post";
import { Tables } from "@/types/supabase/public.types";
import React, { useEffect, useState } from "react";
import { apiFetch } from "@/utils/functions/fetch";
// import { User  } from "@phosphor-icons/react";

const class_options = [
	"All Classes",
	"1-UKM",
	"1-USM",
	"1-UPM",
	"2-UKM",
	"2-USM",
	"2-UPM",
	"3-UKM",
	"3-USM",
	"3-UPM",
	"4-UKM",
	"4-USM",
	"4-UPM",
	"5-UKM",
	"5-USM",
	"5-UPM",
	"6-UKM",
	"6-USM",
	"6-UPM",
];

export default function Home() {
	const [posts, setPosts] = useState<Tables<"class_posts">[]>();
	const [filteredPosts, setFilteredPosts] = useState<Tables<"class_posts">[]>([]);
	const [selectedClass, setSelectedClass] = useState<string>("All Classes");
	const [selectedDate, setSelectedDate] = useState<string>("All Dates");

	useEffect(() => {
		async function getPosts() {
			try {
				const queryParam = selectedClass === "All Classes" ? "" : `?class=${encodeURIComponent(selectedClass)}`;
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
	};

	useEffect(() => {
		const filtered = posts?.filter((post) =>
			selectedDate === "All Dates" || post.created_at.startsWith(selectedDate)
		) ?? [];
		setFilteredPosts(filtered);
	}, [selectedDate, posts]);

	// Extract available unique dates
	const availableDates = Array.from(
		new Set(posts?.map((post) => post.created_at.split("T")[0]))
	).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

	return (
		<>
			<div className="flex flex-col min-h-screen">
				<main className="flex-grow">
					<div className="flex flex-col bg-white p-4 my-10 sm:mx-12 md:mx-20 lg:mx-40 xl:mx-60 2xl:mx-88 rounded-2xl border border-gray-200 ">
						<div className="flex flex-row items-center gap-8">
							<h5 className="font-bold text-nowrap">{selectedClass} Newsfeed</h5>
							<div className="flex flex-row items-center justify-between w-full">
								{/* CLASS FILTER */}
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

								{/* DATE FILTER */}
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
							</div>
						</div>

						<div className="flex flex-col items-center py-4 gap-7">
							{filteredPosts.length > 0 ? (
								filteredPosts.map((post) => <Post key={post.id} post={post} />)
							) : (
								<p className="py-2 font-bold">No posts available.</p>
							)}
							{/* {posts && posts.length > 0 ? posts.map((post) => <Post key={post.id} post={post} />) : <p className="py-2 font-bold">No posts available.</p>} */}
							{/* {posts ? posts.map((post) => <Post key={post.id} post={post} />) : "No posts available."} */}
						</div>
					</div>
				</main>
			</div>
		</>
	);
}
