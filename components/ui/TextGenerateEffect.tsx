"use client";
import { useEffect, useRef } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/utils/cn";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  const ref = useRef(null);
  let wordsArray = words.split(" ");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(
              "span",
              {
                opacity: 1,
              },
              {
                duration: 2,
                delay: stagger(0.1),
              }
            );
            observer.unobserve(entry.target); // Stop observing after animation is triggered
          }
        });
      },
      {
        threshold: 0.1, // Adjust threshold as needed
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, animate]);

  const renderWords = () => {
    return (
      <motion.span ref={scope}>
        {wordsArray.map((word, idx) => (
          <motion.span key={word + idx} className="opacity-0">
            {word}{" "}
          </motion.span>
        ))}
      </motion.span>
    );
  };

  return (
    <span className={cn(className)} ref={ref}>
      {renderWords()}
    </span>
  );
};
