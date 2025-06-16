"use client";

import Button from "./Button";
import { useLogout } from "@/utils/functions/logout";

export default function Logout() {
	const logout = useLogout();
	return (
		<div className="self-end mt-auto">
			<Button onClick={logout} text="Logout" color="danger" />
		</div>
	);
}
