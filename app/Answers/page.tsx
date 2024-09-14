"use client";
import { useSearchParams } from "next/navigation"; // Use correct hooks for routing
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const pageVariants = {
  initial: { opacity: 0, x: "-100vw" },
  animate: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120 } },
  exit: { opacity: 0, x: "100vw", transition: { ease: "easeInOut" } },
};

const Answers = () => {
  const searchParams = useSearchParams(); // Use Next.js hook to get search params
  const answer = searchParams ? searchParams.get("answer") : null; // Safely handle null value
  const [response, setResponse] = useState<string | null>(null);

  useEffect(() => {
    if (answer) {
      setResponse(answer); // Set the response from the query params
    }
  }, [answer]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white"
    >
      {response ? (
        <>
          <h1 className="text-4xl font-bold mb-6">Gemini Answer:</h1>
          <div className="mt-4 p-4 bg-gray-800 text-white rounded-md shadow-md">
            <p>{response}</p>
          </div>
        </>
      ) : (
        <p>No response found.</p>
      )}
    </motion.div>
  );
};

export default Answers;
