"use client";

import { ChevronRight, File, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { api } from "convex/_generated/api";
import { useLocalStorage } from "usehooks-ts";
import { useQuery } from "convex/react";

export function NavMain() {
  const [teamId] = useLocalStorage<string>("TeamId", "");
  const item = useQuery(api.file.geFiles, { teamId });
  const [FileId, setFileId] = useLocalStorage<string>("FileId", "");

  return (
    <SidebarGroup>
      <SidebarGroupLabel>FILES</SidebarGroupLabel>
      <SidebarMenu>
        {item?.map((item) => (
          <Collapsible
            onClick={() => setFileId(item._id)}
            key={item._id}
            asChild
            className="group/collapsible"
          >
            <SidebarMenuItem
              className={`h my-3 rounded bg-white hover:bg-white ${FileId === item._id ? "bg-primary text-secondary hover:bg-primary hover:text-secondary" : ""}`}
            >
              <SidebarMenuButton tooltip={item.fileName}>
                <File />
                <span>{item.fileName}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
