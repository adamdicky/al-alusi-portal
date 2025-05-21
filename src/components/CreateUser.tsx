"use client";

import { useState } from "react";
import { UploadSimple, X } from "@phosphor-icons/react";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Button from "@/components/Button";

import { apiFetch } from "@/utils/functions/fetch";
import { Classroom, classroomOptions } from "@/constants";

const levels = [1, 2, 3, 4, 5, 6];
const codes = ["UKM", "UPM", "USM"] as const;

export default function CreateUser({ close }: { close: () => void }) {
	const [email, setEmail] = useState("");
	const [fullname, setFullname] = useState("");
	const [role, setRole] = useState<"teacher" | "admin" | "staff jabatan">("teacher");
	const [classroom, setClassroom] = useState<Classroom>();

	const handleCreate = async () => {
		try {
			const response = await fetch("/api/auth/create-user", {
				method: "POST",
				body: JSON.stringify({
					email,
					fullname,
					role: role === "teacher" ? { name: "teacher", class: classroom } : role,
				}),
			});

			if (!response.ok) throw new Error("Failed to create user");

			close();
		} catch (error) {
			console.error("Error creating user:", error);
		}
	};

	return (
		<div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
			<div className="bg-white rounded-lg w-full max-w-md p-6 relative">
				<button onClick={close} className="absolute top-3 right-3 text-gray-500 hover:text-black">
					<X className="w-5 h-5" />
				</button>

				<div className="space-y-4 p-5 mt-3 rounded-lg border border-gray-200 ">
					<div>
						<label className="block font-semibold mb-1">Email</label>
						<Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
					</div>

					<div>
						<label className="block font-semibold mb-1">Full Name</label>
						<Input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder="Enter full name" />
					</div>

					<div>
						<label className="block font-semibold mb-1">Role</label>
						<select
							value={role}
							onChange={(e) => setRole(e.target.value as "teacher" | "admin" | "staff jabatan")}
							className="w-full border rounded px-3 py-2 capitalize"
						>
							<option value="teacher">Teacher</option>
							<option value="admin">Admin</option>
							<option value="staff jabatan">Staff Jabatan</option>
						</select>
					</div>

					{role === "teacher" && (
						<div>
							<label className="block font-semibold mb-1">Classroom</label>
							<select
								value={classroom}
								onChange={(e) => setClassroom(e.target.value as Classroom)}
								className="w-full border rounded px-3 py-2"
							>
								{classroomOptions.map((cls) => (
									<option key={cls} value={cls}>
										{cls}
									</option>
								))}
							</select>
						</div>
					)}

					<div className="flex justify-end gap-2 mt-6">
						<Button text="Cancel" onClick={close} className="block bg-red-600 ml-64" />
						<Button text="Create" onClick={handleCreate} color="dark-blue" className="block ml-auto" />
					</div>
				</div>
			</div>
		</div>
	);
}
