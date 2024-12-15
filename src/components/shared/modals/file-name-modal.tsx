import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSidebar } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { CopyPlus, File, FolderPlus } from "lucide-react";
import { useState } from "react";
import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";

const FileModal = ({ userId }: { userId: string }) => {
  const { toast } = useToast();
  const { open: isSidebarOpen } = useSidebar();
  const [FileName, setFileName] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // Handle save button click
  const handleSave = async () => {
    if (!FileName.trim()) {
      toast({
        title: "Team Name Required",
        description: "Please enter a team name.",
        className: "bg-red-400 text-black rounded-xl",
      });
      return;
    }

    try {
      toast({
        title: "File Created Successfully",
        description: `File ${FileName} has been created.`,
        className: "bg-green-400 text-black rounded-xl",
      });
      setIsDialogOpen(false); // Close dialog after successful team creation
      setFileName(""); // Clear input field
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error creating the team. Please try again.",
        className: "bg-red-400 text-black rounded-xl",
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="bg-primary" asChild>
        {isSidebarOpen ? (
          <Button
            className="flex justify-start gap-2 !py-6 pl-4 font-inter font-semibold "
            variant="outline"
          >
            <FolderPlus className="size-10" /> Create new file
          </Button>
        ) : (
          <Button variant="outline">
            <FolderPlus />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-secondary font-inter sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New File</DialogTitle>
          <DialogDescription>
            Enter the name for your new file below and click save to create it.
          </DialogDescription>
        </DialogHeader>
        <div className="py-CopyPlus4 grid gap-4">
          {/* Team Name Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="FileName" className="text-right">
              File Name
            </Label>
            <Input
              id="FileName"
              placeholder="Enter your file name"
              className="col-span-3"
              value={FileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save File
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FileModal;
