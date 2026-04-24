"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../db";
import { bookings } from "../db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function createBooking(serviceId: string, bookingDate: Date) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    await db.insert(bookings).values({
      userId,
      serviceId,
      bookingDate,
      status: "pending",
    });

    revalidatePath("/dashboard");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to create booking:", error);
    return { success: false, error: "Failed to create booking" };
  }
}

export async function cancelBooking(bookingId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    await db
      .update(bookings)
      .set({ status: "cancelled" })
      .where(eq(bookings.id, bookingId));

    revalidatePath("/dashboard");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to cancel booking:", error);
    return { success: false, error: "Failed to cancel booking" };
  }
}
