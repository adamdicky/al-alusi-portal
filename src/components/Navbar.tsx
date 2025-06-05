import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
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

			<div></div>
		</nav>
	);
};

export default Navbar;
