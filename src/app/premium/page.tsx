import { Metadata } from "next";
import { redirect } from "next/navigation";

// components
import Container from "@/components/shared/Container";
import Premium from "@/components/Premium";

// lib
// import { getQueryClient } from "@/lib/getQueryClient";
// import { fetchUserPremiumData } from "@/lib/fetchUserPremiumData";

// utils
// import { queryKeys } from "@/utils/queryKeys";

// 3rd party
import { auth } from "@/auth";
// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const metadata: Metadata = {
  title: "Premium",
  description:
    "Unlock exclusive access to expertly curated premium questions to boost your learning and interview preparation.",
};

export default async function PremiumPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/sign-in");

  // const queryClient = getQueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: queryKeys.isPremium(userId),
  //   queryFn: () => fetchUserPremiumData({ userId }),
  // });

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    <Container className="min-h-screen border-x px-6 sm:px-8 md:px-16 pb-16 pt-32">
      <Premium userId={userId} />
    </Container>
    // </HydrationBoundary>
  );
}
