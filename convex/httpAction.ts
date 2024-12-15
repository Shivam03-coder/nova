import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";

export class HttpHandler {
  public static ClerkWebhookHandler = httpAction(
    async (ctx, req): Promise<Response> => {
      try {
        const WebHookSecretKey = process.env.CLERK_WEBHOOK_SECRET_KEY;

        if (!WebHookSecretKey) {
          throw new Error("WEBHHOK SECRET KEY IS MISSING");
        }

        const svixId = req.headers.get("svix-id");
        const svixSignature = req.headers.get("svix-signature");
        const svixTimestamp = req.headers.get("svix-timestamp");

        if (!svixId || !svixSignature || !svixTimestamp)
          throw new Error("Missing required headers");

        const { data } = await req.json();
        const email = data.email_addresses[0].email_address;
        const firstName = data.first_name;
        const lastName = data.last_name;
        const profileImg = data.image_url;
        const userId = data.id;
        const name = `${firstName ?? ""} ${lastName ?? ""}`.trim();

        try {
          //  SAVE USER TO DB
          await ctx.runMutation(api.user.SyncUserToDb, {
            email,
            name,
            profileImg,
            userId,
          });
        } catch (error) {
          return new Response("UNABLE TO SYNC USER", { status: 500 });
        }

        return new Response("Webhook processed successfully", { status: 200 });
      } catch (error) {
        console.error("Error processing Clerk webhook:", error);
        return new Response("Internal Server Error", { status: 500 });
      }
    },
  );
}
