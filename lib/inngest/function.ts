
import { sendWelcomeEmail } from "../nodemailer";
import { inngest } from "./client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts";

export const sendSignupEmail = inngest.createFunction(
  { id: "sign-up-email" },
  { event: "app/user.created" },
  async ({ event, step }) => {
    const userProfile = `-Country ${event.data.country} 
  -Investment Goals ${event.data.investmentGoals}
  -Risk Tolerance ${event.data.riskTolerance}
  -Preferred Industry ${event.data.preferredIndustry}
 `;
    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace(
      "{{userProfile}}",
      userProfile
    );

    const response = await step.ai.infer("generate-welcome-intro", {
      model: step.ai.models.gemini({
        model: "gemini-2.5-flash",
      }),
      body: {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
    });
    await step.run('send-welcome-email',async ()=> {
        const part = response.candidates?.[0]?.content?.parts?.[0];
        const introText = (part as any)?.text || "Thanks for joining Signalist you know have the tools to track market and make smarter moves";
        //Email send logic
        const { data:{email,name} } = event;
        return await sendWelcomeEmail({email,name,intro:introText})
    })
    return {
        success:true,
        message:"Welcome email sent successfully",
    }
  }
  
);