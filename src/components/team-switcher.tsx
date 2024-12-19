"use client";

import * as React from "react";
import {
  Bot,
  ChevronsUpDown,
  CopyPlus,
  PencilIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import TooltipBtn from "./tool-tip-btn";
import TeamModal from "./shared/modals/team-name-modal";
import { useQuery } from "convex/react";
import { useLocalStorage } from "usehooks-ts";
import FileModal from "./shared/modals/file-name-modal";
import { useRouter } from "next/navigation";
import { api } from "../../convex/_generated/api";
type Team = {
  _id: string;
  teamName: string;
};

export function TeamSwitcher() {
  const { isMobile } = useSidebar();
  const [userId] = useLocalStorage("userId", "");
  const teams = useQuery(api.team.getTeamname, { userId });
  const [activeTeam, setActiveTeam] = React.useState<Team | undefined>(undefined);
  const { state: SidebarState } = useSidebar();
  const [TeamId, setTeamId] = useLocalStorage<string>("TeamId", "");
  const Router = useRouter();

  React.useEffect(() => {
    if (teams && teams.length > 0) {
      setActiveTeam(teams[0]);
    }
  }, [teams]);

  return (
    <SidebarMenu className="space-y-4">
      <SidebarMenuItem>
        <DropdownMenu>
          <SidebarMenuButton
            size="lg"
            className="bg-primary data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            {SidebarState === "collapsed" ? (
              <TooltipBtn tooltiplabel="Compose Mail">
                <span className="flex-center w-full">
                  <PencilIcon size={19} className="text-secondary" />
                </span>
              </TooltipBtn>
            ) : (
              <div onClick={() => Router.push("/")} className="mx-auto flex items-center justify-center gap-5">
                <PencilIcon size={19} className="text-secondary" />
                <div className="flex-1 text-left font-inter text-sm font-semibold leading-tight">
                  NOVA-X-TEXT-EDITOR
                </div>
              </div>
            )}
          </SidebarMenuButton>
        </DropdownMenu>
      </SidebarMenuItem>

      {teams?.length !== 0 && (
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="bg-primary data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
                  <CopyPlus className="size-5" />
                </div>
                <div
                  onClick={() => Router.push("/")}
                  className="grid flex-1 text-left text-sm leading-tight"
                >
                  <span className="truncate font-semibold">
                    {activeTeam?.teamName || "Select a Team"}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-paleblue"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                Teams
              </DropdownMenuLabel>
              {teams?.map((team) => (
                <DropdownMenuItem
                  key={team._id}
                  onClick={() => {
                    setActiveTeam(team);
                    setTeamId(team._id);
                  }}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <Bot className="size-4 shrink-0" />
                  </div>
                  {team.teamName}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      )}
      <TeamModal userId={userId} />
      <FileModal TeamId={TeamId} />
    </SidebarMenu>
  );
}
