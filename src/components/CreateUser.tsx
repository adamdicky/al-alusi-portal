"use client";

import { useState } from "react";
import { UploadSimple, X } from "@phosphor-icons/react";
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

	const handleCreate = () => {

	}


	return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button onClick={close} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold mb-4">Create User</h2>

        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Role</label>
            <select
              value={role}
              //onChange={(e) => setRole(e.target.value as Role)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Teacher">Teacher</option>
              <option value="Admin">Admin</option>
              <option value="Staff Jabatan">Staff Jabatan</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Classroom</label>
            <select
              value={classroom}
              onChange={(e) => setClassroom(e.target.value as Classroom)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="1A">1A</option>
              <option value="1B">1B</option>
              <option value="2A">2A</option>
              {/* Add more options as needed, no idea how to use the types here. (Ask Awab tomorrow) */}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button text="Post" onClick={close} color="dark-blue" className="block ml-auto" />
		  <Button text="Post" onClick={handleCreate} color="dark-blue" className="block ml-auto" />
        </div>
      </div>
    </div>
  );
}