import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFile = mutation({
  args: {
    teamId: v.string(),
    fileName: v.string(),
    document: v.string(),
  },
  handler: async (ctx, args) => {
    const [teamExists, fileExists] = await Promise.all([
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

    if (!teamExists) {
      return { success: false, message: "TEAM NOT FOUND" };
    }
    if (fileExists) {
      return { success: false, message: "FILE NAME EXISTS" };
    }

    const res = await ctx.db.insert("files", {
      teamId: args.teamId,
      fileName: args.fileName,
      document: args.document,
    });

    return { success: true, message: "File created successfully", fileId: res };
  },
});

export const deleteFile = mutation({
  args: {
    FileId: v.string(),
  },
  handler: async (ctx, args) => {
    const fileExists = await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("_id"), args.FileId))
      .first();

    if (!fileExists) {
      return { success: false, message: "FILE DOES NOT EXIST" };
    }

    await ctx.db.delete(fileExists._id);

    return { success: true, message: "File deleted successfully" };
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

    return { success: true, totalFiles: files.length };
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

    return { success: true, files };
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
      .filter((q) => q.eq(q.field("_id"), args.fileId))
      .first();

    if (!fileExists) {
      return { success: false, message: "FILE NOT FOUND" };
    }

    await ctx.db.patch(fileExists._id, {
      document: args.doc,
    });

    return {
      success: true,
      message: "Document updated successfully!",
      updatedDocumentId: fileExists._id,
    };
  },
});

export const GetFileDataById = query({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const file = await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("_id"), args.fileId))
      .first();

    if (!file) {
      return { success: false, message: "FILE NOT FOUND" };
    }

    return { success: true, file };
  },
});
