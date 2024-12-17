import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ShineBorder from "@/components/ui/shine-border";
import { Edit, CheckCircle, Cloud } from "lucide-react";

const HighlightCards = () => {
  return (
    <div className="grid w-[90%] my-10 mx-auto gap-10 lg:grid-cols-3 place-items-center">
      {HighlightCardData.map((items) => (
        <ShineBorder
          key={items.id}
          duration={10}
          borderWidth={2}
          color={["#2A3335", "#1C325B", "#22177A"]}
          className="min-h-44 w-[300px] bg-transparent transition-all duration-300 hover:scale-110"
        >
          <Card className="border-none shadow-none">
            <CardHeader className="space-y-4 text-primary">
              <div className="flex-center size-14 rounded-full bg-paleblue">
                {items.icon}
              </div>
              <h4>{items.title}</h4>
            </CardHeader>
            <CardContent>
              <h6 className="text-primary">{items.cardDesc}</h6>
            </CardContent>
          </Card>
        </ShineBorder>
      ))}
    </div>
  );
};

export default HighlightCards;

const HighlightCardData: Array<{
  id: number;
  icon: React.ReactNode;
  title: string;
  cardDesc: string;
}> = [
  {
    id: 1,
    icon: <Edit size={30} />,
    title: "Enhanced Editing Tools",
    cardDesc:
      "Access a rich set of editing tools including text formatting, markdown support, and version control, to elevate your content creation.",
  },
  {
    id: 2,
    icon: <CheckCircle size={30} />,
    title: "Collaborative Features",
    cardDesc:
      "Easily work together with your team, allowing for seamless content creation and sharing, while keeping everything organized.",
  },
  {
    id: 3,
    icon: <Cloud size={30} />,
    title: "Cloud Sync & Backup",
    cardDesc:
      "Ensure your documents are always available with cloud syncing and automatic backups, so you never lose your progress.",
  },
];
