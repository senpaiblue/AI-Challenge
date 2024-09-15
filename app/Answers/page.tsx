"use client";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const Answers = () => {
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
      className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white p-6"
    >
      {response ? (
        <>
          <h1 className="text-4xl font-bold mb-6">Gemini Answer:</h1>
          <div className="mt-4 p-4 bg-gray-800 text-white rounded-md shadow-md max-w-3xl w-full">
            <p>{response}</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </motion.div>
  );
};

export default Answers;