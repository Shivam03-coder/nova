"use client";
import React from "react";
import Editior from "./components/editior";
import NotSelectedFile from "./components/filenot";
import { useAppSelector } from "@/store";

const DashboardPage = () => {
  const { FileId } = useAppSelector((state) => state.account);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 lg:flex-row">
      <div className="flex flex-1">
        {FileId ? <Editior /> : <NotSelectedFile />}
      </div>
    </div>
  );
};

export default DashboardPage;
