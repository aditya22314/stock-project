import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { sendSignupEmail } from "@/lib/inngest/function";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    /* your functions will go here later */
    sendSignupEmail,
  ],
});
