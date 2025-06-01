import React from "react";
import { X } from "@phosphor-icons/react";
import { useState } from "react";
import Input from "@/components/ui/input";
import Button from "./Button";

//placeholder
const phases = ["Phase 1", "Phase 2", "Phase 3", "Phase 4"];

export default function ModalP2({ onClose }: { onClose: () => void }) {

  const [selectedPhase, setSelectedPhase] = useState(1);

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
			<div className="bg-white w-full h-214 max-w-6xl rounded-xl p-2 relative space-y-2">

				<button type="button" onClick={onClose} className="block ml-auto cursor-pointer">
					<X size="18" weight="bold" className="text-black" />
				</button>

        {/* CODE INSIDE HERE */}
        <div className="flex flex-row w-full h-fit items-stretch justify-stretch gap-3">

          {/* SIDEBAR */}
          <div className="flex flex-col gap-4 border border-gray-200 rounded-md p-4 w-1/5 max-h-190 overflow-y-auto">
            
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
          <div className="flex flex-col justify-start border border-gray-200 rounded-md p-4 w-4/5 max-h-190 overflow-y-auto">
              <div className="flex flex-col items-center w-full gap-4 p-3">

                <form className="space-y-6 p-3 w-full">
                  {/* Requested Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Requested Class</label>
                      <Input 
                        type="text"
                        placeholder="Enter title"
                        className="w-full px-3 py-2 rounded-md"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">For Year</label>
                      <Input 
                          type="text"
                          placeholder="2025"
                          className="w-full px-3 py-2 rounded-md"/>
                    </div>
                  </div>

                  {/* Section Heading */}
                  <h2 className="text-center font-semibold text-sm">Father/Guardian Information</h2>

                  {/* Guardian Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Father/Guardian Name</label>
                      <Input 
                          type="text"
                          placeholder="Faisal Yasin"
                          className="w-full px-3 py-2 rounded-md"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Requested School</label>
                      <Input 
                          type="text"
                          placeholder="SIRAJ Al-Alusi"
                          className="w-full px-3 py-2 rounded-md"/>                    
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Phone Number</label>
                      <Input 
                          type="text"
                          placeholder="+60135362840"
                          className="w-full px-3 py-2 rounded-md"/> 
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Race</label>
                      <Input 
                          type="text"
                          placeholder="Malay"
                          className="w-full px-3 py-2 rounded-md"/> 
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Nationality</label>
                      <Input 
                          type="text"
                          placeholder="Malaysian"
                          className="w-full px-3 py-2 rounded-md"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Occupation</label>
                      <Input 
                          type="text"
                          placeholder="Teacher"
                          className="w-full px-3 py-2 rounded-md"/>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Income</label>
                      <Input 
                          type="text"
                          placeholder="3000"
                          className="w-full px-3 py-2 rounded-md"/>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Office Phone Number</label>
                      <Input 
                          type="text"
                          placeholder="+60123456789"
                          className="w-full px-3 py-2 rounded-md"/>
                    </div>
                  </div>

                  {/* Addresses */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Office Address</label>
                         <Input 
                          type="text"
                          placeholder="University Teknologi Malaysia, Jalan Sultan Yahya Petra, Kampung Datuk Keramat, 54100 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur"
                          className="w-full px-3 py-2 rounded-md"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Home Address</label>
                      <Input 
                            type="text"
                            placeholder="No. 123, Jalan ABC, Taman XYZ, 12345 Kuala Lumpur"
                            className="w-full px-3 py-2 rounded-md"/>
                    </div>
                  </div>

                   {/* Section Heading */}
                  <h2 className="text-center font-semibold text-sm">Mother/Guardian Information</h2>

                  {/* Mother Info */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Mother/Guardian Name</label>
                    <Input 
                        type="text"
                        placeholder="Faisal Yasin"
                        className="w-full px-3 py-2 rounded-md"/>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone Number</label>
                      <Input 
                          type="text"
                          placeholder="+60135362840"
                          className="w-full px-3 py-2 rounded-md"/> 
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Race</label>
                      <Input 
                          type="text"
                          placeholder="Malay"
                          className="w-full px-3 py-2 rounded-md"/> 
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Nationality</label>
                      <Input 
                          type="text"
                          placeholder="Malaysian"
                          className="w-full px-3 py-2 rounded-md"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Occupation</label>
                      <Input 
                          type="text"
                          placeholder="Teacher"
                          className="w-full px-3 py-2 rounded-md"/>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Income</label>
                      <Input 
                          type="text"
                          placeholder="3000"
                          className="w-full px-3 py-2 rounded-md"/>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Office Phone Number</label>
                      <Input 
                          type="text"
                          placeholder="+60123456789"
                          className="w-full px-3 py-2 rounded-md"/>
                    </div>
                  </div>

                  {/* Addresses */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Office Address</label>
                         <Input 
                          type="text"
                          placeholder="University Teknologi Malaysia, Jalan Sultan Yahya Petra, Kampung Datuk Keramat, 54100 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur"
                          className="w-full px-3 py-2 rounded-md"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Home Address</label>
                      <Input 
                            type="text"
                            placeholder="No. 123, Jalan ABC, Taman XYZ, 12345 Kuala Lumpur"
                            className="w-full px-3 py-2 rounded-md"/>
                    </div>
                  </div>

                   {/* Section Heading */}
                  <h2 className="text-center font-semibold text-sm">Student Details</h2>

                  {/* Student Info */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Student Name</label>
                    <Input 
                        type="text"
                        placeholder="Faisal Yasin"
                        className="w-full px-3 py-2 rounded-md"/>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Birth Certificate Number</label>
                      <Input 
                          type="text"
                          placeholder="A/123456/1988"
                          className="w-full px-3 py-2 rounded-md"/> 
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">IC Number</label>
                      <Input 
                          type="text"
                          placeholder="150318060773"
                          className="w-full px-3 py-2 rounded-md"/> 
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Gender</label>
                      <Input 
                          type="text"
                          placeholder="Male"
                          className="w-full px-3 py-2 rounded-md"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Nationality</label>
                      <Input 
                          type="text"
                          placeholder="Malaysian"
                          className="w-full px-3 py-2 rounded-md"/>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Date of Birth</label>
                      <Input 
                          type="text"
                          placeholder="DD/MM/YYYY"
                          className="w-full px-3 py-2 rounded-md"/>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Place of Birth</label>
                      <Input 
                          type="text"
                          placeholder="Selangor"
                          className="w-full px-3 py-2 rounded-md"/>
                    </div>
                  </div>

                  <div>
                   <label className="block text-sm font-medium mb-1">Kindergarten Name</label>
                   <Input 
                       type="text"
                       placeholder="Tadika Affan"
                       className="w-full px-3 py-2 rounded-md"/>
                  </div>

                  <div>
                   <label className="block text-sm font-medium mb-1">Primary School Name</label>
                   <Input 
                       type="text"
                       placeholder="SK Denai Alam"
                       className="w-full px-3 py-2 rounded-md"/>
                  </div>

                  <div>
                   <label className="block text-sm font-medium mb-1">Primary School Session</label>
                   <Input 
                       type="text"
                       placeholder="Morning"
                       className="w-full px-3 py-2 rounded-md"/>
                  </div>

                  
                </form>
              </div>
          </div>
        </div>

        <div className="flex flex-row justify-end-safe gap-4">
          <Button text="Move to Phase 3"  color="dark-blue"  />
          <Button text="Reject"  color="danger" />
        </div>
        {/* CODE INSIDE HERE */}
        
      </div>
		</div>
  );
}
