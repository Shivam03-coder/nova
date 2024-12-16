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
import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import { CopyPlus, UserPlus2 } from "lucide-react";
import { useState } from "react";

const TeamModal = ({ userId }: { userId: string }) => {
  const { toast } = useToast();
  const { open: isSidebarOpen } = useSidebar();
  const [TeamName, setTeamName] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const mutateSomething = useMutation(api.team.CreateNewTeam);

  const handleSave = async () => {
    try {
      console.log("Team Name Saved:", TeamName);
      const response = await mutateSomething({
        TeamName,
        userId,
      });
      
      setIsDialogOpen(false);
      setTeamName("");

      if (response) {
        toast({
          title: "Team Name Created Successfully",
          description: `The ${TeamName} has been successfully created.`,
          className: "bg-green-400 text-black rounded-xl",
        });
      }
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="bg-primary" asChild>
        {isSidebarOpen ? (
          <Button
            className="flex justify-start gap-2 !py-6 pl-4 font-inter font-semibold"
            variant="outline"
          >
            <UserPlus2 size={29} /> Create new team
          </Button>
        ) : (
          <Button variant="outline">
            <UserPlus2 size={29} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-secondary font-inter sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>NOVA-X</DialogTitle>
          <DialogDescription>
            Make changes to your profile and team name here. Click save when
            you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Team Name Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="TeamName" className="text-right">
              Team Name
            </Label>
            <Input
              id="TeamName"
              placeholder="Enter your team name"
              className="col-span-3"
              value={TeamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TeamModal;
