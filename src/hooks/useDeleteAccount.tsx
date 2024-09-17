// lib
import { deleteAccount } from "@/lib/delete-account";

// 3rd party libraries
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// useDeleteAccountMutation hook
export const useDeleteAccountMutation = (onCompletedSuccess: () => void) => {
  const queryClient = useQueryClient();

  const deleteAccountMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: async () => {
      onCompletedSuccess();
      window.location.reload();
      toast.success("Account deleted successfully.");
    },
    onError: (error: unknown) => {
      console.error("Failed to delete account:", error);
      if (error instanceof Error) {
        toast.error(`Failed to delete account: ${error.message}`);
      } else {
        toast.error("Failed to delete account.");
      }
    },
    onSettled: () => {
      //queryClient.invalidateQueries(["user"]);
    },
  });

  return { deleteAccountMutation };
};
