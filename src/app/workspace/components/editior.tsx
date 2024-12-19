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
import { useMutation, useQuery } from "convex/react";
import { useLocalStorage } from "usehooks-ts";
import { useToast } from "@/hooks/use-toast";
import { useAppSelector } from "@/store";
import { api } from "convex/_generated/api";

// Default document content
const initialDocument: OutputData = {
  time: Date.now(),
  blocks: [
    {
      id: "1",
      type: "header",
      data: { text: "NOVA TEXT EDITOR", level: 2 },
    },
    {
      id: "2",
      type: "header",
      data: { text: "Your content starts here...", level: 4 },
    },
  ],
  version: "2.27.0",
};

const Editor = () => {
  const { FileId } = useAppSelector((state) => state.account);
  const [TeamId] = useLocalStorage("TeamId", "");
  const editorInstance = useRef<EditorJS | null>(null);
  const fetchedDataRef = useRef(false); // To prevent duplicate fetching
  const [document, setDocument] = useState<OutputData | null>(null);
  const { toast } = useToast();
  const updateDocument = useMutation(api.file.UpdatedDoc);

  // Query for file data
  const fileData = useQuery(api.file.GetFileDataById, { fileId: FileId });

  useEffect(() => {
    // Whenever FileId changes, fetch the new document data
    if (FileId && fileData?.file) {
      try {
        const savedDocument = fileData.file?.document
          ? JSON.parse(fileData.file.document)
          : initialDocument;

        setDocument(savedDocument);

        toast({
          title: "Document loaded",
          description: "Your document has been loaded successfully.",
          className: "bg-blue-400 text-black rounded-xl",
        });
      } catch (error) {
        console.error("Error parsing document data:", error);
        toast({
          title: "Error loading document",
          description: "Failed to load the document.",
          className: "bg-red-500 text-white rounded-xl",
        });
      }
    }
  }, [FileId, fileData, toast]); // Re-fetch when FileId or fileData changes

  // Initialize the editor when the document is loaded or when FileId changes
  useEffect(() => {
    // Ensure the editor div is present before initializing

    if (document && !editorInstance.current) {
      editorInstance.current = new EditorJS({
        holder: "editorjs",
        placeholder: "Start editing with AI NOVA...",
        tools: {
          // @ts-ignore
          header: { class: Header, inlineToolbar: ["link"] },
          // @ts-ignore
          list: { class: List, inlineToolbar: true },
          image: SimpleImage,
          // @ts-ignore
          inlineCode: { class: InlineCode, shortcut: "SHIFT+M" },
          // @ts-ignore
          table: { class: Table, inlineToolbar: true },
        },
        data: document,
        onReady: () => console.log("Editor.js is ready to use!"),
      });
    }

    // Cleanup editor instance on component unmount or when FileId or document changes
    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, [FileId, document]); // Reinitialize the editor whenever FileId or document changes

  // Handle saving the document content
  const handleSave = async () => {
    if (!editorInstance.current || !FileId) {
      console.error("Editor not initialized or missing FileId");
      return;
    }

    try {
      const outputData = await editorInstance.current.save();
      await updateDocument({ fileId: FileId, doc: JSON.stringify(outputData) });

      toast({
        title: "Document saved successfully!",
        description: "Your changes have been saved.",
        className: "bg-green-400 text-black rounded-xl",
      });
    } catch (error) {
      console.error("Error saving document:", error);
      toast({
        title: "Error saving document",
        description: "Something went wrong. Please try again.",
        className: "bg-red-500 text-white rounded-xl",
      });
    }
  };

  // If no FileId is available, show a message asking the user to select or create a file
  if (!FileId) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        <h2>No file selected. Please select or create a file to edit.</h2>
      </div>
    );
  }

  // Render the editor if a file is selected
  return (
    <div className="flex-1 rounded border-2 border-black bg-white p-3 shadow-2xl">
      <div className="flex items-center gap-4">
        <h5 className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-secondary">
          <PencilIcon /> NOVA TEXT EDITOR
        </h5>
        {FileId && (
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-secondary"
          >
            <Save /> Save Document
          </button>
        )}
      </div>
      {FileId ? (
        <div
          id="editorjs"
          className="mt-5 h-[calc(100vh-12rem)] overflow-y-auto rounded-md border p-2"
        />
      ) : (
        <h2>No content available to edit.</h2>
      )}
    </div>
  );
};

export default Editor;
