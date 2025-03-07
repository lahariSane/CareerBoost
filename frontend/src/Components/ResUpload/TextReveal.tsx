"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils"; // Ensure the correct path for utils

export interface TextRevealProps extends React.ComponentPropsWithoutRef<"div"> {
  children: string;
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const { scrollYProgress } = useScroll({
    target: isReady ? targetRef : undefined, // Ensure ref is ready
  });

  useEffect(() => {
    if (targetRef.current) {
      setIsReady(true);
    }
  }, []);

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const words = children.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[100vh]", className)}>
      <div className="sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]">
        <div className="flex flex-wrap p-5 text-2xl font-bold text-black/20 dark:text-black/10 md:p-8 md:text-3xl md:text-black lg:p-10 lg:text-4xl lg:text-black xl:text-5xl xl:text-black">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: any; // Fix type for MotionValue
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mx-1 lg:mx-1.5">
      <span className="absolute opacity-100">{children}</span>
      <motion.span style={{ opacity }} className="text-white dark:text-secondary-brownLight font-bold">
        {children}
      </motion.span>
    </span>
  );
};
