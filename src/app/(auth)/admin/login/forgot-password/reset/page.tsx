"use client";

import Button from "@/components/Button";
import Input from "@/components/ui/input";
import { createClient } from "@/utils/supabase-connection/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page() {
	const [password, setPassword] = useState("");

	async function resetPassword(e: React.MouseEvent<HTMLButtonElement>) {
		const supabase = createClient();
		const { data, error } = await supabase.auth.updateUser({ password });

		if (data) alert("Password updated successfully!");
		if (error) alert("There was an error updating your password.");
	}

	return (
		<div className="grid w-full h-full place-content-center">
			<form className="flex flex-col gap-2 w-96">
				<div className="space-y-1">
					<h4>Forgot password?</h4>
				</div>
				<label htmlFor="password">Enter your password</label>
				<Input id="password" type="password" className="bg-white" value={password} onChange={(e) => setPassword(e.target.value)} />
				<Button type="submit" text="Submit" onClick={resetPassword} />
				<Link href="/admin/login">Login</Link>
			</form>
		</div>
	);
}
