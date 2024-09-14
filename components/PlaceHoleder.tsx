"use client";
import { useState } from "react";
import { PlaceholdersAndVanishInput } from "../components/ui/PlaceholdersAndVanishInput";
import { run } from "../pages/api/geminiInteragtion"; // Ensure this is valid
import { useRouter } from "next/navigation"; // Correct App Router hook
import { ThreeDots } from "react-loader-spinner"; // Loader component

export function Placeholders() {
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Router for navigation

  const placeholders = [
    "What's on your mind today?",
    "Want to get answers?",
    "I got this!",
    "Don't trust?",
    "Test me out",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value); // Log input changes
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = (e.currentTarget.elements[0] as HTMLInputElement).value;
    if (!input) return; // Prevent empty input submission

    setLoading(true);
    setAnswer(null); // Clear previous answer

    try {
      const response = await run(input); // Call your API integration
      console.log("Response received:", response); // Log the response
      setAnswer(response); // Update the answer

      // Navigate to the "Answers" page with the response as a query param
      const encodedResponse = encodeURIComponent(response);
      router.push(`/Answers?answer=${encodedResponse}`);
    } catch (error) {
      console.error("Error fetching Gemini API response", error);
      setAnswer("Sorry, something went wrong.");
      setLoading(false);  // Reset loading state after error
    }
  };

  return (
    <div className="flex flex-col w-1/2 justify-center items-center">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />

      {loading && (
        <div className="flex justify-center items-center h-12">
          <ThreeDots color="#00BFFF" height={80} width={80} />
        </div>
      )}
    </div>
  );
}
