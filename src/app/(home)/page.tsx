"use client";
import React from "react";
import Header from "./components/navbar";
import MainLayout from "./components/main-layout";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <MainLayout />
    </>
  );
};

export default HomeLayout;
