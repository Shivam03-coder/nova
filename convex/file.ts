import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFile = mutation({
  args: {
    teamId: v.string(),
    fileName: v.string(),
  },
  handler: async (ctx, args) => {
    const [TeamExists, fileExists] = await Promise.all([
      ctx.db
        .query("teams")
        .filter((q) => q.eq(q.field("_id"), args.teamId))
        .first()
        .then((team) => !!team),

      ctx.db
        .query("files")
        .filter((q) => q.eq(q.field("fileName"), args.fileName))
        .first()
        .then((file) => !!file),
    ]);

    console.log(TeamExists);

    if (!TeamExists) throw new ConvexError("TEAM NOT FOUND");
    if (fileExists) throw new ConvexError("FILE  NAME EXISTS");

    const res = await ctx.db.insert("files", {
      teamId: args.teamId,
      fileName: args.fileName,
    });

    return res;
  },
});

export const getTotalNumberOfFiles = query({
  args: {
    teamId: v.string(),
  },
  handler: async (ctx, args) => {
    const files = await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("teamId"), args.teamId))
      .collect();

    return files.length;
  },
});
export const geFiles = query({
  args: {
    teamId: v.string(),
  },
  handler: async (ctx, args) => {
    const files = await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("teamId"), args.teamId))
      .order("desc")
      .collect();

    return files;
  },
});

export const UpdatedDoc = mutation({
  args: {
    fileId: v.string(),
    doc: v.string(),
  },
  handler: async (ctx, args) => {
    const fileExists = await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("_id"), args.fileId));

    if (fileExists) throw new ConvexError("FILE NOT FOUND");

    const res = await ctx.db.insert("files", {
      doc: args.doc,
    });

    return res;
  },
});
