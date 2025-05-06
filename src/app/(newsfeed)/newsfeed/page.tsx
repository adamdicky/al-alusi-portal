import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
// import { User  } from "@phosphor-icons/react";

export default function Home() {
	return (
		<>
			<div className="flex flex-col min-h-screen">
				<main className="flex-grow">
					<div className="flex flex-col bg-white p-4 my-10 sm:mx-12 md:mx-20 lg:mx-40 xl:mx-60 2xl:mx-88 rounded-2xl border border-gray-200 ">
						{/* w-[1200px] mx-auto */}
						{/* test */}
						{/* mx-88 */}
						<div className="flex flex-row justify-between ">
							<div className="flex flex-row gap-2">
								<h6 className="font-bold">1USM Newsfeed</h6>
								<Button type="button" text="Class:" iconName="CaretDown" className="text-black" />
							</div>
							<div>
								<Button type="button" text="Date" iconName="CaretDown" className="text-black" />
							</div>
						</div>

						{/* BREAK HERE, COMPONENT STARTS BELOW*/}

						<div className="flex flex-col items-center py-4 gap-7">
							<Post />
							<Post />
							<Post />
							<Post />
							<Post />
							<Post />
							<Post />
							<Post />
							<Post />
							<Post />

							{/* test with alot of post and only 1 post */}
						</div>
						<div>
							<a>smtg</a>
						</div>
					</div>
				</main>
			</div>
		</>
	);
}
