import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const SyncUserToDb = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    name: v.string(),
    profileImg: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (existingUser) {
      throw new ConvexError("USER_EXISTS");
    }

    await ctx.db.insert("user", {
      userId: args.userId,
      email: args.email,
      name: args.name,
      profileImg: args.profileImg,
    });
  },
});

