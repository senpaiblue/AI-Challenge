"use client";
import { useState } from "react";
import { PlaceholdersAndVanishInput } from "../components/ui/PlaceholdersAndVanishInput";
import { run } from "../pages/api/geminiInteragtion";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";

export function Placeholders() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const placeholders = [
    "What's on your mind today?",
    "Want to get answers?",
    "I got this!",
    "Don't trust?",
    "Test me out",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = (e.currentTarget.elements[0] as HTMLInputElement).value;
    if (!input) return;

    setLoading(true);

    try {
      const response = await run(input);
      console.log("Response received:", response);

      // Set a flag in sessionStorage to indicate that a refresh is needed
      sessionStorage.setItem('needsRefresh', 'true');

      // Navigate to the Answers page
      router.push(`/Answers?answer=${encodeURIComponent(response)}`);
    } catch (error) {
      console.error("Error fetching Gemini API response", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full md:w-1/2 justify-center items-center">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />

      {loading && (
        <div className="flex justify-center items-center h-12">
          <ThreeDots color="#666666" height={80} width={80} />
        </div>
      )}
    </div>
  );
}