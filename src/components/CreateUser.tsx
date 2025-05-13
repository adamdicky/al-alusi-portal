"use client";

import { useState } from "react";

import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Button from "@/components/Button";

import { apiFetch } from "@/utils/functions/fetch";

export default function CreateUser({ close }: { close: () => void }) {
	const [email, setEmail] = useState("");
}
