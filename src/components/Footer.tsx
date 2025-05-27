import Image from "next/image";
import React from "react";

const Footer = () => {
	return (
		<footer className="flex flex-row justify-evenly items-center  w-full py-2 bg-white text-black">
			<Image src="/logo.png" alt="Logo" width={150} height={150} />

			<ul className="text-left">
				<li>
					<b>General</b>
				</li>
				<li>
					<a href="/schoolnewsfeed">Schools Newsfeed</a>
				</li>
				<li>
					<a href="/classnewsfeed">Class Newsfeed</a>
				</li>
				<li>
					<a href="/studentapplication">Student Application</a>
				</li>
			</ul>

			<ul className="text-left mb-6">
				<li>
					<b>Resources</b>
				</li>
				<li>
					<a href="/">Curriculum</a>
				</li>
				<li>
					<a href="/">Academic Year Schedule</a>
				</li>
			</ul>

			<ul className="text-left mb-6">
				<li>
					<b>Contact</b>
				</li>
				<li>Email: info@alalusi.com</li>
				<li>Phone: 03-4625 1465</li>
			</ul>
		</footer>
	);
};

export default Footer;
