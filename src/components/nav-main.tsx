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
import { useAppDispatch, useAppSelector } from "@/store";
import { setFileID } from "@/store/states/gobal-state";

export function NavMain() {
  const [teamId] = useLocalStorage<string>("TeamId", "");
  const item = useQuery(api.file.geFiles, { teamId });
  const DeleteFile = useMutation(api.file.deleteFile);
  const { toast } = useToast();
  const Dispatch = useAppDispatch();
  const { FileId } = useAppSelector((state) => state.account);

  const handlefileDelete = async () => {
    try {
      const resp = await DeleteFile({ FileId });
      if (resp.success) {
        Dispatch(setFileID(""));
        toast({
          title: "File Deleted Successfully",
          description: "The file has been deleted.",
          className: "bg-green-400 text-black rounded-xl",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Unable to delete the file.",
        className: "bg-red-400 text-white rounded-xl",
      });
    }
  };

  // Check if there are no files and render nothing or a fallback message
  if (!item) {
    return null; // Do not render anything if no files exist
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>FILES</SidebarGroupLabel>
      <SidebarMenu>
        {item.files?.map((item) => (
          <Collapsible
            onClick={() => Dispatch(setFileID(item._id))}
            key={item._id}
            asChild
            className="group/collapsible"
          >
            <SidebarMenuItem
              className={`my-3 rounded bg-white hover:bg-white ${
                FileId === item._id
                  ? "bg-primary text-secondary hover:bg-primary hover:text-secondary"
                  : ""
              }`}
            >
              <SidebarMenuButton tooltip={item.fileName}>
                <File />
                <span>{item.fileName}</span>
                <Trash2Icon
                  onClick={handlefileDelete}
                  className="mx-auto ml-4 cursor-pointer"
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
