"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

export function FileProgress() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <aside className="flex flex-col gap-2 font-lexend">
      <h6>Files 1/5</h6>
      <Progress value={progress} className="mx-auto bg-black text-red-500" />
    </aside>
  );
}
