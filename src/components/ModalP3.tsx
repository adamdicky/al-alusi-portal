import React, { useState } from "react";
import { CircleNotch, Notches, X } from "@phosphor-icons/react";
import { Calendar } from "@/components/ui/calendar";
import Button from "./Button";
import { apiFetch } from "@/utils/functions/fetch";
import { TimePicker } from "@/components/ui/TimePicker";
import test from "node:test";
import { isBefore, startOfDay } from "date-fns";

 

type ModalP3Props = {
	applicationId: string; // UUID of the application
	staffId: string; // UUID of the staff jabatan user
	onClose: () => void;
};

export default function ModalP3({ applicationId, staffId, onClose }: ModalP3Props) {
	// NEW: Track the chosen test date
	const [testDate, setTestDate] = useState<Date | undefined>(new Date());
	console.log(testDate);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [time, setTime] = useState("10:30:00")
	const disablePastDates = (date: Date) => {
		const today = startOfDay(new Date());
		return isBefore(date, today); // disable any date before today
	};

	// Called when “Confirm Date” is clicked
	async function handleConfirmDate() {
		if (!testDate || !time) {
			alert("Please pick a test date and time.");
			return;
		}
		setIsSubmitting(true);
		try {
			const payload = {
				application_id: applicationId,
				testiv_date: testDate.toISOString(),
				testiv_time: time,
			};

			const res = await apiFetch("/api/staff-jabatan/set-schedule", {
				method: "POST",
				body: JSON.stringify(payload),
			});

			onClose();
		} catch (err) {
			console.error(err);
			alert("Could not set date. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
			<div className="bg-white w-full h-min max-w-6xl rounded-xl p-3 relative space-y-2">
				<button type="button" onClick={onClose} className="block ml-auto cursor-pointer">
					<X size="18" weight="bold" className="text-black" />
				</button>

				{/* SIDEBAR + HEADER (unchanged) */}
				<div className="flex flex-row w-full h-fit items-stretch justify-stretch gap-3">
					<div className="flex flex-col gap-4 border border-gray-200 rounded-md p-4 w-1/5 max-h-190 overflow-y-auto">
						<div>
							<strong>Student Application</strong>
						</div>

						<div className="space-y-4">
							{["Phase 1", "Phase 2", "Phase 3", "Phase 4"].map((phase, index) => {
								return (
									<div key={phase} className="flex items-center gap-2 cursor-pointer group">
										<Notches
											weight="bold"
											size={22}
											className={`${
												index === 0
													? "text-blue-500"
													: index === 1
													? "text-[#FDD660]"
													: index === 2
													? "text-[#AF52DE]"
													: "border-gray-400"
											}`}
										/>

										<span className={`font-semibold`}>{phase}</span>
									</div>
								);
							})}
						</div>
					</div>

					{/* MAIN CONTENT: “Test & Interview Date” */}
					<div className="flex flex-col justify-start gap-2 border border-gray-200 rounded-md p-4 w-4/5 max-h-190 overflow-y-auto">
						<div>
							<strong>Test & Interview Date</strong>
						</div>

						{/* REPLACE CalendarDemo with a Calendar controlled by parent state */}
						<Calendar
							mode="single"
							selected={testDate}
							onSelect={setTestDate}
							disabled={disablePastDates}
							className="rounded-md border flex flex-row justify-center shadow-sm w-full"
						/>
						<div className="flex justify-center mt-2">
							<div className="w-1/3 min-w-[150px]">
								<TimePicker 
								time={time}
								setTime={setTime}
								/>
							</div>
						</div>

					</div>
				</div>

				{/* CONFIRM BUTTON */}
				<div className="flex flex-row justify-end-safe gap-4">
					<Button text={isSubmitting ? "Saving…" : "Confirm Date"} color="dark-blue" onClick={handleConfirmDate} disabled={isSubmitting} />
				</div>
			</div>
		</div>
	);
}
