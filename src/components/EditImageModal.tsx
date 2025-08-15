"use client";

import {
  forwardRef,
  useRef,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import Image from "next/image";

// actions
import { updateProfileImage } from "@/actions/updateProfileImage";

// components
import Modal from "./shared/Modal";

// 3rd party
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { FaCircleUser } from "react-icons/fa6";
import { SlCloudUpload } from "react-icons/sl";
import { TbLoader } from "react-icons/tb";

interface EditImageModalProps {
  isEditImageOpen: boolean;
  setIsEditImageOpen: Dispatch<SetStateAction<boolean>>;
  previewImage: string | null | undefined;
  setPreviewImage: Dispatch<SetStateAction<string | null | undefined>>;
  selectedFile: File | null;
  setSelectedFile: Dispatch<SetStateAction<File | null>>;
}

const EditImageModal = forwardRef<HTMLDivElement, EditImageModalProps>(
  (
    {
      isEditImageOpen,
      setIsEditImageOpen,
      previewImage,
      setPreviewImage,
      selectedFile,
      setSelectedFile,
    },
    ref
  ) => {
    const { update } = useSession();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
      if (!selectedFile && fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }, [selectedFile]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedFile(file);
        setPreviewImage(URL.createObjectURL(file));
      }
    };

    const handleImageUpload = async () => {
      if (!selectedFile) return;
      try {
        setIsPending(true);

        const formData = new FormData();
        formData.append("file", selectedFile);

        const res = await updateProfileImage(formData);
        if (res.success) {
          setIsEditImageOpen(false);
          toast.success("Profile image updated successfully.");
          update(); // Update session
        } else {
          console.error(res.message);
          toast.error("Failed to update profile image.");
        }
      } catch (error) {
        console.error("Upload failed", error);
        toast.error("Failed to update profile image.");
      } finally {
        setIsPending(false);
      }
    };

    return (
      <Modal ref={ref} isOpen={isEditImageOpen} setIsOpen={setIsEditImageOpen}>
        <h1 className="text-xl font-bold mb-8">Update Profile Image</h1>
        <div className="flex items-start justify-center gap-4">
          {previewImage ? (
            <div className="relative border h-[125px] w-[125px] rounded overflow-hidden">
              <Image
                src={previewImage}
                alt="image"
                height={125}
                width={125}
                className="cursor-pointer rounded object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          ) : (
            <div className="relative h-[125px] w-[125px] rounded border">
              <FaCircleUser className="text-slate-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl" />
            </div>
          )}
          <label className="relative border border-dashed border-slate-500 rounded h-[125px] w-[calc(100%-100px)] overflow-hidden cursor-pointer flex items-center justify-center">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              disabled={isPending}
              className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center">
              <SlCloudUpload className="text-3xl text-slate-500" />
              <p className="text-slate-500">
                {selectedFile ? selectedFile.name : "No image selected"}
              </p>
            </div>
          </label>
        </div>
        {selectedFile && (
          <button
            onClick={handleImageUpload}
            disabled={isPending}
            className="relative w-full mt-4 px-4 py-2 rounded flex items-center justify-center bg-primary text-white hover:bg-primary_dark transition-colors"
          >
            <span className="flex items-center">
              Upload{" "}
              {isPending && (
                <TbLoader className="absolute right-2 h-5 w-5 animate-spin ml-2" />
              )}
            </span>
          </button>
        )}
      </Modal>
    );
  }
);

EditImageModal.displayName = "EditImageModal";
export default EditImageModal;
