"use client";
import { UserButton } from "@clerk/nextjs";
import { api } from "convex/_generated/api";
import { useQueries } from "convex/react";
import React, { useEffect } from "react";

const HOMEPAGE = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <UserButton />
    </div>
  );
};

export default HOMEPAGE;
