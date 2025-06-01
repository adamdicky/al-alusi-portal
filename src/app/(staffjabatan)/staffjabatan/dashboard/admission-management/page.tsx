"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Tables } from "@/types/supabase/public.types";
import { apiFetch } from "@/utils/functions/fetch";
import ModalP2 from "@/components/ModalP2";
import ModalP3 from "@/components/ModalP3";
import ModalP4 from "@/components/ModalP4";



export default function page() {

    const [showModalP2, setShowModalP2] = useState(false);
    const [showModalP3, setShowModalP3] = useState(false);
    const [showModalP4, setShowModalP4] = useState(false);

    return (
        <main className="col-span-4 p-4 bg-white border border-gray-200 rounded-lg w-full">
            <div className="flex flex-col justify-between w-full h-full space-y-2">
                <div className="flex flex-row items-center justify-between w-full">
                    <h5 className="font-semibold">Pending Newsfeed Approvals</h5>

                    <div className="flex flex-row gap-2">
                        <select className="text-gray-700 rounded-full py-1 px-3 border-gray-200 border font-semibold" value="test">
                            <option value="All Dates">Status: All</option>
                        </select>
                        <select className="text-gray-700 rounded-full py-1 px-3 border-gray-200 border font-semibold" value="test">
                            <option value="All Dates">Order by: Latest</option>
                        </select>
                    </div>
                    
                </div>
                
                <div className="flex flex-col items-center gap-3 h-full bg-off-white border border-gray-200 p-2 rounded-lg overflow-y-auto">
                    {/* start of code */}

                    <div className="flex flex-row items-center justify-between bg-white border border-gray-200 px-3 py-1.5 rounded-md w-full">
                        <h6 className="font-medium w-44 overflow-hidden text-ellipsis whitespace-nowrap">Title</h6>
                        <div className="flex flex-row items-center gap-1.5 text-gray-500 text-sm">
                            <p>{new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(new Date)}</p>
                            <strong className="text-[#FDD660]">
                                Phase 02
                            </strong>
                            <button
                                type="button"
                                className="underline font-semibold ml-3"
                                onClick={() => setShowModalP2(true)}
                            >
                                view
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-between bg-white border border-gray-200 px-3 py-1.5 rounded-md w-full">
                        <h6 className="font-medium w-44 overflow-hidden text-ellipsis whitespace-nowrap">Title</h6>
                        <div className="flex flex-row items-center gap-1.5 text-gray-500 text-sm">
                            <p>{new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(new Date)}</p>
                            <strong className="text-[#AF52DE]">
                                Phase 03
                            </strong>
                            <button
                                type="button"
                                className="underline font-semibold ml-3"
                                onClick={() => setShowModalP3(true)}
                            >
                                view
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-between bg-white border border-gray-200 px-3 py-1.5 rounded-md w-full">
                        <h6 className="font-medium w-44 overflow-hidden text-ellipsis whitespace-nowrap">Title</h6>
                        <div className="flex flex-row items-center gap-1.5 text-gray-500 text-sm">
                            <p>{new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(new Date)}</p>
                            <strong className="text-[#FF2D55]">
                                Phase 04
                            </strong>
                            <button
                                type="button"
                                className="underline font-semibold ml-3"
                                onClick={() => setShowModalP4(true)}
                            >
                                view
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-between bg-white border border-gray-200 px-3 py-1.5 rounded-md w-full">
                        <h6 className="font-medium w-44 overflow-hidden text-ellipsis whitespace-nowrap">Title</h6>
                        <div className="flex flex-row items-center gap-1.5 text-gray-500 text-sm">
                            <p>{new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(new Date)}</p>
                            <strong className="text-[#34C759]">
                                Accepted
                            </strong>
                            <button
                                type="button"
                                className="underline font-semibold ml-3"
                            >
                                view
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-between bg-white border border-gray-200 px-3 py-1.5 rounded-md w-full">
                        <h6 className="font-medium w-44 overflow-hidden text-ellipsis whitespace-nowrap">Title</h6>
                        <div className="flex flex-row items-center gap-1.5 text-gray-500 text-sm">
                            <p>{new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(new Date)}</p>
                            <strong className="text-[#B3261E]">
                                Rejected
                            </strong>
                            <button
                                type="button"
                                className="underline font-semibold ml-3"
                            >
                                view
                            </button>
                        </div>
                    </div>

                    {showModalP2 && <ModalP2 onClose={() => setShowModalP2(false)} />}
                    {showModalP3 && <ModalP3 onClose={() => setShowModalP3(false)} />}
                    {showModalP4 && <ModalP4 onClose={() => setShowModalP4(false)} />}
                </div>
            </div>
        </main>
    );
}

