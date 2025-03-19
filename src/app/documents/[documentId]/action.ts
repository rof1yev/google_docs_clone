"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getUsers() {
  const { sessionClaims } = await auth();
  const clerk = clerkClient();

  const response = (await clerk).users.getUserList({
    organizationId: [sessionClaims?.org_id!],
  });

  return (await response).data.map((user) => ({
    id: user.id,
    name:
      user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
    avatar: user.imageUrl,
  }));
}
