"use client";

import React, { useEffect, useState } from "react";
import ModalP2 from "@/components/ModalP2";
import ModalP3 from "@/components/ModalP3";
import ModalP4 from "@/components/ModalP4";

export default function StaffJabatanDashboard() {
	const [showModalP2, setShowModalP2] = useState(false);
	const [showModalP3, setShowModalP3] = useState(false);
	const [showModalP4, setShowModalP4] = useState(false);

	const [applications, setApplications] = useState<any[]>([]);

	const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

	const [statusFilter, setStatusFilter] = useState("All"); // "All" | "pending" | "accepted" | "rejected"
	const [orderFilter, setOrderFilter] = useState("desc"); // "asc" | "desc"

	const staffId = "YOUR_STAFF_JABATAN_UUID";

	async function fetchApplications() {
		try {
			let url = "/api/staff-jabatan/get-applications";
			const params = new URLSearchParams();
			if (statusFilter !== "All") {
				params.set("status", statusFilter);
			}
			params.set("order", orderFilter);
			url += "?" + params.toString();

			const res = await fetch(url);
			if (!res.ok) {
				console.error("Failed to fetch applications:", await res.text());
				return;
			}

			const payload = await res.json();
			// payload should be { applications: [ ... ] }
			if (Array.isArray(payload.applications)) {
				setApplications(payload.applications);
			} else {
				setApplications([]); // fallback if something’s off
			}
		} catch (err) {
			console.error("Error fetching applications:", err);
			setApplications([]);
		}
	}

	// Load (and re-load) whenever filter or order changes
	useEffect(() => {
		fetchApplications();
	}, [statusFilter, orderFilter]);

	// 7️⃣ When “View” is clicked: open the correct modal based on phase_status
	function openModal(app: any) {
		setSelectedAppId(app.id);

		switch (app.phase_status) {
			case "2":
				setShowModalP2(true);
				break;
			case "3":
				setShowModalP3(true);
				break;
			case "4":
				setShowModalP4(true);
				break;
			default:
				// If it’s "1" or null, or “accepted/rejected” with no phase 2/3/4, we do nothing
				break;
		}
	}

	return (
		<main className="col-span-4 p-4 bg-white border border-gray-200 rounded-lg w-full">
			<div className="flex flex-col justify-between w-full h-full space-y-2">
				{/* Header + Filters */}
				<div className="flex flex-row items-center justify-between w-full">
					<h5 className="font-semibold">Student Admission Applications</h5>
					<div className="flex flex-row gap-2">
						<select
							className="text-gray-700 rounded-full py-1 px-3 border-gray-200 border font-semibold"
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
						>
							<option value="All">Status: All</option>
							<option value="accepted">Status: Accepted</option>
							<option value="2">Status: Phase 02</option>
							<option value="3">Status: Phase 03</option>
							<option value="4">Status: Phase 04</option>
							<option value="rejected">Status: Rejected</option>
						</select>
						<select
							className="text-gray-700 rounded-full py-1 px-3 border-gray-200 border font-semibold"
							value={orderFilter}
							onChange={(e) => setOrderFilter(e.target.value)}
						>
							<option value="desc">Order by: Latest</option>
							<option value="asc">Order by: Oldest</option>
						</select>
					</div>
				</div>

				{/* Application List */}
				<div className="flex flex-col items-center gap-3 h-full bg-off-white border border-gray-200 p-2 rounded-lg overflow-y-auto">
					{applications.length === 0 ? (
						<p className="text-gray-500 italic">No applications found.</p>
					) : (
						applications.map((app) => (
							<div
								key={app.id}
								className="flex flex-row items-center justify-between bg-white border border-gray-200 px-3 py-1.5 rounded-md w-full"
							>
								<h6 className="font-medium w-44 overflow-hidden text-ellipsis whitespace-nowrap">{app.id.slice(0, 8) + "..."}</h6>
								<div className="flex flex-row items-center gap-1.5 text-gray-500 text-sm">
									<p>
										{new Intl.DateTimeFormat("en-GB", {
											day: "2-digit",
											month: "short",
										}).format(new Date(app.created_at))}
									</p>

									{app.phase_status === "2" && <strong className="text-[#FDD660]">Phase 02</strong>}
									{app.phase_status === "3" && <strong className="text-[#AF52DE]">Phase 03</strong>}
									{app.phase_status === "4" && <strong className="text-[#FF2D55]">Phase 04</strong>}

									{app.phase_status === "accepted" && app.phase_status !== "4" && (
										<strong className="text-[#34C759]">Accepted</strong>
									)}
									{app.phase_status === "rejected" && <strong className="text-[#B3261E]">Rejected</strong>}

									{(app.phase_status === "2" || app.phase_status === "3" || app.phase_status === "4") && (
										<button type="button" className="underline font-semibold ml-3" onClick={() => openModal(app)}>
											view
										</button>
									)}
								</div>
							</div>
						))
					)}
				</div>
			</div>

			{/* ModalP2 (Phase 2) */}
			{showModalP2 && selectedAppId && (
				<ModalP2
					applicationId={selectedAppId}
					onClose={() => {
						setShowModalP2(false);
						fetchApplications(); // refresh after close
					}}
				/>
			)}

			{/* ModalP3 (Phase 3) */}
			{showModalP3 && selectedAppId && (
				<ModalP3
					applicationId={selectedAppId}
					staffId={staffId}
					onClose={() => {
						setShowModalP3(false);
						fetchApplications();
					}}
				/>
			)}

			{/* ModalP4 (Phase 4) */}
			{showModalP4 && selectedAppId && (
				<ModalP4
					applicationId={selectedAppId}
					onClose={() => {
						setShowModalP4(false);
						fetchApplications();
					}}
				/>
			)}
		</main>
	);
}
