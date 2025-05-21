import React from "react";
import { User } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Tables } from "@/types/supabase/public.types";

export default function Post({ post }: { post: Tables<"school_posts"> }) {
	return (
		<div className="flex flex-col bg-white p-3 gap-3 rounded-2xl border border-gray-200 w-full">
			{/* w-[1170px] */}
			<div className="flex flex-row items-center gap-2">
				<User size={32} />
				<div>
					<h6 className="font-bold">{post.author_id}</h6>
					<div>
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

			<div className="text-justify">
				<h6><b>{post.title}</b></h6>
				<p>{post.content}</p>
			</div>

			<div className="relative w-full h-60 overflow-hidden rounded-xl">
				<Image
					src="/example pic siraj al alusi.jpg"
					alt="example pic"
					fill
					// width={1170}
					// height={1000}
					className="object-cover rounded-xl"
				/>
			</div>
		</div>
	);
}
