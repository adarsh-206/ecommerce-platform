"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Mic, MicOff, Loader2 } from "lucide-react";
import apiService from "@/app/utils/apiService";
import { getCategoryNameById } from "@/constants/categories";

const SpeechRecognition =
  typeof window !== "undefined"
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null;

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [listening, setListening] = useState(false);
  const [listeningText, setListeningText] = useState("");
  const router = useRouter();
  const recognitionRef = useRef(null);
  const listRef = useRef(null);
  let debounceTimer;

  useEffect(() => {
    if (!query.trim()) {
      stopListening();
      setResults([]);
      setShowDropdown(false);
      return;
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetchResults(query);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  useEffect(() => {
    if (!listening) {
      setListeningText("");
      return;
    }

    const phrases = [
      "Listening...",
      "Say something...",
      "I'm all ears...",
      "Speak now...",
      "What are you looking for?",
    ];

    let phraseIndex = 0;
    const interval = setInterval(() => {
      setListeningText(phrases[phraseIndex]);
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }, 1500);

    return () => clearInterval(interval);
  }, [listening]);

  const fetchResults = async (search) => {
    try {
      setLoading(true);
      const { data } = await apiService.get(
        "/buyer/search",
        { q: search },
        true
      );
      setResults(data.products || []);
      setShowDropdown(true);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
      setShowDropdown(false);
    } finally {
      setLoading(false);
      setActiveIndex(-1);
    }
  };

  const handleSelect = (productId) => {
    setQuery("");
    setShowDropdown(false);
    stopListening();
    router.push(`/product/${productId}`);
  };

  const handleKeyDown = (e) => {
    if (!showDropdown || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      handleSelect(results[activeIndex]._id);
    }
  };

  const highlightMatch = (text) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "ig");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }
    setListening(false);
    setListeningText("");
  };

  const handleVoiceSearch = () => {
    if (!SpeechRecognition)
      return alert("Voice search not supported in this browser.");

    if (listening) {
      stopListening();
      setShowDropdown(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
    setShowDropdown(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      stopListening();
    };

    recognition.onend = () => {
      stopListening();
    };

    recognition.onerror = (event) => {
      console.error("Voice error:", event.error);
      stopListening();
      setShowDropdown(false);
    };
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (results.length > 0) setShowDropdown(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            if (!listening) setShowDropdown(false);
          }, 150);
        }}
        placeholder="Search products..."
        className="w-full py-2.5 pl-10 pr-16 rounded-xl border-2 border-amber-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-300 text-amber-900 placeholder-amber-600 transition-all duration-200 hover:shadow-md"
      />

      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-amber-600" />
      </div>

      <button
        type="button"
        onClick={handleVoiceSearch}
        className={`absolute right-8 top-1/2 -translate-y-1/2 transition-all z-10 p-1 rounded-full ${
          listening
            ? "text-red-500 hover:text-red-600 bg-red-50 animate-pulse"
            : "text-amber-600 hover:text-amber-800 hover:bg-amber-50"
        }`}
        aria-label={listening ? "Stop Voice Search" : "Start Voice Search"}
      >
        {listening ? (
          <MicOff className="w-4 h-4" />
        ) : (
          <Mic className="w-4 h-4" />
        )}
      </button>

      {loading && (
        <div className="absolute right-10 top-1/2 -translate-y-1/2 text-amber-500 z-0">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      )}

      {showDropdown && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-amber-200 rounded-xl shadow-lg max-h-64 overflow-hidden">
          {listening ? (
            <div className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <Mic className="w-8 h-8 text-amber-500" />
                  <div className="absolute inset-0 rounded-full bg-amber-200 animate-ping opacity-30"></div>
                  <div className="absolute inset-0 rounded-full bg-amber-300 animate-ping opacity-20 animation-delay-150"></div>
                </div>
              </div>
              <div className="text-lg font-medium text-amber-800 mb-2">
                {listeningText}
              </div>
              <div className="text-sm text-amber-600">
                Speak clearly and I'll search for you
              </div>
              <div className="mt-4 flex justify-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce animation-delay-100"></div>
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce animation-delay-200"></div>
                </div>
              </div>
              <button
                onClick={handleVoiceSearch}
                className="mt-4 px-4 py-2 text-sm text-amber-700 hover:text-amber-800 transition-colors"
              >
                Tap to stop listening
              </button>
            </div>
          ) : results.length > 0 ? (
            <ul className="max-h-64 overflow-y-auto">
              <li className="px-4 pt-2 pb-1 text-xs text-amber-500">
                Here's what we found for you:
              </li>
              {results.map((product, index) => {
                const categoryInfo = getCategoryNameById(
                  product.category,
                  product.subCategory
                );

                return (
                  <li
                    key={product._id}
                    onClick={() => handleSelect(product._id)}
                    className={`flex items-center px-4 py-2 cursor-pointer transition-all ${
                      index === activeIndex
                        ? "bg-amber-100"
                        : "hover:bg-amber-50"
                    }`}
                  >
                    <img
                      src={product?.images?.main?.url}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded-md mr-3"
                    />
                    <div>
                      <div className="text-sm font-medium text-amber-900">
                        {highlightMatch(product.name)}
                      </div>
                      <div className="text-xs text-amber-600">
                        {categoryInfo?.subcategory
                          ? `${categoryInfo.category} • ${categoryInfo.subcategory}`
                          : categoryInfo?.category || ""}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : !loading ? (
            <div className="p-4 text-center">
              <Search className="w-8 h-8 text-amber-300 mx-auto mb-2" />
              <div className="text-sm text-amber-500">🔍 No results found</div>
              <div className="text-xs mt-1 text-amber-400">
                Try searching for something else
              </div>
            </div>
          ) : null}
        </div>
      )}

      <style jsx>{`
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        .animation-delay-150 {
          animation-delay: 0.15s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}
