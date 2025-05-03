"use client";

import { useState } from "react";
import { UploadSimple, X } from "@phosphor-icons/react";
import React from "react";
import CreatePost from "../components/CreatePost";

export default function page() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<FileList | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl p-6 relative space-y-2">
        {/* Close button */}
        <div className="flex flex-row justify-end w-full">
          <button
            className="text-gray-500 hover:text-black text-xl"
            onClick={() => console.log("Close modal logic goes here")}
          >
            <X size="18" weight="bold" className="text-black" />
          </button>
        </div>
        <div className="p-4 rounded-lg border border-gray-200">
          {/* Profile section */}
          <div className="flex flex-col mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-300" />
              <div>
                <p className="font-semibold text-black">Mr. Fairouz</p>
                <p className="text-sm text-gray-500">15 Mar &nbsp; 03:30pm</p>
              </div>
            </div>
          </div>

          {/* Title input */}
          <div className="mb-4">
            <label className="block text-sm font font-medium text-black mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Description input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows={4}
              className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Custom Image Upload Box */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attach Images
            </label>
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500"
            >
              <UploadSimple size={60} weight="bold" className="text-gray-500" />
              <p className="text-gray-500 mt-2 text-sm">
                Click to upload images
              </p>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Post button */}
          <div className="text-right">
            <button
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-[#042351]"
              onClick={() => {
                console.log("Post submitted:", { title, description, images });
                //logic here...
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
