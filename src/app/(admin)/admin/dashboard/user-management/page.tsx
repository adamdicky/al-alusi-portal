"use client";
import Button from "@/components/Button";
import CreateUser from "@/components/CreateUser";
import { apiFetch } from "@/utils/functions/fetch";
import React, { useEffect, useState } from "react";

type User = {
	id: string;
	full_name: string;
	created_at: string;
	role: string;
};

type RoleFilter = "All" | "Teacher" | "Admin" | "staff_jabatan";

export default function Page() {
	const [users, setUsers] = useState<User[]>([]);
	const [roleFilter, setRoleFilter] = useState<RoleFilter>("All");
	const [filtered, setFiltered] = useState<User[]>([]);

	const [showCreateUser, setShowCreateUser] = useState<boolean>(false);

	useEffect(() => {
		async function getUsersList() {
			try {
				const users: User[] = await apiFetch("/api/admin/users/get-all", {
					method: "GET",
				});

				console.log(users);

				setUsers(users);
				console.log(users)
				setFiltered(roleFilter === "All" ? users : users.filter((u) => u.role.toLowerCase() === roleFilter.toLowerCase()));
			} catch (error) {
				console.error(error);
			}
		}

		getUsersList();
	}, []);

	useEffect(() => {
		setFiltered(roleFilter === "All" ? users : users.filter((u) => u.role.toLowerCase() === roleFilter.toLowerCase()));
	}, [roleFilter]);

	async function deleteUser(e: React.MouseEvent<HTMLButtonElement>, id: string) {
		e.preventDefault();
		try {
			await apiFetch(`/api/admin/users/delete?id=${id}`, {
				method: "DELETE",
			});

			setFiltered((filtered) => filtered.filter((user) => user.id !== id));
		} catch (error) {
			console.error(error);
			alert("An error occurred");
		}
	}

	return (
		<main className="col-span-4 flex flex-col min-h-[80vh] gap-4 p-4 bg-white border border-gray-200 rounded-lg">
			{/* Header */}
			<div className="flex flex-row items-center justify-between">
				<h5 className="font-semibold text-lg">User Management</h5>

				<div className="flex flex-row items-center gap-3">
					<select
						className="border border-gray-300 rounded px-2 py-1 text-sm"
						value={roleFilter}
						onChange={(e) => setRoleFilter(e.target.value as RoleFilter)}
					>
						{["All", "Teacher", "Admin", "Staff Jabatan"].map((role, i) => (
							<option key={i} value={role === "Staff Jabatan" ? "staff_jabatan" : role}>{role}</option>
						))}
					</select>

					<Button
						onClick={() => setShowCreateUser(true)}
						text="Create User"
						iconName="Plus"
						iconSide="right"
						iconWeight="bold"
						className="text-sm py-1.5 px-2"
					/>
				</div>
			</div>

			{/* User List */}
			<div className="flex flex-col flex-grow gap-3 h-full overflow-y-scroll bg-gray-50 border border-gray-200 p-3 rounded-lg">
				{filtered.length > 0 &&
					filtered.map((user) => (
						<div
							key={user.id}
							className="flex flex-row items-center justify-between bg-white border border-gray-200 px-4 py-2 rounded-md"
						>
							<h6 className="font-medium w-48 truncate">{user.full_name}</h6>

							<div className="flex flex-row items-center gap-4 text-sm text-gray-600">
								<span>
									{new Intl.DateTimeFormat("en-GB", {
										day: "2-digit",
										month: "short",
									}).format(new Date(user.created_at))}
								</span>
								<div className="w-fit text-right text-nowrap capitalize">{user.role}</div>

								<Button text="Delete" color="danger" className="text-sm p-2 py-1" onClick={(e) => deleteUser(e, user.id)} />
							</div>
						</div>
					))}
			</div>
			{showCreateUser && <CreateUser close={() => setShowCreateUser(false)} />}
		</main>
	);
}
