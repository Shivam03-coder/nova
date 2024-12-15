import { httpRouter } from "convex/server";
import { HttpHandler } from "./httpAction";

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: HttpHandler.ClerkWebhookHandler,
});

export default http;
