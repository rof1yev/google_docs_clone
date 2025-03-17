"use client";

import { ReactNode } from "react";
import {
  ConvexReactClient,
  AuthLoading,
  Authenticated,
  Unauthenticated,
} from "convex/react";
import { ClerkProvider, SignIn, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { FullScreenLoader } from "@/components/fullscreen-loader";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <div className="min-h-screen flex flex-col justify-center items-center">
            <SignIn />
          </div>
        </Unauthenticated>
        <AuthLoading>
          <FullScreenLoader label="Authentication loading..." />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
