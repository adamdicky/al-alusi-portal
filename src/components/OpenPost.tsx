"use client";

import React, { useState } from "react";
import { User, X } from "@phosphor-icons/react";
import Button from "@/components/Button";
import { Tables } from "@/types/supabase/public.types";
import Image from "next/image";
import { apiFetch } from "@/utils/functions/fetch";

const OpenPost = ({ post, close }: { post: Tables<"school_posts" | "class_posts">; close: () => void }) => {
    
    // State for the remark input
    const [remarkText, setRemarkText] = useState<string>("");
    
    //Check if this is class_post and if its approved
    const isPostApproved = (post as Tables<"class_posts">).status === "approved";

    // Function to handle Make Remark button click
    async function makeRemark(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!remarkText) {
            alert("Please enter a remark before submitting.");
            return;
        }

        try {
            await apiFetch(`/api/admin/create-remark`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    post_id: post.id, // Pass the post_id
                    remarks: remarkText, // Pass the remark text
                }),
            });

            alert("Remark added successfully!");
            close();
        } catch (error) {
            console.error(error);
        }
    }

    // Function to handle Approve or Reject button click
    async function updateStatus(e: React.MouseEvent<HTMLButtonElement>, action: "approved" | "rejected") {
        e.preventDefault();
        try {
            await apiFetch(`/api/newsfeed/class/post/status/update?postId=${post.id}&action=${action}`, {
                method: "PATCH",
            });

            alert(`Post status updated to ${action}`);
            close();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-3xl rounded-xl p-2 relative space-y-2">
                <button type="button" onClick={close} className="block ml-auto cursor-pointer">
                    <X size="18" weight="bold" className="text-black" />
                </button>
				
                <div className="flex flex-row justify-around border border-gray-200 rounded-md p-4 space-y-6">
                  
				   <div className="flex flex-col w-full gap-4 p-3 mb-0">
						{/* Content */}
						<div className="flex flex-row items-center gap-2 w-full">
							<User size={32} />
							<div>
								<h6 className="font-semibold w-44 overflow-hidden text-ellipsis whitespace-nowrap">{post.author_id}</h6>
								<div className="flex flex-row items-center gap-2">
									<h6 className="text-[12px] text-[#909090]">
										{new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(new Date(post.created_at))}
									</h6>
									<h6 className="text-[12px] text-[#909090]">
										{new Intl.DateTimeFormat("en-GB", { hour: "numeric", minute: "2-digit", hour12: true })
											.format(new Date(post.created_at))
											.toLocaleLowerCase()}
									</h6>
								</div>
							</div>
						</div>

						<div className="text-justify">
                            <h6><b>{post.title}</b></h6>
							<p>{post.content}</p>
						</div>

						<div className="relative w-full h-80 overflow-hidden rounded-md">
							<Image
								src="/example pic siraj al alusi.jpg"
								alt="example pic"
								fill
								className="object-cover"
							/>
						</div>
				   </div>

                    {!isPostApproved && (
                    <div>
						 {/* Remark Text Field */}
						<textarea 
							className="w-[190px] h-full border border-gray-300 rounded-md p-2 " 
							placeholder="Type your remark here..." 
							value={remarkText} 
							onChange={(e) => setRemarkText(e.target.value)}
						/>
					</div>
                    )}
				
                   
                </div>

                {!isPostApproved && (
                <div className="flex justify-end gap-2">
                    <Button text="Make Remark"  onClick={makeRemark} className="font-semibold text-sm bg-yellow-500 text-white" />
                    <Button text="Approve" color="dark-blue" onClick={(e) => updateStatus(e, "approved")} className="font-semibold text-sm" />
                    <Button text="Reject" color="danger" onClick={(e) => updateStatus(e, "rejected")} className="font-semibold text-sm" />
                </div>
                )}
                {/* Action Buttons */}
                
            </div>
        </div>
    );
};

export default OpenPost;
