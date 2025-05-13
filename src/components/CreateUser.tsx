"use client";

import { useState } from "react";

import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Button from "@/components/Button";

import { apiFetch } from "@/utils/functions/fetch";

type Classroom = `${1 | 2 | 3 | 4 | 5 | 6}-${"UKM" | "UPM" | "USM"}`;

export default function CreateUser({ close }: { close: () => void }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState<"Teacher" | "Admin" | "Staff Jabatan">("Teacher");
	const [classroom, setClassroom] = useState<Classroom>();
}
