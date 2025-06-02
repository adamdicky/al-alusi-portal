import React from "react";
import { X } from "@phosphor-icons/react";
import { useState } from "react";
import Input from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import Button from "./Button";

//placeholder
const phases = ["Phase 1", "Phase 2", "Phase 3", "Phase 4"];

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <div className="flex flex-col flex-wrap items-start gap-2 @md:flex-row">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border flex flex-row justify-center shadow-sm w-full"
      />
    </div>
  )
}

export default function ModalP2({ onClose }: { onClose: () => void }) {

  const [selectedPhase, setSelectedPhase] = useState(1);

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
            <div className="bg-white w-full h-162 max-w-6xl rounded-xl p-2 relative space-y-2">

                <button type="button" onClick={onClose} className="block ml-auto cursor-pointer">
                    <X size="18" weight="bold" className="text-black" />
                </button>

        {/* CODE INSIDE HERE */}
        <div className="flex flex-row w-full h-fit items-stretch justify-stretch gap-3">

          {/* SIDEBAR */}
          <div className="flex flex-col gap-4 border border-gray-200 rounded-md p-4 w-1/5 max-h-190 h-[550px] overflow-y-auto">
            
              <div>
                <strong>Student Application</strong>
              </div>

              <div className="space-y-4">
                {phases.map((phase, index) => {
                  const isCurrent = selectedPhase === index + 1;
                  return (
                    <div key={phase} onClick={() => setSelectedPhase(index + 1)} className="flex items-center gap-2 cursor-pointer group">
                      <span
                        className={`w-4 h-4 rounded-full border-2 transition group-hover:scale-110 ${
                          isCurrent
                            ? index === 0
                              ? "bg-blue-500 border-blue-500"
                              : index === 1
                              ? "bg-[#FDD660] border-[#FDD660]"
                              : index === 2
                              ? "bg-[#AF52DE] border-[#AF52DE]"
                              : index === 3
                              ? "bg-[#FF2D55] border-[#FF2D55]"
                              : ""
                            : "border-gray-400"
                        }`}
                      />

                      <span
                        className={`font-semibold ${
                          isCurrent
                            ? index === 0
                              ? "text-blue-600"
                              : index === 1
                              ? "text-[#D9A300]"
                              : index === 2
                              ? "text-[#AF52DE]"
                              : index === 3
                              ? "text-[#FF2D55]"
                              : ""
                            : ""
                        }`}
                      >
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
                       type="text"
                       placeholder="60%"
                       className="w-full px-3 py-2 rounded-md"/>
                </div>
                
                <div>
                    <strong>School & Visit Date</strong>
                </div>
                <CalendarDemo />    
          </div>
        </div>
        <div className="flex flex-row justify-end-safe gap-4">
            <Button text="Confirm Date"  color="dark-blue" />
        </div>
        {/* CODE INSIDE HERE */}
        
      </div>
        </div>
  );
}
