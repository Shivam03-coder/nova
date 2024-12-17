import HeroVideoDialog from "@/components/ui/hero-video-dialog";

export function VideoModal() {
  return (
    <div className="relative rounded-xl bg-white shadow-none">
      <HeroVideoDialog
        className="block p-2 shadow-none dark:hidden"
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/embed/zWfT3yoGouE?si=kmjX3vAq8EuFwtrx"
        thumbnailSrc="/image.png"
        thumbnailAlt="Hero Video"
      />
      <div className="opacityBg absolute bottom-0 h-[200px] w-full" />
    </div>
  );
}