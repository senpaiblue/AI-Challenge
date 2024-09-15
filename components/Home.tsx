"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/Sidebar";
import {
  IconBrandTabler,
  IconMessage2Bolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { Placeholders } from "./PlaceHoleder";
import { useRouter } from "next/navigation";
import { run } from "../pages/api/geminiInteragtion";
import { ThreeDots } from "react-loader-spinner";
import { Spotlight } from "./ui/Spotlight";
import { FlipWords } from "./ui/Flip";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { topics } from "@/Data";

export function SidebarMain() {
  const links = [
    {
      label: "Home",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Answer",
      href: "/Answers",
      icon: <IconMessage2Bolt className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-neutral-800 w-full flex-1  mx-auto border border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Sakcham Singh",
                href: "#",
                icon: (
                  <Image
                    src="/avatar.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-white whitespace-pre"
      >
        AI challenge
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20"
    ></Link>
  );
};

// Dashboard component with topics and Gemini API response section
const Dashboard = () => {
  const words = [
    "Hello",
    "नमस्ते",
    "こんにちは ",
    "안녕하세요",
    "Bonjour",
    " Γειά σας",
    "Ciao",
  ];
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleTopicClick = async (topic: string) => {
    setLoading(true);
    try {
      const prompt = `Tell me something interesting about ${topic}`;
      const response = await run(prompt);
      console.log("Response received:", response);

      // Set a flag in sessionStorage to indicate that a refresh is needed
      sessionStorage.setItem("needsRefresh", "true");

      // Navigate to the Answers page
      router.push(`/Answers?answer=${encodeURIComponent(response)}`);
    } catch (error) {
      console.error("Error fetching Gemini API response", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="p-8 md:p-10  antialiased bg-grid-neutral-700/[0.03] relative overflow-hidden border border-neutral-700 bg-neutral-900 flex flex-col gap-2 items-center justify-between w-full h-full">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-48"
          fill="gray"
        />
        {/* <Spotlight
          className="-top-0 left-24 md:left-60 md:-top-0"
          fill="gray"
        /> */}
        <div className="flex flex-col relative z-10 gap-8">
          <h3 className="text-4xl text-center lg:text-center md:text-5xl font-bold dark:text-black">
            <FlipWords words={words} />
            ! Human <br />
          </h3>
          <div className="flex w-full flex-row flex-wrap items-center justify-center gap-4">
            {topics.map((item) => (
              <div
                key={"first-array" + item.topic}
                className="h-20 w-[40%] px-6 md:px-12 rounded-xl border border-neutral-700 bg-neutral-800 items-center justify-center flex cursor-pointer hover:bg-neutral-700 transition-colors"
                onClick={() => handleTopicClick(item.topic)}
              >
                <h3 className="text-center">
                  <TextGenerateEffect words={item.topic} />
                </h3>
              </div>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-12">
            <ThreeDots color="#666666" height={80} width={80} />
          </div>
        ) : (
          <Placeholders />
        )}
      </div>
    </div>
  );
};
