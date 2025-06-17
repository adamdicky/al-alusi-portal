"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import Logout from "@/components/Logout";
import Button from "@/components/Button";
import { createBrowserClient } from "@supabase/ssr";

const Navbar = () => {
	const [isAuthenticated, setIsAuthenticated] = React.useState(false);

	useEffect(() => {
		const supabase = createBrowserClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
		);

		const checkUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setIsAuthenticated(!!user);
		};

		checkUser();
	}, [])

	return (
		<nav className="bg-white flex flex-row h-20 m-2 px-6 rounded-2xl border border-gray-200 text-black font-bold justify-between items-center">
			<div className="flex items-center">
				<Image src="/logo.png" alt="Logo" width={70} height={70} className=""></Image>
			</div>

			<div className="flex flex-row items-center gap-10">
				<h6>
					<Link href="/newsfeed/school">School News</Link>
				</h6>
				<h6>
					<Link href="/newsfeed/class">Class News</Link>
				</h6>
				<h6>
					<Link href="/student-application">Student Application</Link>
				</h6>
				
			</div>

			{/* Conditional display */}
			{isAuthenticated ? (
				<div>
					<Logout />
				</div>
			) : (
				<Link href="/admin/login" className="hidden md:block">
					<Button
						type="submit"
						text="Login for Staff & Admin"
						className="block mx-auto text-sm font-semibold"
					/>
				</Link>
			)}
		</nav>
	);
};

export default Navbar;
