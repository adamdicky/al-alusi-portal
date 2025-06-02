"use client";

import React, { useState } from "react";
import { X } from "@phosphor-icons/react";
import Button from "./Button";

type ModalP2Props = {
  applicationId: string; // UUID of the application
  staffId: string;       // UUID of the staff jabatan 
  onClose: () => void;
};

export default function ModalP2({ applicationId, staffId, onClose }: ModalP2Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleMoveToPhase3() {
    setIsSubmitting(true);
    try {
      const payload = {
        application_id: applicationId,
        reviewed_by: staffId,
      };

      const res = await fetch("/api/staffjabatan/move-phase3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error(await res.text());
        throw new Error("Failed to move to Phase 3");
      }

      onClose();
    } catch (err) {
      console.error(err);
      alert("Could not move to Phase 3. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleReject() {
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

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-xl p-4 relative space-y-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-black"
        >
          <X size={20} weight="bold" />
        </button>

        <h2 className="text-lg font-semibold">Phase 2: Review Application</h2>
        {/*display any application details here… */}

        <div className="flex justify-end space-x-2">
          <Button
            text="Reject"
            color="danger"
            onClick={handleReject}
            disabled={isSubmitting}
          />
          <Button
            text={isSubmitting ? "Moving…" : "Accept & Move to Phase 3"}
            color="dark-blue"
            onClick={handleMoveToPhase3}
            disabled={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
