"use client";

import { useRouter } from "next/navigation";
import { apiFetch } from "./fetch";

export function useLogout(event?: React.MouseEvent<HTMLButtonElement, MouseEvent>): React.MouseEventHandler<HTMLButtonElement> {
	const router = useRouter();
	return async () => {
		try {
			const { url } = await apiFetch("/api/auth/logout");

			router.push(url);
		} catch (error) {
			console.error(error);
		}
	};
}
