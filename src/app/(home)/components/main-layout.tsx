"use client";
import HighlightCards from "@/components/shared/cards/highlight-card";
import { MarqueeBox } from "@/components/shared/marquee";
import { VideoModal } from "@/components/shared/modals/video-modal";
import BlurFade from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { SocialDock } from "@/components/social-dock";
import ShineBorder from "@/components/ui/shine-border";

const MainLayout = () => {
  const Router = useRouter();

  return (
    <main className="h-screen space-y-4">
      <BlurFade
        className="flex-center mx-auto h-full max-w-[600px] flex-col gap-7"
        delay={0.3}
        inView
      >
        <ShineBorder
          className="bg-primary p-4 px-5 text-xl font-medium text-secondary lg:text-3xl"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
          NOVA-X TEXT EDITOR
        </ShineBorder>

        <header className="space-y-4 px-4 text-center">
          <h1 className="text-primary">
            Transform the way you edit and collaborate with NOVA-X.
          </h1>
          <h4 className="text-slate-500">
            Whether you're a professional writer or a content creator, <br />
            NOVA-X simplifies your editing experience like never before.
          </h4>
        </header>

        <SocialDock />
      </BlurFade>

      {/* VIDEO MODAL */}
      <BlurFade
        className="flex-center mx-auto w-[70%] flex-col gap-7"
        delay={0.3}
        inView
      >
        <VideoModal />
      </BlurFade>

      {/* PROBLEM AND SOLUTION */}
      <section className="h-full pb-10">
        <BlurFade
          className="flex-center mx-auto mt-16 w-full flex-col gap-5"
          delay={0.3}
          inView
        >
          <h4 className="text-primary">Used by Creators Worldwide</h4>
          <MarqueeBox />
        </BlurFade>
        <BlurFade
          className="flex-center mx-auto mt-16 w-full flex-col gap-5"
          delay={0.4}
          inView
        >
          <header className="space-y-4 px-4 text-center">
            <h4 className="mb-4 text-center text-lg font-medium text-primary">
              The Future of Editing is Here
            </h4>
            <h1 className="text-center text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
              Streamline your writing process with NOVA-X.
            </h1>
          </header>
        </BlurFade>
        <BlurFade
          className="flex-center mx-auto mt-16 w-full flex-col gap-5"
          delay={0.5}
          inView
        >
          <HighlightCards />
        </BlurFade>
      </section>
      {/* PROBLEM AND SOLUTION */}
    </main>
  );
};

export default MainLayout;
