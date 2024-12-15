"use client";

import { PencilIcon } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { GetUserInfo } from "@/lib/clerk";

export function NavUser() {
  const [user, setUser] = useState<null | {
    emailAddresses: any;
    firstName: string;
  }>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await GetUserInfo();
      if (userInfo) {
        setUser({
          firstName: userInfo.username as string,
          emailAddresses: userInfo.useremail,
        });
      }
    };
    fetchUser();
  }, []);

  return (
    <SidebarMenu>
      <SidebarMenuItem className="space-y-2">
        <SidebarMenuButton
          size="lg"
          className="rounded-lg bg-primary text-secondary data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
            <UserButton />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user?.firstName}</span>
            <span className="truncate text-xs">{user?.emailAddresses}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
