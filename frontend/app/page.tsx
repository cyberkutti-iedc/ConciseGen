"use client"; 
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import LoadingDots from "../components/LoadingDots";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState("");
  const [summary, setSummary] = useState("");
  const [minWords, setMinWords] = useState(20);
  const [maxWords, setMaxWords] = useState(800);
  const articleRef = useRef<null | HTMLDivElement>(null);

   // Function to copy summary to clipboard
   const copyToClipboard = () => {
    if (summary) {
      navigator.clipboard.writeText(summary).then(() => {
        toast.success("Summary copied to clipboard!");
      }).catch((error) => {
        toast.error("Failed to copy summary.");
        console.error("Copy failed: ", error);
      });
    }
  };

  const scrollToSummary = () => {
    if (articleRef.current !== null) {
      articleRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const summarizeText = async (e: any) => {
    e.preventDefault();
    const wordCount = article.split(" ").length;

    // Validation for word count
    if (wordCount > 1000) {
      toast.error("Please enter up to 800 words.");
      return;
    }

    // Check min and max word limits
    if (wordCount < minWords || wordCount > maxWords) {
      toast.error(`Please ensure the word count is between ${minWords} and ${maxWords}.`);
      return;
    }

    setSummary("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/summarize/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: article, min_length: minWords, max_length: maxWords }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch summary");
      }

      const data = await response.json();
      setSummary(data.summary);
      scrollToSummary();
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          AI Text Summarization
        </h1>

        <div className="max-w-xl w-full mt-10">
          <textarea
            value={article}
            onChange={(e) => setArticle(e.target.value)}
            rows={8}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5 p-4"
            placeholder={"Enter up to 1000 words for summarization..."}
          />
          <p className="text-sm text-gray-500">Word count: {article.split(" ").length} / 800</p>

          <div className="flex flex-col space-y-2 mt-5">
            <label className="text-left text-gray-700">Min Words: {minWords}</label>
            <input
              type="range"
              min="20"
              max="800"
              value={minWords}
              onChange={(e) => setMinWords(Number(e.target.value))}
              className="slider w-full"
            />
            <label className="text-left text-gray-700">Max Words: {maxWords}</label>
            <input
              type="range"
              min="20"
              max="800"
              value={maxWords}
              onChange={(e) => setMaxWords(Number(e.target.value))}
              className="slider w-full"
            />
          </div>

          {loading ? (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
              <span className="ml-2">Summarizing...</span>
            </button>
          ) : (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={summarizeText}
            >
              Summarize Text &rarr;
            </button>
          )}
        </div>

        <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 2000 }} />

        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700 w-full my-10" />

        <div className="space-y-10 my-10">
  {summary && (
    <>
      <div className="text-center">
        <h2
          className="sm:text-5xl text-4xl font-extrabold text-purple-600 mx-auto animate-bounce"
          ref={articleRef}
        >
          🎉 Summary 🎉
        </h2>
      </div>
      <div className="bg-gradient-to-r from-yellow-200 to-pink-300 rounded-xl shadow-lg p-6 hover:shadow-xl transition transform duration-300 max-w-xl mx-auto border border-purple-300">
        <p className="text-lg text-gray-800 font-medium text-center">
          {summary}
        </p>
        <button
                  onClick={copyToClipboard}
                  className="mt-4 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-200"
                >
                  Copy Summary
                </button>
      </div>
    </>
  )}
</div>

      </main>
      <Footer />
    </div>
  );
}
