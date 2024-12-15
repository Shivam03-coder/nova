import React from "react";

const DashboardPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-red-300" />
        <div className="aspect-video rounded-xl bg-pink-300" />
        <div className="aspect-video rounded-xl bg-blue-300" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-green-300 md:min-h-min" />
    </div>
  );
};

export default DashboardPage;