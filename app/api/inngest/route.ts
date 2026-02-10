import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { sendSignupEmail, sendDailyNewsSummary } from "@/lib/inngest/function";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    sendSignupEmail,
    sendDailyNewsSummary
  ],
});
