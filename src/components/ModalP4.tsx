import React, { useState } from "react";
import { X } from "@phosphor-icons/react";
import { Calendar } from "@/components/ui/calendar";
import Input from "@/components/ui/input";
import Button from "./Button";

type ModalP4Props = {
  applicationId: string; // UUID of the application
  staffId: string;       // UUID of the staff jabatan user
  onClose: () => void;
};

export default function ModalP4({ applicationId, staffId, onClose }: ModalP4Props) {
  const [testMark, setTestMark] = useState<string>("");
  const [visitDate, setVisitDate] = useState<Date | undefined>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  function toISOStringOrNull(d: Date | undefined): string | null {
    return d ? d.toISOString() : null;
  }

  // Called if the staff hits “Reject” in Phase 4:
  async function handleRejectPhase4() {
    if (!confirm("Are you sure you want to reject this application?")) return;
    setIsSubmitting(true);
    try {
      const payload = {
        application_id: applicationId,
        reviewed_by: staffId,
      };
      const res = await fetch("/api/staffjabatan/reject-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error(await res.text());
        throw new Error("Failed to reject");
      }
      onClose();
    } catch (err) {
      console.error(err);
      alert("Could not reject. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Called when “Confirm Date” (i.e. enter mark + approve) is clicked
  async function handleConfirmPhase4() {
    if (testMark.trim() === "") {
      alert("Please enter a test mark.");
      return;
    }
    if (!visitDate) {
      alert("Please pick a school visit date.");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1) Enter test mark
      const markPayload = {
        application_id: applicationId,
        testiv_mark: Number(testMark),
      };
      const markRes = await fetch("/api/staffjabatan/enter-mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(markPayload),
      });
      if (!markRes.ok) {
        console.error(await markRes.text());
        throw new Error("Failed to save test mark");
      }

      // 2) Approve (set invitation_date)
      const invitePayload = {
        application_id: applicationId,
        invitation_date: toISOStringOrNull(visitDate),
      };
      const inviteRes = await fetch("/api/staffjabatan/approve-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invitePayload),
      });
      if (!inviteRes.ok) {
        console.error(await inviteRes.text());
        throw new Error("Failed to set invitation date");
      }

      onClose();
    } catch (err) {
      console.error(err);
      alert("Could not complete Phase 4. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
      <div className="bg-white w-full h-162 max-w-6xl rounded-xl p-2 relative space-y-2">
        <button type="button" onClick={onClose} className="block ml-auto cursor-pointer">
          <X size="18" weight="bold" className="text-black" />
        </button>

        {/* SIDEBAR + HEADER (unchanged) */}
        <div className="flex flex-row w-full h-fit items-stretch justify-stretch gap-3">
          <div className="flex flex-col gap-4 border border-gray-200 rounded-md p-4 w-1/5 max-h-190 h-[550px] overflow-y-auto">
            <div>
              <strong>Student Application</strong>
            </div>
            <div className="space-y-4">
              {["Phase 1", "Phase 2", "Phase 3", "Phase 4"].map((phase, index) => {
                const isCurrent = index + 1 === 4; // Phase 4 = index 3
                return (
                  <div
                    key={phase}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <span
                      className={`w-4 h-4 rounded-full border-2 transition group-hover:scale-110 ${
                        isCurrent
                          ? "bg-[#FF2D55] border-[#FF2D55]"
                          : "border-gray-400"
                      }`}
                    />
                    <span className={`font-semibold ${isCurrent ? "text-[#FF2D55]" : ""}`}>
                      {phase}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="flex flex-col justify-start gap-2 border border-gray-200 rounded-md p-4 w-4/5 max-h-190 overflow-y-auto">
            <div>
              <label className="block text-sm font-medium mb-1">Test Mark</label>
              <Input
                type="number"
                min={0}
                max={100}
                placeholder="60%"
                className="w-full px-3 py-2 rounded-md"
                value={testMark}
                onChange={(e) => setTestMark(e.target.value)}
              />
            </div>

            <div>
              <strong>School & Visit Date</strong>
            </div>

            {/* REPLACE CalendarDemo with a Calendar controlled by parent state */}
            <div className="flex flex-col flex-wrap items-start gap-2 @md:flex-row">
              <Calendar
                mode="single"
                selected={visitDate}
                onSelect={setVisitDate}
                className="rounded-md border flex flex-row justify-center shadow-sm w-full"
              />
            </div>
          </div>
        </div>

        {/* BUTTON ROW */}
        <div className="flex flex-row justify-end-safe gap-4">
          <Button
            text="Confirm Date"
            color="dark-blue"
            onClick={handleConfirmPhase4}
            disabled={isSubmitting}
          />
          <Button
            text="Reject"
            color="danger"
            onClick={handleRejectPhase4}
            disabled={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
