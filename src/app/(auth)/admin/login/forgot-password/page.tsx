"use client";

import Button from "@/components/Button";
import Input from "@/components/ui/input";
import { createClient } from "@/utils/supabase-connection/client";
import React, { useState } from "react";

export default function page() {
	const [email, setEmail] = useState("");

	async function resetPassword(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		const supabase = createClient();
		const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: "http://localhost:3000/admin/login/forgot-password/reset",
		});
		if (data) alert("We have sent you an email!");
		if (error) {
			console.log(error);
			alert("There was an error updating your password.");
		}
	}

	return (
		<div className="grid w-full h-full place-content-center">
			<form className="flex flex-col gap-2 w-96">
				<div className="space-y-1">
					<h4>Forgot password?</h4>
					<p className="text-sm">If your email is registered with us you will receive the steps to reset your password.</p>
				</div>
				<label htmlFor="email">Enter your email</label>
				<Input id="email" type="email" className="bg-white" value={email} onChange={(e) => setEmail(e.target.value)} />
				<Button type="submit" text="Submit" onClick={resetPassword} />
			</form>
		</div>
	);
}
