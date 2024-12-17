"use client";
import React from "react";
import { PencilIcon, Save } from "lucide-react";
import Editior from "./components/editior";

const DashboardPage = () => {


  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 lg:flex-row">
    <div className="flex flex-1">
    <Editior />
    </div>
    </div>
  );
};

export default DashboardPage;
