"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState, Suspense } from "react";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const AnswersContent = () => {
  const searchParams = useSearchParams();
  const [response, setResponse] = useState<string | null>(null);

  useEffect(() => {
    const answer = searchParams ? searchParams.get("answer") : null;
    if (answer) {
      setResponse(decodeURIComponent(answer));
    }

    // Check if a refresh is needed
    const needsRefresh = sessionStorage.getItem('needsRefresh');
    if (needsRefresh === 'true') {
      // Clear the flag
      sessionStorage.removeItem('needsRefresh');
      // Refresh the page
      window.location.reload();
    }
  }, [searchParams]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col justify-center items-center min-h-screen bg-neutral-900 text-white p-6"
    >
      {response ? (
        <>
          <h1 className="text-4xl font-bold mb-6">
            <TextGenerateEffect words="Answer"/></h1>
          <div className="mt-4 md:px-12 md:py-8 p-4 lg:px-20 lg:py-12 bg-neutral-800 text-white rounded-2xl shadow-md max-w-3xl w-full">
            <p className="leading-loose">
              <TextGenerateEffect words={response}/>
              </p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </motion.div>
  );
};

const Answers = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnswersContent />
    </Suspense>
  );
};

export default Answers;