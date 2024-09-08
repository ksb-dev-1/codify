import { auth } from "@/auth";
import { cache } from "react";

const getSession = cache(async () => {
  return await auth();
});

export default getSession;
