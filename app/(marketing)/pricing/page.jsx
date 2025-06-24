"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroHeader } from "@/components/hero8-header";

const CheckIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 13l4 4L19 7"
    />
  </svg>
);

function Upgrade() {
  return (
    <div>
      <HeroHeader />
      <div className="min-h-screen bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 mt-16">
            <h1 className="text-4xl font-extrabold dark:text-white text-gray-900 sm:text-5xl">
              Elevate Your Experience
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Unlock premium features with our Pro plan
            </p>
          </div>

          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-gray-700 overflow-hidden transition-all hover:shadow-3xl dark:hover:shadow-gray-700">
            <div className="absolute top-4 right-4 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-3 py-1 rounded-full text-sm font-medium">
              Recommended
            </div>

            <div className="px-8 py-10 lg:p-12">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold dark:text-white text-gray-900 mb-4">
                    Pro Plan
                  </h2>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-5xl font-extrabold text-indigo-600">
                      $5
                    </span>
                    <span className="text-lg dark:text-gray-300 text-gray-500">
                      /month
                    </span>
                  </div>

                  <ul className="space-y-4">
                    {[
                      "Unlimited courses",
                      "Unlimited materials",
                      "Unlimited quizzes",
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckIcon className="h-6 w-6 text-indigo-600 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:w-96 border-l dark:border-gray-700 lg:pl-8 lg:py-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Start Your Free Trial
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        7-day free trial. Cancel anytime.
                      </p>
                    </div>

                    <Button
                      size="lg"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              Need custom solutions?{" "}
              <a
                href="mailto:support@example.com"
                className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
              >
                Contact our team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
