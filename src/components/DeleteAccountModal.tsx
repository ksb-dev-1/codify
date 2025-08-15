"use client";

import { useState, forwardRef, Dispatch, SetStateAction } from "react";

// actions
import { deleteUser } from "@/actions/deleteUser";

// components
import Modal from "./shared/Modal";

// 3rd party
import toast from "react-hot-toast";
import { useSession, signOut } from "next-auth/react";
import { TbLoader } from "react-icons/tb";

interface DeleteAccountModalProps {
  isDeleteAccountOpen: boolean;
  setIsDeleteAccountOpen: Dispatch<SetStateAction<boolean>>;
}

const DeleteAccountModal = forwardRef<HTMLDivElement, DeleteAccountModalProps>(
  ({ isDeleteAccountOpen, setIsDeleteAccountOpen }, ref) => {
    const { data: session } = useSession();
    const [isPending, setIsPending] = useState(false);

    const handleDeleteAccount = async () => {
      try {
        setIsPending(true);
        const response = await deleteUser(session?.user?.id);
        if (response.success) {
          setIsDeleteAccountOpen(false);
          signOut();
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete account");
      } finally {
        setIsPending(false);
      }
    };

    return (
      <Modal
        ref={ref}
        isOpen={isDeleteAccountOpen}
        setIsOpen={setIsDeleteAccountOpen}
      >
        <h1 className="mb-8 text-xl font-bold text-red-600">Delete Account</h1>

        <p>Do you want to delete your account?</p>

        <div className="max-w-xl w-full mt-4 border border-red-300 bg-red-100 text-red-700 rounded p-4">
          <p className="text-xl mb-2 font-bold">Note:</p>
          <p>
            This will delete everything related to your account such as saved
            questions, your progress, etc.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleDeleteAccount}
            disabled={isPending}
            className="relative w-full mt-4 px-4 py-2 rounded flex items-center justify-center bg-red-600 text-white hover:bg-red-500 transition-colors"
          >
            <span className="flex items-center">
              Delete{" "}
              {isPending && (
                <TbLoader className="absolute right-2 h-5 w-5 animate-spin ml-2" />
              )}
            </span>
          </button>
        </div>
      </Modal>
    );
  }
);

DeleteAccountModal.displayName = "DeleteAccountModal";
export default DeleteAccountModal;
