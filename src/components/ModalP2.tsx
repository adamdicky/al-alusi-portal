import React from "react";
import { Tables } from "@/types/supabase/public.types";
import { User, X } from "@phosphor-icons/react";
import { useState } from "react";

//placeholder
const phases = ["Phase 1", "Phase 2", "Phase 3", "Phase 4"];

export default function ModalP2({ onClose }: { onClose: () => void }) {

  const [selectedPhase, setSelectedPhase] = useState(1);

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
			<div className="bg-white w-full h-200 max-w-3xl rounded-xl p-2 relative space-y-2">

				<button type="button" onClick={onClose} className="block ml-auto cursor-pointer">
					<X size="18" weight="bold" className="text-black" />
				</button>

        {/* CODE INSIDE HERE */}
        <div className="flex flex-row w-full items-center justify-stretch">
          {/* SIDEBAR */}
          <div className="flex flex-row justify-around border border-gray-200 rounded-md p-4 space-y-6 w-2xs">
            
              <div className="flex flex-col items-center w-full gap-4 p-1">
                <strong>Student Application</strong>
                <div className="space-y-4">
                  {phases.map((phase, index) => {
                    const isCurrent = selectedPhase === index + 1;

                    return (
                      <div key={phase} onClick={() => setSelectedPhase(index + 1)} className="flex items-center gap-2 cursor-pointer group">
                        <span className={`w-4 h-4 rounded-full border-2 transition ${isCurrent ? "bg-blue-500 border-blue-500" : "border-gray-400"} group-hover:scale-110`}/>
                        <span className={isCurrent ? "font-semibold text-blue-600" : ""}>
                          {phase}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
          </div>
          
          <div className="flex flex-row justify-around border border-gray-200 rounded-md p-4 space-y-6 w-md">
              
              {/* <div className="flex flex-col items-center w-full gap-4 p-1">
                <strong>Student Application</strong>
              </div> */}

          </div>
        </div>
        
        {/* CODE INSIDE HERE */}
      </div>
		</div>
  );
}
