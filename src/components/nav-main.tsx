"use client";

import { File, Trash2Icon } from "lucide-react";

import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { api } from "convex/_generated/api";
import { useLocalStorage } from "usehooks-ts";
import { useMutation, useQuery } from "convex/react";
import { useToast } from "@/hooks/use-toast";

export function NavMain() {
  const [teamId] = useLocalStorage<string>("TeamId", "");
  const item = useQuery(api.file.geFiles, { teamId });
  const [FileId, setFileId] = useLocalStorage<string>("FileId", "");
  const DeleteFile = useMutation(api.file.deleteFile);
  const { toast } = useToast();
  const handlefileDelete = async () => {
    try {
      const resp = await DeleteFile({ FileId });
      console.log("🚀 ~ handlefileDelete ~ resp:", resp);
      if (resp) {
        toast({
          title: "File Deleted Successfully",
          description: `File has been created.`,
          className: "bg-green-400 text-black rounded-xl",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                <Trash2Icon
                  onClick={handlefileDelete}
                  className="mx-auto ml-4 float-right"
                  color="red"
                  size={30}
                />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
