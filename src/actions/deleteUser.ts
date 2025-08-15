"use server";

import { prisma } from "@/lib/prisma";
import cloudinary from "@/config/cloudinary.config";

function getPublicIdFromUrl(url: string) {
  // Match everything after "upload/" and remove file extension
  const match = url.match(/upload\/(?:v[0-9]+\/)?(.+)\.[a-zA-Z]+$/);
  return match ? match[1] : null;
}

export async function deleteUser(userId: string | undefined) {
  try {
    if (!userId) throw new Error("Unauthorized");

    // Get user's image URL
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { image: true }, // assuming 'image' stores Cloudinary URL
    });

    if (!user) throw new Error("User not found");

    // Extract public_id from URL
    if (user.image) {
      const publicId = getPublicIdFromUrl(user.image);

      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    // Delete user from DB
    await prisma.user.delete({
      where: { id: userId },
    });

    return { success: true, message: "User and image deleted successfully" };
  } catch (error) {
    console.error("Failed to delete user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
