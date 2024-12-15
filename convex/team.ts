import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTeamname = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const TeamName = await ctx.db
      .query("teams")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    return TeamName;
  },
});
export const CreateNewTeam = mutation({
  args: {
    userId: v.string(),
    TeamName: v.string(),
  },
  handler: async (ctx, args) => {
    const [userExists, teamNameExists] = await Promise.all([
      ctx.db
        .query("user")
        .filter((q) => q.eq(q.field("userId"), args.userId))
        .first()
        .then((user) => !!user),

      ctx.db
        .query("teams")
        .filter((q) => q.eq(q.field("TeamName"), args.userId))
        .first()
        .then((team) => !!team),
    ]);

    if (!userExists) throw new ConvexError("USER NOT FOUND");
    if (teamNameExists) throw new ConvexError("TEAM NAME EXISTS");

    await ctx.db.insert("teams", {
      userId: args.userId,
      teamName: args.TeamName,
    });

    return { success: true, message: "Team created successfully" };
  },
});
