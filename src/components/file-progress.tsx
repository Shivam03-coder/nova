"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { useLocalStorage } from "usehooks-ts";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";

export function FileProgress() {
  const [progress, setProgress] = React.useState(13);
  const [teamId] = useLocalStorage<string>("TeamId", "");
  const files = useQuery(api.file.getTotalNumberOfFiles, { teamId });

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    setProgress(Number(files));
    return () => clearTimeout(timer);
  }, []);

  return (
    <aside className="flex flex-col gap-2 font-lexend">
      <h6>Files {files?.totalFiles}/5</h6>
      <Progress value={files?.totalFiles} className="mx-auto bg-black text-red-500" />
    </aside>
  );
}
