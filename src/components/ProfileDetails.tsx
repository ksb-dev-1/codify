"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// components
import EditImageModal from "./EditImageModal";
import DeleteAccountModal from "./DeleteAccountModal";

// 3rd party
import { FaRegUser } from "react-icons/fa";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import ProgressStats from "./ProgressStats";

export default function ProfileDetails({
  userId,
  name,
  email,
  image,
}: {
  userId: string;
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
}) {
  const [isEditImageOpen, setIsEditImageOpen] = useState<boolean>(false);
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] =
    useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | undefined | null>(
    ""
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const editImageModalref = useRef<HTMLDivElement>(null);
  const deleteAccountModalref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isEditImageOpen) {
      setSelectedFile(null);
      setPreviewImage(null);
    }
  }, [isEditImageOpen]);

  return (
    <>
      <h1 className="text-xl font-bold mb-8 border-b pb-4">Profile Details</h1>
      <div className="relative border rounded p-4 md:p-8">
        {image && (
          <Image
            src={image}
            alt="Background"
            fill
            className="object-cover object-center opacity-10 pointer-events-none"
            priority
          />
        )}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="relative">
            {image ? (
              <div className="relative h-[150px] w-[150px] border bg-white rounded overflow-hidden">
                <Image
                  src={image}
                  alt="image"
                  height={150}
                  width={150}
                  priority
                  className="cursor-pointer rounded object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            ) : (
              <div className="relative h-[150px] w-[150px] rounded border">
                <FaRegUser className="text-slate-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl" />
              </div>
            )}
            {/* Edit image button */}
            <button
              aria-label="Edit image edit button"
              onClick={() => setIsEditImageOpen(true)}
              className="absolute w-8 h-8 rounded-bl rounded-tr bg-[rgba(0,0,0,0.5)] text-white hover:bg-black transition-colors left-0 bottom-0 cursor-pointer"
            >
              <LiaEdit className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl" />
            </button>
          </div>

          <div>
            {name && <p className="text-lg sm:text-xl font-bold">{name}</p>}
            {email && <p className="sm:mt-1 sm:text-lg">{email}</p>}
          </div>
        </div>

        {/* Delete account button */}
        <button
          aria-label="Delete account button"
          onClick={() => setIsDeleteAccountOpen(true)}
          className="absolute top-0 right-0 cursor-pointer w-8 h-8 rounded-tr rounded-bl bg-red-600 text-white hover:bg-red-700 transition-colors"
        >
          <RiDeleteBin6Line className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl" />
        </button>
      </div>

      {/* ----- Edit image modal ----- */}
      <EditImageModal
        ref={editImageModalref}
        isEditImageOpen={isEditImageOpen}
        setIsEditImageOpen={setIsEditImageOpen}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
      />

      {/* ----- Delete account modal ----- */}
      <DeleteAccountModal
        ref={deleteAccountModalref}
        isDeleteAccountOpen={isDeleteAccountOpen}
        setIsDeleteAccountOpen={setIsDeleteAccountOpen}
      />

      <ProgressStats userId={userId} />
    </>
  );
}
