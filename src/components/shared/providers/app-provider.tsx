"use client";

import StoreProvider from "@/store";
import { ConvexClientProvider } from "./convext-client-provider";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-primary-600 flex min-h-screen w-full">
      <main className="dark:bg-dark-primary flex w-full flex-col">
        {children}
      </main>
    </div>
  );
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConvexClientProvider>
      <StoreProvider>
        <AppLayout>{children}</AppLayout>
      </StoreProvider>
    </ConvexClientProvider>
  );
};

export default AppProvider;
