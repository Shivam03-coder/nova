"use client";

import React, { useEffect, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
// @ts-ignore
import SimpleImage from "@editorjs/simple-image";
import Table from "@editorjs/table";
import InlineCode from "@editorjs/inline-code";
import { PencilIcon, Save } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { useReadLocalStorage } from "usehooks-ts";
import { useToast } from "@/hooks/use-toast";

const initialDocument: OutputData = {
  time: Date.now(),
  blocks: [
    {
      id: "1",
      type: "header",
      data: {
        text: "NOVA TEXT EDITOR",
        level: 2,
      },
    },
    {
      id: "2",
      type: "header",
      data: {
        text: "Your content starts here...",
        level: 4,
      },
    },
  ],
  version: "2.27.0", // Latest Editor.js version
};

const Editor = () => {
  const editorInstance = useRef<EditorJS | null>(null);
  const updateDocument = useMutation(api.file.UpdatedDoc);
  const FileId = useReadLocalStorage<string>("FileId");
  const { toast } = useToast();

  // Initialize Editor.js
  const initializeEditor = () => {
    if (!editorInstance.current) {
      editorInstance.current = new EditorJS({
        holder: "editorjs",
        placeholder: "Start editing with AI NOVA...",
        tools: {
          header: {
            // @ts-ignore
            class: Header,
            inlineToolbar: ["link"],
          },
          list: {
            // @ts-ignore

            class: List,
            inlineToolbar: true,
          },
          image: SimpleImage,
          inlineCode: {
            class: InlineCode,
            shortcut: "CMD+SHIFT+M",
          },
          table: {
            // @ts-ignore
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 3,
              maxRows: 5,
              maxCols: 5,
            },
          },
        },
        data: initialDocument,
        onReady: () => {
          console.log("Editor.js is ready to use!");
        },
      });
    }
  };

  useEffect(() => {
    initializeEditor();

    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);

  // Save content to the backend
  const handleSave = async () => {
    if (!editorInstance.current) {
      console.error("Editor instance is not initialized.");
      return;
    }

    try {
      const outputData = await editorInstance.current.save();
      if (!FileId) throw new Error("FileId is missing!");

      const response = await updateDocument({
        fileId: FileId,
        doc: JSON.stringify(outputData),
      });

      console.log(response)

      if (response) {
        toast({
          title: "Document saved successfully!",
          description: "Your changes have been saved.",
          className: "bg-green-400 text-black rounded-xl",
        });
      }
    } catch (error) {
      console.error("Error saving editor content:", error);
      toast({
        title: "Error saving document",
        description: "Something went wrong. Please try again.",
        className: "bg-red-500 text-white rounded-xl",
      });
    }
  };

  return (
    <div className="min-h-screen flex-1 rounded border-2 border-black bg-white p-3 shadow-2xl">
      <div className="flex items-center gap-4">
        <h5 className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-secondary">
          <PencilIcon /> AI NOVA TEXT EDITOR
        </h5>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-secondary"
        >
          <Save /> Save Document
        </button>
      </div>
      <div
        id="editorjs"
        className="mt-5 h-[80vh] overflow-y-auto rounded-md border p-2"
      />
    </div>
  );
};

export default Editor;
