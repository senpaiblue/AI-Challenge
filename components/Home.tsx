// pages/SidebarDemo.tsx
"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/Sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { Placeholders } from "./PlaceHoleder";  // Import the Placeholders component for Gemini API interaction

export function SidebarDemo() {
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
      icon: <IconUserBolt className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Settings",
      href: "#",
      icon: <IconSettings className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-neutral-800 w-full flex-1  mx-auto border border-neutral-700 overflow-hidden",
        "h-screen" // for your use case, use h-screen instead of h-[60vh]
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
        Acet Labs
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
  const topics = [
    {
      topic: "Food",
    },
    {
      topic: "Music",
    },
    {
      topic: "Art",
    },
    {
      topic: "Anime",
    },
  ];

  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="p-8 md:p-10 rounded-tl-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-2 items-center justify-between w-full h-full">
        {/* Section for greeting and topics */}
        <div className="flex flex-col gap-8">
          <h3 className="text-4xl text-center w-full">Hello!</h3>
          <div className="flex w-full flex-row flex-wrap items-center justify-center gap-4">
            {topics.map((items) => (
              <div
                key={"first-array" + items.topic}
                className="h-20 w-[40%] px-6 md:px-12 rounded-xl bg-neutral-800 items-center justify-center flex animate-pulse"
              >
                <h3 className="text-center">{items.topic}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Section for Gemini API input and responses */}
          <Placeholders />
      </div>
    </div>
  );
};
