"use client";

import { useState } from "react";
import { Gift, Sparkles } from "lucide-react";

export default function PamaskoGenerator() {
  const [amount, setAmount] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleReveal = () => {
    if (isLoading) return;

    setIsLoading(true);
    setIsRevealed(false);

    setTimeout(() => {
      // Weighted array: mostly 10, 20, 50 pesos
      const multiplesOfTen = [
        10, 10, 10, 10, 10, // very likely
        20, 20, 20,          // likely
        50, 50,              // medium chance
        30, 40, 60, 70, 80, 90, 100 // rare
      ];

      const randomAmount =
        multiplesOfTen[Math.floor(Math.random() * multiplesOfTen.length)];

      setAmount(randomAmount);
      setIsRevealed(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setIsRevealed(false);
    setAmount(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="relative flex flex-col items-center justify-center bg-white border border-red-200 rounded-3xl p-8 md:p-12 shadow-2xl w-full max-w-md text-center">
        {!isRevealed ? (
          <>
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-red-600 drop-shadow-md">
                🎄 Pamasko Time!
              </h1>
              <p className="mt-2 text-base sm:text-lg text-red-700/80">
                Click the gift to reveal your Christmas cash!
              </p>
            </div>

            <button
              onClick={handleReveal}
              disabled={isLoading}
              className="relative group flex items-center justify-center w-40 sm:w-48 h-40 sm:h-48 bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300/50 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white"></div>
              ) : (
                <>
                  <Gift
                    className="w-20 sm:w-24 h-20 sm:h-24 text-white transition-transform duration-300 group-hover:rotate-12"
                    strokeWidth={1.5}
                  />
                  <Sparkles className="absolute -top-2 -right-2 w-6 sm:w-8 h-6 sm:h-8 text-yellow-400 animate-pulse" />
                </>
              )}
            </button>

            <p className="mt-6 text-sm sm:text-base text-red-700/70">
              Wishing you a Merry Christmas!
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center animate-fade-in">
            <h2 className="text-xl sm:text-2xl text-yellow-500 font-semibold">
              You Received
            </h2>
            <div className="my-4 text-5xl sm:text-7xl md:text-8xl font-extrabold text-red-600 flex items-center drop-shadow-lg">
              <span className="text-4xl sm:text-5xl mr-1">₱</span>
              {amount}
            </div>
            <p className="text-red-700/80 mb-6 text-sm sm:text-base">
              Maligayang Pasko at Manigong Bagong Taon!
            </p>
            <button
              onClick={handleReset}
              className="px-6 sm:px-8 py-2 sm:py-3 bg-green-600 text-white font-bold rounded-full shadow-md hover:bg-green-700 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400/50"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
