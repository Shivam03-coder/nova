"use client";
import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import { PencilIcon, Save } from "lucide-react";

const Editor = () => {
  const docRef = useRef<EditorJS | null>(null);

  const initEditor = () => {
    if (!docRef.current) {
      docRef.current = new EditorJS({
        holder: "editorjs",
        placeholder: "EDIT TEXT WITH NOVA",
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
        },
      });
    }
  };

  useEffect(() => {
    initEditor();

    return () => {
      // Cleanup the editor instance
      if (docRef.current) {
        docRef.current.destroy();
        docRef.current = null;
      }
    };
  }, []);

  const handleSave = async () => {
    if (docRef.current) {
      try {
        const outputData = await docRef.current.save();
        console.log("Saved data:", outputData);
      } catch (error) {
        console.error("Error saving editor content:", error);
      }
    } else {
      console.error("Editor instance is not initialized.");
    }
  };

  return (
    <div className="min-h-[100vh] flex-1 rounded border-2 border-black bg-white p-3 shadow-2xl md:min-h-[100vh]">
      <h5 className="inline-flex w-auto items-center gap-3 rounded-lg bg-primary p-2 text-secondary">
        <PencilIcon />
        AI NOVA TEXT EDITOR
      </h5>
      <button
        onClick={handleSave}
        className="ml-5 inline-flex w-auto items-center gap-3 rounded-lg bg-primary p-2 text-secondary"
      >
        <Save />
      </button>
      <div className="mt-7 h-[100vh] overflow-y-scroll" id="editorjs" />
    </div>
  );
};

export default Editor;
