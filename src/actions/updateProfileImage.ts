"use server";

import { auth } from "@/auth"; // or next-auth config path
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/config/cloudinary.config";

export async function updateProfileImage(formData: FormData) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return { success: false, message: "Unauthorized" };
    }

    // Delete old image if it exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { image: true },
    });

    if (user?.image) {
      const oldImageId = user.image
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0];
      await cloudinary.uploader.destroy(oldImageId, { resource_type: "image" });
    }

    // Get the new file from formData
    const file = formData.get("file") as File;
    if (!file) {
      return { success: false, message: "No file uploaded" };
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Cloudinary
    const result = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "codify" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as { secure_url: string; public_id: string });
          }
        );
        uploadStream.end(buffer);
      }
    );

    // Update DB
    await prisma.user.update({
      where: { id: userId },
      data: { image: result.secure_url },
    });

    revalidatePath("/profile"); // adjust path to your profile route

    return { success: true, imageUrl: result.secure_url };
  } catch (error) {
    console.error("Failed to upload image:", error);
    return {
      success: false,
      message: "Failed to upload image",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
