"use client";
import Button from "@/components/Button";
import React, { useState } from "react";

type User = {
  id: string;
  full_name: string;
  created_at: string;
  role: string;
};

export default function Page() {
  const [roleFilter, setRoleFilter] = useState<string>("All");

  const users: User[] = [
    {
      id: "1",
      full_name: "Alberto Hirthè",
      created_at: new Date().toISOString(),
      role: "Teacher",
    },
    {
      id: "2",
      full_name: "Darin Berstorm",
      created_at: new Date().toISOString(),
      role: "Teacher",
    },
    {
      id: "3",
      full_name: "Olen Friesnen",
      created_at: new Date().toISOString(),
      role: "Admin",
    },
  ];

  const filtered =
    roleFilter === "All"
      ? users
      : users.filter((u) => u.role === roleFilter);

  return (
    <main className="col-span-4 flex flex-col gap-4 p-4 bg-white border border-gray-200 rounded-lg">
      {/* Header */}
      <div className="flex flex-row items-center justify-between">
        <h5 className="font-semibold text-lg">User Management</h5>

        <div className="flex flex-row items-center gap-3">
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            {["All", "Teacher", "Admin" ].map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>

      
          <button className="bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-1.5 rounded">
            Create User
          </button>
        </div>
      </div>

      {/* User List */}
      <div className="flex flex-col gap-3 h-[26rem] overflow-y-auto bg-gray-50 border border-gray-200 p-3 rounded-lg">
        {filtered.map((user) => (
          <div
            key={user.id}
            className="flex flex-row items-center justify-between bg-white border border-gray-200 px-4 py-2 rounded-md"
          >
            <h6 className="font-medium w-48 truncate">{user.full_name}</h6>

            <div className="flex flex-row items-center gap-2 text-sm text-gray-600">
              <span>
                {new Intl.DateTimeFormat("en-GB", {
                  day: "2-digit",
                  month: "short",
                }).format(new Date(user.created_at))}
              </span>
              <span className="w-20 text-right">{user.role}</span>

              <button className="ml-3 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
