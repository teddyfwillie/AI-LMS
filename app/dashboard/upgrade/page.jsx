"use client";

import { db } from "@/configs/db";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { eq } from "drizzle-orm";
import { USER_TABLE } from "@/configs/schema";
import { toast } from "sonner";

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
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const GetUserDetails = async () => {
      try {
        const result = await db
          .select()
          .from(USER_TABLE)
          .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));
        setUserDetails(result[0]);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) GetUserDetails();
  }, [user]);

  const handleSubscriptionAction = async (action) => {
    setProcessing(true);
    try {
      const endpoint =
        action === "manage"
          ? "/api/payment/manage-payment"
          : "/api/payment/checkout";

      const result = await axios.post(endpoint, {
        ...(action === "manage" && { customerId: userDetails?.customerId }),
        ...(action === "checkout" && {
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
        }),
      });

      window.location.href = result.data.url;
    } catch (error) {
      console.error(`Error processing ${action}:`, error);
      toast.error(`Failed to process request. Please try again.`);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
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
                    $30
                  </span>
                  <span className="text-lg dark:text-gray-300 text-gray-500">
                    /month
                  </span>
                </div>

                <ul className="space-y-4">
                  {[
                    "Unlimited projects",
                    "Advanced analytics",
                    "50GB storage",
                    "Priority support",
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
                      {userDetails?.isMember
                        ? "Manage Your Plan"
                        : "Start Your Free Trial"}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {userDetails?.isMember
                        ? "Update or cancel your subscription anytime"
                        : "7-day free trial. Cancel anytime."}
                    </p>
                  </div>

                  <Button
                    size="lg"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() =>
                      handleSubscriptionAction(
                        userDetails?.isMember ? "manage" : "checkout"
                      )
                    }
                    disabled={processing}
                  >
                    {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                    {userDetails?.isMember
                      ? "Manage Subscription"
                      : "Get Started"}
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
  );
}

export default Upgrade;
