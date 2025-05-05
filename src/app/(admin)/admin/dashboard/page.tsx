"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function page() {
	return (
		<main className="col-span-4 grid grid-cols-2 grid-rows-2 grid-flow-row gap-4 p-4 bg-white border border-gray-200 rounded-lg">
			<div className="space-y-1">
				<h5 className="font-semibold">Pending Newsfeed approvals</h5>
				<div className="flex flex-col items-center gap-3 h-64 bg-light-gray border border-gray-200 p-2 rounded-lg overflow-y-auto">
					<div className="flex flex-row items-center justify-between bg-white border border-gray-200 px-3 py-1.5 rounded-md w-full">
						<h6 className="font-medium">Class 1-USM</h6>
						<div className="flex flex-row items-center gap-1.5 text-gray-500 text-sm">
							<p>Feb 06</p>
							<p>Mr. Fairous</p>
							<button type="button" className="underline font-semibold ml-3">
								view
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="space-y-1">
				<h5 className="font-semibold">Published School Newsfeed</h5>
				<div className="flex flex-col items-center gap-3 h-64 bg-light-gray border border-gray-200 p-2 rounded-lg overflow-y-auto">
					<div className="flex flex-row items-center justify-between bg-white border border-gray-200 px-3 py-1.5 rounded-md w-full">
						<h6 className="font-medium">Public-key global middleware</h6>
						<div className="flex flex-row items-center gap-1.5 text-gray-500 text-sm">
							<p>Feb 06</p>
							<p>Mr. Fairous</p>
							<button type="button" className="underline font-semibold ml-3">
								view
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="col-span-2 space-y-1">
				<h5 className="font-semibold">Recently Approved Newsfeed</h5>
				<div className="flex flex-col items-center gap-3 h-64 bg-light-gray border border-gray-200 p-2 rounded-lg overflow-y-auto">
					<div className="flex flex-row items-center justify-between bg-white border border-gray-200 px-3 py-1.5 rounded-md w-full">
						<h6 className="font-medium">Show & tell on 16 March</h6>
						<div className="flex flex-row items-center gap-1.5 text-gray-500 text-sm">
							<p>Feb 06</p>
							<p>Mr. Fairous</p>
							<p>1-USM</p>
							<button type="button" className="underline font-semibold ml-3">
								view
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
