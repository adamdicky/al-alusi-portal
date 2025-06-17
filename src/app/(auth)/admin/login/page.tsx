"use client";

import Button from "@/components/Button";
import Input from "@/components/ui/input";
import { apiFetch } from "@/utils/functions/fetch";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function page() {
	const router = useRouter();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	async function login(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		try {
			if (email.length <= 0 || password.length <= 0) return;

			const { url } = await apiFetch("/api/auth/login", {
				method: "POST",
				body: JSON.stringify({
					email,
					password,
				}),
			});

			console.log(url);

			router.push(url);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<section className="grid grid-flow-col grid-cols-5 gap-0 w-full h-full bg-white border border-gray-200 rounded-lg overflow-hidden">
			<div className="col-span-1 bg-[url(/login-sidebar.png)] w-full h-full bg-no-repeat" />
			<div className="col-span-4 flex flex-col items-center justify-start mt-16 gap-6 w-full h-full">
				<div className="space-y-2 text-center w-min">
					<h3 className="font-semibold w-max">Staff & Admin Login</h3>
					<p className="font-medium">This portal is exclusively for SIRAJ Al-Alusi authorized personnel.</p>
				</div>
				<Image src="/logo.png" alt="" width={96} height={96} />
				<form className="space-y-4">
					<div className="flex flex-col gap-0.5">
						<label htmlFor="email">
							<h6 className="font-medium">Email</h6>
						</label>
						<Input id="email" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
					</div>
					<div className="flex flex-col gap-0.5">
						<label htmlFor="password">
							<h6 className="font-medium">Password</h6>
						</label>
						<Input
							id="password"
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<Button type="submit" onClick={login} text="Login Al-Alusi Portal" className="block mx-auto text-sm font-semibold" />
					<div className="text-sm text-center text-gray-500">
						<Link href="/admin/login/forgot-password" className="underline font-medium">
							Forgot Password
						</Link>
					</div>
					<div className="text-sm text-center text-gray-500">
						<p>Don&apos;t have an account?</p>
						<a href="mailto:someemail@gmail.com" className="underline font-medium">
							Contact SIRAJ Al-Alusi Admin
						</a>
					</div>
				</form>
			</div>
		</section>
	);
}
